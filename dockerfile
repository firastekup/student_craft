# Utiliser l'image de base Node.js version 20
FROM node:20.17.0

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Compiler le projet TypeScript
RUN npm run build

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Commande à exécuter lors du démarrage du conteneur
CMD ["npm", "run", "start:prod"]
