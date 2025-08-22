"use server"

import { db } from "./db"
import { posts } from "./db/schema"

export async  function createPosts(title: string, body: string) {
  const results = await db.insert(posts).values({title: title, body: body}).returning()
  return results;

}

export async function getPosts() {
  return db.select().from(posts);
}
