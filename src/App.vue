<template>
  <div class="default">
    <slot></slot>
    <div class="item" v-for="item in list" >
      <div class="imgDiv">
        <img class="pic" :src="item.picAddress"/>
        <i v-if="false" class="hot">
          <em></em>
        </i>
      </div>
      <div class="desc">
        <p class="row1">
          <span class="title">{{item.title}}-价值{{item.value}}元代金券免费抢</span>
          <span class="btn">抢</span>
        </p>
        <p class="row2">
          <span class="address">{{item.regionName+" "+item.distance}}</span>
          <span class="number">{{item.userNum}}人关注</span>
        </p>
      </div>
    </div>
    <div v-if="moreModule" class="acd-toggle mb-line-tb" @click="getDineList(config.moreSize)">
      <span>查看更多</span><i class="mb-arrow arrow-bottom "></i>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import "~@dp/mbase-style/src/less/base/tool.less";
  @import "./skin/index.less";
</style>
<script>
    import Geo from '@dp/geo'
    export default{
        data(){
            return{
                list:[
                    /*{
                        "title":"蜀口令重庆美蛙鱼头",
                        "userNum":"72877",
                        "picAddress":"http://p0.meituan.net/activityback/c672a9f66454e81e05fa6d83db8df6f43899269.jpg",
                        "value":"214",
                        "regionName":"徐家汇",
                        "distance":"712m"
                    }*/
                ],
                moreModule:true,
                lng:undefined,
                lat:undefined,
                cityId:undefined
            }
        },
        ready(){
             // 外部可设置定位环境
             var that = this;
             Geo(function(config){
                that.lng = config.lng || "";
                that.lat = config.lat || "";
                that.cityId = config.cityId || 1;
                that.getDineList(that.config.firstSize);
             });

        },
        methods:{
            getDineList(len){
                var params = {
                    type:6,//休闲娱乐
                    index:this.list.length,
                    size:len,
                    cityId:this.cityId,
                    longitude:this.lng,
                    latitude:this.lat
                }
                var that = this;
                this.getFreeDineList(params).then((json)=>{
                    if(json&&json.activities){
                        if(json.activities.length<len){
                            that.moreModule = false;
                        }
                        that.list.concat(json.activities);
                    }else if(that.list.length < 1){
                        that.$children.forEach((it)=>{
                            it.$destroy(true);
                        });
                        that.$destroy(true);
                    }
                },(err)=>{
                     that.$children.forEach((it)=>{
                        it.$destroy(true);
                     });
                     that.$destroy(true);
                });
            }
        }
    }
</script>
