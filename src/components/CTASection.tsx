
import React from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CTASection = ({ namespace = 'decouverte' }: { namespace?: string }) => {
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace, embedJsUrl: 'https://app.cal.eu/embed/embed.js' });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#1B2A4A' },
          dark: { 'cal-brand': '#F6F3EC' },
        },
        hideEventTypeDetails: false,
        // @ts-ignore – hideBranding is supported by the Cal.com API
        hideBranding: true,
        layout: 'month_view',
      });
    })();
  }, [namespace]);

  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-primary/15">
      <div className="max-w-6xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Échangez avec un expert
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg text-center">
            Déléguez la constitution de votre dossier et maximisez vos chances de financement.
          </p>

          <Cal
            namespace={namespace}
            calLink="boursefrenchtech/decouverte"
            calOrigin="https://app.cal.eu"
            style={{ width: '100%', height: '100%', overflow: 'auto', minHeight: 600 }}
            config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' }}
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
