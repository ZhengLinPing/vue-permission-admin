
import user from '@/json/user.json'

export async function login(data) {
  console.log(user.login)
  return user.login
}

export async function getInfo(token) {
  return user.userInfo
}

