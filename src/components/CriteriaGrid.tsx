import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Lightbulb, Calendar, CheckCircle, X } from 'lucide-react';

const CriteriaGrid = () => {
  const companyCriteria = [
    { icon: Building, title: 'Statut juridique', requirement: 'Société commerciale (SAS, SASU, SARL, EURL…)', description: "Les entreprises individuelles et auto-entrepreneurs sont exclus", status: 'required' },
    { icon: Calendar, title: "Âge de l'entreprise", requirement: '< 1 an', description: "La société doit avoir été créée il y a moins d'un an", status: 'required' },
    { icon: CheckCircle, title: 'Fonds propres', requirement: '20-30k€', description: 'Parfois possible 15K€ en région.', status: 'required' }
  ];

  const projectCriteria = [
    { icon: Lightbulb, title: "Type d'innovation", requirement: 'Innovation démontrée', description: "Technologique, d'usage, de procédé ou organisationnelle", status: 'required' },
    { icon: Building, title: "Effort de développement", requirement: 'Complexité du projet', description: 'Le projet doit nécessiter une phase de maturation technique importante.', status: 'required' },
    { icon: Calendar, title: 'Durée du projet', requirement: '≤ 24 mois', description: 'Phase de faisabilité financée limitée à 24 mois', status: 'required' }
  ];

  const exclusions = [
    'les personnes physiques, les entreprises individuelles et EIRL',
    'les laboratoires publics et les établissements publics',
    "les associations (sauf si l'association dispose d'une activité économique réelle)",
    'les sociétés civiles immobilières (SCI), les activités de promotion immobilière et marchands de biens',
    "les activités d'intermédiation financière, hors Fintech",
    'les entreprises en procédure collective ouverte',
    'les entreprises qui ne sont pas à jour de leurs obligations fiscales et sociales'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'required': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'flexible': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'required': return 'Obligatoire';
      case 'flexible': return 'Flexible';
      default: return 'Info';
    }
  };

  const CriteriaCard = ({ title, criteria, icon: Icon }: { title: string; criteria: typeof companyCriteria; icon: typeof Building }) => (
    <Card className="h-full border-t-4 border-t-primary rounded-2xl shadow-warm hover:shadow-warm-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl mb-2">
          <Icon className="h-6 w-6 text-primary mr-3" />
          {title}
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          {criteria === companyCriteria 
            ? "Conditions relatives à la structure juridique et financière de votre société."
            : "Conditions relatives au caractère innovant et au potentiel de votre projet."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {criteria.map((criterion, index) => (
          <div key={index} className="group p-4 rounded-xl bg-accent hover:bg-accent/80 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <criterion.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <h4 className="font-semibold text-foreground">{criterion.title}</h4>
              </div>
              <Badge variant="outline" className={`text-xs font-medium ${getStatusColor(criterion.status)}`}>
                {getStatusLabel(criterion.status)}
              </Badge>
            </div>
            <div className="ml-8">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-secondary/10 font-semibold text-sm rounded-full text-secondary">
                  {criterion.requirement}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{criterion.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <CriteriaCard title="Critères Entreprise" criteria={companyCriteria} icon={Building} />
        <CriteriaCard title="Critères Projet" criteria={projectCriteria} icon={Lightbulb} />
      </div>

      <Card className="border-destructive/20 bg-destructive/5 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-xl text-destructive">
            <X className="h-6 w-6 text-destructive mr-3" />
            Exclusions
          </CardTitle>
          <CardDescription className="text-destructive/80">
            Les types d'entreprises et d'activités suivants ne sont pas éligibles à la Bourse French Tech.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {exclusions.map((exclusion, index) => (
              <li key={index} className="flex items-start">
                <X className="h-4 w-4 text-destructive mr-3 mt-1 flex-shrink-0" />
                <span className="text-destructive/90 text-sm leading-relaxed">{exclusion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CriteriaGrid;
