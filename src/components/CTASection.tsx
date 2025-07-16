
import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    // Load Cal.com script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "bft", {origin:"https://app.cal.com"});
      Cal.ns.bft("inline", {
        elementOrSelector:"#my-cal-inline-bft",
        config: {"layout":"month_view","theme":"light"},
        calLink: "vivienperrelle/bft",
      });
      Cal.ns.bft("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#F8D164"},"dark":{"cal-brand":"#FFFFFF"}},"hideEventTypeDetails":true,"layout":"month_view"});
    `;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,209,100,0.08),transparent_70%)]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/8 rounded-full blur-lg animate-pulse delay-300"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Enhanced container with border and shadow */}
        <div 
          ref={ref}
          className={`bg-white/80 backdrop-blur-sm rounded-lg pt-12 px-6 pb-6 shadow-2xl border border-white/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Réservez votre <span className="whitespace-nowrap">rendez-vous</span>
          </h2>
          
          <p className="text-gray-600 mb-2 max-w-3xl mx-auto text-lg">
            Echangeons sur votre projet de financement
          </p>
          
          {/* Cal inline embed code begins */}
          <div className="w-full h-[600px] rounded-lg overflow-hidden -mt-4">
            <div style={{width:'100%',height:'100%',overflow:'scroll'}} id="my-cal-inline-bft"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
