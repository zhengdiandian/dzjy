<template>
    <div class="main-wrap">
        <div class="guidance" v-if='flag'>
            <img src="../../static/img/guidance10@2x.png" alt="">
            <div class="next" @click='next'></div>
      </div>
        <div class="main" v-show="!flag">
            <div class="purchase">
                <div class="left-wrap">
                    <div class="title">
                        <span>My sell order</span>
                    </div>
                    
                    <!-- <el-scrollbar wrap-class="list">
                        <div v-for="n in 1000" :key="n">{{n}}</div>
                    </el-scrollbar> -->
                   <!-- <el-row> -->
                       <div class="tr"><span>Order</span><span>Time</span></div>
                         <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 350px; z-index: 100;  " view-class="view-box" :native="false">
                           
                       <div class="tr" v-for="(item ,index) in myAdvertise " :key='index' @click="clickTr(index, item.sell_order_id)" :class="{actived: trActived==index}"><span>{{item.sell_order_id}}&nbsp&nbsp{{item.market}}</span><span >{{new Date(item.date*1000).format("yyyy-MM-dd &nbsp&nbsp hh: mm: ss")}}</span></div>

                        </el-scrollbar>
                   <!-- </el-row> -->

                </div><div class="right-wrap">
                    <div class="title">
                        <span>Buyer's offer</span><span>Reference price:{{marketPrice}}CNY</span>
                    </div>
                    <div class="tr"><span>User name</span><span>Unit price</span><span>Discount</span><span>Total price</span><span>make a bargain</span></div>
                    <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 350px; z-index: 100;  " view-class="view-box" :native="false">
                           
                       <div class="tr" v-for="(item, index) in myQuotations" :key='index' ><span>{{item.user_name}}</span><span>{{item.amount}}</span><span >{{item.discount | num}}</span><span>{{item.total_price}}</span><span class="text-blue">make a bargain</span></div>

                    </el-scrollbar>


                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:['id','token'],
    data(){
        return {
            trActived: 0,
            myAdvertise:[],
            myQuotations:[],
            marketPrice: this.$route.params.marketPrice,
            flag: true,
            time: null
            
            
        }
    },
    methods:{
        clickTr(index,id){
            this.trActived = index
            let getQuotations = () =>{
                this.axios.post('/getQuotations',{
                    'sell_order_id': id
                }).then(response => {
                    this.myQuotations = response.data.sell_orders
                    console.log('dsfdsf',response)
                })
                    }
            getQuotations()
            clearTimeout(this.time)
            let timer =  (date) => {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    getQuotations()
                    timer(date)
                }, date)
                // return timer()

            }
            timer(2000)
            // this.timer = setTimeout(() =>{
            //     getQuotations()
            // },2000)
            
        //     this.axios.post('/getQuotations',{
        //     'sell_order_id': id
        // }).then(response => {
        //     this.myQuotations = response.data.sell_orders
        //     console.log('dsfdsf',response)
        // })
        },
        next(){
            this.flag = false 
        }
    },
    created(){
        // this.axios.get(`http://market.jinse.com/api/v1/tick/BITFINEX:${this.type}USD?unit=CNY`).then(responese => {
        //     console.log('changkaojia',responese)
        //     this.marketPrise = responese.data.close
        // })
        this.trActived = this.$route.params.index
         let token = sessionStorage.getItem('token')
        if( token){
            //  console.log('watch',newV,oldV);
             
            this.axios.post('/getMyAdvertise',{
                token
            }).then(response => {
                console.log('ad',response);
                this.myAdvertise = response.data.advertises
            })
        }
        // this.axios.post('/getMyAdvertise',{
        //         token
        //     }).then(response => {
        //         console.log('ad',response);
        //         this.myAdvertise = response.data.advertises
        //     })
        this.axios.post('/getQuotations',{
            'sell_order_id': this.id
        }).then(response => {
            this.myQuotations = response.data.sell_orders
            console.log('dsfdsf',response)
        })
        console.log(1)
    }

}
</script>
<style lang="scss" scoped>
    .main-wrap{
        padding-top: 22px;
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
        top: 29.9%;
        left: 22%;
        opacity:0;
        width: 3vw;
        height: 23px;
        // background-color: red;
      }
    }
    }
    .main{
        margin: 0 auto;
        width: 1200px;
        height: 868px;
        .purchase{
            width: 100%;
            height: 500px;
            .title{
                padding: 20px 0px 10px 30px;
                box-sizing: border-box;
                font-size:20px;
                font-family:PingFangSC-Semibold;
                color:rgba(68,73,84,1);
                font-weight: 700;
                border-bottom: .5px solid rgba($color: #dfe5e7, $alpha: 1.0)
                            }
            
            .left-wrap{
                // display: block;
                box-sizing: border-box;
                float: left;
                width:520px;
                height:500px;
                
                // overflow: hidden;
                background:rgba(255,255,255,1);
                border:.5px solid rgba(223,229,231,1);
                .title{
                    margin-right: 20px;
                }
                .title+.tr{
                    margin: 10px 0px;
                    cursor: default;
                    color:rgba(147,154,163,1);
                }
                .tr{
                    width: 100%;
                    height: 36px;
                    margin: 8px 0px;
                    line-height: 36px;
                    cursor: pointer;
                    span:nth-child(1){
                        width: 50%;
                    }
                    span:nth-child(2){
                        width: 50%;
                        text-align: right;
                    }
                }
                // .tr:not(.tr:nth-child(1)){
                //     height: 36px;
                //     background-color: black;
                // }
                // td{
                //     height: 36px;
                //     line-height:36px;
                // }
                // td > span{
                //     display: block;

                // }
                // tr{
                //     margin: 8px 0px;
                // }
                // tr::after{
                //     content: '';
                    
                //     display: block;
                //     margin: 8px 0px;
                // }
                .tr.actived{
                    background:rgba(241,241,241,1);
                }

                
            }
            .right-wrap{
                float: right;
            
                width:680px;
                height:500px;
                background:rgba(241,241,241,1);
                border-radius:4px;
                .title {
                    & > span:nth-child(2){

                    margin-left: 60px;
                    font-size:14px;
                    font-family:PingFangSC-Regular;
                    color:rgba(147,154,163,1);
                    }
                }
                .title+.tr{
                    margin: 10px 0px;
                    color:rgba(147,154,163,1);
                }
                .tr{
                    width: 100%;
                    height: 36px;
                    margin: 8px 0px;
                    line-height: 36px;
                    span:nth-child(1){
                        width: 25%;
                    }
                    span:nth-child(2){
                        width: 20%;
                    }
                    span:nth-child(3){
                        width: 10%;
                        // text-align: right;
                    }
                    span:nth-child(4){
                        width: 16%;
                        // float: right;
                        text-align: right;

                    }
                    span:nth-child(5){
                        width: 28%;
                        // float: right;
                        text-align: right;

                    }
                    
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                }
            }
            .list{
                max-height: 200px;
                height: 400px;
                z-index: 1000;
            }
           
        }
    }
</style>
