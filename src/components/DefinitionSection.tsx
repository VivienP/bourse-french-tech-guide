
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const DefinitionSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="definition" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
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
      </div>
    </section>
  );
};

export default DefinitionSection;
