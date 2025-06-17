
import React from 'react';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gray-900">Bourse French Tech</span>
            </div>
            
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
          
          <div className="space-y-8">
            {/* Éditeur du site */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Éditeur du site</h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>Raison sociale :</strong> Finexov</p>
                <p><strong>Site web :</strong> <a href="https://www.finexov.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.finexov.com</a></p>
                <p><strong>Contact :</strong> <a href="https://taap.it/M96y4a" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a></p>
              </div>
            </section>

            {/* Hébergement */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hébergement</h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>Hébergeur :</strong> Lovable</p>
                <p><strong>Site web :</strong> <a href="https://lovable.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">lovable.dev</a></p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Propriété intellectuelle</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                  Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support électronique quelconque est formellement interdite sauf autorisation expresse du propriétaire.
                </p>
              </div>
            </section>

            {/* Données personnelles */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Protection des données personnelles</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Ce site web ne collecte aucune donnée personnelle de ses visiteurs. 
                  Aucun cookie de tracking n'est utilisé et aucune information personnelle n'est stockée.
                </p>
                <p>
                  Les liens externes vers LinkedIn ou d'autres services sont soumis aux politiques de confidentialité respectives de ces plateformes.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation de responsabilité</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Les informations contenues sur ce site sont données à titre informatif et ne constituent pas des conseils juridiques ou financiers personnalisés.
                </p>
                <p>
                  Finexov ne saurait être tenu responsable des erreurs ou omissions, d'une absence de disponibilité des informations et/ou de la présence de virus sur son site.
                </p>
              </div>
            </section>

            {/* Liens externes */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Liens externes</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Ce site peut contenir des liens vers d'autres sites web. Finexov n'est pas responsable du contenu de ces sites externes.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Droit applicable</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Les présentes mentions légales sont soumises au droit français. 
                  En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500">
            <p>Dernière mise à jour : 17 juin 2025</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentionsLegales;
