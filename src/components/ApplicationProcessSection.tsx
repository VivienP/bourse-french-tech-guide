import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import ProcessTimeline from "@/components/ProcessTimeline";

const ApplicationProcessSection = () => {
  return (
    <section id="processus" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-[1rem]">
          <div className="h-1 w-12 rounded-full bg-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Candidature</span>
          <div className="h-1 w-12 rounded-full bg-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Processus de candidature</h2>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
            <h3 className="text-xl font-bold text-foreground mb-4">Dépôt du dossier</h3>
            <p className="mb-6">
              L'ensemble du processus de candidature est digitalisé. La demande de financement s'effectue en ligne via
              la plateforme de Bpifrance <a href="https://app.bel.bpifrance.fr" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/40 underline-offset-2 hover:decoration-primary transition-colors">app.bel.bpifrance.fr</a>.
            </p>

            <h3 className="text-xl font-bold text-foreground mb-4">Contenu du dossier</h3>
            <p className="mb-4 text-muted-foreground">Le dossier pour la BFT se compose de :</p>
            <div className="space-y-3 mb-8 p-6 rounded-2xl bg-accent border border-border">
              {[
                { id: "pitch-deck", label: "Un pitch deck" },
                { id: "business-plan", label: "Un business plan" },
                { id: "tresorerie", label: "Un plan de trésorerie sur 24 mois" },
                {
                  id: "fiche-presentation",
                  label: "Une fiche de présentation de l'entreprise, du projet et des porteurs (6 pages)",
                },
                { id: "annexe-financiere", label: "L'annexe financière détaillant les dépenses prévisionnelles" },
                { id: "table-capitalisation", label: "La table de capitalisation" },
              ].map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Checkbox id={item.id} />
                  <label
                    htmlFor={item.id}
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">Étude du dossier en 5 phases :</h3>
            <ol className="list-decimal list-inside space-y-2 mb-8 text-muted-foreground">
              <li>
                <strong className="text-foreground">Ouverture d'une demande</strong> et transmission du pitch deck et du
                business plan
              </li>
              <li>
                <strong className="text-foreground">Entretien téléphonique</strong> avec le porteur de projet pour
                valider le respect des critères et préqualifier l'aspect innovant du projet
              </li>
              <li>
                <strong className="text-foreground">Transmission des éléments complémentaires</strong>, étudiés par le
                chargé d'affaire et éventuellement par un pré-comité
              </li>
              <li>
                Si validé, <strong className="text-foreground">instruction en comité</strong>
              </li>
              <li>
                <strong className="text-foreground">Réponse officielle</strong> du comité bpifrance et réception des
                fonds en quelques semaines
              </li>
            </ol>
          </div>
        </div>

        <ProcessTimeline />
      </div>
    </section>
  );
};

export default ApplicationProcessSection;
