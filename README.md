# Barber Appointment API

Une API RESTful complète pour la **planification de rendez-vous dans un salon de coiffure**, développée avec **Node.js**, **Express.js** et **MongoDB**.

---

## Objectif du projet

Cette API permet aux **clients** de réserver des créneaux horaires auprès de **coiffeurs (stylistes)**, en fonction des services proposés et des disponibilités.  
Elle est destinée à être **consommée par une application mobile** (Flutter, React Native, etc.) actuellement en développement.

---

## Fonctionnalités

### Authentification
- Inscription et connexion sécurisées via JWT
- Accès protégé aux routes pour les utilisateurs connectés

### Gestion des utilisateurs
- CRUD des utilisateurs (clients, stylistes, admins)
- Rôles différenciés : client, stylist, admin

### Services
- CRUD des services proposés (coupe, barbe, coloration, etc.)
- Affectation des services aux stylistes

### Créneaux horaires (Time Slots)
- Création de disponibilités par les stylistes
- Consultation des créneaux libres par les clients

### Rendez-vous (Appointments)
- Réservation de créneaux par les clients
- Suivi des rendez-vous selon le rôle
- Statuts des rendez-vous : `pending`, `confirmed`, `canceled`

---

## Technologies utilisées

- **Backend :** Node.js, Express.js
- **Base de données :** MongoDB avec Mongoose
- **Sécurité :** JWT, bcrypt
- **Outils de développement :** Postman, Nodemon, Dotenv

---

## Structure du projet
```pgsql
barber-appointment-api/
├── config/
│   └── db.js
├── controllers/
│   ├── appointmentController.js
│   ├── authController.js
│   ├── serviceController.js
│   ├── timeSlotController.js
│   └── userController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── Appointment.model.js
│   ├── Service.model.js
│   ├── TimeSlot.model.js
│   └── User.model.js
├── routes/
│   ├── appointmentRoutes.js
│   ├── authRoutes.js
│   ├── serviceRoutes.js
│   ├── timeSlotRoutes.js
│   └── userRoutes.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── index.js
```
---

## Structure des Modèles (Schemas)
### Utilisateur
```json
{
  "name": "String",
  "email": "String (unique)",
  "password": "String",
  "role": "String (enum: 'client', 'stylist', 'admin', default: 'client')",
  "phone": "String",
  "timestamps": true
}
```

### Service
```json
{
  "stylistId": "ObjectId (ref: 'User')",
  "serviceId": "ObjectId (ref: 'Service')",
  "date": "String",
  "startTime": "String",
  "endTime": "String",
  "isBooked": "Boolean (default: false)",
  "timestamps": true
}
```

### Créneau horaire
```json
{
  "stylistId": "ObjectId (ref: 'User')",
  "serviceId": "ObjectId (ref: 'Service')",
  "date": "String",
  "startTime": "String",
  "endTime": "String",
  "isBooked": "Boolean (default: false)",
  "timestamps": true
}
```

### Rendez-vous
```json
{
  "clientId": "ObjectId (ref: 'User')",
  "timeSlotId": "ObjectId (ref: 'TimeSlot')",
  "status": "String (enum: 'pending', 'confirmed', 'canceled', default: 'pending')",
  "notes": "String (default: '')"
}
```

## Installation et démarrage
### Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### Étapes

```bash
# 1. Cloner le projet
git clone https://github.com/yassinekamouss/barber-appointment-api.git
cd barber-appointment-api

# 2. Installer les dépendances
npm install
# ou
yarn install
```

## Configurer .env
Crée un fichier .env à la racine avec le contenu suivant :
```bash
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/barber-app
JWT_SECRET=mon_secret_jwt
JWT_EXPIRE=30d
```

## Lancer le serveur
```bash
# Mode développement (avec Nodemon)
npm run dev

# Mode production
npm start
```

## Tester dans le navigateur
Accéder à : http://localhost:5000/api/services

## Endpoints de l'API
### Authentification
| Méthode | Route                | Description                   |
| ------- | -------------------- | ----------------------------- |
| POST    | `/api/auth/register` | Inscription d'un utilisateur  |
| POST    | `/api/auth/login`    | Connexion                     |

### Utilisateurs
| Méthode | Route            | Description                    |
| ------- | ---------------- | ------------------------------ |
| GET     | `/api/users`     | Liste des utilisateurs (admin) |
| GET     | `/api/users/:id` | Détails d'un utilisateur       |
| PUT     | `/api/users/:id` | Mise à jour d’un utilisateur   |
| DELETE  | `/api/users/:id` | Suppression d’un utilisateur   |

### Services
| Méthode | Route               | Description                  |
| ------- | ------------------- | ---------------------------- |
| GET     | `/api/services`     | Lister tous les services     |
| POST    | `/api/services`     | Ajouter un service (admin)   |
| GET     | `/api/services/:id` | Détail d’un service          |
| PUT     | `/api/services/:id` | Modifier un service (admin)  |
| DELETE  | `/api/services/:id` | Supprimer un service (admin) |

### Créneaux horaires
| Méthode | Route                | Description                          |
| ------- | -------------------- | ------------------------------------ |
| GET     | `/api/timeslots`     | Lister les créneaux disponibles      |
| POST    | `/api/timeslots`     | Créer un créneau (stylist/admin)     |
| DELETE  | `/api/timeslots/:id` | Supprimer un créneau (stylist/admin) |

### Rendez-vous
| Méthode | Route                       | Description                             |
| ------- | --------------------------- | --------------------------------------- |
| GET     | `/api/appointments/:userId` | Lister les rendez-vous d’un utilisateur |
| POST    | `/api/appointments`         | Créer un rendez-vous                    |
| PUT     | `/api/appointments/:id`     | Modifier le statut du rendez-vous       |

## Authentification JWT
Certaines routes nécessitent un token d’authentification :
```bash
Authorization: Bearer <votre_token>
```
Obtenu après appel à /api/auth/login.

## Exemple de requête curl
### Inscription d’un utilisateur
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123", "role": "client"}'
```

## Auteur
Yassine Kamouss