<template>
  <el-container>
  <el-header id="top"> 
   评估系统用户端
   <span class="name">欢迎您：{{name}}</span>
   <span class="name"><i class="el-icon-share i_rd"></i><span @click="exit">安全退出</span></span>
  </el-header>
  <el-main>
  <h2>{{message}}</h2>
<el-row>
  <el-col :span="6" v-for="item in items" :key="item.projectId" :offset="1"  style="margin-bottom:40px">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/project.png" class="image">
       <el-tag  id="tag">{{item.isScored}}</el-tag>
      <div style="padding: 14px;">
        <span>序号{{item.projectId}}：{{item.name}}</span>
        <div class="bottom clearfix">
          <time class="time">所属单位：{{ item.unit }}</time>
          <br>
           <time class="time">负责人：{{ item.leader }}</time>
          <el-button v-show="item.show" type="text" class="button" @click="goto(item)">点击进入</el-button>
          <el-button class="button" type="text" v-show="!item.show" @click="handleExcel(item.projectId)"> 评分表下载</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
  </el-main>
</el-container>
</template>

<script>
export default {
  data(){
    
    return{
     items:{},
     name:"",
     tag:"",
     show:true,
     url:"",
     message:""
    }
  },
  mounted(){
    this.text()

  },
  methods: {
    handleExcel(projectId){
    window.open(`http://140.143.194.109:8080/jwc/excel/project/export/${projectId}/`+sessionStorage['userId'])
    },
     text(){
        this.name = sessionStorage['userName']
       var that = this;
        var data = this.$route.query;
        console.log(data)
        this.$axios({
          method:'get',
          url:`/project/user?userId=${sessionStorage['userId']}&activityId=${data.activityId}` 
        }).then(function(response){
        if (response.data.resultCode === 200) {
        that.items = response.data.data
        if(that.items.length === 0 ){that.message = '该活动尚未添加项目哦！'}
        for(let i of that.items){
          if(i.isScored == '已评分'){
           i.show = false
          }else{
           i.show = true
          }
        }
        console.log(that.items)

      }
        })
     },
       handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
    exit: function () {
      sessionStorage.clear()
        this.$message({
            message: '退出成功',
            type: 'success',
            duration: 2000
          })
          this.$router.push('/')
    },
         goto:function(item){
     this.$router.push({
          path: '/detail',
          query: { ruleForm:item }
         })
     }
   
    },
   
  }

</script>

<style>
*{
  margin: 0; padding: 0;
}
#excel{
 float: right;
  margin-right: 1rem;

}
#tag{
  float: right;
  margin-right: 1rem;
  margin-left: 1rem;
}
#top{
  background: #003366;
  font-size: 2rem;
  color:#CCCCFF;
  line-height: 60px;
  font-weight: 550;
}
.name{
  font-size: 1rem;
  font-weight: 500;
  float:right;
  margin-left: 1rem;
}
 .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
