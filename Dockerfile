# Utiliser une image nginx légère
FROM nginx:alpine

# Copier tous les fichiers du portfolio dans le répertoire de nginx
COPY . /usr/share/nginx/html/

# Exposer le port 80
EXPOSE 80

# Nginx démarre automatiquement
CMD ["nginx", "-g", "daemon off;"]

