<template>
    <div class="main-wrap">
        <div class="shade" v-if= "dowde" >
            <div class="alert">
                <div class="num">
                  ETH资产：247.00
                  <div>EOS=0.002ETH
                    <br>
                    <div>huobipro</div>
                  </div>
                </div>
                <div class="offer">报价</div>
                <div class="price"> EOS</div>
                <div class="inp">
                     <input class="check" @change="reset" v-model="priceFlag" value="1" type="radio" name="price" id="solid" checked="checked">
                    <label for="solid"></label> <span>固定单价&nbsp&nbsp&nbsp</span>
                    <input type="text" class="alert-inp" v-model="price" :disabled="!priceFlag" placeholder="固定单价，例如0.002">

                </div>
                <div class="inp">
                     <input class="check" @change="reset()" type="radio" name="price" id="market"  v-model="priceFlag">
                    <label for="market"></label>
                      <!-- <el-checkbox>备选项</el-checkbox> -->
                    <span>按市价折扣</span>
                    <input type="text" class="alert-inp" v-model="discount" @input="input" :disabled="priceFlag"  placeholder="折扣比例，例如90">
                </div>
                <div class="cancel" @click="cancel">取消</div>
                <div class="submit" >提交报价</div>
            </div>
        </div>
        <div class="main">
            <div class="purchase">
                <div class="left-wrap">
                    <div class="title">
                        <span class="select" @click="showSelectList=!showSelectList" >{{currentCoin}}
                             <ul class="sel-list"  v-show="showSelectList">
                                    
                        
                        <li v-for="item in coins" :key="item" @click='selectCoin(item)'>{{item}}</li>
                        
                             </ul>
                            </span>
                             <span class="icon"></span><span>{{type}}</span>
                    </div>
                    <!-- <el-scrollbar wrap-class="list">
                        <div v-for="n in 1000" :key="n">{{n}}</div>
                    </el-scrollbar> -->
                   <!-- <el-row> -->
                       <div class="tr"><span>用户名</span><span>数量</span><span>操作</span></div>
                         <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 350px; z-index: 100;  " view-class="view-box" :native="false">
                           
                       <div class="tr" v-for="(order ,index) in sellOrders" :key='index' @click="getQuotations(index,order.sell_order_id)" :class="{actived: trActived==index}"><span>{{order.user_name}}</span><span>{{order.amount}}</span><span ><span @click="showDowde">报价</span></span></div>

                        </el-scrollbar>
                   <!-- </el-row> -->

                </div><div class="right-wrap">
                    <div class="title">
                        <span>买方报价</span><span>参考市价{{RP}}CNY</span>
                    </div>
                    <div class="tr"><span>用户名</span><span>单价</span><span>折扣</span><span>总价</span></div>
                    <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 350px; z-index: 100;  " view-class="view-box" :native="false">
                           
                       <div class="tr" v-for="(buyer, index) in currentlyQuotaions" :key='index' ><span>{{buyer.user_name}}</span><span>{{buyer.unit_price}}</span><span >{{buyer.discount}}</span><span>{{buyer.total_price}}</span></div>

                    </el-scrollbar>


                </div>
            </div>
             <div class="my-msg">
                <div class="msg-title">
                    <span :class="{'actived': msgFlag}" @click="changeMy">我的报价</span><span :class="{'actived': !msgFlag}" @click="changeMy">我的广告</span>
                </div>
                <div class="price" v-show="msgFlag">
                    <div class="tr tr-title"><span>订单</span><span>价格</span><span>折扣</span><span>总价</span><span>操作</span></div>
                    <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 150px; z-index: 100;  " view-class="view-box" :native="false">
                           
                       <div class="tr" v-for="(item, i) in myQuotations" :key='i' ><span>{{item.quotation_id}}&nbsp&nbsp{{item.market}}</span><span>{{item.unit_price}}</span><span>{{item.discount}}折</span><span>{{item.total_price}}</span><span class="text-red">取消</span></div>

                    </el-scrollbar>
                </div>
                <div class="my-broadcast" v-show="!msgFlag">
                    <div class="tr tr-title"><span>订单</span><span>时间</span><span>操作</span></div>
                    <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 150px; z-index: 100;  " view-class="view-box" :native="false">
                           
                       <div class="tr" v-for="(ad,n ) in myAdvertise" :key='n' ><span>{{ad.sell_order_id}}&nbsp&nbsp{{ad.market}}</span><span>{{new Date(ad.date*1000).format("yyyy-MM-dd &nbsp&nbsp hh: mm: ss")}}</span><span class="text-red"> <span class="text-blue"><router-link class="text-blue" :to="{name: 'broadcast',params:{id:ad.sell_order_id,index:n}}">查看报价</router-link></span>取消</span></div>

                    </el-scrollbar>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>

