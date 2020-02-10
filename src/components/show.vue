<template>
  <el-container>
  <el-header id="top"> 
   评估系统用户端
   <span class="name">欢迎您：{{name}}</span>
   <span class="name"><i class="el-icon-share i_rd"></i><span @click="exit">安全退出</span></span>
  </el-header>
  <el-main>
<el-row>
  <el-col :span="6" v-for="(o) in 6" :key="o" :offset="1"  style="margin-bottom:40px">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/project.png" class="image">
       <el-tag :type="type" id="tag">{{tag}}</el-tag>
      <div style="padding: 14px;">
        <span>序号{{number}}：{{project}}</span>
        <div class="bottom clearfix">
          <time class="time">所属单位：{{ unit }}</time>
          <br>
           <time class="time">负责人：{{ leader }}</time>
          <el-button type="text" class="button" @click="goto">点击进入</el-button>
         
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
      number:"1",
      name:"林开敏",
      project:"基于数据可视化的森林资产评估系统",
      leader:"林开敏",
      unit:"信息学院",
      type:'success',
      tag:'已评分'
    }
  },
  mounted(){

  },
  methods: {
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
         goto:function(){
       this.$router.push('/detail')
     }
   
    },
   
  }

</script>

<style>
*{
  margin: 0; padding: 0;
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
