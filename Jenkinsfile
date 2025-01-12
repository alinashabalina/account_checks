pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defaultValue: 'cypress/e2e/**', description: 'Example: cypress/e2e/account.cy.ts')
    }

    stages {

        stage('Build'){
            steps {
                echo "Building the application"
            }
        }

        stage('Testing') {
            steps {
                bat "npm i"
                bat "npm run cy:testrail --spec ${SPEC}"
            }
        }

        stage('Deploy'){
            steps {
                echo "Deploying"
            }
    }
}
