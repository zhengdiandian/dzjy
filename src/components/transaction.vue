<template>
    <div class="main-wrap">
        <div class="guidance" v-if='flag'>
            <img src="../../static/img/guidance9@2x.png" alt="">
            <div class="next" @click='next'></div>
      </div>
      <div class="main" v-show="!flag" >
        <div class="tab-wrap">
          <div class="title">transcation record</div>
          <div class="tr"><span>Order</span><span>Number</span><span>Amount</span><span>Time</span><span>Status</span></div>
          <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 350px; z-index: 100;  " view-class="view-box" :native="false">
                  
              <div class="tr" v-for="(order, n) in totalOrder" :key='n' ><span>{{order.quotation_id}}&nbsp&nbsp{{order.market}}</span><span>{{order.amount}}</span><span >{{order.amount }}</span><span>{{new Date(order.date*1000).format("yyyy-MM-dd &nbsp&nbsp hh: mm: ss")}}</span><span :class="[status[order.status].calss]">{{status[order.status].text}}</span></div>

          </el-scrollbar>
        </div>
        <div class="tab-wrap">
          <div class="title">releasing sell order record</div>
          <div class="tr"><span>Order</span><span>Number</span><span>Amount</span><span>Time</span><span>Status</span></div>
          <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 350px; z-index: 100;  " view-class="view-box" :native="false">
                  
              <div class="tr" v-for="(item,n ) in adData" :key='n' ><span>{{item.sell_order_id}}&nbsp&nbsp{{item.market}}</span><span>{{item.amount}}</span><span >{{item.amount * item.deal_price }}</span><span>{{new Date(item.date*1000).format("yyyy-MM-dd &nbsp&nbsp hh: mm: ss")}}</span><span :class="[status[item.status].calss]">{{status[item.status].text}}</span></div>

          </el-scrollbar>
        </div>
        <div class="tab-wrap">
          <div class="title">Offer record</div>
         <div class="tr"><span>Order</span><span>Number</span><span>Amount</span><span>Time</span><span>Status</span></div>
          <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 350px; z-index: 100;  " view-class="view-box" :native="false">
                  
              <div class="tr" v-for="(item, n ) in quoteData " :key='n' ><span>{{item.quotation_id}}&nbsp&nbsp{{item.market}}</span><span>{{item.amount}}</span><span >{{item.amount}}</span><span>{{new Date(item.date*1000).format("yyyy-MM-dd &nbsp&nbsp hh: mm: ss")}}</span><span :class="[status[item.status].calss]">{{status[item.status].text}}</span></div>

          </el-scrollbar>
        </div>

      </div>

    </div>
</template>

<script>
    export default {
        name: "adimin",
         methods:{
            next(){
                this.flag = false
                console.log('flag')
            }
        },
        data(){
          return {
            userData: [],
            quoteData: [],
            adData:[],
            status:[
              {text: 'Processing',
              calss: 'text-blue'
              },
              {
              text: 'Done',
              class: 'text-green'
              
            },
            {
              text: 'Cabcel',
              class: 'text-red'
            }
            ],
            flag: true,
          }
        },
        computed:{
            totalOrder(){
                return this.adData.concat(this.quoteData)
            }
        },
        
        created(){
        
          let token = sessionStorage.getItem('token')
          if( token){
            //  console.log('watch',newV,oldV);
             this.axios.post('/getMyQuotations',{           
                'token': token
                }).then(response => {
                    console.log('myQoutatins',response)
                    this.quoteData = response.data.quotations
                })
            this.axios.post('/getMyAdvertise',{
                token
            }).then(response => {
                console.log('ad',response);
                this.adData = response.data.advertises
            })
        }
          // this.data = JSON.parse(localStorage.getItem('data'))
          // this.userData = this.data.filter(item => item.user == 'Binky')
        }
    }
</script>

<style lang="scss" scoped>

//       .tr span:nth-child(1), .tr span:nth-child(1) {
//     padding-left: 0px;
// }
      .main-wrap{
        width: 100%;
        background:rgba(249,249,249,1);
        .guidance{
            width: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 999;
            img{
                width: 100%;
                vertical-align: bottom;
            }
        .next{
            cursor: pointer;
            position: absolute;
            top: 29.8%;
            left: 22%;
            opacity: 0;
            width: 3vw;
            height: 20px;
            background-color: red;
            z-index: 9999;
        }
    }
        .main{
          margin: 0 auto;
          padding-bottom: 32px;
          width: 1200px;
          overflow: hidden;
        }
      }
  .tab-wrap{
    width: 100%;
    background:rgba(255,255,255,1);
    border-radius:4px;
    // padding: 30px;
    box-sizing: border-box;
    margin-top: 20px;
    /*border:1px solid rgba(223,229,231,1);*/

    .tab-title{

    }
    .title{
      padding: 30px 0px 15px 30px;
      padding-bottom: 15px;
      height:20px;
      font-size:20px;
      font-family:PingFangSC-Semibold;
      font-weight: 700;
      color:rgba(41,74,147,1);
      line-height:20px;
    }
    
                .title+.tr{
                    margin: 10px 0px;
                    cursor: default;
                    color:rgba(147,154,163,1);
                }
                .tr{
                  // padding: 0px;
                    width: 100%;
                    height: 36px;
                    margin: 8px 0px;
                    line-height: 36px;
                    cursor: pointer;
                    span:nth-child(1){
                        width: 16%;
                    }
                    span:nth-child(2){
                        width: 25%;
                        // text-align: right;
                    }
                    span:nth-child(3){
                        width: 20%;
                        // text-align: right;
                    }
                    span:nth-child(4){
                        width: 30%;
                        // text-align: right;
                    }
                    span:nth-child(5){
                        width: 9%;
                        text-align: right;
                    }
                }
    // table{
    //   width: 100%;

    //   tr{
    //     width: 100%;
    //   }
    //   td{
    //     padding: 10px 0;
    //     font-size:12px;
    //     font-family:PingFangSC-Regular;
    //     color:rgba(68,73,84,1);
    //   }
    //   .text-right{
    //     text-align: right;
    //   }
    //   td:nth-child(4){
    //     color:rgba(106,182,23,1);
    //     &.going{
    //       color:rgba(240,48,48,1);
    //     }
    //   }
    //   th.td{
    //     width: 25%;
    //   }
    //   /*th:nth-child(1),*/
    //   /*td:nth-child(1){*/
    //     /*width: 170px;*/
    //   /*}*/
    //   /*th:nth-child(2),*/
    //   /*td:nth-child(2){*/
    //     /*width: 295px;*/
    //   /*}*/
    //   /*th:nth-child(3),*/
    //   /*td:nth-child(3){*/
    //     /*width: 246px;*/
    //   /*}*/
    //   /*th:nth-child(4),*/
    //   /*td:nth-child(4){*/
    //     /*!*width: px;*!*/
    //   /*}*/
    //   th{
    //     padding: 20px 0;
    //     font-size:12px;
    //     font-family:PingFangSC-Regular;
    //     color:rgba(147,154,163,1);
    //     text-align: left;
    //   }
    // }
  }
</style>
