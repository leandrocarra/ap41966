import javaposse.jobdsl.plugin.*

node {
    try {
        notifyBuild('STARTED')

        def attachments = [
         [
          text: 'Pipeline executado com Sucesso!!',
          fallback: 'Pipeline finalizado! Alterações realizadas.',
          color: '#7CFC00'
           ]
        ]
        def mvnHome = tool 'MAVENDSV'
        def scmVars
        environment {
            BUILD_ID = '${env.BUILD_ID}'
        }
            stage('Clonar Recursos do GIT') {
                scmVars =  git branch: 'dev',
                        credentialsId: 'GIT_EY',
                        url: 'git@github.com:EYLatamSouth/neoenergia-agencia-virtual.git'
                sh "ls -lat"
            }
            stage('Atualizar Dependências') {
                sh "npm cache verify"
                sh "npm cache clean --force"
                sh "npm install"
                sh "npm audit fix"
                sh "npm ci"
            }
            stage('Realizar Build da Aplicação') {
                sh "npm run build"
            }
            stage ('Build da Imagem Docker'){
                    sh "docker build -t neoenergia/agenciavirtual:${env.BUILD_ID} ."
            }
            stage('Tag da imagem para o AKS') {
                sh "docker image tag neoenergia/agenciavirtual:${env.BUILD_ID} acrneononprod.azurecr.io/agenciavirtual:${env.BUILD_ID}"
                sh 'sleep 1'
            }
            stage('Push - AKS Registry'){
                withCredentials([usernamePassword(credentialsId: 'AksRegistry', passwordVariable: 'AksRegistryPassword', usernameVariable: 'AksRegistryUser')]) {
                    sh "docker login acrneononprod.azurecr.io -u ${env.AksRegistryUser} -p ${env.AksRegistryPassword}"
                    sh "docker push acrneononprod.azurecr.io/agenciavirtual:${env.BUILD_ID}"
                    sh 'sleep 2'
                }
            }
            stage('Tag da imagem para o Nexus') {
                sh "docker image tag neoenergia/agenciavirtual:${env.BUILD_ID} images.neoenergia.net/agenciavirtual:${env.BUILD_ID}"
                sh 'sleep 1'
            }
            stage('Push - Nexus Registry'){
                withCredentials([usernamePassword(credentialsId: 'Nexus', passwordVariable: 'NexusRegistryPassword', usernameVariable: 'NexusRegistryUser')]) {
                    sh "docker login images.neoenergia.net -u ${env.NexusRegistryUser} -p ${env.NexusRegistryPassword}"
                    sh "docker push images.neoenergia.net/agenciavirtual:${env.BUILD_ID}"
                    sh 'sleep 2'
                }
            }
            stage ("Remover imagem do Container do Jenkins") {
                sh "docker rmi neoenergia/agenciavirtual:${env.BUILD_ID}"
            }
            stage('Apply Kubernetes Files') {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh 'kubectl apply -f k8s/1.agenciavirtual-external-postgre-hml.yaml -n ${NAMESPACE}'
                    sh 'kubectl apply -f k8s/0.config-map-hml.yaml -n ${NAMESPACE}'
                    sh "sed -i -e 's#BUILD_ID#${env.BUILD_ID}#' k8s/4.agenciavirtual-deployment.yaml;"
                    sh 'kubectl apply -f k8s/3.agenciavirtual-service.yaml -n ${NAMESPACE}'
                    sh 'kubectl apply -f k8s/4.agenciavirtual-deployment.yaml -n ${NAMESPACE}'
                    sh 'kubectl apply -f k8s/2.agenciavirtual-ingress.yaml -n ${NAMESPACE} || true'
                }
            }
    } catch (e) {
      currentBuild.result = "FALHA NA EXECUÇÃO DO PIPELINE"
      throw e
    } finally {
      // Enviar resultado do build
      notifyBuild(currentBuild.result)
    }
}


def notifyBuild(String buildStatus = 'PIPELINE INICIADO') {

  buildStatus =  buildStatus ?: 'PIPELINE EXECUTADO COM SUCESSO'

  def colorName = 'RED'
  def colorCode = '#D60E00'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"


  if (buildStatus == 'PIPELINE INICIADO') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'PIPELINE EXECUTADO COM SUCESSO') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#D60E00'
  }

  // Send notifications
  slackSend (channel: "#agenciavirtual", color: colorCode, message: summary)
}
