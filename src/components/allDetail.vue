<template>
  <el-container>
  <el-header id="top"> 
   评估系统用户端
   <span class="name">欢迎您：{{name}}</span>
   <span class="name"><i class="el-icon-share i_rd"></i><span @click="exit">安全退出</span></span>
  </el-header>
  <el-main>
<el-card class="box-card" id="main">
  <div slot="header" class="clearfix">
    <span id="title">序号{{number}}：{{project}}</span>
    
  </div>
  <div  class="text item">
   所属单位：{{unit}}
   <hr class="hr">
   负责人：{{leader}}
   <hr class="hr">
   <div id="text">内容简介：{{text}}</div>
   <hr class="hr">
   附件预览：<el-button style="padding: 3px 0" type="text">点击预览</el-button>
   <hr class="hr">
  <span>评分：</span> <el-input v-model="input" placeholder="请输入"></el-input>
  </div>
   <hr class="hr">
  <span>评语：</span> <el-input v-model="about" placeholder="请输入"></el-input>
  <hr class="hr">
     <el-button style="float: right; padding:0 2rem 2rem 0" type="text">确认提交</el-button>
</el-card>

  </el-main>
</el-container>
</template>

<script>
export default {
  data(){
    return{
      number:"1",
      name:"林开敏",
      project:"森林资产评估系统",
      leader:"林开敏",
      unit:"信息学院",
      text:"通过总结、归纳有关价值理论基础来指导开展森林资源资产价值的研究，探讨如何构建出功能更加完善的基于数据可视化的森林资源资产评估管理系统。只有森林资源的价值得以精准量化，完善森林资源价值评估研究内容，才能提高相关从业人员的工作效率。科学地评估森林资源价值，使森林资源在市场经济的作用下配置能够优化，从而促进林业行业的持续、快速、健康发展。",
      input:"",
      about:"",
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
    }
   
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
   
  }

</script>

<style>

.el-input{
  width: 90%;
}
*{
  margin: 0; padding: 0;
}
#text{
  margin: 0 auto;
}
#title{
  font-weight:600;
}
#main{
    width:60%;
    margin: 0 auto;
}
.hr{
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color:#CCCCFF;
  height:1px;
  border:none;
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
