# Usa uma imagem oficial do Node, versão leve
FROM node:22-alpine

# Define a pasta de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./

# Instala as dependências do Node
RUN npm install

# Copia o resto do código do frontend
COPY . .

# Expõe a porta do Vite (geralmente 5173) ou a que você estiver usando
EXPOSE 5173

# Comando para rodar o frontend. O "--host" permite que ele seja acessado fora do container
CMD ["npm", "run", "dev", "--", "--host"]