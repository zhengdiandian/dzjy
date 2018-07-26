<template>
    <header>
        <div class="wrapper">
            <div class="logo">
                <a href="/"><span></span></a>
            </div>
            <ul class="nav-center nav-left ">
                <!-- <router-link to="/index" @click="()=>false"> -->
                <li ><router-link active-class="nav-actived" :to="{name:'index', params:{
                    type:selectValue
                }}" >购买{{selectValue}}</router-link> <span class="select "  @click="showSel = !showSel" ></span>
                    <ul class="sel-list" v-show="showSel">
                        <li v-for="item in marketData" @click = changeSelect(item) :key="item.markets_id">{{item.market_name}}</li>
                        <!--<li>{{}}</li>-->
                        <!--<li>ETH</li>-->
                        <!--<li>ETH</li>-->
                    </ul>
                </li>
                <!-- </router-link> -->
                <li :class="{'nav-actived': current == 2}" @click=" num =2"><router-link to="/sell" active-class="nav-actived">发布广告</router-link></li>
                <li :class="{'nav-actived': current == 3}"><router-link to='/transaction' active-class="nav-actived" @click="op=0.5" >交易管理</router-link> <span class=""></span></li>
            </ul>
        <ul class="nav-center nav-right">
            <li>
              <!--<a href="">注册</a><span>&nbsp或&nbsp</span><a href="">登入</a>-->
              <a href="">jack</a>
            </li>
            <li class="lang select">English</li>
        </ul>
        </div>
    </header>

</template>

<script>
    export default{
        data(){
            return {
                showSel: false,
              num: 1,
              selectList: ['EOS','ETH','BTC','XEM','BTM','QTUM'],
              selectValue: 'EOS',
              current: 2,
              op: 1,
              marketData: []

            }
        },
      props:{
        // current: {
        //   type: Number,
        //   default: 1
        // }
      },
      methods: {
          changeSelect(options){
              this.opacity = 1
            this.selectValue = options.market_name
            this.showSel = !this.showSel
            this.$router.push({
                name: 'index',
                params: {
                    type: options.market_name,
                    marketID: options.markets_id
                },
                
            })
            // this.$emit('msgFunc',this.selectValue)
            // window.localStorage.setItem('selected', this.selectValue)
          }
      },
      created(){
           this.axios.post('/getMarketsList').then(response => {
            console.log(response)
            this.marketData = response.data.markets
        })
      },
      beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是改组件被复用时调用
    // if(this.$route.name == 'index'){
    //         this.opacity = 1
    //     }else{
    //         this.opacity =.5
    //     }
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },

      beforeMount(){
          // this.current = 2
      }
    }

</script>
<style lang="scss" scoped>


header {
  background: rgba(41, 74, 147, 1);
  width: 100%;
  .wrapper {
    position: relative;
    height: 80px;
    margin: 0 auto;
    width: 1200px;
  }
  .nav-center {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .logo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    /*margin-right: 100px;*/
    span{
      display: inline-block;
      width: 97px;
      height: 24px;
      background-image: url('../../static/img/LOGO.png');
      background-image: image-set(
          url('../../static/img/LOGO.png') 1x,
          url('../../static/img/LOGO@2x.png') 2x
      );
      background-image: -webkit-image-set(

          url('../../static/img/LOGO.png') 1x,
          url('../../static/img/LOGO@2x.png') 2x
      );
    }
  }
  ul li {
    display: inline;

  }
  .nav-left {
    float: left;
    margin-left: 200px;
    li {
      margin-right: 80px;
      font-size: 14px;
      line-height: 14px;
      font-family: PingFangSC-Medium;
      color: rgba(255, 255, 255, 1);
    //   opacity: .5;
    
      z-index: 999;
      a{
          opacity: .5;
      }

    }
    .nav-actived{


      opacity: 1  ;
    }
    a{
        font-family: PingFangSC-Medium;

    }
  }
  .nav-right{
      float: right;
      right: 0px;
        li a{
          opacity: 1;
      }
      li span{
          color: #fff;
          opacity: .5;
      }
      li{
        //   text-align: top;
        // vertical-align: top;
          display: inline;
      }
      .lang{
          color: #ffffff;
          font-size: 12px;
        //   height: 16px;
        // line-height: 14px;
        //   text-align: top;
          vertical-align: top;
          margin-left: 40px;
      }
  }


  .select{
      position: relative;

  }
  .select::after{
      content: '';
      display: inline-block;
      border: 5px solid transparent;
      border-top: 5px solid #fff;
      margin-left: 10px;
      position: relative;
      top: 2px;
  }

}
</style>
