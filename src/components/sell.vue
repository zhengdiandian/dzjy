<template>

  
    <div class="main-wrap">
      <div class="guidance" v-if='flag'>
        <img src="../../static/img/guidance8@2x.png" alt="">
        <div class="next" @click='next'></div>
      </div>
        <div class="main" v-show="!flag">
          <div class="notice">
            Attention:
          </div>
          <div class="notice-item">1, Only two ERC20 currency are supported now, others are coming soon.</div>
          <div class="notice-item">2, Block trading amount has to be over 100,000USDT or same value of legal tender.</div>
          <div class="notice-item">3, 0.1% of commission fee will be charged after block trading.</div>
          <div class="issue">
            <div class="issue-title">EOS Asset：{{balance}}</div>
            <div class="issue-info-title">Sell order setting</div>
            <div class="issue-info">sell amount: <input type="text" v-model="num" placeholder="minimum amount is 10,000 EOS"></div>
            <div class="issue-info">Receive currency:
              <div>
                <input class="check" type="checkbox" value="BTC" v-model="icoType" id="BTC">
                <label for="BTC"></label>
                <span>BTC</span>
                <input class="check" type="checkbox" value="ETH" v-model="icoType"  id="ETH">
                <label for="ETH"></label>
                <span>ETH</span>
                <input class="check" type="checkbox" value="LTC" v-model="icoType"  id="USDT">
                <label for="USDT"></label>
                <span>LTC</span>
              </div>
              <span class="btn" @click="submit">issue</span>
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
            icoType: [],
            data:[],
            num:'',
            userInfo: [],
            balance: '',
            flag: true,
          }

        },
      methods: {
          next(){
            this.flag = false
          },
          submit(){
            let token = sessionStorage.getItem('token')
            // debugger
          
            this.icoType.forEach(ico => {
              // debugger
              let data = this.$root.markets.filter(market => {
                // debugger
                return market.market_name == ico}
              )
              let market_id = data[0].markets_id
              this.axios.post('/advertise',{
                token,
                market_id,
                'amount': Number.parseFloat(this.num)
              }).then((response)=>{
                this.$router.push({path:`/index/EOS`})
                console.log(response)
              })
            },this)
            // if(this.num && this.icoType){
            //   return false
            // }
            // debugger
            // var data = JSON.parse(localStorage.getItem('data'))
            //   data.push({
            //   user: 'Binky',
            //   type: this.icoType,
            //   // date: new Date().format("yyyy-MM-dd hh:mm:ss"),
            //   num: this.num
            // })
            // localStorage.setItem('data',JSON.stringify(data))
            // console.log(data)

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
        console.log(this.$root.markets)
        // this.flag = false
      },
    }

</script>

<style lang="scss" scoped>
  .main-wrap{
    width: 100%;
    height: 862px;
    background:rgba(249,249,249,1);
    .guidance{
      width: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      img{
        width: 100%;
        vertical-align: bottom;
      }
      .next{
        cursor: pointer;
         position: absolute;
        top: 31.5%;
        left: 66%;
        opacity: 0;
        width: 3vw;
        height: 20px;
        
      }
    }
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
