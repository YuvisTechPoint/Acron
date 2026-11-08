import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/sync/stream
 * Enterprise Server-Sent Events (SSE) Real-Time Data Synchronization Stream.
 * Directly listens to database mutation events and pushes updates to client browsers.
 */
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection affirmation
      controller.enqueue(
        encoder.encode(`event: connected\ndata: ${JSON.stringify({ status: "connected", timestamp: new Date().toISOString() })}\n\n`)
      );

      // Listener on database mutation
      const onDbChange = (changeEvent: any) => {
        try {
          const payload = `event: mutation\ndata: ${JSON.stringify(changeEvent)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch (err) {
          // Stream closed by client
          db.off("change", onDbChange);
        }
      };

      db.on("change", onDbChange);

      // Keep-alive heartbeat every 20 seconds
      const heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: heartbeat\n\n`));
        } catch {
          clearInterval(heartbeatInterval);
          db.off("change", onDbChange);
        }
      }, 20000);

      req.signal.addEventListener("abort", () => {
        clearInterval(heartbeatInterval);
        db.off("change", onDbChange);
        try {
          controller.close();
        } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

