# 🐾 PetLog - Suivi Quotidien de Santé

**PetLog** est un générateur dynamique de documents de suivi pour vos animaux de compagnie. Conçu initialement pour le suivi médical félin, il s'adapte à tous vos compagnons (chiens, chats, lapins...) pour vous aider à organiser les soins quotidiens, l'administration de médicaments et l'alimentation.

## ✨ Fonctionnalités

- **Configuration Personnalisée** : Définissez le nom de l'animal et le mois de suivi.
- **Gestion des Médicaments** : Ajoutez autant de médicaments que nécessaire avec des temporalités personnalisables (Matin, Midi, Soir, Fait).
- **Suivi Auriculaire Avancé** :
  - Option spécifique pour les soins des oreilles.
  - Gestion des côtés : Gauche (G), Droite (D), Alterné, ou Les deux.
  - Affichage automatique des cases à cocher G/D dans le document pour les médicaments alternés.
- **Calendrier Automatique** : Génère une page par jour pour le mois sélectionné, avec calcul automatique des jours de la semaine.
- **Optimisé pour l'Impression** : Système de styles CSS dédié à l'impression (PDF ou papier) avec préservation des couleurs et masquage automatique de l'interface de configuration.

## 🚀 Installation et Lancement

PetLog est construit avec **Next.js** et **Tailwind CSS**.

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- npm, yarn ou pnpm

### Lancement local

1. Clonez le dépôt :
   ```bash
   git clone git@github.com:j343my/PetLog.git
   cd PetLog
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📝 Technologies

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Icons)
- [date-fns](https://date-fns.org/) (Date management)

---

