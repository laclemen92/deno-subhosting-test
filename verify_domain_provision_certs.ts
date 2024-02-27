const accessToken = Deno.env.get("DEPLOY_ACCESS_TOKEN");
const domainId = Deno.env.get("DEPLOY_DOMAIN_ID");

const API = "https://api.deno.com/v1";




const verifyDnsResponse = await fetch(`${API}/domains/${domainId}/verify`, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    },
});

console.error(verifyDnsResponse);

const provisionCerts = await fetch(`${API}/domains/${domainId}/certificates/provision`, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    },
});

console.error(provisionCerts);