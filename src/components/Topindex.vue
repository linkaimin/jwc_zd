<template>

<el-container>
  <el-header id="top"> 
   评估系统用户端
   <span class="name">欢迎您：{{name}}</span>
   <span class="name"><i class="el-icon-share i_rd"></i><span @click="exit">安全退出</span></span>
  </el-header>
  <el-main>
<el-row>
  <el-col :span="6" v-for="item in items" :key="item.activityId" :offset="1"  style="margin-bottom:40px">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/activity.png" class="image">
      <div style="padding: 14px;">
        <span>{{item.name}}</span>
        <div class="bottom clearfix">
          <time class="time">开始时间：{{ item.startTime }}</time>
          <br>
           <time class="time">结束时间：{{ item.endTime }}</time>
          <el-button type="text" class="button" @click="handle(item.activityId,item.type)">点击进入</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
<h1>{{message}}</h1>
  </el-main>
</el-container>

</template>

<script>
export default {
  data(){
    return{
      name:"",
      activity:"",
      items : [],
      message:''
    }
  },
  mounted(){
  this.myactivity()
  },
  methods: { 
       convertUTCTimeToLocalTime(UTCDateString) {
        if(!UTCDateString){
          return '-';
        }
        function formatFunc(str) {    //格式化显示
          return str > 9 ? str : '0' + str
        }
        var date2 = new Date(UTCDateString);     //这步是关键
        var year = date2.getFullYear();
        var mon = formatFunc(date2.getMonth() + 1);
        var day = formatFunc(date2.getDate());
        var hour = date2.getHours();
        var noon = hour >= 12 ? 'PM' : 'AM';
        hour = hour>=12?hour-12:hour;
        hour = formatFunc(hour);
        var min = formatFunc(date2.getMinutes());
        var dateStr = year+'-'+mon+'-'+day+' '+noon +' '+hour+':'+min;
        return dateStr;
},    
    handle(activityId,type) {
      var that = this;
         this.$router.push({
          path: '/show',
          query: {activityId:activityId,type:type}
         })
      },
    myactivity(){
      var that = this;
  console.log(sessionStorage['userName'])
   this.name = sessionStorage['userName']
   this.$axios.get(`/activity/now?userId=${sessionStorage['userId']}`,{

   }).then(function (response) {
     console.log(response.data.resultCode)
     if(response.data.resultCode == 200){
       that.items = response.data.data
        for(let i of that.items){
       i.startTime = that.convertUTCTimeToLocalTime(i.startTime);
       i.endTime = that.convertUTCTimeToLocalTime(i.endTime);
       }
       }
      if(response.data.resultCode == 500){
        that.message = '当前没有需要评分的活动！'
       console.log(111)
      
     }
   })
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
