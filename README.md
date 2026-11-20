# Voyages

Application React de découverte de destinations, connectée à l'API PHP Voyages.

## Stack

React · Redux Toolkit · React Router · React Bootstrap · Leaflet

## Fonctionnalités

- Inscription, connexion, déconnexion, avatar DiceBear
- Profil : modification des informations et du mot de passe, favoris, commentaires
- Destinations : liste, régions, recherche par mot-clé et/ou région, détail avec carte
- Commentaires et favoris pour les utilisateurs connectés
- Formulaire de contact pré-rempli si connecté
- Dashboard admin : contacts, utilisateurs, destinations, commentaires
- Thème clair / sombre

## Lancer le projet

```bash
npm install
cp .env.example .env
npm run dev
```

`VITE_API_URL` dans `.env` pointe vers l'API (par défaut `http://localhost:8000`).
