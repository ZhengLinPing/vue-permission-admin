
export default (Vue) => {
  Vue.directive('permission', {
    inserted(el, binding, vnode) {
      const { value } = binding
      if (value) {
        const btnPermissions = vnode.context.$route.meta.btnPermissions
        if (!btnPermissions.includes(value[0])) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error(`need roles! Like v-permission="['add']"`)
      }
    }
  })
}
