
import React from 'react';

const BenefitsSection = () => {
  return (
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
  );
};

export default BenefitsSection;
