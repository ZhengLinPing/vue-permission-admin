const result = {
  "code": 0,
  "data": {
    "items": [
      {
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
            "checkedAll": true,
            "selected": [
              "query",
              "detail",
              "add",
              "edit",
              "delete",
              "import",
              "export"
            ],
            "indeterminate": false,
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
          }
        ],
        "_id": "5d564b92db294839a850f7ac",
        "code": "admin",
        "name": "超级管理员",
        "desc": "拥有所有权限",
        "state": true,
        "timestamp": "2019-08-16T06:22:10.128Z",
        "__v": 0
      },
      {
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
            "checkedAll": false,
            "selected": [
              "query"
            ],
            "indeterminate": true,
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
            "checkedAll": false,
            "selected": [
              "query"
            ],
            "indeterminate": true,
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
              "query"
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
            "checkedAll": false,
            "selected": [],
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
          }
        ],
        "_id": "5d564bafdb294839a850f7ad",
        "code": "editor",
        "name": "内容管理",
        "desc": "拥有查看权限",
        "state": true,
        "timestamp": "2019-08-16T06:22:39.759Z",
        "__v": 0
      }
    ],
    "total": 2
  }
}
  export default [

    {
      url: '/role/list',
      type: 'post',
      response: config => {
        return result
      }
    },
    {
      url: '/role/update',
      type: 'post',
      response: config => {
        return {
          code:0
        }
      }
    },
  

  ]
  