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
   超链接： <a :href=docUrl >{{docUrl}}</a><br>
   <hr class="hr">
   <el-button @click="handledocument" >附件预览</el-button><el-dialog title="查看文件"  :visible.sync="dialogFormVisible">

        <label id="checkbox" v-for="item in fileName" :key = item>
        <a :href=item.url target="_blank">{{item.name}}</a><br>
        </label>
<div>
    {{fileContent}}
</div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
   <hr class="hr"><span>评分：</span><div id="part" v-for="item in list" :key = item.lname>
   类型：{{item.lname}}  占比：{{item.part}}  得分（单项满分{{item.max}}）：<el-input id='partInput' minlength=1  type="number" v-model="item.value" @input="limitInput(item)" placeholder="请输入"></el-input>
  </div></div>
   <hr class="hr">
  <span>评语：</span> <el-input minlength=1 v-model="about" placeholder="请输入"></el-input>
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
      docUrl:"",
      fileName:[],
      fileContent:""
    }
  },
  mounted(){
  this.show()
  },
  methods: {
    limitInput(item){
      if(item.value > item.max){
        item.value = item.max;
      } 
      if(item.value < 0){
        item.value = 0;
      } 
    },
    submit(){
    var that = this;
    console.log(that.list)
    for(let i of that.list){
    if(i.value == ''||i.lname== ''||that.about==''){ 
       this.$message({
            message: '未完成全部评分！',
            type: 'error',
            duration: 2000
          })
          return;
    }
    }
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
          that.$router.push({
          path: '/show',
          query: {activityId:that.activityId}
         })
        }
    })

    },
    handledocument(){
       this.dialogFormVisible = true
        var that = this
        that.fileName = [];
       this.$axios.get('/document/preview/'+that.projectId, {
  
     }).then(function (response){
      if (response.data.resultCode === 200) {
          that.file = response.data.data.file
          console.log(response.data.data)
          for(let item of that.file){
            that.fileName.push({
              name:item.slice(33),
              url:item
            })
          }
          console.log(that.fileName)
      }
     })
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
    this.docUrl = data.docUrl
     console.log(data.projectId);
     for(let i of this.list){
       i.max = Number(i.part) * 100;
     }
     console.log(this.list)
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
