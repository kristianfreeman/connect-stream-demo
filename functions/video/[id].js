export function onRequestGet({ request, env }) {
  const newUrl = new URL(request.url)
  newUrl.pathname = "/"
  const req = new Request(newUrl, request)
  return env.ASSETS.fetch(req)
}