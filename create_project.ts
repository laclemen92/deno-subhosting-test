const accessToken = Deno.env.get("DEPLOY_ACCESS_TOKEN");
const orgId = Deno.env.get("DEPLOY_ORG_ID");
const defaultProjectName = Deno.env.get("DEPLOY_DEFAULT_PROJECT_NAME");

const API = "https://api.deno.com/v1";

// Create a new project
const res = await fetch(`${API}/organizations/${orgId}/projects`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: defaultProjectName, // randomly generates project name if null
  }),
});

const project = await res.json();
console.log(project);