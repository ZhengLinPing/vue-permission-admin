<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleAdd" v-permission="['add']">
        添加角色
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"

      fit
      highlight-current-row
      style="width: 100%;"
    >

      <el-table-column type="expand">
        <template slot-scope="props">

          <el-row>
            <el-col v-for="(permission,idx) of props.row.permissions" :key="idx" :span="11" :offset="1">

              <div style="margin-bottom:10px;">
                <span> {{ permission.name }}：</span>
                <el-tag v-for="val of permission.selected" :key="val" type="success" style="margin:0 5px">
                  {{ permissionOption[val] }}
                </el-tag>
              </div>

            </el-col>

          </el-row>

        </template>
      </el-table-column>

      <el-table-column label="唯一识别码" align="center" width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="desc" align="center" />
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
          <el-button type="success" icon="el-icon-edit" size="mini" @click="handleUpdate(scope.row)" v-permission="['edit']">编辑</el-button>
          <el-button
            v-permission="['delete']"
            v-if="scope.row.status!='deleted'"
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" >

      <el-form
        ref="userForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="110px"
      >
        <el-form-item label="唯一识别码：" prop="code">
          <el-input v-model="temp.code" :disabled="dialogStatus!=='create'" />
        </el-form-item>
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

        <el-form-item label="状态：" prop="state">
          <el-switch v-model="temp.state" active-color="#13ce66" />
        </el-form-item>
        <el-form-item label="描述：" prop="desc">
          <el-input v-model="temp.desc" type="textarea" />
        </el-form-item>
        <hr class="el-divider">
        <el-form-item label="拥有权限：" prop="permission">

          <el-form-item v-for="(permission,idx) of temp.permissions" :key="idx" :label="permission.name+'：'">
            <el-checkbox
              v-model="permission.checkedAll"
              :indeterminate="permission.indeterminate"
              @change="onChangeCheckAll($event, permission)"
            >全选</el-checkbox>
            <el-checkbox-group v-model="permission.selected" style="display: inline-block">
              <el-checkbox
                v-for="val of permission.actionsOptions"
                :key="val"
                :label="val"
                name="type"
                @change="onChangeCheck(permission)"
              >
                {{ permissionOption[val] }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

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
import { getRole, addRole, updateRole, removeRole, getPermission } from '@/api/system'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { permissionOption } from '@/utils/dict'

export default {
  name: 'Role',
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
    return {
      permissionOption: permissionOption,
      tableKey: 0,
      list: [],
      permissionList: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page_no: 1,
        page_size: 10
      },
      temp: {
        code: '',
        name: '',
        desc: '',
        state: true,
        permissions: [

        ]
      },
      tempCopy: null,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {
        code: [
          { required: true, trigger: 'blur', message: '识别码不能为空' }
        ],
        name: [
          { required: true, trigger: 'blur', message: '角色名称不能为空' }]

      }
    }
  },
  created() {
    this.tempCopy = Object.assign({}, this.temp)
    this.getList()
    this.getPermission()
  },
  methods: {
    async getPermission() {
      const res = await getPermission({
        page_no: 1,
        page_size: 50
      })
      const result = res.data.items.map(item => {
        return {
          checkedAll: false,
          selected: [],
          indeterminate: false,
          code: item.code,
          name: item.name,
          state: item.state,
          actionsOptions: item.permission
        }
      }).filter(item => item.state)

      this.permissionList = JSON.parse(JSON.stringify(result))
      this.$set(this.temp, 'permissions', result)
    },
    onChangeCheck(permission) {
      permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
      permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    onChangeCheckAll(checked, permission) {
      Object.assign(permission, {
        selected: checked ? permission.actionsOptions : [],
        indeterminate: false,
        checkedAll: checked
      })
    },
    getList() {
      this.listLoading = true
      getRole(this.listQuery).then(res => {
        this.list = res.data.items
        this.total = res.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page_no = 1
      this.getList()
    },
    handleModifyState(index, row) {
      updateRole({
        '_id': row._id,
        'state': row.state
      }).then((res) => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    resetForm(formName) {
      if (this.$refs[formName] === undefined) {
        return false
      }
      this.$refs[formName].resetFields()
      this.temp = Object.assign({}, this.tempCopy)
      this.$set(this.temp, 'permissions', this.permissionList)
    },
    handleAdd() {
      this.resetForm('userForm')
      this.dialogStatus = 'create'
      this.dialogFormVisible = true

      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    submit() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp)
          addRole(this.temp).then((res) => {
            this.list.push(res.data)
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
      this.temp = Object.assign({}, row) // copy obj
      const rowPer = this.permissionList.map(item => {
        const result = JSON.parse(JSON.stringify(item))
        const hasPer = row.permissions.find(v => v.code === item.code)
        if (hasPer) {
          result.selected = hasPer.selected
        }
        result.indeterminate = !!result.selected.length && (result.selected.length < result.actionsOptions.length)
        result.checkedAll = result.selected.length === result.actionsOptions.length

        return result
      })
      this.$set(this.temp, 'permissions', rowPer)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          updateRole(this.temp).then(() => {
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
        removeRole({ '_id': row._id }).then(() => {
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
