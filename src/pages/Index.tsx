
import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Calendar, Users, Target, Lightbulb, TrendingUp, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FranceMap from '@/components/FranceMap';
import CriteriaGrid from '@/components/CriteriaGrid';
import ProcessTimeline from '@/components/ProcessTimeline';
import ProjectExamples from '@/components/ProjectExamples';
import StatsSection from '@/components/StatsSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['definition', 'criteres', 'depenses', 'financement', 'processus', 'evaluation', 'exemples', 'faq'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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
              {[
                { id: 'definition', label: 'Définition' },
                { id: 'criteres', label: 'Critères' },
                { id: 'processus', label: 'Processus' },
                { id: 'exemples', label: 'Exemples' },
                { id: 'faq', label: 'FAQ' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Button onClick={() => scrollToSection('cta')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Prendre rendez-vous
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bourse French Tech
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Subvention publique non remboursable jusqu'à <span className="text-primary font-semibold">50 000 €</span> pour soutenir 
              la création de startups innovantes à fort potentiel de croissance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('definition')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3"
              >
                Découvrir le dispositif
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('cta')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3"
              >
                Prendre rendez-vous
              </Button>
            </div>

            <StatsSection />
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
            <p className="text-xl mb-6">
              La Bourse French Tech (BFT) est une <strong>subvention publique non remboursable</strong> attribuée par Bpifrance. 
              Elle vise à soutenir la création de startups à fort potentiel d'innovation et de croissance en finançant une 
              étude de faisabilité technico-économique.
            </p>
            
            <p className="mb-6">
              Cette aide couvre les premières dépenses liées à la structuration du projet, au développement de prototypes, 
              à la propriété intellectuelle ou encore à la validation marché.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-8 w-8 text-primary mr-3" />
                    <h3 className="font-semibold text-lg">Montant maximum</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary mb-2">50 000 €</p>
                  <p className="text-sm text-gray-600">Depuis avril 2025</p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Target className="h-8 w-8 text-primary mr-3" />
                    <h3 className="font-semibold text-lg">Taux d'intervention</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary mb-2">Jusqu'à 70%</p>
                  <p className="text-sm text-gray-600">des dépenses éligibles</p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-8 w-8 text-primary mr-3" />
                    <h3 className="font-semibold text-lg">Taux de succès</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary mb-2">~25%</p>
                  <p className="text-sm text-gray-600">des dossiers acceptés</p>
                </CardContent>
              </Card>
            </div>
            
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
          
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Pour déposer un dossier de Bourse French Tech, deux types d'éligibilité sont examinés : 
            celle de l'entreprise et celle du projet.
          </p>

          <CriteriaGrid />

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Régions et accompagnement</h3>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <FranceMap />
              </div>
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
                      À Paris intra-muros, seule l'incubation labellisée par la Ville de Paris donne accès au dispositif PIA.
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
                  {[
                    'Conception et prototypage',
                    'Études de marché ou de faisabilité',
                    'Prestations de conseil ou d\'accompagnement',
                    'Dépôts de brevet',
                    'Formations techniques',
                    'Prestations juridiques'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Frais internes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Rémunérations des membres de l\'équipe projet',
                    'Frais généraux forfaitaires (20% des salaires)',
                    'Frais de déplacement chez les partenaires',
                    'Frais de déplacement chez les utilisateurs',
                    'Frais de déplacement chez les clients'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
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
                      <div className="text-sm text-gray-600">À l'issue du projet</div>
                      <div className="text-xs text-gray-500 mt-1">Sous réserve de bonne utilisation de la 1ère tranche</div>
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
          
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Le dépôt d'un dossier se fait en ligne via la plateforme officielle de Bpifrance : 
            <strong> app.bel.bpifrance.fr</strong>
          </p>

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
            {[
              {
                icon: Users,
                title: "L'équipe fondatrice",
                description: "Un profil expérimenté, multi-entrepreneur ou expert reconnu dans son domaine, est un signal très positif. La capacité à mener le projet et à mobiliser des ressources est déterminante."
              },
              {
                icon: Lightbulb,
                title: "La qualité du projet",
                description: "Son caractère innovant, sa proposition de valeur, son positionnement marché."
              },
              {
                icon: Target,
                title: "La structuration du projet",
                description: "Cohérence des étapes, clarté des livrables, crédibilité du planning, alignement entre objectifs et budget."
              },
              {
                icon: TrendingUp,
                title: "L'innovation vs concurrence",
                description: "Différenciation claire, éléments de rupture ou d'originalité."
              },
              {
                icon: Award,
                title: "L'impact global",
                description: "Bénéfices pour les utilisateurs, impact sociétal ou environnemental, potentiel de création d'emplois ou de valeur durable."
              }
            ].map((criterion, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <criterion.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{criterion.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{criterion.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exemples de projets */}
      <section id="exemples" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Exemples de projets financés
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
            {[
              {
                question: "Faut-il avoir déjà créé l'entreprise ?",
                answer: "Oui, elle doit être immatriculée depuis moins d'un an et avoir une forme juridique commerciale (SAS, SARL, etc.)."
              },
              {
                question: "Peut-on candidater avec 100 € de capital social ?",
                answer: "C'est fortement déconseillé. Bpifrance valorise un engagement financier réel, souvent au moins 5 000 € de capital."
              },
              {
                question: "Quelle différence entre fonds propres et capital social ?",
                answer: "Le capital est l'apport initial. Les fonds propres incluent également les apports en compte courant d'associés et les résultats non distribués."
              },
              {
                question: "L'incubation est-elle obligatoire ?",
                answer: "Oui en Île-de-France. Recommandée ailleurs pour renforcer la crédibilité du dossier."
              },
              {
                question: "La subvention peut-elle être partielle ?",
                answer: "Oui. Certaines dépenses peuvent être écartées par Bpifrance si jugées non éligibles."
              },
              {
                question: "Puis-je candidater en tant qu'auto-entrepreneur ou entreprise individuelle ?",
                answer: "Non, seuls les statuts de société sont admis."
              },
              {
                question: "Est-ce que tous les secteurs sont éligibles ?",
                answer: "Oui. Mais l'innovation doit être clairement démontrée. Les projets numériques sont les plus courants."
              },
              {
                question: "Mon projet doit-il être une innovation de rupture ?",
                answer: "Non. Une innovation d'usage, d'organisation ou de service peut suffire si elle apporte une valeur différenciante."
              },
              {
                question: "Y a-t-il des régions où il est plus facile d'obtenir la BFT ?",
                answer: "Oui. Les grandes métropoles (Paris, Lyon, Marseille…) sont très sollicitées. Les régions moins denses offrent un meilleur taux de réussite."
              },
              {
                question: "Y a-t-il une période idéale pour candidater ?",
                answer: "Il est conseillé d'éviter la fin d'année : certaines antennes régionales épuisent leur enveloppe budgétaire dès le troisième trimestre."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Pourquoi la BFT est stratégique */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Pourquoi la BFT est un levier stratégique
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="text-xl mb-6">
              Au-delà du financement, obtenir la Bourse French Tech permet de créer un lien avec un chargé d'affaires Bpifrance. 
              Ce contact pourra être mobilisé ultérieurement pour accéder à des dispositifs plus ambitieux : prêts d'amorçage, 
              aides Deeptech, ou programmes d'accélération.
            </p>
            
            <p>
              C'est un <strong>signal de confiance</strong> envoyé aux investisseurs et partenaires, et une reconnaissance 
              du sérieux et de l'ambition du projet.
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
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Bénéficiez de notre expertise pour structurer un dossier convaincant, répondre aux attentes de Bpifrance, 
            et maximiser vos chances d'acceptation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3">
              <Calendar className="mr-2 h-5 w-5" />
              Prendre rendez-vous
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3">
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
                <li><a href="#definition" className="hover:text-primary transition-colors">Qu'est-ce que la BFT ?</a></li>
                <li><a href="#criteres" className="hover:text-primary transition-colors">Critères d'éligibilité</a></li>
                <li><a href="#processus" className="hover:text-primary transition-colors">Processus de candidature</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
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
    </div>
  );
};

export default Index;
