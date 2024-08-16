FROM node:14
WORKDIR /app
COPY package.json package.json
RUN npm i
RUN npm i react-router-dom
RUN npm i @mui/material @emotion/react @emotion/styled
RUN npm i @mui/icons-material
RUN npm i @mui/material @mui/styled-engine-sc styled-components
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]