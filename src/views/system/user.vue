<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterFrom" :model="listQuery" :inline="true">
        <el-form-item label="" prop="phone">
          <el-input
            v-model="listQuery.phone"
            placeholder="手机号"
            style="width: 200px;"
            class="filter-item"
            clearable=""
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button v-waves class="filter-item" @click="resetForm('filterFrom');handleFilter()">重置</el-button>
        <el-button v-permission="['add']" class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleAdd">
          添加
        </el-button>
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="创建时间" width="160px" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fullname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" min-width="150px" align="center">
        <template slot-scope="scope">
          <el-tag v-for="role of scope.row.roles" :key="role" style="margin:0 5px;"> {{ rolesMap[role] }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="200px" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            @change="handleModifyState(scope.$index,scope.row)"
          />

        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['edit']" type="success" icon="el-icon-edit" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.status!='deleted'"
            v-permission="['delete']"
            icon="el-icon-delete"
            size="mini"
            type="danger"
            :disabled="scope.row.username === 'admin'"
            @click="handleDelete(scope.row,'deleted')"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page_no"
      :limit.sync="listQuery.page_size"
      @pagination="getList"
    />

    <el-dialog :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="550px">
      <el-form
        ref="userForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="90px"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="角色：" prop="roles">
          <el-select v-model="temp.roles" multiple placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in rolesList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="状态：" prop="state">
          <el-switch v-model="temp.state" active-color="#13ce66" />
        </el-form-item>
        <hr class="el-divider">

        <el-form-item label="姓名：" prop="fullname">
          <el-input v-model="temp.fullname" />
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
        <el-button type="danger" size="small" @click="dialogStatus==='create'?submit():updateData()">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getUserList, addUser, updateUser, removeUser, getRole } from '@/api/system'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'User',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    var validTelephone = (rule, value, callback) => {
      if (!value || value === '') {
        callback()
      }
      const reg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    return {
      tableKey: 0,
      list: [],
      rolesList: [],
      rolesMap: {},
      total: 0,
      listLoading: true,
      listQuery: {
        page_no: 1,
        page_size: 10,
        phone: undefined
      },
      temp: {
        _id: undefined,
        username: '',
        roles: [],
        fullname: '',
        password: '111111',
        phone: '',
        email: '',
        state: true
      },
      tempCopy: null,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑用户',
        create: '添加用户'
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请填写用户名' },
          { min: 3, max: 8, message: '长度在 3 到 8个字符', trigger: 'blur' }
        ],
        roles: [
          { required: true, trigger: 'blur', message: '请设置角色' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请设置密码' }],
        fullname: [
          { min: 2, max: 8, message: '长度在 2 到 8个字符', trigger: 'blur' }
        ],
        phone: [
          { required: false, trigger: 'blur', validator: validTelephone }
        ],
        email: [
          { required: false, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.tempCopy = Object.assign({}, this.temp)
    this.getList()
    this.getRole()
  },
  methods: {
    handleModifyState(index, row) {
      updateUser({
        '_id': row._id,
        'state': row.state
      }).then((res) => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    async getRole() {
      const res = await getRole({
        page_no: 1,
        page_size: 50
      })
      this.rolesList = res.data.items
      this.rolesList.forEach(item => {
        this.$set(this.rolesMap, item.code, item.name)
      })
    },
    getList() {
      this.listLoading = true
      getUserList(this.listQuery).then(res => {
        this.list = res.data.items
        this.total = res.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page_no = 1
      this.getList()
    },

    resetForm(formName) {
      if (this.$refs[formName] === undefined) {
        return false
      }
      this.$refs[formName].resetFields()

      this.temp = Object.assign({}, this.tempCopy)
    },
    handleAdd() {
      this.resetForm('userForm')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.rules.password[0].required = true
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    submit() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp)
          addUser(this.temp).then((res) => {
            this.list.unshift(res.data)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.rules.password[0].required = false

      this.temp = Object.assign({}, row) // copy obj
      this.temp.password = ''
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          updateUser(this.temp).then(() => {
            for (const v of this.list) {
              if (v._id === this.temp._id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser({ '_id': row._id }).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
      })
    }

  }
}
</script>
