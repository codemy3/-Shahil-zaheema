export async function GET() {
  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "Server is reachable from mobile",
  });
}
