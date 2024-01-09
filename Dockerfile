# Dockerfile for building the image for the application angular

FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build --prod

# Expose the port
EXPOSE 4200

# Run the app
CMD [ "npm", "start" ]

# Build the image
# docker build -t angular-app .

# Run the container
# docker run -d -p 4200:4200 angular-app

# Access the application
# http://localhost:4200

# Push the image to the docker hub
# docker tag angular-app:latest <dockerhub-username>/angular-app:latest

# docker push <dockerhub-username>/angular-app:latest

# Pull the image from the docker hub
# docker pull <dockerhub-username>/angular-app:latest

# Run the container
# docker run -d -p 4200:4200 <dockerhub-username>/angular-app:latest
