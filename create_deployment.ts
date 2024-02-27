const accessToken = Deno.env.get("DEPLOY_ACCESS_TOKEN");
const projectId = Deno.env.get("DEPLOY_PROJECT_ID");

const API = "https://api.deno.com/v1";
const domainId = "bd8ea79c-4976-48db-a5bd-5af49f51a480";

const getDeploymentStatus = async (deploymentId: string) => {
    const res = await fetch(`${API}/deployments/${deploymentId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    const deploymentStatus = await res.json();

    return deploymentStatus.status;
};

// Create a new deployment
const res = await fetch(`${API}/projects/${projectId}/deployments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      entryPointUrl: "main.ts",
      assets: {
        "main.ts": {
          "kind": "file",
          "content": `Deno.serve(() => { return Response.json({ withCustomDomain: true, subhosting: true, message: "hey kevin updated!!!!" })});`,
          "encoding": "utf-8",
        },
      },
      envVars: {},
    }),
  });
  
  const deployment = await res.json();
  console.log(deployment);

  while (await getDeploymentStatus(deployment.id) !== "success") {
    console.error("Deployment in progress...");
  }

  const attachDomain = await fetch(`${API}/domains/${domainId}`, {
    method: "PATCH",
    headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        deploymentId: deployment.id,
    }),
  });

  console.error(attachDomain);