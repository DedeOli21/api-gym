# Use a imagem base, por exemplo, uma distribuição Linux como o Ubuntu
FROM ubuntu:latest

# Atualize o índice de pacotes e instale os pacotes necessários
RUN apt-get update && \
    apt-get install -y \
        curl \
        gnupg

# Instale o MySQL
RUN apt-get update && \
    apt-get install -y \
        mysql-server

# Instale o Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Instale o Nest.js globalmente
RUN npm install -g @nestjs/cli

# Copie o código-fonte da sua aplicação
WORKDIR /app
COPY . .

# Instale as dependências da aplicação
RUN npm install

# Instale as ferramentas de compilação e dependências necessárias
RUN apt-get update && \
    apt-get install -y \
        build-essential \
        python2

# Reinstale o bcrypt dentro do contêiner
RUN npm uninstall bcrypt && \
    npm install bcrypt

# Exponha a porta da sua aplicação
EXPOSE 3000

# Configuração do MySQL (substitua as variáveis de ambiente pelos valores apropriados)
ENV MYSQL_HOST=localhost
ENV MYSQL_PORT=3306
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ENV MYSQL_DATABASE=api_gym

# Configuração do WebSocket (se necessário)
# Exemplo:
# EXPOSE 8080

# Inicie sua aplicação (substitua este comando pelo comando real para iniciar sua aplicação)
CMD ["npm", "start"]
