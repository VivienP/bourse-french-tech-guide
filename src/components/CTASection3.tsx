import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
const CTASection3 = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  useEffect(() => {
    // Load Cal.com script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "bft3", {origin:"https://app.cal.com"});
      Cal.ns.bft3("inline", {
        elementOrSelector:"#my-cal-inline-bft3",
        config: {"layout":"month_view","theme":"light"},
        calLink: "vivienperrelle/bft",
      });
      Cal.ns.bft3("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#F8D164"},"dark":{"cal-brand":"#FFFFFF"}},"hideEventTypeDetails":true,"layout":"month_view"});
    `;
    document.head.appendChild(script);
    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, []);
  return;
};
export default CTASection3;