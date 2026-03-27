import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type Status = 'loading' | 'valid' | 'already' | 'invalid' | 'success' | 'error';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const Unsubscribe: React.FC = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (!token) { setStatus('invalid'); return; }

    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: ANON_KEY },
    })
      .then(r => r.json())
      .then(data => {
        if (data.valid === false && data.reason === 'already_unsubscribed') setStatus('already');
        else if (data.valid) setStatus('valid');
        else setStatus('invalid');
      })
      .catch(() => setStatus('error'));
  }, [token]);

  const handleUnsubscribe = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('handle-email-unsubscribe', {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) setStatus('success');
      else if (data?.reason === 'already_unsubscribed') setStatus('already');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-foreground mb-2">Bourse French Tech</h1>

        {status === 'loading' && (
          <p className="text-muted-foreground text-sm">Vérification en cours…</p>
        )}

        {status === 'valid' && (
          <>
            <p className="text-muted-foreground text-sm mb-6">
              Souhaitez-vous vous désinscrire de nos communications ?
            </p>
            <button
              onClick={handleUnsubscribe}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Confirmer la désinscription
            </button>
          </>
        )}

        {status === 'success' && (
          <p className="text-green-600 text-sm mt-4">
            ✅ Vous avez été désinscrit avec succès. Vous ne recevrez plus d'emails de notre part.
          </p>
        )}

        {status === 'already' && (
          <p className="text-muted-foreground text-sm mt-4">
            Vous êtes déjà désinscrit.
          </p>
        )}

        {status === 'invalid' && (
          <p className="text-destructive text-sm mt-4">
            Lien invalide ou expiré.
          </p>
        )}

        {status === 'error' && (
          <p className="text-destructive text-sm mt-4">
            Une erreur est survenue. Veuillez réessayer.
          </p>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
