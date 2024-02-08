pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
               sh "git clone 'https://github.com/arminazizyan99/OrangeHRM-e2e-testing.git'"
            }
        }
            
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run'
            }
        }
    }
}
