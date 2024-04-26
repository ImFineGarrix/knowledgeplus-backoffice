pipeline {
    agent any

    stages {

stage('Build') {
    steps {
        script {
            def envContent = """
                BASE_PATH=${ENV == 'dev' ? '/sj2/dev/backoffice' : '/sj2/backoffice'}
                BASE_TITLE='Knowledge Back-office${ENV == 'dev' ? ' | dev' : ''}'

                API_BASE_URL=https://capstone23.sit.kmutt.ac.th/sj2${ENV == 'dev' ? '/dev/api/backoffice' : '/api/backoffice'}

                FIREBASE_BASE_URL=https://firebasestorage.googleapis.com/v0/b/knowledge-project-${ENV == 'dev' ? 'devmode' : '7e224'}.appspot.com/o
                FIREBASE_API_KEY=${ENV == 'dev' ? 'AIzaSyCvrkrZ82WtdCNdnJRs23K94JnQqErPxl0' : 'AIzaSyBD9Sib0McpeRzQ7RLWlgw2f83x-O4UEiE'}
                FIREBASE_AUTH_DOMAIN=knowledge-project-${ENV == 'dev' ? 'devmode' : '7e224'}.firebaseapp.com
                FIREBASE_PROJECT_ID=knowledge-project-${ENV == 'dev' ? 'devmode' : '7e224'}
                FIREBASE_STORAGE_BUCKET=knowledge-project-${ENV == 'dev' ? 'devmode' : '7e224'}.appspot.com
                FIREBASE_APP_ID=${ENV == 'dev' ? "'1:335806051107:web:dc8775105f6ab23ac91296'" : "'1:334590771194:web:d2d63763aee80c8ce56e43'"}
                FIREBASE_MESSAGEING_SERDER_ID=${ENV == 'dev' ? "'335806051107'" : "'334590771194'"}
                FIREBASE_MEASUREMENT_ID=${ENV == 'dev' ? "'G-R7J9K17CPC'" : "'G-4263LPRR8L'"}
            """
            writeFile file: '.env', text: envContent

            sh '''
                docker build \
                --build-arg ENV=${ENV} \
                --build-arg ENV_CONTENT="${envContent}" \
                -t sj2vue-backoffice-nuxt-${ENV}:latest .                       
            '''
        }
    }
}
    
        stage ('Remove container'){
            steps {
              script {
                    // Run the command and capture the exit code
                    def exitCode = sh(script: "docker rm -f nuxt-container-${ENV}", returnStatus: true)

                    // Check the exit code to determine success or failure
                    if (exitCode == 0) {
                        echo "Container removal was successful"
                        // Add more steps or logic here if needed
                    } else {
                        echo "Container removal failed or was skipped"
                        // Add more steps or logic here if needed
                    }
              }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '''                     
                        docker run -d --name backoffice-container-${ENV} -p :3001 --network ${ENV} sj2vue-backoffice-nuxt-${ENV}:latest
                    '''
                }
            }
        }

        stage('Clear Storage') {
            steps {
                script {
                    
                    echo "Removing unused images"
                    sh "docker image prune -a -f"

                    echo "Removing unused volumes"
                    sh "docker volume prune -f"

                    echo "Removing build cached "
                    sh "docker buildx prune -f"
              
                    echo "Removing unused networks "
                    sh "docker network prune -f"

                }
            }
        }

        stage('Health Cheack') {
            steps {
                script {
                    def containerId = sh(script: "docker ps -q --filter name=backoffice-container-${ENV}", returnStdout: true)

                    if (containerId) {
                        def healthStatus = sh(script: "docker inspect --format '{{.State.Running}}'  ${containerId}", returnStdout: true)
                        
                        echo "Helath : ${healthStatus}"
                        if (healthStatus) {
                            echo "Container is running healthily."
                        } else {
                            error "Unable to retrieve container health status."
                        }
                    } else {
                        error "Container not found. Make sure it is running."
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline successfully completed!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}