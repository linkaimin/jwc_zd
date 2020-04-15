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
    <span id="title">序号{{projectId}}：{{Pname}}</span>
    
  </div>
  <div  class="text item">
   所属单位：{{unit}}
   <hr class="hr">
   负责人：{{leader}}
   <hr class="hr">
   <div id="text">内容简介：{{info}}</div>
   <hr class="hr">
   <el-button @click="handledocument">附件预览</el-button><el-dialog title="查看文件" :visible.sync="dialogFormVisible">

        <label id="checkbox" v-for="item in file" :key = item>
        <a :href=item>{{item}}</a><br>
        </label>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
   <hr class="hr"><span>评分：</span><div id="part" v-for="item in list" :key = item.lname>
   类型：{{item.lname}}  占比：{{item.part}}  得分（单项满分100）：<el-input id='partInput' v-model="item.value" placeholder="请输入"></el-input>
  </div></div>
   <hr class="hr">
  <span>评语：</span> <el-input v-model="about" placeholder="请输入"></el-input>
  <hr class="hr">
     <el-button style="float: right; padding:0 2rem 2rem 0" type="text" @click="submit">确认提交</el-button>
</el-card>

  </el-main>
</el-container>
</template>

<script>
export default {
  data(){
    return{
      activityId: '',
      leader: "",
      score: '',
      unit: "",
      name: "",
      projectId: '',
      isScored: "",
      info: "",
      input:"",
      about:"",
      fileName:"",
      Pname:"",
      dialogFormVisible: false,
      file:[],
      list:[],
    }
  },
  mounted(){
  this.show()
  },
  methods: {
    submit(){
    var that = this;
    this.$axios({
      url:"/score",
      method:'post',
      data:{
        projectId:that.projectId,
        userId:sessionStorage['userId'],
        message:that.about,
        tag:that.list,
      }
    }).then(function(response){
        if (response.data.resultCode === 200) {
          console.log(response.data.data)
         that.$message({
            message: '评分成功',
            type: 'success',
            duration: 2000
          })
          that.$router.push('/show')
        }
    })
    },
    handledocument(){
        this.dialogFormVisible = true
        var that = this
       this.$axios.get('/document/preview/'+that.projectId, {
  
     }).then(function (response){
      if (response.data.resultCode === 200) {
          that.file = response.data.data.file
          console.log(response.data.data)
      }
     })
      },
    download(){
       this.$axios.get( `/document/download/${that.projectId}/${that.fileName}`, {
     })
     .then(function (response){})
    },
    show(){
    this.name = sessionStorage['userName']
    var data = this.$route.query.ruleForm;
    console.log(data);
    this.activityId = data.activityId
    this.leader = data.leader
    this.unit = data.unit
    this.Pname = data.name
    this.projectId = data.projectId
    this.info = data.info
    this.list = data.tag,
     console.log(data.projectId);
    },
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
#part{
  margin: 1rem;
}
#partInput{

 display: inline;
}
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
