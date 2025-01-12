FROM cypress/browsers:latest

# change this line to you workdir containing the repo with the tests
WORKDIR /Users/alinashabalina/bankkonto

COPY package.json ./

RUN npm install

COPY . .

# this command will execute the tests with a Testrail report
ENTRYPOINT ["npm", "run", "cy:testrail"]