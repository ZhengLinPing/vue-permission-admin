
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const userList = {
  "code": 0,
  "data": {
    "items": [
      {
        "roles": [
          "editor"
        ],
        "_id": "5d5505d073cb17122c60a6e2",
        "username": "zlp",
        "email": "zlp_china@163.com",
        "phone": "",
        "fullname": "zlp",
        "timestamp": "2019-08-15T09:12:16.729Z",
        "__v": 0,
        "state": true
      },
      {
        "roles": [
          "admin"
        ],
        "_id": "5d53a7e4665bb558f4fd386c",
        "username": "admin",
        "email": "zlp_china@163.com",
        "__v": 0,
        "fullname": "超级管理员",
        "timestamp": "2019-08-15T09:03:40.775Z",
        "state": true
      }
    ],
    "total": 2
  }
}

const userInfo = {
  "code": 0,
  "data": {
    "roles": [
      "admin"
    ],
    "permissions": [
      {
        "checkedAll": false,
        "selected": [
          "query",
          "detail",
          "add",
          "edit",
          "delete"
        ],
        "indeterminate": true,
        "code": "user",
        "name": "用户管理",
        "state": true,
        "actionsOptions": [
          "query",
          "detail",
          "add",
          "edit",
          "delete",
          "import"
        ]
      },
      {
        "checkedAll": true,
        "selected": [
          "query",
          "add",
          "edit",
          "delete"
        ],
        "indeterminate": false,
        "code": "permission",
        "name": "权限管理",
        "state": true,
        "actionsOptions": [
          "query",
          "add",
          "edit",
          "delete"
        ]
      },
      {
        "checkedAll": true,
        "selected": [
          "query",
          "detail",
          "add",
          "edit",
          "delete"
        ],
        "indeterminate": false,
        "code": "roles",
        "name": "角色管理",
        "state": true,
        "actionsOptions": [
          "query",
          "detail",
          "add",
          "edit",
          "delete"
        ]
      },
      {
        "checkedAll": false,
        "selected": [
          "query",
          "detail",
          "add",
          "edit",
          "delete",
          "import",
          "export"
        ],
        "indeterminate": true,
        "code": "test",
        "name": "测试页面",
        "state": true,
        "actionsOptions": [
          "query",
          "detail",
          "add",
          "edit",
          "delete",
          "import",
          "export"
        ]
      },
      {
        "checkedAll": true,
        "selected": [
          "query",
          "detail",
          "add",
          "edit",
          "delete"
        ],
        "indeterminate": false,
        "code": "button",
        "name": "按钮配置",
        "state": true,
        "actionsOptions": [
          "query",
          "detail",
          "add",
          "edit",
          "delete"
        ]
      },
      {
        "checkedAll": false,
        "selected": [
          "add",
          "import",
          "detail"
        ],
        "indeterminate": true,
        "code": "baogao",
        "name": "整改报告",
        "state": true,
        "actionsOptions": [
          "query",
          "detail",
          "add",
          "edit",
          "delete",
          "import",
          "export",
          "audit",
          "xiafa"
        ]
      }
    ],
    "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    "name": "admin"
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      return {
        code: 0,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'post',
    response: config => {
    
      return  userInfo
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  },

  {
    url: '/user/list',
    type: 'post',
    response: config => {
      return userList
    }
  },
  {
    url: '/user/update',
    type: 'post',
    response: config => {
      return {
        code:0
      }
    }
  },
]
