FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /playwright-test

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npx", "playwright", "test", "--project=e2e" ]