export default {
    props:['type','marketID','token'],
    data(){
        return {
            trActived: 0,
            msgFlag: true,
            dowde: false,
            price: "",
            priceFlag: 1,
            discount: "",
            showSelectList: false,
            // userToken: '',
            coins:[],
            currentCoin:'BTC',
            sellOrders:[],
            quotations: [],
            // currentQuotatis:[],
            currentlyQuotaions:[],
            myQuotations:[],
            myAdvertise:[],
            RP:''
        }
    },
    methods:{
        //此方法为数据初始化
        init(){
             this.axios.post('/getCoinsList',{
            "market_id": this.marketID || 1
        })
        .then(response => {
            console.log('coinsList',response)
            this.coins = response.data.coins
            this.currentCoin = this.coins[0]
        })
        this.axios.post('/getSellOrders',{
            'market_id': this.marketID || 1
        }) 
        .then(response =>{
            let data = response.data
            // if(data.ret_code !=='1'){
                this.sellOrders = data.sell_orders
                this.getQuotations(0,this.sellOrders[0]['sell_order_id'])
            // }
            console.log('sellOrders',response)
        })
        },
        //筛选买家报价列表
        filterData(origin, property, value){
            return origin.filter(item => item[property]==value)
        },
        // 选择报价列表的种类
        selectCoin(coinName){
            this.currentCoin = coinName
            this.currentlyQuotaions = this.filterData(this.quotations,'coin_name',this.currentCoin)
            
        },
        //显示我的一栏
        changeMy(){
            this.msgFlag = !this.msgFlag
        },
        //显示报价弹窗
        showDowde(sellID) {
      this.dowde = true;
      document.body.style = "overflow: hidden";
      this.reset();
      
    //   this.curData = this.data[i].buyer.filter(item => {
    //     return item.type === this.curName;
    //   });
    //   console.log(this.curData);
    },
    //重置表单
    reset() {
      this.discount = this.price = "";
    },
    //得到买方报价
    getQuotations(index){
        let id = arguments[1]
        this.trActived = index
        
        this.axios.post('/getQuotations',{
            'sell_order_id': arguments[1]
        }).then(response => {
            console.log('quotations',response);
            this.quotations = response.data.sell_orders
            this.currentlyQuotaions = this.filterData(this.quotations,'coin_name',this.currentCoin)
            console.log('filter',this.currentlyQuotaions)
        }).catch(error => {
            console.error(error)
        })
        this.axios.post('/getCoinPrice',{
            'market': this.type,
            'coin': this.currentCoin,
        }).then(response => {
            console.log('price',response);
            this.RP = response.data.price
        })

    },
    //关闭报价弹窗
    cancel() {
      this.dowde = false;
      document.body.style = "overflow: none";
    },
    //改变购买种类进行数据更新 选择市场
    changeOrder(){
          this.axios.post('/getCoinsList',{
            "market_id": this.marketID || 1
        })
        .then(response => {
            console.log('coinsList',response)
            this.coins = response.data.coins
            this.currentCoin = this.coins[0]
        })
        this.axios.post('/getSellOrders',{
            'market_id': this.marketID || 1
        }) 
        .then(response =>{
            let data = response.data
            // if(data.ret_code !=='1'){
                this.sellOrders = data.sell_orders
            // }
            console.log('sellOrders',response)
        })
    },
    },
    created(){
        this.init()
        
        // debugger
        let token = sessionStorage.getItem('token')
        if( token){
            //  console.log('watch',newV,oldV);
             this.axios.post('/getMyQuotations',{           
                'token': token
                }).then(response => {
                    console.log('myQoutatins',response)
                    this.myQuotations = response.data.quotations
                })
            this.axios.post('/getMyAdvertise',{
                token
            }).then(response => {
                console.log('ad',response);
                this.myAdvertise = response.data.advertises
            })
        }
        
       
    },
    mounted(){
        console.log('sdfds',this.$props);
       
    },
    watch:{
        $route(to, from){
            if(to.params.type){
              this.changeOrder()

            }
            console.log(to,from)
        },
        token(newV,oldV){
           
        }
    }

}
</script>
<style lang="scss" scoped>
input[type="radio"] {
  display: none;
}
 .alert-inp {
      width: 350px;
      border: none;
      outline-style: none;
      border-bottom: 1px solid rgba(223, 229, 231, 1);
      display: inline;
    }
.check + label {
  & + span {
    margin-left: 10px;
    margin-right: 34px;
   
  }
  background-color: white;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  margin: 0px;
  padding: 0px;
  width: 14px;
  height: 14px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 14px;
}
.check:checked + label {
  background-color: green;
}
.check:checked + label:after {
  content: "\2713";
  color: white;
}

