<template>
  <div id="app">
    <my-header></my-header>
    <router-view/>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
*{
    margin: 0;
    padding: 0;
  }
  ul, ol{
    list-style: none;
  }
  body{
    min-width: 1200px;
      height: 100%;
      cursor: default;
      font-family: PingFangSC-Regular, Helvetica, Tahoma, Arial, \5b8b\4f53, sans-serif;
      list-style: none;
      font-size: 14px;
      color:rgba(68,73,84,1);
      /* overflow: hidden; */

    }
#app {
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .sel-list{
    position: absolute;
  //   transform: translateZ(5px);

  // -webkit-transform:translateZ(50px); 
  // -ms-transform:translateZ(5px); 
    width: 80px;
    top: 25px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 30px 0px rgba(41,74,147,0.2);
    border-radius:2px;
    padding: 10px 0;
    z-index: 9000;
    li{
      display: block;
      opacity: 1;
      margin: 0;
      padding: 0;
      height: 14px;
      line-height: 14px;
      padding: 10px 0;
      width: 100%;
      text-align: center;
      font-size:12px;
      font-family:PingFangSC-Regular;
      color:rgba(68,73,84,1);
      z-index: 9000 !important;
    }
  }

}
.text-right{
  text-align: right;
}
.text-red{
  color:rgba(240,48,48,1);
  text-decoration:underline;
}
.text-blue{
  color:rgba(41,74,147,1);
  text-decoration: underline;
}
a{
  color: #fff;
  text-decoration: none;
}
table{
  width: 100%;
  border-collapse: collapse;
  tr{
    width: 100%;
    // padding: 0px 30px;
    box-sizing: border-box;
  }
  td,th{
    text-align: left;
  }
  td:nth-child(1),
  th:nth-child(1){
    padding-left: 30px
  }
  th:nth-last-child(1),
  td:nth-last-child(1){
    padding-right: 30px;
  }
  th{
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight: 400;
    color:rgba(147,154,163,1);
  }
  td{
    font-size:12px;
font-family:PingFangSC-Regular;
color:rgba(68,73,84,1);
  }
}
.tr{
  font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight: 400;
   color:rgba(68,73,84,1);
  span:nth-child(1),
  span:nth-child(1){
    padding-left: 30px
  }
  span:nth-last-child(1),
  span:nth-last-child(1){
    padding-right: 30px;
  }
}
  span{
    display: inline-block;
    box-sizing: border-box;
  }
</style>
