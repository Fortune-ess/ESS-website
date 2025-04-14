// functions/[[path]].js
export const onRequest = async ({ request, next }) => {
  const response = await next()
  const headers = new Headers(response.headers)

  // 移除伺服器資訊
  headers.delete('X-Powered-By')
  
  // 安全性標頭
  // 防止XSS攻擊，如果檢測到攻擊，瀏覽器將阻止頁面載入
  headers.set('X-XSS-Protection', '1; mode=block')
  
  // 強制瀏覽器使用https，設定至少一年的有效期
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  // 防止點擊劫持，頁面只能在相同域名頁面的frame中展示
  headers.set('X-Frame-Options', 'SAMEORIGIN')
  
  // 要求用戶端遵照伺服器端Content-Type MIME設定，不要由瀏覽器自行判斷MIME類型
  headers.set('X-Content-Type-Options', 'nosniff')
  
  // 限制特定功能和API的使用
  headers.set('Permissions-Policy', 'camera=(),payment=(),usb=()')
  
  // 設定Referrer Policy以避免瀏覽紀錄被追蹤
  headers.set('Referrer-Policy', 'no-referrer-when-downgrade')
  
  // 內容安全策略，允許unsafe-inline
  headers.set('Content-Security-Policy', 'unsafe-inline')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
