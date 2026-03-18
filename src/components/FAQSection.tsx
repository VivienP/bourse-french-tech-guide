import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  const faqData = [
    { question: "Faut-il avoir créé l'entreprise avant de candidater ?", answer: "L'entreprise doit être immatriculée pour débuter les démarches en ligne, cependant vous pouvez prendre contact avec Bpifrance le plus tôt possible, avant que l'entreprise soit créée." },
    { question: "Qu'entend-on par fonds propres ?", answer: "Au sens de Bpifrance, les fonds propres désignent les ressources financières durables qui \"appartiennent\" directement ou indirectement à l'entreprise : capital, réserves, bénéfice, report à nouveau, subvention d'investissement, provisions réglementées… par opposition aux financements externes (provenant de tiers). En création d'entreprise, les fonds propres évoquent l'apport personnel ou le capital social de l'entreprise." },
    { question: "Quelle est la différence entre fonds propres et capital social ?", answer: "Le capital social est la somme initiale apportée par les associés lors de la création de l'entreprise. Les fonds propres englobent le capital social, mais aussi d'autres ressources financières comme les bénéfices non distribués ou les apports supplémentaires." },
    { question: "Quel est le capital social requis pour candidater à la BFT ?", answer: "Le capital social n'est pas soumis à un seuil réglementaire pour la Bourse French Tech, mais il a une importance dans l'analyse du dossier. Un capital social trop faible (par exemple 500 €) peut être perçu comme un manque d'engagement des fondateurs et fragiliser la crédibilité du projet auprès de Bpifrance. Il est généralement recommandé d'avoir un capital social de plusieurs milliers d'euros." },
    { question: "Est-il indispensable d'être accompagné par un incubateur pour obtenir la BFT ?", answer: "En Île-de-France, l'accompagnement par un incubateur labellisé est requis. Ailleurs, il est fortement recommandé, surtout pour les primo-entrepreneurs, car il renforce la crédibilité du dossier." },
    { question: "La BFT peut-elle couvrir des frais déjà engagés ?", answer: "Non, seuls les frais futurs sont éligibles." },
    { question: "Les entrepreneurs individuels peuvent-ils candidater ?", answer: "Non, les personnes physiques, les entreprises individuelles, et les EIRL ne sont pas éligibles." },
    { question: "Tous les secteurs sont-ils éligibles ?", answer: "Oui, à condition que le projet soit innovant et respecte les critères. En 2026, les projets software, notamment en IA, dominent les financements." },
    { question: "Un projet de transfert technologique est-il éligible ?", answer: "Oui, les projets issus de laboratoires sont éligibles s'ils répondent aux critères d'innovation et de potentiel de croissance." },
    { question: "Quel niveau d'innovation est requis ?", answer: "L'innovation peut être technologique, d'usage, de service, de procédé ou organisationnelle. Cependant, elle doit apporter une réelle différenciation et un fort potentiel de croissance. Une simple innovation incrémentale ou une approche originale ne suffit pas : le projet doit démontrer un avantage concurrentiel significatif." },
    { question: "Est-il plus facile d'obtenir la BFT dans certaines régions ?", answer: "Les grandes métropoles (Paris, Lyon, Lille, Marseille, Bordeaux, Grenoble) sont plus compétitives en raison du volume de candidatures. Les antennes régionales moins sollicitées sont généralement plus accessibles. Si cela fait sens pour votre entreprise, immatriculer sa société dans des régions peu sollicitées peut vous permettre d'augmenter significativement vos financements Bpifrance." },
    { question: "Y a-t-il des périodes plus favorables pour candidater ?", answer: "Non, mais les enveloppes budgétaires régionales peuvent s'épuiser en fin d'année (4e trimestre, voire dès le 3e trimestre). Il est conseillé de déposer son dossier le plus tôt possible dans l'année." },
    { question: "Mon entreprise a bientôt un an, est-ce la peine de postuler ?", answer: "L'entreprise doit avoir moins d'un an au dépôt complet du dossier, et non à la date de validation du dossier par le comité." },
    { question: "La BFT est-elle disponible à Paris ?", answer: "Non, à Paris, le Fonds Parisien pour l'Innovation (FPI) – jusqu'à 30 000 €, dont frais d'incubation – remplace les anciens dispositifs (PIA et BFT). Le FPI s'adresse aux startups innovantes à impact, de moins de 3 ans, incubées dans un des 25 incubateurs parisiens agréés. Le processus de candidature est similaire à celui de la BFT." },
    { question: "Quels critères pour la Bourse French Tech de 90 000 € (Émergence) ?", answer: "La Bourse French Tech Émergence (90 000 €) est une subvention destinée aux projets deeptech issus de la recherche académique ou de laboratoires, portés par des entreprises immatriculées depuis moins d'un an (ou porteurs avant création). Elle finance jusqu'à 70 % des dépenses éligibles (faisabilité, brevets, personnel, prestations externes), dans la limite de 90 000 €. Un plan structuré (budget, calendrier, jalons) est requis." },
    { question: "Le processus de candidature pour la BFTE est-il différent de la BFT ?", answer: "La Bourse French Tech Emergence vous sera proposée par votre chargé d'affaire selon son jugement. Vous ne pouvez pas décider de déposer un dossier pour la BFT ou BFTE." },
    { question: "Quels sont les incubateurs labellisés pour bénéficier du Fonds Parisien pour l'Innovation (FPI), l'équivalent de la BFT à Paris ?", answer: "Pour bénéficier du Fonds Parisien pour l'Innovation (FPI), votre projet doit être incubé dans l'un des 25 incubateurs labellisés par la Ville de Paris et Bpifrance. Voici la liste des principaux incubateurs labellisés FPI : 104factory, Agoranov, Bureau du design, de la mode et des métiers d'arts, Incubateur du Conservatoire National des Arts et Métiers, Créatis, Créative Valley, Incubateur de l'université Paris Dauphine, Incubateur parisien de l'EDHEC, L'Escalator, La Ruche, Liberté Living-Lab, MakeSense, Matrice, Paris&Co, Paris Biotech Santé, Pépinière 27, PULSE Montreuil, Incubateur de l'Institut d'Etudes Politiques de Paris, Schoolab, SINGA, Incubateur de Télécom Paris, WACANO, Willa, PC'UP (incubateur de l'ESPCI), Incubateur des Arts et Métiers..." }
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-[1.5rem]">
          <div className="h-1 w-12 rounded-full bg-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</span>
          <div className="h-1 w-12 rounded-full bg-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
          Questions fréquentes sur la BFT
        </h2>
        
        <Accordion type="multiple" className="space-y-3">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-2xl border border-border px-2 shadow-sm">
              <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
