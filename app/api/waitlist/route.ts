import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = String(body?.email ?? '').trim().toLowerCase()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }

    await kv.zadd('hum:waitlist', { score: Date.now(), member: email })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist]', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
