<template>
  <div class="guidecon">
    <div class="swiper-container" id="guideswiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="../assets/img/images/slide1.png">
            </div>
            <div class="swiper-slide">
                <img src="../assets/img/images/slide2.png">
            </div>
            <div class="swiper-slide">
                <img src="../assets/img/images/slide2.png">
            </div>
            <div class="swiper-slide">
                <img src="../assets/img/images/slide4.png">
                 <router-link to="/index/home" class='btn'></router-link>
            </div>
        </div>
    </div>
</div>

</template>

<script>
setTimeout(function(){
  new Swiper('#guideswiper');
},200);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = 'scss'>
  @import '../style/usage/guide'
</style>
