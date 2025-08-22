import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function GET() {

  const results = await db.select().from(posts);

  return NextResponse.json(results);
}
