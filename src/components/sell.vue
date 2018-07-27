<template>
    <div class="main-wrap">
        <div class="main">
          <div class="notice">
            注意：
          </div>
          <div class="notice-item">1，Client Wallet目前仅支持ERC20币种，其他支持币种正在开发中…</div>
          <div class="notice-item">2，大宗交易发起金额必须大于1000.00USDT或等值法币</div>
          <div class="notice-item">3，Block Trading完成后，平台收取发起方0.1%的手续费</div>
          <div class="issue">
            <div class="issue-title">EOS资产：{{balance}}</div>
            <div class="issue-info-title">出售设置</div>
            <div class="issue-info">出售数量: <input type="text" v-model="num" placeholder="最小可出售5000.00EOS"></div>
            <div class="issue-info">接收币种:
              <div>
                <input class="check" type="checkbox" value="BTC" v-model="icoType" name="type" id="1">
                <label for="1"></label>
                <span>BTC</span>
                <input class="check" type="checkbox" value="ETH" v-model="icoType" name="type" id="2">
                <label for="2"></label>
                <span>ETH</span>
                <input class="check" type="checkbox" value="USDT" v-model="icoType" name="type" id="3">
                <label for="3"></label>
                <span>USDT</span>
              </div>
              <a href="/index.html" class="btn" @click="submit">发布</a>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    
    
    // var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
    // console.log(time1);
    export default {
        name: "issue",
        data(){
          return {
            icoType: '',
            data:[],
            num:'',
            userInfo: [],
            balance: ''
          }

        },
      methods: {
          submit(){
            // if(this.num && this.icoType){
            //   return false
            // }
            debugger
            var data = JSON.parse(localStorage.getItem('data'))
              data.push({
              user: 'Binky',
              type: this.icoType,
              // date: new Date().format("yyyy-MM-dd hh:mm:ss"),
              num: this.num
            })
            localStorage.setItem('data',JSON.stringify(data))
            console.log(data)
          }
      },
      computed:{
        // balance(){
        //   debugger
        //   let balance = this.userInfo.filter((item) => item.coin_type == 'EOS')
        //   return balance[0]['coin_balance']
        // }
      },
      created(){
        let token = sessionStorage.getItem('token')
          if( token){
            this.axios.post('/getUserInfo',{
              token
            })
            .then(response => {
              console.log('user',response);
              this.userInfo = response.data.balances
              this.balance = this.userInfo.filter((item) => item.coin_type == 'EOS')[0].coin_balance
            })
           
        }
      },
    }

</script>

<style lang="scss" scoped>
  .main-wrap{
    width: 100%;
    height: 862px;
    background:rgba(249,249,249,1);
    .main{
      margin: 0 auto;
      width: 1200px;
      padding-top: 20px;
      .notice{
        padding-bottom: 15px;
        font-size:12px;
        font-family:PingFangSC-Semibold;
        font-weight: 700;
        color:rgba(68,73,84,1);
        line-height:12px;
      }
      .notice-item{
        font-size:12px;
        font-family:PingFangSC-Regular;
        color:rgba(68,73,84,1);
        padding-bottom: 10px;
      }
      .issue{
        box-sizing: border-box;
        width: 100%;
        height:360px;
        padding: 0 30px;
        margin-top: 15px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        /*border:.5px solid rgba(223,229,231,1);*/
        .issue-title{
          padding: 20px 0;
          height:18px;
          font-size:18px;
          font-family:PingFangSC-Semibold;
          color:rgba(68,73,84,1);
          line-height:18px;
          font-weight: 500;
          border-bottom:1px solid rgba(223,229,231,1);
        }
        .issue-info-title{
          height:12px;
          margin-top: 30px;
          font-size:12px;
          font-family:PingFangSC-Regular;
          color:rgba(147,154,163,1);
          line-height:12px;
        }
        .issue-info{
          margin-top: 30px;
          font-family:PingFangSC-Regular;
          color:rgba(68,73,84,1);
          input[type=text]{
            width: 290px;
            margin-left: 20px;
            border: none;
            outline-style: none;
            border-bottom:1px solid rgba(223,229,231,1);
            display: inline;
          }
          div{
            display: inline-block;
            margin-left: 20px;
          }
          .btn{
            display: block;
            margin: 70px auto 0 auto;
            text-align: center;
            width:370px;
            height:44px;
            line-height: 44px;
            color: #fff;
            background:rgba(41,74,147,1);
            border-radius:4px;
          }
          .check{
            display: none;
          }
          .check + label{
            & + span{
              margin-left: 10px;
              margin-right: 60px;
              color:rgba(68,73,84,1);

            }
            background-color: white;
            border-radius: 5px;
            border:1px solid #d3d3d3;
            margin: 0px;
            padding: 0px;
            width:14px;
            height:14px;
            display: inline-block;
            text-align: center;
            vertical-align: middle;
            line-height: 14px;
          }
          .check:checked + label{
            background-color:green;

          }
          .check:checked + label:after{
            content:"\2713";
            color: white;
          }
        }
      }
    }
  }
</style>
