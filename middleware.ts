import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE = 'pai_session'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hasSession = req.cookies.has(SESSION_COOKIE)

  // Redirect signed-in users away from the onboarding root
  if (pathname === '/' && hasSession) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
