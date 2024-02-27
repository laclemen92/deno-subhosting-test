const accessToken = Deno.env.get("DEPLOY_ACCESS_TOKEN");
const orgId = Deno.env.get("DEPLOY_ORG_ID");
const zoneId = Deno.env.get("CLOUDFLARE_ZONE_ID");
const cloudflareApiKey = Deno.env.get("CLOUDFLARE_API_KEY");
const defaultDomainName = Deno.env.get("DEPLOY_DEFAULT_DOMAIN_NAME");

const API = "https://api.deno.com/v1";
const CLOUDFLARE_API = "https://api.cloudflare.com/client/v4";

type DnsRecord = {
    type: string;
    name: string;
    content: string;
};

// Create a new domain
const res = await fetch(`${API}/organizations/${orgId}/domains`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    domain: defaultDomainName,
  }),
});

const domain = await res.json();
console.log(domain);

domain.dnsRecords.forEach(async (record: DnsRecord) => {
    const dnsResponse = await fetch(`${CLOUDFLARE_API}/zones/${zoneId}/dns_records`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${cloudflareApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: record.type,
            name: record.name,
            content: record.content,
            proxied: false,
        }),
    });

    console.error(dnsResponse);
});
