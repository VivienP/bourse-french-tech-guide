
import React from 'react';
import { Info, AlertTriangle } from 'lucide-react';

const DefinitionSection = () => {
  return (
    <section id="definition" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-1 w-12 rounded-full bg-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Présentation</span>
          <div className="h-1 w-12 rounded-full bg-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
          Qu'est-ce que la Bourse French Tech ?
        </h2>
        
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
            <p className="mb-6 text-base">
              La <strong className="text-foreground">Bourse French Tech</strong> (BFT) est une subvention publique proposée par <strong className="text-foreground">Bpifrance</strong>, conçue pour accompagner les <strong className="text-foreground">entreprises innovantes</strong> de moins d'un an dans leur phase d'amorçage. Elle finance les premières dépenses liées à la maturation et à la validation technico-économique des projets, comme la R&D, les études de faisabilité, le prototypage ou la protection de la propriété intellectuelle.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/15 flex items-start gap-3 md:max-w-xs">
            <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-foreground text-base">
              <strong>Important :</strong> La majorité des subventions accordées se situent généralement en dessous de <strong>30 000 €</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>);

};

export default DefinitionSection;