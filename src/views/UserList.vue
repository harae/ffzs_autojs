<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 功能按钮列-->
    <el-card>
      <el-input placeholder="请输入用户名" v-model="search_username" class="toolbar-select" @change="getTableData">
        <el-button slot="append" icon="el-icon-search" @click="getTableData"></el-button>
      </el-input>
      <span class="toolbar-btn">
        <el-button type="primary" @click="addDialogVisible = true" :disabled="disabled">新增</el-button>
        <el-button type="danger" @click="deleteBatchFrameUser" :disabled="disabled">批量删除</el-button>
      </span>
      <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="60%" @close="addDialogClose('addFrameuserRef')"
        center append-to-body>
        <el-form v-bind:model="frameuser" v-bind:rules="rules" ref="addFrameuserRef">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名" :label-width="lableWidth" prop="username">
                <el-input v-model="frameuser.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码" :label-width="lableWidth" prop="password">
                <el-input v-model="frameuser.password" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="角色" :label-width="lableWidth">
                <template>
                  <el-radio-group v-model="frameuser.usertype">
                    <el-radio :label="0">管理员</el-radio>
                    <el-radio :label="1">普通用户</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser('addFrameuserRef')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="60%" @close="editDialogClose('editframeuserRef')"
        center append-to-body>
        <el-form v-bind:model="frameuser" v-bind:rules="rules" ref="editframeuserRef">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名" :label-width="lableWidth" prop="username" >
                <el-input v-model="frameuser.username" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码" :label-width="lableWidth" prop="password">
                <el-input v-model="frameuser.password" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
         <el-row>
           <el-col :span="12">
             <el-form-item label="角色" :label-width="lableWidth">
               <template>
                 <el-radio-group v-model="frameuser.usertype">
                   <el-radio :label="0">管理员</el-radio>
                   <el-radio :label="1">普通用户</el-radio>
                 </el-radio-group>
               </template>
             </el-form-item>
           </el-col>
         </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogClose('editframeuserRef')">取 消</el-button>
          <el-button type="primary" @click="updateUser('editframeuserRef')">确 定</el-button>
        </span>
      </el-dialog>
      <el-table :data="tableData" @selection-change="selectionChanged" height="400" border max-height="1550">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="username" label="用户名" width="700" align="center"> </el-table-column>
      <!--  <el-table-column prop="usertype" label="角色" width="400" align="center"> </el-table-column> -->
        <el-table-column label="角色" width="200"  align="center">
                <template slot-scope="scope">
                    <el-tag type="success" effect="dark" v-if="scope.row.usertype==1">普通用户</el-tag>
                    <el-tag type="warning" effect="dark" v-if="scope.row.usertype==0">管理员</el-tag>
                </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="editFrameUser(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteUser( scope.row)" :disabled="disabled">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageinfo.pageNum" :page-sizes="[5, 10, 20, 50]" :page-size="pageinfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pageinfo.totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import {
    getUserList,
    addUser,
    deleteUser,
    updateUser,
    getUser
  } from '../api/api.js'

  export default {
    name: "",
    data() {
      return {
        disabled:false,
        //返回的是选中的列的数组集合
        multipleSelection: '',
        //搜索框绑定数据
        search_username: '',
        tableData: [],
        pageinfo: {
          pageNum: 1,
          pageSize: 5,
          totalCount: 0
        },
        //修改窗体显示
        editDialogVisible: false,
        //新增窗体显示
        addDialogVisible: false,
        //窗体实体
        frameuser: {
          username: '',
          password: '',
          usertype:1
        },
        //表单表签宽度
        lableWidth: '80px',
        //验证规则
        rules: {
          username: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    methods: {
      /* 获取用户列表*/
      async getTableData() {
        //通过axios调用接口
        let username = localStorage.getItem("username")
        let params = {
          first: (this.pageinfo.pageNum - 1) * this.pageinfo.pageSize,
          pageSize: this.pageinfo.pageSize,
          username: username,
          searchname: this.search_username
        };
        const {
          data: res
        } = await getUserList(this.$qs.stringify(params))
        //console.log(res.data)
        this.tableData = res.data
        this.pageinfo.totalCount = res.totalCount
      },

      handleSizeChange(val) {
        this.pageinfo.pageSize = val;
        this.getTableData();
      },
      handleCurrentChange(val) {
        this.pageinfo.pageNum = val;
        this.getTableData();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      deleteFrameUser() {
        this.$message.info("删除用户")
      },
      //新增用户
      async addUser(frameName) {
        console.log(this.frameuser)
        const {
          data: res
        } = await addUser(this.$qs.stringify(this.frameuser))
        console.log(res)
        if (res.state) {
          this.addDialogVisible = false;
          this.cleanUser();
          this.getTableData();
          this.$message.success("新增用户成功")
        } else {
          this.$message.error("新增用户失败")
        }
      },
      //修改用户窗体打开
      async editFrameUser(row) {
        let params = {
          username: row.username,
        }
        const {
          data: res
        } = await getUser(this.$qs.stringify(params));
        if (res.state) {
          this.frameuser = res.user
          //console.log(this.frameuser);
          this.editDialogVisible = true
        }
      },
      //删除用户
      async deleteUser(row) {
        let params = {
          userguid: row.userguid
        }
        const {
          data: res
        } = await deleteUser(this.$qs.stringify(params));
        console.log(res);
        if (res.state) {
          this.$message.success("删除用户成功")
          this.getTableData();
        } else {
          this.$message.success("删除用户失败")
        }
      },
      //全选按钮事件
      selectionChanged(val) {
        let params = "";
        for (let i = 0; i < val.length; i++) {
          if (i < val.length - 1) {
            params += val[i].userguid + ",";
          } else {
            params += val[i].userguid;
          }
        }
        this.multipleSelection = params;
        //console.log(params);
      },
      //批量删除
      async deleteBatchFrameUser() {
        if (this.multipleSelection == '') {
          this.$message.error("请勾选至少一条数据")
          return;
        }
        let params = {
          userguid: this.multipleSelection
        };
        const {
          data: res
        } = await deleteUser(this.$qs.stringify(params));
        console.log(res);
        if (res.state) {
          this.$message.success("删除用户成功")
          this.getTableData();
        } else {
          this.$message.success("删除用户失败")
        }
      },
      //更新用户信息
      async updateUser(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            const {
              data: res
            } = await updateUser(this.$qs.stringify(this.frameuser))
            if (res.state) {
              this.cleanUser()
              this.editDialogVisible = false
              this.getTableData()
              this.$message.success("修改用户成功")
            } else {
              this.$message.success("修改用户失败")
            }
          } else {
            this.$message.error("请输入必填选项")
            return false;
          }
        });
      },
      //取消操作事件
      addDialogClose(formName) {
        //清空字段
        this.$refs[formName].resetFields();
        this.cleanUser();
        //隐藏窗体
        this.addDialogVisible = false;
      },
      editDialogClose(formName) {
        //清空字段
        this.$refs[formName].resetFields();
        this.cleanUser();
        //隐藏窗体
        this.editDialogVisible = false;
      },
      roleDialogClose(formName) {
        //清空字段
        this.$refs[formName].resetFields();
        //隐藏窗体
        this.roleDialogVisible = false;
      },
      cleanUser() {
        this.frameuser = {
          username: '',
          password: '',
          usertype:1
        }
      }
    },
    created() {
      this.getTableData()
      //是否展示功能按钮
      let usertype = localStorage.getItem("usertype")
      //普通用户
      if(usertype ==1){
        this.disabled = true
      }
    }
  }
</script>

<style scoped="scoped">
  .el-breadcrumb {
    margin-bottom: 20px;
  }

  .toolbar-select {
    width: 50%;
    margin-right: 40px;
  }

  .toolbar-btn {
    width: 50%;
  }

  .el-table {
    margin-top: 20px;
    margin-bottom: 20px;
    height: 360px;
  }

  .el-pagination {
    text-align: center;
  }

  .el-radio {
    margin-left: 20px;
    margin-right: -10px;
  }

  /*  .el-dialog__header{
    border-bottom: black;
  } */
</style>
