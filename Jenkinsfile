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
            def envConvert = """
                BASE_URL=${ENV == 'dev' ? '/sj2/dev/backoffice' : '/sj2/backoffice'}
                BASE_TITLE='Knowledge Back-office${ENV == 'dev' ? ' | dev' : ''}'

                API_BASE_URL=https://cp23sj2.sit.kmutt.ac.th/sj2/api

                FIREBASE_BASE_URL=https://firebasestorage.googleapis.com/v0/b/knowledge-project-${ENV == 'dev' ? 'devmode' : '7e224'}.appspot.com/o
                FIREBASE_API_KEY=${ENV == 'dev' ? 'AIzaSyCvrkrZ82WtdCNdnJRs23K94JnQqErPxl0' : 'AIzaSyBD9Sib0McpeRzQ7RLWlgw2f83x-O4UEiE'}
                FIREBASE_AUTH_DOMAIN=knowledge-project-${ENV == 'dev' ? 'devmode' : '7e224'}.firebaseapp.com
                FIREBASE_PROJECT_ID=knowledge-project-${ENV == 'dev' ? 'devmode' : '7e224'}
                FIREBASE_STORAGE_BUCKET=knowledge-project-${ENV == 'dev' ? 'devmode' : '7e224'}.appspot.com
                FIREBASE_APP_ID=${ENV == 'dev' ? "'1:335806051107:web:dc8775105f6ab23ac91296'" : "'1:334590771194:web:d2d63763aee80c8ce56e43'"}
                FIREBASE_MESSAGEING_SERDER_ID=${ENV == 'dev' ? "'335806051107'" : "'334590771194'"}
                FIREBASE_MEASUREMENT_ID=${ENV == 'dev' ? "'G-R7J9K17CPC'" : "'G-4263LPRR8L'"}
            """
            sh '''
                docker build \
                --build-arg ENV=${ENV} \
                --build-arg ENV_CONVERT="${envConvert}" \
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