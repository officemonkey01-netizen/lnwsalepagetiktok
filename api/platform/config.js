export default async function handler(_request, response) {
  try {
    const upstream = await fetch("https://lnwsalepage-efh98l6s.manus.space/api/platform/config.js", { cache: "no-store" });
    const body = await upstream.text();
    response.statusCode = upstream.status;
    response.setHeader("Content-Type", "application/javascript; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.end(body);
  } catch {
    response.statusCode = 502;
    response.setHeader("Content-Type", "application/javascript; charset=utf-8");
    response.end("window.__MANUS_CONFIG__={projectId:'',oauthPortalUrl:'',apiUrl:'',apiBrowserKey:''};");
  }
}
