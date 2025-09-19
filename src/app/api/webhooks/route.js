import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(req) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env.local"
    );
  }

  // Create webhook verifier
  const wh = new Webhook(SIGNING_SECRET);

  // Get Svix headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  // Get request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("❌ Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", { status: 400 });
  }

  // Handle event
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`✅ Webhook ${id} received: ${eventType}`);
  console.log("📦 Payload:", body);

  if (eventType === "user.created") console.log("User created");
  if (eventType === "user.updated") console.log("User updated");
  if (eventType === "user.deleted") console.log("User deleted");

  return new Response("Webhook received", { status: 200 });
}
