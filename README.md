# Deno Subhosting Testing
This is leveraging the deno subhosting project and cloudflare for domains & DNS setup.

## How to setup
On mac
`brew install deno`

To run any of the scripts - this gives access to all permissions and provides env variables from a .env file
`deno run -A --env FILENAME.ts`

You would also need to create a `.env` with all the values used in these scripts for your own cloudflare and deno deploy accounts.

## What does this do?

### create_project
This creates a new project or app in the subhosting organization. Once the project has been created, you can move onto the next script.

## create_domain
This script creates a subdomain on top of a domain in cloudflare. It first links the domain to the subhosting organization. It then adds the dns records to cloudflare.

## verify_domain_provision_certs
This script will then verify that the dns records were added to cloudflare correctly. Then it will provision certs for the subdomain.

## create_deployment
This script then creates a deployment and links the deployment to the domain we setup earlier. You can change the code for the deployment and run the script to see the subdomain update.

NOTE: The first 3 scripts above are really just for inital setup or for making a new project the first time. Create deployment can be run multiple times.