.shade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  .alert {
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translateX(-50%);
    box-sizing: border-box;
    padding: 20px 50px 0px 50px;
    width: 600px;
    height: 360px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    .num {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      color: rgba(147, 154, 163, 1);
      line-height: 12px;
      div {
        float: right;
        div {
          padding-top: 5px;
          font-size: 10px;
          font-family: PingFangSC-Regular;
          color: rgba(188, 194, 204, 1);
        }
      }
    }
    .offer {
      padding: 35px 0px 10px 0px;
      text-align: center;
      // margin: 0 auto;
      color: rgba(68, 73, 84, 1);
    }
    .price {
      text-align: center;
      font-family: PingFangSC-Regular;
      color: rgba(68, 73, 84, 1);
      padding-bottom: 60px;
    }
    .inp {
      margin-bottom: 40px;
      input[type="text"] {
        background-color: #fff;
      }
    }
    .cancel {
      position: absolute;
      bottom: 40px;
      font-family: PingFangSC-Medium;
      color: rgba(240, 48, 48, 1);
      left: 185.5px;
      font-weight: 500;
    }
    .submit {
      position: absolute;
      right: 165px;
      bottom: 40px;
      font-size: 14px;
      font-weight: 500;
      font-family: PingFangSC-Medium;
      color: rgba(41, 92, 204, 1);
    }
  }
}



    .main-wrap{
        padding-top: 22px;
        width: 100%;
        background:rgba(249,249,249,1);
    }
    .main{
        margin: 0 auto;
        width: 1200px;
        overflow: hidden;
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
                .select::after{
                    content: '';
                    display: inline-block;
                    border: 5px solid transparent;
                    border-top: 5px solid #000;
                    // margin-left: 0px;
                    position: relative;
                    top: 0px;
                        }
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
                    font-weight: 400;
                    padding: 10px 0;
                    width: 100%;
                    text-align: center;
                    font-size:12px;
                    font-family:PingFangSC-Regular;
                    color:rgba(68,73,84,1);
                    z-index: 9000 !important;
                    }
  }
                .title{
                    margin-right: 20px;
                    span:nth-child(1){
                        position: relative;
                    }
                }
                .icon{
                    display: inline-block;
                    margin: 0px 35px 0px 40px;
                    width: 48px;
                    height: 18px;
                    background-image: url('../../static/img/箭头.png');
                    background-image: image-set(
                        url('../../static/img/箭头.png') 1x,
                        url('../../static/img/箭头@2x.png') 2x
                    );
                    background-image: -webkit-image-set(

                        url('../../static/img/箭头.png') 1x,
                        url('../../static/img/箭头@2x.png') 2x
        );
      }
                .title+.tr{
                    margin: 10px 0px;
                    cursor: default;
                    color:rgba(147,154,163,1);
                }
                
                .tr{
                    width: 100%;
                    cursor: pointer;
                    height: 36px;
                    margin: 8px 0px;
                    line-height: 36px;
                    span:nth-child(1){
                        width: 220px;
                    }
                    span:nth-child(2){
                        width: 150px;
                    }
                    span:nth-child(3){
                        width: 149px;
                        text-align: right;
                    }
                    span:nth-child(3) > span{
                        display: inline-block;
                        width:64px;
                        height:24px;
                        color: #FFF;
                        font-weight: 400;
                        text-align: center;
                        padding: 0px;
                        font-size:12px;
                        line-height: 24px;
                        background:rgba(106,182,23,1);
                        border-radius:2px;
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
                        width: 220px;
                    }
                    span:nth-child(2){
                        width: 234px;
                    }
                    span:nth-child(3){
                        width: 50px;
                        // text-align: right;
                    }
                    span:nth-child(4){
                        width: 176px;
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
           
        }
    }
                    .list{
                        max-height: 200px;
                        height: 400px;
                        z-index: 1000;
                    }

    //我的订单我的广告
    .my-msg{
        width: 100%;
        box-sizing: border-box;
        height:300px;
        margin: 20px 0px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(223,229,231,1);
        .msg-title{
            padding-left: 30px;
            span{
                display: inline-block;
                padding: 20px 0px 10px 0px;
                margin-right: 110px;
                // height:20px;
                font-size:20px;
                font-family:PingFangSC-Semibold;
                color:rgba(41,74,147,1);
                font-weight: 700;
            }
            span.actived{
                border-bottom: 5px solid rgba(41,74,147,1);
            }
        }
        .tr.tr-title{
            color:rgba(147,154,163,1);
            height: 12;
            line-height: 1.5;
            padding: 30px 0px 20px;
        }
        .tr{
                    width: 100%;
                    // height: 36px;
                    padding: 10px 0px;
                    line-height: 1.5;
                   
                }
        .price .tr{
            span:nth-child(1){
                        width: 220px;
                    }
            span:nth-child(2){
                width: 307px;
            }
            span:nth-child(3){
                width: 190px;
                
            }
            span:nth-child(4){
                width: 380px;
            
            }
            span:nth-child(5){
                width: 100px;
                text-align: right;
            }
        }
        .my-broadcast{
             span:nth-child(1){
                        width: 50%;
                    }
            span:nth-child(2){
                width: 25%;
            }
            span:nth-child(3){
                width: 25%;
                text-align: right;

                
            }
        }
    }
</style>
