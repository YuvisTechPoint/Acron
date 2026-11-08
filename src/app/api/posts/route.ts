import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { platformStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const blogs = db.getBlogPosts();
  return NextResponse.json({ success: true, blogs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Post title is required" }, { status: 400 });
    }
    let saved;
    if (body.id) {
      saved = db.updateBlogPost(body.id, body);
      platformStore.updateBlogPost(body.id, body);
    } else {
      const newPost = {
        ...body,
        id: `post-${Date.now()}`,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        publishedAt: body.publishedAt || new Date().toISOString().split("T")[0],
      };
      saved = db.insertBlogPost(newPost);
      platformStore.addBlogPost(newPost);
    }
    return NextResponse.json({
      success: true,
      message: "Post saved to database and synchronized in real-time",
      post: saved,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save post" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing post id" }, { status: 400 });
    }
    db.deleteBlogPost(id);
    platformStore.deleteBlogPost(id);
    return NextResponse.json({ success: true, message: `Post ${id} deleted from database` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete post" }, { status: 500 });
  }
}
