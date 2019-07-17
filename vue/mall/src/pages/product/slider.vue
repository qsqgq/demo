<template>
  <div class="swiper-wrapper">
    <me-loading v-if="!sliders.length"></me-loading>
    <me-slider :data="sliders" :direction="direction" :loop="loop" :interval="interval" :pagination="pagination" v-else>
      <swiper-slide v-for="(item, index) in sliders" :key="index">
        <a href="javascript:;" class="slider-link">
          <img :src="item" alt="" class="slider-img">
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
  import MeSlider from 'base/slider';
  import {swiperSlide} from 'vue-awesome-swiper';
  import {sliderOptions} from './config';
  import {getProductSlider} from 'api/product';
  import MeLoading from 'base/loading';
  export default {
    name: 'ProductSlider',
    components: {
      MeSlider,
      swiperSlide,
      sliderOptions,
      getProductSlider,
      MeLoading
    },
    data() {
      return {
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination,
        sliders: []
      };
    },
    created() {
      this.getSliders(this.$route.params.id);
    },
    methods: {
      getSliders(id) {
        this.loading = true;
        return getProductSlider(id).then(data => {
          return new Promise(resolve => {
            if (data) {
              this.sliders = data.item.images;
              this.loading = false;
              resolve();
            }
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-wrapper{
    width: 100%;
    height: 350px;
  }
  .slider-link{
    display: block;
  }
  .slider-link,
  .slider-img{
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
