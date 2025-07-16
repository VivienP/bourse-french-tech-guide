import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
const PracticalAdviceSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  const goodPractices = [{
    title: "Verrous technologiques réels",
    description: "Assurez-vous de présenter une innovation technique tangible et différenciée."
  }, {
    title: "Équipe solide et complémentaire",
    description: "Valorisez les compétences techniques internes et la complémentarité des profils."
  }, {
    title: "Marqueurs de confiance",
    description: "Appuyez-vous sur des signaux forts comme une incubation, un prêt d'honneur, des partenariats bancaires, des investisseurs reconnus ou des premiers clients."
  }, {
    title: "Alignement stratégique",
    description: "Développez une proposition clairement alignée aux thématiques prioritaires de Bpifrance (impact social/environnemental, industrie, santé, greentech)."
  }];
  const trapsToAvoid = [{
    title: "Timing prématuré",
    description: "Ne déposez pas un dossier trop tôt sans avoir clarifié votre vision, vos objectifs et votre roadmap d'innovation."
  }, {
    title: "Manque de transparence",
    description: "Soyez honnête et précis, évitez d'inventer ou de surévaluer l'innovation."
  }, {
    title: "Fragilité financière",
    description: "Disposez d'une trésorerie couvrant au minimum 9 mois d'activité."
  }, {
    title: "Négligence relationnelle",
    description: "Accordez une importance particulière à la relation avec votre chargé d'affaires. Le relationnel joue un rôle clé."
  }];
  return <section id="conseils" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Conseils pratiques pour réussir votre demande de BFT
          </h2>
          
          {/* Good Practices */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              Les bonnes pratiques
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {goodPractices.map((practice, index) => <div key={index} className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
              transitionDelay: `${index * 100}ms`
            }}>
                  <Card className="h-full border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-green-700">{practice.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{practice.description}</p>
                    </CardContent>
                  </Card>
                </div>)}
            </div>
          </div>

          {/* Traps to Avoid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <XCircle className="h-6 w-6 text-red-500 mr-3" />
              Les pièges à éviter
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {trapsToAvoid.map((trap, index) => <div key={index} className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
              transitionDelay: `${(index + 4) * 100}ms`
            }}>
                  <Card className="h-full border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-red-700">{trap.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{trap.description}</p>
                    </CardContent>
                  </Card>
                </div>)}
            </div>
          </div>

          {/* Decisive Difference */}
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
          transitionDelay: '800ms'
        }}>
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center text-yellow-600">
                  La différence décisive
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-lg text-gray-700">
                  Développez une relation de confiance avec votre chargé d'affaires. Celui-ci deviendra votre principal soutien et pourra défendre activement votre dossier. Une relation positive facilitera un traitement rapide et garantira un accompagnement durable.
                </p>
                <div className="p-4 bg-white/50 rounded-lg border border-primary/20">
                  <p className="text-xl font-semibold text-yellow-600">Une bonne relation avec votre chargé d'affaires est tout aussi importante que la qualité de votre dossier.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default PracticalAdviceSection;