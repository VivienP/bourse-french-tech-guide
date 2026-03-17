
import React from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'decouverte', embedJsUrl: 'https://app.cal.eu/embed/embed.js' });
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
  }, []);

  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(43_92%_68%_/_0.08),transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Rendez-vous</span>
            <div className="h-1 w-12 rounded-full bg-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            Échangez avec un expert
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg text-center">
            Réservez un créneau de découverte directement en ligne.
          </p>

          <div className="bg-card rounded-2xl border border-border shadow-warm-lg overflow-hidden" style={{ minHeight: 600 }}>
            <Cal
              namespace="decouverte"
              calLink="boursefrenchtech/decouverte"
              calOrigin="https://app.cal.eu"
              style={{ width: '100%', height: '100%', overflow: 'auto', minHeight: 600 }}
              config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'light' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
