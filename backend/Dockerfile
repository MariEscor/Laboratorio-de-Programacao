# Usa uma imagem oficial do Python, leve
FROM python:3.12-slim

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências e instala
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o código do backend para o container
COPY . .

# Expõe a porta que o Django vai usar
EXPOSE 8000

# Comando para iniciar o servidor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]