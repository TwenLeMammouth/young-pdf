# 🧠 MindTracker – Tests psychologiques offline et privés

Bienvenue dans **MindTracker**, une application simple et élégante pour remplir des **questionnaires psychologiques** directement depuis votre navigateur, sans inscription, sans tracking, et sans envoi de données.

---

## ✨ Objectif du projet

Ce projet est né d’un double besoin personnel et technique :

- **Côté personnel** : avoir un outil pratique pour remplir des tests psychologiques de manière régulière, avec un vrai respect de la confidentialité.
- **Côté technique** : progresser en développement fullstack avec Next.js (App Router), TypeScript, Tailwind CSS, gestion multilingue, génération de PDF et accessibilité.

Le projet a été conçu comme une application web statique, sans base de données, 100% **offline-friendly**. Les réponses sont **stockées uniquement en local** (dans `localStorage`), et l’utilisateur peut exporter ses résultats au format PDF.

---

## 🧪 Questionnaires disponibles

| Nom du test           | Description                                                             | Questions | Langues |
|-----------------------|-------------------------------------------------------------------------|-----------|---------|
| SCS - Self Compassion Scale | Mesure l’auto-compassion, l’équilibre émotionnel et la bienveillance envers soi. | 26        | FR / EN / JP |
| Big Five 120          | Test de personnalité complet basé sur le modèle OCEAN (5 traits principaux). | 120       | FR / EN / JP |

### ❌ YSQ – Young Schema Questionnaire

Le projet utilisait initialement une version traduite du **YSQ** (Young Schema Questionnaire), mais ce test est **protégé par des droits** et nécessite une licence d’utilisation. Il a donc été retiré du dépôt public pour respecter les conditions de diffusion.

---

## 🔒 Respect de la vie privée

> 🛑 Aucune donnée personnelle n’est collectée, enregistrée ou transmise.  
> ✅ Vos réponses restent uniquement sur votre appareil.  
> 📄 Vous pouvez exporter un **PDF clair et lisible** avec toutes vos réponses et un résumé intelligent.  
> 🧠 Aucun tracking de comportement ni analytics côté utilisateur (optionnel via Vercel Analytics).

---

## 🧱 Stack technique

- **Next.js 14 App Router**
- **TypeScript**
- **Tailwind CSS**
- **jsPDF** pour la génération de PDF
- **LocalStorage** pour la persistance offline
- **Accessibilité (WAI-ARIA)** prise en compte
- **Internationalisation** (FR, EN, JP)
- **Responsive design** optimisé mobile & desktop
- **Vercel** pour l’hébergement et l’analyse de trafic (anonymisé)

---

## 🌐 Déploiement

Le site est déployé sur Vercel (gratuit). Le code est optimisé pour le **statique** et ne nécessite pas de backend.

---

## 📦 Fonctionnalités principales

- 🎯 Sélection de test
- 🔁 Enregistrement automatique des réponses
- 🔍 Navigation fluide entre les questions
- 📊 Résumé clair et coloré des résultats
- 🖨️ Export PDF complet
- 🌐 Multilingue
- 📱 Responsive & UX douce
- 📢 Partage sur les réseaux sociaux (Twitter, Facebook, LinkedIn)

---

## 👤 À propos

Projet conçu et développé par **TwenLeMammouth**, à la fois comme un projet personnel et un exercice de progression.  
Merci aux ressources libres et aux traducteurs pour les versions FR/JP des questionnaires.

---

## 📝 Licence

Ce projet est open source, mais les **questionnaires officiels** (comme le YSQ) peuvent être soumis à des droits.  
Les versions SCS et Big Five sont fournies à titre **informatif uniquement**, sans prétention de diagnostic professionnel.

---

## 🙏 Remerciements

- Les auteurs des tests originaux (Kristin Neff pour le SCS, Costa & McCrae pour le Big Five)
- Les contributeurs de contenu libre en psychologie
- Tous ceux qui aident à faire avancer l’accessibilité et la transparence numérique

---

## 📬 Contact

Vous pouvez me contacter pour suggestions, bugs ou simplement discuter :  
📧 [vgroslier@gmail.com]  

