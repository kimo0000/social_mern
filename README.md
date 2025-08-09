# 🌐 Social App – MERN Chat en temps réel (Socket.io)

Ce projet est une application sociale full-stack développée avec la stack **MERN** (MongoDB, Express.js, React.js, Node.js), intégrant un système de **chat en temps réel** grâce à **Socket.io**.

---

## 🚀 Fonctionnalités

- ✅ Authentification des utilisateurs (prévue)
- 💬 Chat global en temps réel (Socket.io)
- 📩 Envoi & réception instantanée des messages
- 🗃️ Stockage des messages dans MongoDB
- 🎨 Interface utilisateur moderne avec React
- 🧠 État dynamique via `useState` et `useEffect`

---

## 🧰 Technologies utilisées

- **Frontend** : React.js, socket.io-client, CSS
- **Backend** : Node.js, Express.js, Socket.io
- **Base de données** : MongoDB (via Mongoose)
- **Outils** : Git, npm, VS Code

---

## 📁 Structure du projet

social_mern/
│
├── client/ # Frontend React
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js
│ └── ...
│
├── server/ # Backend Node/Express
│ ├── models/
│ ├── routes/
│ ├── socket.js # Configuration de Socket.io
│ └── index.js
│
└── README.md

yaml
Copier
Modifier

---

## ⚙️ Installation et lancement local

1. **Cloner le dépôt :**
```bash
git clone https://github.com/kimo0000/social_mern.git
cd social_mern
git checkout branch-1-from-social-app
Lancer le serveur Express :

bash
Copier
Modifier
cd server
npm install
npm run start
Lancer l’application React :

bash
Copier
Modifier
cd ../client
npm install
npm start
📌 Fonctionnement du chat temps réel
Lorsqu’un utilisateur envoie un message, le socket le transmet au serveur via socket.emit(...).

Le serveur rediffuse (broadcast) le message à tous les autres utilisateurs connectés.

Les sockets sont gérés dans un fichier socket.js côté backend.

Le chat s’actualise sans rechargement grâce à useEffect dans React.

📈 Améliorations futures (To-Do)
🔐 Authentification avec JWT

🧑‍🤝‍🧑 Rooms privées ou groupes

⌨️ Indicateur “en train d’écrire”

✅ Messages lus / non lus

📆 Affichage d’horodatage (timestamp)

🙋‍♂️ Auteur
Touati Karim
Développeur Fullstack MERN en reconversion professionnelle
📧 touatikarim1985@gmail.com
🌐 GitHub: kimo0000
🧠 Codewars: ka_rim

⭐️ Si ce projet t’a été utile
N’hésite pas à laisser une ⭐ sur le dépôt !

*DOMAIN SOCIAL APP BACKEND:
lien: https://social-mern-back.onrender.com/
*DOMAIN SOCIAL APP FRONTEND:
lien: https://social-mern-front.vercel.app/