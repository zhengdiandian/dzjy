<template>
    <div class="main-wrap">
      <div class="main">
        <div class="tab-wrap">
          <div class="title">交易记录</div>
          <table>
            <tr>
              <th>订单</th>
              <th>交易金额</th>
              <!--<th>交易数量</th>-->
              <th>日期</th>
              <th class="text-right">状态</th>
            </tr>
            <tr v-for="n in 4">
              <td>849374243467EOS</td>
              <td>243.00239871</td>
              <!--<td>824620</td>-->
              <td>2018-07-08&nbsp&nbsp19：00：00</td>
              <td class="text-right">已完成</td>
            </tr>
          </table>
        </div>
        <div class="tab-wrap">
          <div class="title">发布广告记录</div>
          <table>
            <tr>
              <th>订单</th>
              <th>交易金额</th>
              <!--<th>交易数量</th>-->
              <th>日期</th>
              <th class="text-right">状态</th>
            </tr>
            <tr v-for="(item,index) in userData">
              <td>{{item.num}}&nbsp&nbsp{{item.type}}</td>
              <td>-</td>
              <!--<td>824620</td>-->
              <td>{{item.date}}</td>
              <td class="text-right going">进行中</td>
            </tr>
          </table>
        </div>
        <div class="tab-wrap">
          <div class="title">报价记录</div>
          <table>
            <tr>
              <th>订单</th>
              <th>交易金额</th>
              <!--<th>交易数量</th>-->
              <th>日期</th>
              <th class="text-right">状态</th>
            </tr>
            <tr v-for="n in 3">
              <td>849374243467EOS</td>
              <td>243.00239871</td>
              <!--<td>824620</td>-->
              <td>2018-07-08&nbsp&nbsp19：00：00</td>
              <td class="text-right">已完成</td>
            </tr>
          </table>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "adimin",
        data(){
          return {
            userData: [],
            data: []
          }
        },
        created(){
          // this.data = JSON.parse(localStorage.getItem('data'))
          // this.userData = this.data.filter(item => item.user == 'Binky')
        }
    }
</script>

<style lang="scss" scoped>

      .main-wrap{
        width: 100%;
        background:rgba(249,249,249,1);
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
    padding: 30px;
    box-sizing: border-box;
    margin-top: 20px;
    /*border:1px solid rgba(223,229,231,1);*/

    .tab-title{

    }
    .title{
      padding-bottom: 15px;
      height:20px;
      font-size:20px;
      font-family:PingFangSC-Semibold;
      font-weight: 700;
      color:rgba(41,74,147,1);
      line-height:20px;
    }
    table{
      width: 100%;

      tr{
        width: 100%;
      }
      td{
        padding: 10px 0;
        font-size:12px;
        font-family:PingFangSC-Regular;
        color:rgba(68,73,84,1);
      }
      .text-right{
        text-align: right;
      }
      td:nth-child(4){
        color:rgba(106,182,23,1);
        &.going{
          color:rgba(240,48,48,1);
        }
      }
      th.td{
        width: 25%;
      }
      /*th:nth-child(1),*/
      /*td:nth-child(1){*/
        /*width: 170px;*/
      /*}*/
      /*th:nth-child(2),*/
      /*td:nth-child(2){*/
        /*width: 295px;*/
      /*}*/
      /*th:nth-child(3),*/
      /*td:nth-child(3){*/
        /*width: 246px;*/
      /*}*/
      /*th:nth-child(4),*/
      /*td:nth-child(4){*/
        /*!*width: px;*!*/
      /*}*/
      th{
        padding: 20px 0;
        font-size:12px;
        font-family:PingFangSC-Regular;
        color:rgba(147,154,163,1);
        text-align: left;
      }
    }
  }
</style>
