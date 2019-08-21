<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-permission="['add']" class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="handleAdd">
        添加按钮
      </el-button>
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
      <el-table-column label="唯一识别码" width="200px" align="center">
        <template slot-scope="scope">
          <span style="color:#999">{{ scope.row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column label="按钮名称" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="按钮描述" prop="desc" align="center" />

      <!-- <el-table-column label="状态" width="200px" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            @change="handleModifyState(scope.$index,scope.row)"
          />

        </template>
      </el-table-column>-->

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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="650px">
      <el-form
        ref="userForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="唯一识别码" prop="code">
          <el-input v-model="temp.code" :disabled="dialogStatus!=='create'" />
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <!-- <el-form-item label="状态" prop="state">
          <el-switch v-model="temp.state" active-color="#13ce66" />
        </el-form-item>-->
        <el-form-item label="描述" prop="desc">
          <el-input v-model="temp.desc" type="textarea" />
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
import { getButton, addButton, updateButton, removeButton } from '@/api/system'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { permissionOption } from '@/utils/dict'

export default {
  name: 'Button',
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
        permission: []
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
          { required: true, trigger: 'blur', message: '权限名称不能为空' }]

      }
    }
  },
  created() {
    this.tempCopy = Object.assign({}, this.temp)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getButton(this.listQuery).then(res => {
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
      updateButton({
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
          addButton(this.temp).then((res) => {
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
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          updateButton(this.temp).then(() => {
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
        removeButton({ '_id': row._id }).then(() => {
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
