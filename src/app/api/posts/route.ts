import { NextResponse } from "next/server";
import { platformStore } from "@/lib/store";

export async function GET() {
  const blogs = platformStore.getBlogs();
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
      platformStore.updateBlogPost(body.id, body);
      saved = body;
    } else {
      saved = platformStore.addBlogPost(body);
    }
    return NextResponse.json({
      success: true,
      message: "Post saved and synchronized in real-time",
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
    platformStore.deleteBlogPost(id);
    return NextResponse.json({ success: true, message: `Post ${id} deleted` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete post" }, { status: 500 });
  }
}
