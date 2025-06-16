import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Calendar, Users, Target, Lightbulb, TrendingUp, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import FranceMap from '@/components/FranceMap';
import CriteriaGrid from '@/components/CriteriaGrid';
import ProcessTimeline from '@/components/ProcessTimeline';
import ProjectExamples from '@/components/ProjectExamples';
import StatsSection from '@/components/StatsSection';
const faqData = [{
  question: "Faut-il avoir créé l'entreprise avant de candidater ?",
  answer: "Oui, désormais l'entreprise doit être immatriculée pour débuter les démarches en ligne (moins d'un an d'existence)."
}, {
  question: "Qu'entend-on par fonds propres ?",
  answer: "Au sens de Bpifrance, les fonds propres désignent les ressources financières durables qui \"appartiennent\" directement ou indirectement à l'entreprise : capital, réserves, bénéfice, report à nouveau, subvention d'investissement, provisions réglementées… par opposition aux financements externes (provenant de tiers). En création d'entreprise, les fonds propres évoquent l'apport personnel ou le capital social de l'entreprise."
}, {
  question: "Quelle est la différence entre fonds propres et capital social ?",
  answer: "Le capital social est la somme initiale apportée par les associés lors de la création de l'entreprise. Les fonds propres englobent le capital social, mais aussi d'autres ressources financières comme les bénéfices non distribués ou les apports supplémentaires."
}, {
  question: "Quel est le capital social requis pour candidater à la BFT ?",
  answer: "Le capital social n'est pas soumis à un seuil réglementaire pour la Bourse French Tech, mais il a une importance dans l'analyse du dossier. Un capital social trop faible (par exemple 500 €) peut être perçu comme un manque d'engagement des fondateurs et fragiliser la crédibilité du projet auprès de Bpifrance. Il est généralement recommandé d'avoir un capital social de 5 000 €"
}, {
  question: "L'incubation est-elle obligatoire ?",
  answer: "En Île-de-France, l'accompagnement par un incubateur labellisé est requis. Ailleurs, il est fortement recommandé, surtout pour les primo-entrepreneurs, car il renforce la crédibilité du dossier."
}, {
  question: "La BFT peut-elle couvrir des frais déjà engagés ?",
  answer: "Non, seuls les frais futurs sont éligibles."
}, {
  question: "Les entrepreneurs individuels peuvent-ils candidater ?",
  answer: "Non, les entreprises individuelles, EIRL ou personnes physiques ne sont pas éligibles."
}, {
  question: "Tous les secteurs sont-ils éligibles ?",
  answer: "Oui, à condition que le projet soit innovant et respecte les critères. En 2025, les projets software, notamment en IA, dominent les financements."
}, {
  question: "Un projet de transfert technologique est-il éligible ?",
  answer: "Oui, les projets issus de laboratoires sont éligibles s'ils répondent aux critères d'innovation et de potentiel de croissance."
}, {
  question: "Quel niveau d'innovation est requis ?",
  answer: "L'innovation peut être technologique, d'usage, de service, de procédé ou organisationnelle. Une innovation incrémentale ou une approche originale suffit, à condition qu'elle présente un fort potentiel de croissance."
}, {
  question: "Est-il plus facile d'obtenir la BFT dans certaines régions ?",
  answer: "Les grandes métropoles (Paris, Lyon, Lille, Bordeaux, Grenoble, Marseille) sont plus compétitives en raison du volume de candidatures. Les antennes régionales moins sollicitées sont généralement plus accessibles. Si cela fait sens pour votre entreprise, immatriculer sa société dans des régions peut sollicitées peut vous permettre d'augmenter significativement vos financements Bpifrance."
}, {
  question: "Y a-t-il des périodes plus favorables pour candidater ?",
  answer: "Non, mais les enveloppes budgétaires régionales peuvent s'épuiser en fin d'année (4e trimestre, voire dès le 3e trimestre). Il est conseillé de déposer son dossier le plus tôt possible dans l'année."
}, {
  question: "Mon entreprise a bientôt un an, est-ce la peine de postuler ?",
  answer: "L'entreprise doit avoir moins d'un an au dépôt complet du dossier, et non à la date de validation du dossier par le comité."
}, {
  question: "La BFT est-elle disponible à Paris ?",
  answer: "Non. À Paris, le Fonds Parisien pour l'Innovation (FPI) – jusqu'à 30 000 €, dont frais d'incubation – remplace les anciens dispositifs (PIA et BFT) et s'adresse aux startups innovantes à impact, de moins de 3 ans, incubées à Paris."
}, {
  question: "Quels critères pour la Bourse French Tech de 90 000 € (Émergence) ?",
  answer: " La Bourse French Tech Émergence (90 000 €) est une subvention destinée aux projets deeptech issus de la recherche académique ou de laboratoires, portés par des entreprises immatriculées depuis moins d'un an (ou porteurs avant création). Elle finance jusqu'à 70 % des dépenses éligibles (faisabilité, brevets, personnel, prestations externes), dans la limite de 90 000 €. Un plan structuré (budget, calendrier, jalons) est requis."
}, {
  question: "Quels sont les incubateurs labellisés pour bénéficier du Fonds Parisien pour l'Innovation (FPI), l'équivalent de la BFT à Paris ?",
  answer: "Pour bénéficier du Fonds Parisien pour l'Innovation (FPI), votre projet doit être incubé dans l'un des 25 incubateurs labellisés par la Ville de Paris et Bpifrance. Voici la liste des principaux incubateurs labellisés FPI : 104factory, Agoranov, Bureau du design, de la mode et des métiers d'arts, Incubateur du Conservatoire National des Arts et Métiers, Créatis, Créative Valley, Incubateur de l'université Paris Dauphine, Incubateur parisien de l'EDHEC, L'Escalator, La Ruche, Liberté Living-Lab, MakeSense, Matrice, Paris&Co, Paris Biotech Santé, Pépinière 27, PULSE Montreuil, Incubateur de l'Institut d'Etudes Politiques de Paris, Schoolab, SINGA, Incubateur de Télécom Paris, WACANO, Willa, PC'UP (incubateur de l'ESPCI), Incubateur des Arts et Métiers..."
}];
const Index = () => {
  const [activeSection, setActiveSection] = useState('');
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['definition', 'criteres', 'depenses', 'financement', 'processus', 'evaluation', 'exemples', 'faq'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const {
            offsetTop,
            offsetHeight
          } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gray-900">Bourse French Tech</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {[{
              id: 'definition',
              label: 'Définition'
            }, {
              id: 'criteres',
              label: 'Critères'
            }, {
              id: 'processus',
              label: 'Processus'
            }, {
              id: 'exemples',
              label: 'Exemples'
            }, {
              id: 'faq',
              label: 'FAQ'
            }].map(item => <button key={item.id} onClick={() => scrollToSection(item.id)} className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${activeSection === item.id ? 'text-primary' : 'text-gray-600'}`}>
                  {item.label}
                </button>)}
            </div>

            <Button onClick={() => scrollToSection('cta')} className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200">
              Prendre rendez-vous
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 sm:pt-44 md:pt-48 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center" style={{
      minHeight: '75vh'
    }}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 transition-opacity duration-500">
              Bourse French Tech
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed transition-opacity duration-500 delay-100">
              Subvention publique non remboursable jusqu'à <span className="text-primary font-semibold">50 000 €</span> pour soutenir 
              la création d'entreprises innovantes à fort potentiel de croissance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" onClick={() => scrollToSection('definition')} className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3 transition-all duration-200">
                Découvrir le dispositif
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('cta')} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3 transition-all duration-200">
                Prendre rendez-vous
              </Button>
            </div>

            <div className="animate-fade-in transition-opacity duration-500 delay-200">
              <StatsSection />
            </div>
          </div>
        </div>
      </section>

      {/* Qu'est-ce que la Bourse French Tech */}
      <section id="definition" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Qu'est-ce que la Bourse French Tech ?
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-6 text-base">
              La <strong>Bourse French Tech</strong> (BFT) est une subvention publique gérée par <strong>Bpifrance</strong>, conçue pour accompagner les <strong>jeunes entreprises innovantes</strong> dans leur phase d'amorçage. Elle finance les premières dépenses liées à la maturation et à la validation technico-économique des projets, comme la R&D, les études de faisabilité, le prototypage ou la protection de la propriété intellectuelle. C'est un dispositif clé pour les startups technologiques en France, offrant non seulement un soutien financier mais aussi une porte d'entrée vers l'écosystème Bpifrance.
            </p>
            
            
            
            <p>
              <strong>Important :</strong> Bien que le montant maximum théorique puisse atteindre 50 000 €, 
              la majorité des subventions accordées se situent généralement en dessous de 30 000 €.
            </p>
          </div>
        </div>
      </section>

      {/* Critères d'éligibilité */}
      <section id="criteres" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Critères d'éligibilité
          </h2>
          
          <p className="text-xl text-gray-600 text-center mb-12">
            Pour déposer un dossier de Bourse French Tech, deux types d'éligibilité sont examinés : 
            celle de l'entreprise et celle du projet.
          </p>

          <CriteriaGrid />

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Régions et accompagnement</h3>
            <div className="flex flex-col gap-12">
              <FranceMap />
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-2" />
                      Île-de-France
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Accompagnement par un incubateur référencé ou une structure labellisée <strong>obligatoire</strong>.</p>
                    <p className="mt-2 text-sm text-gray-600">
                      À Paris intra-muros (75), seule les incubateurs labellisés donne accès au dispositif Fonds Parisien pour l'Innovation (FPI).
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      Autres régions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Accompagnement <strong>fortement recommandé</strong> mais non imposé.</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Renforce significativement la crédibilité du dossier.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dépenses éligibles */}
      <section id="depenses" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Dépenses éligibles
          </h2>
          
          <p className="text-xl text-gray-600 text-center mb-12">
            Les dépenses financées par la BFT se répartissent en frais externes et frais internes.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Frais externes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {['Conception et prototypage', 'Études de marché ou de faisabilité', 'Prestations de conseil ou d\'accompagnement', 'Dépôts de brevet', 'Formations techniques', 'Prestations juridiques'].map((item, index) => <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Frais internes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {['Rémunérations des membres de l\'équipe projet', 'Frais généraux forfaitaires (20% des salaires)', 'Frais de déplacement chez les partenaires', 'Frais de déplacement chez les utilisateurs', 'Frais de déplacement chez les clients'].map((item, index) => <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-red-400 mr-2" />
              <h4 className="font-semibold text-red-800">Important</h4>
            </div>
            <p className="mt-2 text-red-700">
              Les dépenses déjà engagées avant le dépôt du dossier ne peuvent pas être couvertes.
            </p>
          </div>
        </div>
      </section>

      {/* Financement et tranches */}
      <section id="financement" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Financement et tranches de versement
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Conditions de financement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Plafond maximum</span>
                  <span className="text-primary font-bold">50 000 €</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Taux d'intervention</span>
                  <span className="text-primary font-bold">Jusqu'à 70%</span>
                </div>
                <p className="text-sm text-gray-600">
                  L'entreprise doit avancer les fonds propres nécessaires à l'équilibre financier du projet.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Versement en 2 tranches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <div className="font-medium">Première tranche : 70%</div>
                      <div className="text-sm text-gray-600">À la signature de la convention</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <div className="font-medium">Seconde tranche : 30%</div>
                      <div className="text-sm text-gray-600">Sous réserve de bonne utilisation de la 1ère tranche</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Processus de candidature */}
      <section id="processus" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Processus de candidature
          </h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dépôt du dossier</h3>
              <p className="mb-6">
                L'ensemble du processus de candidature est digitalisé. La demande de financement s'effectue en ligne via la plateforme de Bpifrance <strong>app.bel.bpifrance.fr</strong>.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contenu du dossier</h3>
              <p className="mb-4">Le dossier pour la BFT se compose de :</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Checkbox id="pitch-deck" />
                  <label htmlFor="pitch-deck" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Un pitch deck
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="business-plan" />
                  <label htmlFor="business-plan" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Un business plan
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="tresorerie" />
                  <label htmlFor="tresorerie" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Un plan de trésorerie sur 24 mois
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="fiche-presentation" />
                  <label htmlFor="fiche-presentation" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Une fiche de présentation de l'entreprise, du projet et des porteurs (6 pages)
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="annexe-financiere" />
                  <label htmlFor="annexe-financiere" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    L'annexe financière détaillant les dépenses prévisionnelles
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="table-capitalisation" />
                  <label htmlFor="table-capitalisation" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    La table de capitalisation
                  </label>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Étude du dossier en 5 phases :</h3>
              <ol className="list-decimal list-inside space-y-2 mb-8">
                <li><strong>Ouverture d'une demande</strong> et transmission du pitch deck et du business plan</li>
                <li><strong>Entretien téléphonique</strong> avec le porteur de projet pour valider le respect des critères et préqualifier l'aspect innovant du projet</li>
                <li><strong>Transmission des éléments complémentaires</strong>, étudiés par le chargé d'affaire et éventuellement par un pré-comité</li>
                <li>Si validé, <strong>instruction en comité</strong></li>
                <li><strong>Réponse officielle</strong> du comité bpifrance et réception des fonds en quelques semaines</li>
              </ol>
            </div>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      {/* Critères d'évaluation */}
      <section id="evaluation" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Critères d'évaluation
          </h2>
          
          <p className="text-xl text-gray-600 text-center mb-12">
            Le comité Bpifrance évalue chaque projet selon cinq axes principaux
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
            icon: Users,
            title: "L'équipe fondatrice",
            description: "Un profil expérimenté, multi-entrepreneur ou expert reconnu dans son domaine, est un signal très positif. La capacité à mener le projet et à mobiliser des ressources est déterminante."
          }, {
            icon: Lightbulb,
            title: "La qualité du projet",
            description: "Son caractère innovant, sa proposition de valeur, son positionnement marché."
          }, {
            icon: Target,
            title: "La structuration du projet",
            description: "Cohérence des étapes, clarté des livrables, crédibilité du planning, alignement entre objectifs et budget."
          }, {
            icon: TrendingUp,
            title: "L'innovation vs concurrence",
            description: "Différenciation claire, éléments de rupture ou d'originalité."
          }, {
            icon: Award,
            title: "L'impact global",
            description: "Bénéfices pour les utilisateurs, impact sociétal ou environnemental, potentiel de création d'emplois ou de valeur durable."
          }].map((criterion, index) => <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <criterion.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{criterion.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{criterion.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Exemples de projets */}
      <section id="exemples" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Exemples de projets éligibles en 2025
          </h2>
          
          <ProjectExamples />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Questions fréquentes sur la BFT
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </section>

      {/* Pourquoi la BFT est stratégique */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Avantages au-delà du financement court-terme
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-6 text-lg">
              Obtenir la BFT permet d'établir un premier contact avec Bpifrance. En cas de succès du projet et de croissance de l'entreprise, ce lien facilite l'accès à d'autres financements, comme des prêts RDI (Recherche, Développement, Innovation) ou des dispositifs plus ambitieux.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Vous envisagez de candidater à la Bourse French Tech ?
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg">
            Bénéficiez de notre expertise pour structurer un dossier convaincant, répondre aux attentes de Bpifrance, 
            et maximiser vos chances d'acceptation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3 transition-all duration-200">
              <Calendar className="mr-2 h-5 w-5" />
              Prendre rendez-vous
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3 transition-all duration-200">
              <Phone className="mr-2 h-5 w-5" />
              Nous contacter
            </Button>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>contact@boursefrenchtech.fr</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>01 23 45 67 89</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Bourse French Tech</span>
              </div>
              <p className="text-gray-300 mb-4">
                Votre guide complet pour obtenir la subvention Bourse French Tech et développer votre startup innovante.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#definition" className="hover:text-primary transition-colors duration-200">Qu'est-ce que la BFT ?</a>
                </li>
                <li>
                  <a href="#criteres" className="hover:text-primary transition-colors duration-200">Critères d'éligibilté</a>
                </li>
                <li>
                  <a href="#processus" className="hover:text-primary transition-colors duration-200">Processus de candidature</a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-primary transition-colors duration-200">FAQ</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>boursefrenchtech.fr</p>
                <p>contact@boursefrenchtech.fr</p>
                <p>01 23 45 67 89</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bourse French Tech. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;