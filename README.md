# 🧑‍🤝‍🧑 Social MERN App

Ce projet est une application de réseau social développée avec le **stack MERN** (MongoDB, Express, React, Node.js).  
Elle permet aux utilisateurs de créer un compte, se connecter, publier des posts, liker, commenter, suivre d'autres utilisateurs, etc.

---

## 🚀 Fonctionnalités principales

- ✅ Authentification (inscription / connexion avec JWT)
- ✅ Création de profil utilisateur (photo de profil, bio, etc.)
- ✅ Ajout et suppression de posts
- ✅ Likes & commentaires
- ✅ Système de follow / unfollow
- ✅ Affichage du fil d'actualité
- ✅ Responsive design

> 🔄 Une version **améliorée avec chat en temps réel (Socket.io)** est en cours de développement.

---

## 🛠️ Technologies utilisées

### 🔹 Frontend (client/)
- **React.js**
- CSS de base (pas encore de framework UI utilisé)
- Axios (requêtes HTTP)
- React Router DOM

### 🔹 Backend (api/)
- **Node.js**
- **Express.js**
- **MongoDB** (avec Mongoose)
- JWT (authentification)
- Multer (upload d’images)
- Dotenv (gestion des variables d'environnement)

---

## 📁 Structure du projet

social_mern/
│
├── client/ # Frontend React
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.js
│
├── api/ # Backend Express
│ ├── models/ # Schémas MongoDB
│ ├── routes/ # Routes API
│ ├── controllers/ # Logique métier (à améliorer)
│ ├── index.js # Point d’entrée du serveur
│ └── .env # Variables d’environnement
│
└── README.md

📌 À venir
💬 Intégration du chat en temps réel avec Socket.io

🔐 Amélioration de la sécurité (Helmet, express-validator, etc.)

🧪 Ajout de tests (Jest / Supertest)

🧱 Refactor vers une architecture plus propre (MVC ou Clean Architecture)

🪪 Ajout de gestion avancée des rôles utilisateurs

🧑 Auteur
Touati Karim
Développeur Web Fullstack MERN | En reconversion professionnelle
📧 touatikarim1985@gmail.com
🔗 GitHub - kimo0000

⚠️ Note
Ce projet a été initialement inspiré d’un tutoriel, mais il est en cours de refonte et personnalisation complète dans le cadre de mon apprentissage du développement fullstack.

---