# azure Containers

## test

docker run -p 8080:8080 --env-file ./.env shortpoet.azurecr.io/blog.server.prod.azure:v1

docker run -p 80:80 --env-file ./.env shortpoet.azurecr.io/blog.client.prod.azure:v1


## microsoft docs


- <https://docs.microsoft.com/en-us/azure/container-instances/container-instances-tutorial-prepare-acr>

- Create a resource group with the az group create command. In the following example, a resource group named myResourceGroup is created in the eastus region:

```bash
az group create --name myResourceGroup --location eastus

```

- Once you've created the resource group, create an Azure container registry with the az acr create command. The container registry name must be unique within Azure, and contain 5-50 alphanumeric characters. Replace <acrName> with a unique name for your registry:

```bash
az acr create --resource-group myResourceGroup --name <acrName> --sku Basic

```

... output


```json
{
  "creationDate": "2018-03-16T21:54:47.297875+00:00",
  "id": "/subscriptions/<Subscription ID>/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/mycontainerregistry082",
  "location": "eastus",
  "loginServer": "mycontainerregistry082.azurecr.io",
  "name": "mycontainerregistry082",
  "provisioningState": "Succeeded",
  "resourceGroup": "myResourceGroup",
  "sku": {
    "name": "Basic",
    "tier": "Basic"
  },
  "status": null,
  "storageAccount": null,
  "tags": {},
  "type": "Microsoft.ContainerRegistry/registries"
}

```

- You must log in to your Azure Container Registry instance before pushing images to it. Use the az acr login command to complete the operation. You must provide the unique name you chose for the container registry when you created it.

```bash
az acr login --name <acrName>
```

- First, get the full login server name for your Azure container registry. Run the following az acr show command, and replace <acrName> with the name of registry you just created:

```bash
az acr show --name <acrName> --query loginServer --output table
```

- ...output

> mycontainerregistry082.azurecr.io

- Tag the aci-tutorial-app image with the login server of your container registry. Also, add the :v1 tag to the end of the image name to indicate the image version number. Replace <acrLoginServer> with the result of the az acr show command you executed earlier.

```bash
docker tag aci-tutorial-app <acrLoginServer>/aci-tutorial-app:v1
```

- Now that you've tagged the aci-tutorial-app image with the full login server name of your private registry, you can push the image to the registry with the docker push command. Replace <acrLoginServer> with the full login server name you obtained in the earlier step.

```bash
docker push <acrLoginServer>/aci-tutorial-app:v1
```

- To verify that the image you just pushed is indeed in your Azure container registry, list the images in your registry with the az acr repository list command. Replace <acrName> with the name of your container registry.

```bash
az acr repository list --name <acrName> --output table
```

- To see the tags for a specific image, use the az acr repository show-tags command.

```bash
az acr repository show-tags --name <acrName> --repository aci-tutorial-app --output table
```

- A best practice for many scenarios is to create and configure an Azure Active Directory service principal with pull permissions to your registry. See Authenticate with Azure Container Registry from Azure Container Instances for sample scripts to create a service principal with the necessary permissions. Take note of the service principal ID and service principal password. You use these credentials to access the registry when you deploy the container.

- You also need the full name of the container registry login server (replace <acrName> with the name of your registry):

```bash
az acr show --name <acrName> --query loginServer
```

- Now, use the az container create command to deploy the container. Replace <acrLoginServer> with the value you obtained from the previous command. Replace <service-principal-ID> and <service-principal-password> with the service principal ID and password that you created to access the registry. Replace <aciDnsLabel> with a desired DNS name.

```bash
az container create --resource-group myResourceGroup --name aci-tutorial-app --image <acrLoginServer>/aci-tutorial-app:v1 --cpu 1 --memory 1 --registry-login-server <acrLoginServer> --registry-username <service-principal-ID> --registry-password <service-principal-password> --dns-name-label <aciDnsLabel> --ports 80
```
- To view the state of the deployment, use az container show:

```bash
az container show --resource-group myResourceGroup --name aci-tutorial-app --query instanceView.state
```

- Once the deployment succeeds, display the container's fully qualified domain name (FQDN) with the az container show command:

```bash
az container show --resource-group myResourceGroup --name aci-tutorial-app --query ipAddress.fqdn
```
- You can also view the log output of the container:

```bash
az container logs --resource-group myResourceGroup --name aci-tutorial-app
```

- If you no longer need any of the resources you created in this tutorial series, you can execute the az group delete command to remove the resource group and all resources it contains. This command deletes the container registry you created, as well as the running container, and all related resources.

```bash
az group delete --name myResourceGroup
```

```bash

```

```bash

```

- [web app vs container](https://stackoverflow.com/a/47233235/12658653)

**Web App for Containers** lets you run your custom Docker container which hosts your Web Application. By default the Web App Service with Linux OS provides built-in Docker images like PHP 7.0 and Node.js 4.5. But by following the instructions from this webpage you can also host your custom docker images which allows you to define your own SW-Stack. The limitation is that you can only deploy one docker image to an App Service. You can scale the App Service to use multiple instances, but each instance will have the same docker image deployed. So this allows you to use Docker as a Service, but isn't intended for deploying Microservices.

**Container Services (ACS), Kubernetes Service (AKS) and Service Fabric** allow you to deploy and manage multiple (different) Docker containers which might also need to communicate with each other. Let's say you implement a shopping website and want to build your web application based on a Microservices architecture. You end up having one Service (= container) which is used for registration & login of users and another Service which is used for the visitors' shopping carts and purchasing items. Additionally you have many further small services for all the other needed tasks. Because the purchasing service is used more frequently than the sign-up/sign-in service, you will need, for example, 6 instances of the sign-up/sign-in service and 12 instances of the cart service. Basically, ACS, AKS and Service Fabric let you deploy and manage all those different Microservices.

If you want to know the difference between ACS/AKS and Service Fabric you might want to have a look [here](https://stackoverflow.com/questions/41834111/azure-service-fabric-vs-azure-container-services).
