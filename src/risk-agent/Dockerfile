FROM ubuntu:22.04
RUN apt-get update && apt-get install -y curl git
WORKDIR /app
COPY . .
EXPOSE 8081
CMD ["tail", "-f", "/dev/null"]
