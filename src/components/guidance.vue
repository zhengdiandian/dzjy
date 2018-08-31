<template>
    <div class="wrap">
        <!-- <div class="next"> --> -->
            <div class="guidance" ref="img">
                <img :src="url[0]" alt="">
                <div v-if='step ===0' class="next1"  @click=next(1)></div>
                <div v-if='step ===1' class="next2"  @click=next(2)></div>
                <div v-if='step ===2' class="next3"  @click=next(3)></div>
                <div v-if='step ===3' class="next4"  @click=next(4)></div>
                <div v-if='step ===4' class="next5"  @click=next(5)></div>
                <div v-if='step ===5' class="next6"  @click=next(6)></div>
                <div v-if='step ===6' class="next7"  @click=next(7)></div>
            </div>
        <!-- </div> -->
    </div>
</template>
<script>
    export default{
        data(){
            return {
                url: [
                    '../../static/img/guidance1@2x.png',
                    '../../static/img/guidance2@2x.png',
                    '../../static/img/guidance3@2x.png',
                    '../../static/img/guidance4@2x.png',
                    '../../static/img/guidance5@2x.png',
                    '../../static/img/guidance6@2x.png',
                    '../../static/img/guidance7@2x.png',
                ],
                step:0,
                imgsrc: '../../static/img/guidance1@2x.png'
            }
            
        },

        methods:{
            next(index){
                if(this.step == 6){
                    return this.$router.push('/index/EOS')
                }
                this.step = index 
                this.url.shift()
                console.log(this.url)
                // this.$refs.img.style.backgroundImage= this.url[index]
                // this.$refs.img.style.minWidth= document.body.style.width
                // this,refs.img.style.backgroundRepeat = 'no-repeat'
                // this.$refs.img.style.display= 'none'
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        // min-width: 1440px;
        height: 100%;
        // overflow: hidden;
    }
    .guidance{
        width: 100%;
        position: absolute;
        top:0px;
        left: 0px;
        div{
            cursor: pointer;
            opacity: 0;
        }
        // overflow: hidden;
        // height: 100%;
        // overflow: hidden;
        // position: absolute;
        // top:  0px;
        // right: 0px;
        // width: 100%;
        // min-width: 1440px;
        // height: 1142px;
        // // background-image: '../../static/guidance1@2x.png';
        // background: url('../../static/img/guidance1@2x.png')  no-repeat ;
        // background-position: 0 0;
        // background-color: #000;
        // background-size: 100% ;
        
        
    }
    img{
        width: 100%;
        // float: left;
        vertical-align: bottom;
        // line-height: 0;
        // position: absolute;
        // top:  0px;
        // right: 0px;
        // width: 100%;
        // min-width: 100%;
        // height: 100%;
        // min-width: 1440px;
        
        
    }
    .next1{
        position: absolute;
        top: 33%;
        left: 65%;
        width: 3vw;
        height: 25px;
        background-color: red;
        
    }
    .next2{
        position: absolute;
        top: 22%;
        left: 14%;
        width: 3vw;
        height: 25px;
        background-color: red;
        
    }
    .next3{
        position: absolute;
        top: 51.3%;
        left: 17%;
        width: 3vw;
        height: 20px;
        background-color: red;
        
    }
    .next4{
        position: absolute;
        top: 60.2%;
        left: 77%;
        width: 3vw;
        height: 20px;
        background-color: red;
        
    }
    .next5{
        position: absolute;
        top: 29.8%;
        left: 22%;
        width: 3vw;
        height: 20px;
        background-color: red;
        
    }
    .next6{
        position: absolute;
        top: 44%;
        left: 80.7%;
        width: 3vw;
        height: 20px;
        background-color: red;
        
    }
    .next7{
        position: absolute;
        top: 44%;
        left: 80.7%;
        width: 3vw;
        height: 20px;
        background-color: red;
        
    }
    
</style>
