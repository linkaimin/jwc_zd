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
      <img src="../assets/activity.png" class="image">
      <div style="padding: 14px;">
        <span>{{activity}}</span>
        <div class="bottom clearfix">
          <time class="time">开始时间：{{ currentDate }}</time>
          <br>
           <time class="time">结束时间：{{ currentDate }}</time>
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
      name:"林开敏",
      currentDate: new Date().getFullYear(),
      activity:"大学生创新创业项目"
    }
  },
  mounted(){

  },
  methods: {
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
       this.$router.push('/show')
     }
    },
    
   
  }

</script>

<style>
*{
  margin: 0; padding: 0;
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
