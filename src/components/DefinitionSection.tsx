import React from 'react';

const DefinitionSection = () => {
  return (
    <section id="definition" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-1 w-12 rounded-full bg-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Présentation</span>
          <div className="h-1 w-12 rounded-full bg-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          Qu'est-ce que la Bourse French Tech ?
        </h2>

        <p className="max-w-3xl mx-auto text-base leading-relaxed text-muted-foreground text-center">
          La <strong className="text-foreground font-semibold">Bourse French Tech</strong> (BFT) est une subvention publique proposée par <strong className="text-foreground font-semibold">Bpifrance</strong>, conçue pour accompagner les <strong className="text-foreground font-semibold">entreprises innovantes</strong> de moins d'un an dans leur phase d'amorçage. Elle finance les premières dépenses liées à la maturation et à la validation technico-économique des projets, comme la R&D, les études de faisabilité, le prototypage ou la protection de la propriété intellectuelle.
        </p>
      </div>
    </section>
  );
};

export default DefinitionSection;
