pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git --version
                git 'https://github.com/arminazizyan99/OrangeHRM-e2e-testing.git'
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
