# Issue Tracker

Une application web pour tracker et gérer les problèmes (issues) d'un projet.

## Description

Issue Tracker est une application full-stack permettant de :
- Créer des issues avec titre et description
- Lister tous les problèmes en cours
- Changer le statut des issues (ouvert, en cours, fermé)
- Supprimer des issues
- Charger les données en temps réel depuis une API

## Architecture

Le projet est organisé en deux parties :

### Frontend
- **Framework** : React + Vite
- **Localisation** : `frontend/`
- **Technologies** : JSX, CSS, Fetch API

### Backend
- **Runtime** : Node.js
- **Localisation** : `backend/`
- **Port** : 3001

## Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm

### Installation du Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application frontend sera disponible sur `http://localhost:5173`

### Installation du Backend

```bash
cd backend
npm install
npm start
```

Le serveur API sera disponible sur `http://localhost:3001`

## Structure du Projet

```
IssueTracker/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── reducer.js
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── IssueForm.jsx
│   │   │   └── IssueList.jsx
│   │   └── assets/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## Fonctionnalités

### Gestion des Issues
- ✅ Créer une nouvelle issue
- ✅ Afficher la liste des issues
- ✅ Modifier le statut d'une issue
- ✅ Supprimer une issue
- ✅ Rafraîchir les données

### États des Issues
- **open** : Problème ouvert
- **in-progress** : En cours de traitement
- **closed** : Problème fermé

## Technologies Utilisées

- **React** : Bibliothèque UI
- **Vite** : Build tool et dev server
- **useReducer** : Gestion d'état
- **Node.js/Express** : Serveur backend
- **Fetch API** : Communication client-serveur

## Développement

### Démarrer les deux serveurs

Terminal 1 (Frontend) :
```bash
cd frontend
npm run dev
```

Terminal 2 (Backend) :
```bash
cd backend
npm start
```

## API Endpoints

- `GET /issues` - Récupérer la liste des issues
- `POST /issues` - Créer une nouvelle issue
- `PATCH /issues/:id` - Mettre à jour une issue
- `DELETE /issues/:id` - Supprimer une issue

## Auteur

Fanfa

## Licence

MIT
