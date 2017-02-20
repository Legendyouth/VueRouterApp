<template>
<div class="home" id='home'>
   <header>
        <ul>
          <li class="yo-ico homemenu">&#xe745;</li>
          <li>
             <ul id="title">
              <li v-for='(item,index) in title' @click='TitlecurActive(index)' :class="TitleactiveIndex == index ? 'active' : ''">{{item}}</li>
             </ul>
          </li>
          <li class="yo-ico sm">&#xe684;</li>
        </ul>
    </header>
    <div class="homesection">
        <div class="swiper-container" id="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide swiper-flex">
                <nav>
                   <ul id="nav">
                      <li v-for='(item,index) in nav' :class="NavactiveIndex == index ? 'active' : ''" @click='NavcurActive(index)'>
                        {{item}}
                      </li>
                   </ul>
                </nav>
                <div class="sectioncontent">
                  <div class="swiper-container" id="swiper-main">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                          <div class="homescroll" id="homescroll">
                              <div class="scrolldiv">
                                  <div class="head">
                                     <img src="../assets/img/images/arrow.png" alt="">
                                     <span>下拉刷新</span>
                                  </div>
                                  <ul v-for="(item,index) in datas">
                                     <li>
                                        <img :src="item[0].img">
                                        <b>{{item[0].title}}</b>
                                     </li>
                                     <li></li>
                                     <li>
                                         <img :src="item[1].img">
                                        <b>{{item[1].title}}</b>
                                     </li>
                                   </ul>
                                   <div class="foot">
                                      <img src="../assets/img/images/arrow.png" alt="">
                                      <span>上拉加载</span>
                                   </div>
                              </div>
                          </div>
                      </div>
                      <div class="swiper-slide">
                          足球美女...
                          <p>
                            <p>
                              <input type="checkbox"  v-model='chName' value='zhangsan'  id="zhangsan" >
                              <label for="zhangsan">zhangsan</label>
                            </p>
                            <p>
                              <input type="checkbox"  v-model='chName'  value='lisi' id="lisi" >
                              <label for="lisi">lisi</label>
                            </p>
                            <p>
                              <input type="checkbox"  v-model='chName' value='wangwu'  id="wangwu" >
                              <label for="wangwu">wangwu</label>
                            </p>
                            <p>{{chName}}</p>
                          </p>
                          <p>
                            <input type="radio" name="sex" value="男" v-model='rrr'>男<input type="radio" name="sex" value="女" v-model='rrr'>女
                            <p>{{rrr}}</p>
                          </p>
                          <p>
                            <select v-model='city'>
                                <option v-for='it in citys' :value='it.name'>{{it.id}}</option>
                            </select>
                            <p>{{city}}</p>
                          </p>
                      </div>
                      <div class="swiper-slide">
                          足球先生...<br>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="swiper-slide">
                关注......
            </div>
          </div>
        </div>
    </div>
</div>
</template>
<script type="text/javascript">
import Vue from 'vue'
var myswiper = null;
export default {
  name: 'hello',
  data () {
    return {
       title:['热点','关注'],
      nav:['足球现场','足球美女','足球先生'],
      datas:[],
      arrs:null,
      NavactiveIndex:0,
      TitleactiveIndex:0
    }
  },
   methods:{
    NavcurActive(index){
     myswiper[1].slideTo(index);
    },
    TitlecurActive(index){
      myswiper[0].slideTo(index);
    }
  },
  mounted(){
    this.$http.get('../static/mock/livelist.json')
      .then(
          (da) => {
            let arr1=[];
            let arr = da.body.data;
            for(let j = 0,len = Math.ceil(arr.length/2);j<len;j++){
              arr1[j] = [];
              arr1[j].push(arr[j*2]);
              arr[j*2+1] && arr1[j].push(arr[j*2+1]);
            }
            this.datas = arr1;
          },
          (err) => {
            console.log(err);
          }
        )
      var _this = this;
      setTimeout(function(){
        myswiper = new Swiper('.swiper-container',{
          onSlideChangeStart:function(swiper){
              _this.NavactiveIndex = myswiper[1].activeIndex;
              _this.TitleactiveIndex = myswiper[0].activeIndex;
            }
        });
        var myScroll = new IScroll("#homescroll", {
            scrollY:true,
            probeType: 3,
            bindToWrapper:true,
            "onScrollMove":function(){return false},
            "onScrollEnd":function(){return false}
        });
        // 下拉刷新和上拉加载
        // var myScroll = this.widgets.homeListScroll; // 获取iscroll的实例
        var scrollSize = 30;
        // 隐藏下拉刷新
        myScroll.scrollBy(0,-scrollSize);
        // 获取head中的img及head当前的状态
        var headImg = $(".head img");
        var topImgHasClass = headImg.hasClass("up");
        var footImg = $(".foot img");
        var bottomImgHasClass = footImg.hasClass("down");
        // 当滚动的时候
        myScroll.on("scroll",function(){
            // 获取当前滚动条的位置
            var y = this.y;
            // 计算最大的滚动范围
            var maxY = this.maxScrollY - y;
            //console.log(maxY);
           // console.log(y)
            // 如果是下拉
            if(y>=0){
               !topImgHasClass && headImg.addClass("up");
                return "";
            }
            // 如果是上拉
            if(maxY>=0){
               !bottomImgHasClass && footImg.addClass("down");
                return "";
            }
        })

        // x当滚动结束刷新数据时
        myScroll.on("scrollEnd",function(){
            if(this.y >= -scrollSize && this.y < 0){
                myScroll.scrollTo(0,-scrollSize);
                headImg.removeClass("up");
            }else if(this.y>=0){
                headImg.attr("src","./static/img/images/ajax-loader.gif");
                setTimeout(function(){
                    myScroll.scrollTo(0,-scrollSize);
                    headImg.removeClass("up");
                    headImg.attr("src","./static/img/images/arrow.png");   
                },1500)
            }
            // 计算最大的滚动范围
            var maxY = this.maxScrollY - this.y;
            var self = this;
            if(maxY>-scrollSize && maxY<0){
                myScroll.scrollTo(0,this.maxScrollY+scrollSize);
                footImg.removeClass("down");
            }else if(maxY>=0){
                footImg.attr("src","./static/img/images/ajax-loader.gif");
                setTimeout(function(){
                    footImg.attr("src","./static/img/images/arrow.png");
                    myScroll.refresh();
                },1000);
            }
        })

      },300);
  }
}
</script>