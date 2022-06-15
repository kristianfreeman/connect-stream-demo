export function onRequestGet({ request, env }) {
  console.log("URL is ", request.url)
  const newUrl = new URL(request.url)
  newUrl.pathname = "/"
  const req = new Request(newUrl, request)
  return env.ASSETS.fetch(req)
}