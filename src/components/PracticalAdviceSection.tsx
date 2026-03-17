import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PracticalAdviceSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const goodPractices = [
    { title: "Verrous technologiques réels", description: "Assurez-vous de présenter une innovation technique tangible et différenciée." },
    { title: "Équipe solide et complémentaire", description: "Valorisez les compétences techniques internes et la complémentarité des profils." },
    { title: "Marqueurs de confiance", description: "Appuyez-vous sur des signaux forts comme une incubation, un prêt d'honneur, des partenariats bancaires." },
    { title: "Alignement stratégique", description: "Développez une proposition clairement alignée aux thématiques prioritaires de Bpifrance." }
  ];
  const trapsToAvoid = [
    { title: "Timing prématuré", description: "Ne déposez pas un dossier trop tôt sans avoir clarifié votre vision, vos objectifs et votre roadmap." },
    { title: "Manque de transparence", description: "Soyez honnête et précis, évitez d'inventer ou de surévaluer l'innovation." },
    { title: "Fragilité financière", description: "Disposez d'une trésorerie couvrant au minimum 9 mois d'activité." },
    { title: "Négligence relationnelle", description: "Accordez une importance particulière à la relation avec votre chargé d'affaires." }
  ];

  return (
    <section id="conseils" className="py-20 px-4 sm:px-6 lg:px-8 section-warm-alt">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Conseils</span>
            <div className="h-1 w-12 rounded-full bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
            Conseils pratiques pour réussir votre demande
          </h2>
          
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-primary mr-3" />
              Les bonnes pratiques
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {goodPractices.map((practice, index) => (
                <div key={index} className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card className="h-full border-l-4 border-l-primary rounded-2xl shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-foreground">{practice.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{practice.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <XCircle className="h-6 w-6 text-destructive mr-3" />
              Les pièges à éviter
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {trapsToAvoid.map((trap, index) => (
                <div key={index} className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${(index + 4) * 100}ms` }}>
                  <Card className="h-full border-l-4 border-l-destructive rounded-2xl shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-foreground">{trap.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{trap.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 rounded-2xl shadow-warm-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-foreground">La différence décisive</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-lg text-muted-foreground">
                  Développez une relation de confiance avec votre chargé d'affaires. Celui-ci deviendra votre principal soutien et pourra défendre activement votre dossier.
                </p>
                <div className="p-4 bg-card/50 rounded-xl border border-primary/20">
                  <p className="text-xl font-semibold text-primary">Une bonne relation avec votre chargé d'affaires est tout aussi importante que la qualité de votre dossier.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticalAdviceSection;
