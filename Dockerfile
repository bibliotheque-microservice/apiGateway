# Utiliser une image Node.js légère
FROM node:16-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 8080

# Démarrer l'application
CMD ["npm", "start"]
