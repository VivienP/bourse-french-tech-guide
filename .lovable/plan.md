

## Analyse

La section `FinancingSection.tsx` couvre déjà partiellement ces informations :
- **Versement en 2 tranches** : present (70% / 30%)
- **1re tranche à la signature** : present
- **Solde sur justificatifs** : partiellement present ("Sous réserve de bonne utilisation") mais manque la mention des justificatifs de dépenses acquittées
- **Sans sûreté ni caution** : absent

## Plan

Enrichir la section `FinancingSection.tsx` existante avec les précisions manquantes :

1. **Ajouter un bandeau "Sans sûreté ni caution"** au-dessus des deux cartes, sous forme d'un encart visuel avec une icone `ShieldCheck` -- un élément distinctif et rassurant, bien visible (fond accent, texte bold).

2. **Mettre à jour la description de la 2e tranche** : remplacer "Sous réserve de bonne utilisation de la 1ère tranche" par "Sur présentation des justificatifs des dépenses acquittées".

3. **Supprimer les ombres jaunes restantes** (`shadow-warm`, `shadow-warm-lg`) des cartes de cette section pour cohérence avec le nettoyage visuel déjà effectué.

### Modifications fichier `src/components/FinancingSection.tsx` :
- Importer `ShieldCheck` de lucide-react
- Ajouter un encart avant la grille : icone + texte "Accordée sans sûreté ni caution personnelle"
- Ligne 50 : changer le texte de la 2e tranche
- Lignes 17 et 34 : retirer `shadow-warm hover:shadow-warm-lg`

