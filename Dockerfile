# Usa la imagen oficial de Node.js como base
FROM node:20.11.0

# Define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Compila el código TypeScript
# RUN npm run build

# Expone el puerto que usa la app
EXPOSE 9090

# Define el comando para ejecutar la app
CMD ["npm", "run","server"]
