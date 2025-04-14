// functions/_middleware.ts
export const onRequest = async ({ request, next }) => {
    const response = await next()
    const headers = new Headers(response.headers)
  
    // 移除 Server 資訊
    headers.delete('X-Powered-By') // 移除伺服器標頭資訊
    // headers.delete('X-AspNetMvc-Version') // 若是 ASP.NET 專案才需要
  
    // 安全性相關 Header
    headers.set('X-XSS-Protection', '1; mode=block') // Anti-XSS
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains') // HSTS
    headers.set('X-Frame-Options', 'SAMEORIGIN') // Anti-Clickjacking
    headers.set('X-Content-Type-Options', 'nosniff') // 防止瀏覽器猜 MIME
    headers.set('Permissions-Policy', 'camera=(),payment=(),usb=()') // 禁用敏感 API
    headers.set('Referrer-Policy', 'no-referrer-when-downgrade') // Referrer Policy
  
    // CSP 政策
    // 你的原始設定是 `unsafe-inline`，這會降低安全性（允許 inline JS）
    // 建議改成 default-src 'self'，或是更嚴格版本（可幫你設定）
    headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'")
  
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  }
  