<template>
    <div class="main-wrap">
        <div class="main">
            <div class="purchase">
                <div class="left-wrap">
                    <div class="title">
                        <span>ETH</span>
                    </div>
                    <!-- <el-scrollbar wrap-class="list">
                        <div v-for="n in 1000" :key="n">{{n}}</div>
                    </el-scrollbar> -->
                   <!-- <el-row> -->
                       <div class="tr"><span>用户名</span><span>数量</span><span>操作</span></div>
                         <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 350px; z-index: 100;  " view-class="view-box" :native="false">
                           
                       <div class="tr" v-for="(n ,index) in 199" :key='n' @click="trActived=index" :class="{actived: trActived==index}"><span>用户名</span><span>数量</span><span >操作</span></div>

                        </el-scrollbar>
                   <!-- </el-row> -->

                </div><div class="right-wrap">
                    <div class="title">
                        <span>买方报价</span><span>参考市价3020.20CNY</span>
                    </div>
                    <div class="tr"><span>用户名</span><span>单价</span><span>折扣</span><span>总价</span></div>
                    <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 350px; z-index: 100;  " view-class="view-box" :native="false">
                           
                       <div class="tr" v-for="n in 199" :key='n' ><span>用户名</span><span>数量</span><span >操作</span><span>总价</span></div>

                    </el-scrollbar>


                </div>
            </div>
            <div class="my-msg">
                <div class="msg-title">
                    <span :class="{'actived': msgFlag}">我的报价</span><span>我的广告</span>
                </div>
                <div class="price">
                    <div class="tr tr-title"><span>订单</span><span>价格</span><span>折扣</span><span>总价</span><span>操作</span></div>
                    <el-scrollbar wrap-class="list" tag="div" wrap-style="z-index: 100 ;" view-style="max-height: 150px; z-index: 100;  " view-class="view-box" :native="false">
                           
                       <div class="tr" v-for="n in 30" :key='n' ><span>订单</span><span>价格</span><span>折扣</span><span>总价</span><span class="text-red">操作</span></div>

                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            trActived: 0,
            msgFlag: true
        }
    }

}
</script>
<style lang="scss" scoped>
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
                .title{
                    margin-right: 20px;
                }
                .title+.tr{
                    margin: 10px 0px;
                    cursor: default;
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
            height: 12;
            line-height: 1.5;
            padding: 30px 0px 20px;
        }
        .tr{
                    width: 100%;
                    // height: 36px;
                    padding: 10px 0px;
                    line-height: 1.5;
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
    }
</style>
