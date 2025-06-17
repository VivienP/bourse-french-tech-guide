
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BenefitsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Importance de la BFT dans le parcours de financement avec Bpifrance
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="mb-6 text-lg">
              La BFT et la BFTE sont des dispositifs clés pour les startups innovantes en phase d'amorçage. Elles permettent non seulement de financer les premières étapes du développement technologique, mais aussi d'établir un premier lien privilégié avec Bpifrance. Ce contact facilite l'accès futur à d'autres solutions de financement adaptées à la croissance de l'entreprise, telles que les prêts RDI, les avances remboursables, ou encore des dispositifs d'accompagnement et d'investissement plus conséquents. Ainsi, obtenir une BFT ou une BFTE constitue souvent un tremplin important pour structurer le développement et sécuriser les futures levées de fonds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
