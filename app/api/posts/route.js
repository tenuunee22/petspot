 import { NextResponse } from 'next/server';

// Temporary in-memory store
let posts = [];

export async function POST(req) {
  const data = await req.json();
  posts.push({ id: Date.now(), ...data });
  return NextResponse.json({ message: 'Post created', post: data });
}

export async function GET() {
  return NextResponse.json(posts);
}
