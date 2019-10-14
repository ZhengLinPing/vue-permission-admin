
import user from '@/json/user.json'
import button from '@/json/button.json'
import permission from '@/json/permission.json'
import role from '@/json/role.json'

export async function getUserList(data) {
  return user.userList
}

export async function addUser(data) {
  return { code: 0 }
}

export async function updateUser(data) {
  return { code: 0 }
}

export async function removeUser(data) {
  return { code: 0 }
}

export async function getRole(data) {
  return role
}

export async function addRole(data) {
  return { code: 0 }
}

export async function updateRole(data) {
  return { code: 0 }
}

export async function removeRole(data) {
  return { code: 0 }
}

export async function getPermission(data) {
  return permission
}

export async function addPermission(data) {
  return { code: 0 }
}

export async function updatePermission(data) {
  return { code: 0 }
}

export async function removePermission(data) {
  return { code: 0 }
}

export async function getButton(data) {
  return button
}

export async function addButton(data) {
  return { code: 0 }
}

export async function updateButton(data) {
  return { code: 0 }
}

export async function removeButton(data) {
  return { code: 0 }
}
