export async function onRequestGet({ env }) {
  const init = {
    method: 'POST',
    headers: {
      'X-Auth-Email': env.STREAM_AUTH_EMAIL,
      'X-Auth-Key': env.STREAM_AUTH_KEY,
    },
    body: "{\"maxDurationSeconds\":3600,\"meta\":{\"name\":\"My First Stream Video\",\"test2\":\"hi\"}}"
  }
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.STREAM_ACCOUNT_ID}/stream/direct_upload`, init)
  const results = await response.json();
  console.log(results.result.uploadURL);
  return new Response(results.result.uploadURL, { headers: { 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Origin': '*' } })
}