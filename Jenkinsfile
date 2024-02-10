pipeline {
    agent any

    stages {
       stage('Remove') {
            steps {
                script {
                    sh '''
                        docker rm -f backoffice-container-${ENV} || true
                        docker image prune -af
                    '''
                }
            }
        }
         stage('Build') {
            steps {
                script {
                    sh '''
                        docker build \
                        --build-arg ENV=${ENV} \
                        -t sj2vue-backoffice-nuxt-${ENV}:latest .                       
                    '''
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh '''                     
                        docker run -d --name backoffice-container-${ENV} -p 3001:3001 --network ${ENV} sj2vue-backoffice-nuxt-${ENV}:latest
                    '''
                }
            }
        }
    }
}