# MixAI Backend

MixAI Backend est une application backend construite avec NestJS, permettant d'interfacer avec les API Gemini tout en gérant une base de données pour stocker les utilisateurs et les discussions avec les IA de Gemini. Ce projet a été réalisé dans le cadre de l'unité d'enseignement : "Programmation Web" durant mon cursus d'ingénieur de spécialité Systèmes Embarqués Communicants à l'École Centrale de Nantes.

## Prérequis

- **Node.js** : Version 16 ou supérieure.
- **NestJS CLI** : Installé globalement pour faciliter le développement.
- **Base de données** : PostgreSQL (ou tout autre SGBD supporté par TypeORM).
- **Clé API Gemini** : Nécessaire pour accéder aux services Gemini.

## Installation

1. Clonez le répertoire du projet :
   ```bash
   git clone https://github.com/BNJ02/MixAI_back.git
   cd mixai-backend
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez les migrations pour configurer la base de données :
   ```bash
   npm run migration:run
   ```

## Fonctionnalités

### 1. **Gestion des utilisateurs**
- Enregistrement d'utilisateurs.
- Authentification via JWT.
- Gestion des profils utilisateurs.

### 2. **Discussions avec les IA Gemini**
- Envoi de messages aux IA via les API Gemini.
- Stockage des discussions dans la base de données.
- Récupération de l'historique des conversations par utilisateur.

### 3. **APIs REST**
#### Endpoints principaux :
- **/users - POST** : Créé un compte utilisateur
- **/users - GET** : Récupère tous les utilisateurs
- **/users/profile - GET** : Récupère le profile de l'utilisateur
- **/users/update - PATCH** : Modifie le profile d'un utilisateur
- **/gemini - POST** : Obtenir une réponse à un prompt sans contexte
- **/discussions - POST** : Créer une discussion
- **/discussions - PUT** : Continuer une discussion directement avec le modèle d'IA sélectionné (avec tout le contexte de la discussion pris en compte par l'IA)
- **/discussions/all - GET** : Récupérer toutes les discussions pour un utilisateur
- **/discussions/delete - POST** : Supprimer une discussion

### 4. **Base de données**
- **Users** :
  - ID, prenom, nom, email, mot de passe hashé et la clef API Gemini.
- **Discussions** :
  - ID, user (relation), historique.

## Lancer le projet

### En mode développement

```bash
npm run start:dev
```

L'application sera disponible sur `http://localhost:3000`.

### En mode production

1. Construisez l'application :
   ```bash
   npm run build
   ```

2. Lancez l'application :
   ```bash
   npm run start:prod
   ```

## Structure du projet

```
+---src
|   |   app.controller.spec.ts
|   |   app.controller.ts
|   |   app.module.ts
|   |   app.service.ts
|   |   main.ts
|   |   
|   +---auth
|   |       auth.controller.ts
|   |       auth.module.ts
|   |       auth.service.ts
|   |       
|   +---decorators
|   |       user.decorator.ts
|   |       
|   +---discussion
|   |       discussion.entity.ts
|   |       discussions.controller.ts
|   |       discussions.module.ts
|   |       discussions.service.ts
|   |       
|   +---dto
|   |       discussion.dto.ts
|   |       prompt-response.dto.ts
|   |       prompt.dto.ts
|   |       user.dto.ts
|   |       
|   +---gemini
|   |       gemini.controller.ts
|   |       gemini.module.ts
|   |       gemini.service.ts
|   |       
|   +---mappers
|   |       user.mapper.ts
|   |       
|   +---user
|           user.entity.ts
|           users.controller.ts
|           users.module.ts
|           users.service.ts
```

## Contributions

Les contributions sont les bienvenues !

1. Forkez le projet.
2. Créez une nouvelle branche :
   ```bash
   git checkout -b feature/your-feature
   ```
3. Faites vos modifications et validez-les :
   ```bash
   git commit -m "Add your feature"
   ```
4. Poussez les modifications :
   ```bash
   git push origin feature/your-feature
   ```
5. Créez une pull request.