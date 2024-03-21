# Use a imagem base, por exemplo, uma distribuição Linux como o Ubuntu
FROM ubuntu:latest

# Atualize o índice de pacotes e instale o SSH
RUN apt-get update && apt-get install -y openssh-server

# Configure a senha do usuário root para "password" (Isso é apenas para fins de demonstração, não é recomendado em produção)
RUN echo 'root:password' | chpasswd

# Permita login via SSH
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# Limpe o cache de pacotes para reduzir o tamanho final da imagem
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Exponha a porta 22 para permitir conexões SSH
EXPOSE 22

# Inicie o serviço SSH quando o contêiner for iniciado
CMD ["/usr/sbin/sshd", "-D"]
