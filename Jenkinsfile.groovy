node {
    checkout scm
}

pipeline {
   agent {
      docker {
        image 'node:13-alpine'
      }
   }

    environment {
        CI = 'true'
    }

   stages {
      stage('build') {
         steps {
            sh 'yarn'
         }
      }

      stage('test') {
        steps {
          sh 'yarn eslint . -o eslint.json -f json'
        }
      }
   }
}
