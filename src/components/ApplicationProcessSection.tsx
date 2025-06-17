
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import ProcessTimeline from '@/components/ProcessTimeline';

const ApplicationProcessSection = () => {
  return (
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
  );
};

export default ApplicationProcessSection;
