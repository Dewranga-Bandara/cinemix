import { verifyWebhook } from '@clerk/nextjs/webhooks'

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req)

    const id = evt.data.id
    const eventType = evt.type

    console.log(`✅ Webhook ${id} received: ${eventType}`)
    console.log('📦 Payload:', evt.data)

    if (eventType === "user.created") console.log("User created")
    if (eventType === "user.updated") console.log("User updated")
    if (eventType === "user.deleted") console.log("User deleted")

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('❌ Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
