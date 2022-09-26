// 暂存去登录前的url
const REDIRECT_URL = 'REDIRECT_URL'
export function storageRedirectUrl(redirectUrl) {
  sessionStorage.setItem(REDIRECT_URL, encodeURIComponent(redirectUrl))
}

export function getStorageRedirectUrl() {
  let redirectUrl = sessionStorage.getItem(REDIRECT_URL)
  redirectUrl = redirectUrl ? decodeURIComponent(redirectUrl) : '/'
  return redirectUrl
}

export function clearRedirectUrl() {
  sessionStorage.removeItem(REDIRECT_URL)
}