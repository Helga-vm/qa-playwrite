#get docker image with playwright with version (jammy - for tests with UI)
FROM mcr.microsoft.com/playwright:v1.56.1-jammy

#copy project files into image
COPY . /playwright-tests

#define working directory
WORKDIR /playwright-tests

#install project dependencies
RUN npm ci

#run tests
CMD ["npm", "run", "test"]