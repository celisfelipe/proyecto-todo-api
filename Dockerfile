# Dockerfile para Node.js
FROM node:22-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install 

# Copiar el código fuente
COPY src/ ./src/

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
