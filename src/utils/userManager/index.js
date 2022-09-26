import {
  storageRedirectUrl,
  clearRedirectUrl,
} from '@/utils/storages/userStorages';

export function handleLoginRedirectUrl() {
  clearRedirectUrl()
  let redirectUrl= location.pathname + location.search
  storageRedirectUrl(redirectUrl)
}

export function login() {
  handleLoginRedirectUrl()
  let search= location.search
  let url= search ? `/login?${search}` : '/login'
  location.href= url
}

export function signOut(history) {
  clearLoginInfo()
  setTimeout(() => {
    history ? history.replace('/user/account') : location.href= '/user/account'
  }, 30)
}

export function checkIsLogin() {
 
  let isLogin= localStorage.getItem('IS_LOGIN')
  return isLogin === '1'
}