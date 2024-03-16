import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {PageNames} from "@/app/page_names";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith(PageNames.about)) {
    return NextResponse.rewrite(new URL(PageNames.login, request.url))
  }
}
