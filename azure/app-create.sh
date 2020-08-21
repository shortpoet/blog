#!/bin/bash

# source config

# test version of app
# . test.conf

# dev version of app
. dev.conf

{
# Create a resource group.
echo =================================================================================
echo = Creating Resource group $rg
echo =================================================================================
az group create --location northcentralus --name $rg

# Create an App Service plan in FREE tier
# or S1 STANDARD tier (minimum required by deployment slots).
echo =================================================================================
echo = Creating App Service Plan
echo =================================================================================
az appservice plan create --name $webappname --resource-group $rg --sku FREE

# Create a web app.
echo =================================================================================
echo = Creating Web App $webappname
echo =================================================================================
az webapp create --name $webappname --resource-group $rg \
--plan $webappname

# Set the account-level deployment credentials
echo =================================================================================
echo = Set Account Level Deployment Credentials
echo =================================================================================
echo -n "USERNAME: "; read username
echo -n "PASSWORD: "; stty -echo; read password; stty echo; echo
az webapp deployment user set --user-name $username --password $password
# get rid of passwd
password= 

# Configure local Git and get deployment URL
echo =================================================================================
echo = "Configure local Git and get deployment URL"
echo =================================================================================
url=$(az webapp deployment source config-local-git --name $webappname \
--resource-group $rg --query url --output tsv)
echo "url => ${url}"

# Add the Azure remote to your local Git respository and push your code
echo =================================================================================
echo = "Add the Azure remote to your local Git respository and push your code"
echo =================================================================================

cd $gitdirectory
git remote add azure $url
git push azure $branch
git push

# Copy the result of the following command into a browser to see the web app in the production slot.
echo =================================================================================
echo = Browse to Deployment
echo =================================================================================
echo http://$webappname.azurewebsites.net
} | tee ./logs/$target
