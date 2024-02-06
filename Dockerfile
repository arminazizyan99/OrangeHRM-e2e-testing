FROM cypress/included:13.6.4

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "npx cypress run"]