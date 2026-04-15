import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({
    service: 'payload-app',
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
}
