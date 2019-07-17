<template>
  <div class="details">
    <me-loading v-if="loading"></me-loading>
    <div v-else>
      <div class="details-content">
        <div class="details-price">￥<span class="price-tip">8888</span></div>
        <div class="details-sold">359件已售</div>
      </div>
      <div class="details-text">
        <h4 class="details-title">{{title}}</h4>
        <p class="details-text-wrap">
          <span>包邮</span>
          <span>月销量 111件</span>
          <span>湖北鄂州</span>
        </p>
      </div>
      <div class="details-evaluate">
        <div class="evaluate-title">商品评价({{items.totalCount}})</div>
        <ul class="evaluate-list">
          <li class="evaluate-item" v-for="(item, i) in items.keywords" :key="i">
            <span>{{item.word}}</span><span>({{item.count}})</span>
          </li>
        </ul>
        <div class="evaluate-content" v-for="(item, index) in items.rateList" :key="index">
          <div class="evaluate-personal">
            <div class="personal-msg">
              <img :src="item.headPic" alt="">
            </div>
            <span class="personal-name">{{item.userName}}</span>
          </div>
          <p class="evaluate-text">{{item.content}}</p>
          <p class="goods-msg">{{item.dateTime}} {{item.skuInfo}}</p>
        </div>
      </div>
      <div class="details-shops-wrap">
        <div class="details-shops">
          <img :src="sellers.shopIcon" alt="">
          <div class="shops-name">
            <h4 class="shops-title">{{sellers.shopName}}</h4>
            <div class="tips">天猫</div>
          </div>
        </div>
        <ul class="details-msg">
          <li v-for="(item, idx) in sellers.evaluates" :key="idx">
            <span>{{item.title}} {{item.score}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import MeLoading from 'base/loading';
  import {getProductSlider} from 'api/product';
  import storage from 'assets/js/storage';
  import {PRODUCT_DETAILS_UPDATE_TIME_INTERVAL} from './config';

  export default {
    name: 'ProductDetails',
    components: {
      MeLoading
    },
    data() {
      return {
        items: {},
        sellers: [],
        detail: [],
        title: '',
        loading: false
      };
    },
    created() {
      this.getDetails(this.$route.params.id);
    },
    methods: {
      getDetails(id) {
        let details = storage.get(this.$route.params.id, []);
        let updateTime;
        const curTime = new Date().getTime();
        if (details && details[id]) {
          updateTime = details[id].updateTime || 0;
          if (curTime - updateTime <= PRODUCT_DETAILS_UPDATE_TIME_INTERVAL) { // 缓存localstorage
            return this.getDetailsByLocalStorage(details[id]);
          } else { // http
            return this.getDetailByHTTP(id).then(() => {
              this.updateLocalStorage(details, id, curTime);
            });
          }
        } else {
          return this.getDetailByHTTP(id).then(() => {
            this.updateLocalStorage(details, id, curTime);
          });
        }
      },
      getDetailsByLocalStorage(details) {
        this.details = details.data;
        return Promise.resolve();
      },
      getDetailByHTTP(id) {
        this.loading = true;
        return getProductSlider(id).then(data => {
          return new Promise(() => {
            if (data) {
              storage.set(this.$route.params.id, data);
              this.items = data.rate;
              this.sellers = data.seller;
              this.title = data.item.title;
              this.detail = data;
              this.loading = false;
              this.$emit('loaded', this.detail);
            }
          });
        });
      },
      updateLocalStorage(details, id, curTime) {
        details = details || {};
        details[id] = {};
        details[id].data = this.content;
        details[id].updateTime = curTime;
        storage.set(this.$route.params.id, details);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .details {
    overflow: hidden;
    width: 100%;
    margin-bottom: 50px;

    &-content {
      height: 40px;
      width: 100%;
      background: linear-gradient(to right, #FF2997, #FF2557);
      @include flex-between();
      color: #fff;
      padding: 0 10px;

      .price-tip {
        font-size: 18px;
      }
    }

    &-sold {
      width: 70px;
      height: 20px;
      background: #ff1a05;
      border-radius: 3px;
      line-height: 20px;
      text-align: center;
    }

    &-text {
      width: 100%;
      height: 80px;
      background: #fff;
      padding: 10px 10px;

      .details-title {
        font-size: 14px;
        color: #000;
        line-height: 20px;
        @include ellipsis();
      }
    }

    &-text-wrap {
      margin-top: 12px;
      display: flex;
      @include flex-between();
      color: $icon-color;
    }

    &-evaluate {
      margin-top: 10px;
      width: 100%;
      background: #fff;
      padding: 15px 10px;

      .evaluate-title {
        font-size: 14px;
      }

      .evaluate-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .evaluate-item {
          background: #fff0f1;
          padding: 6px 8px;
          border-radius: 10px;
          margin: 10px 10px 0 0;
        }
      }
    }

    .evaluate-content {
      .evaluate-personal {
        padding: 10px 0;
        display: flex;
        align-items: center;

        .personal-msg {
          width: 25px;
          height: 25px;
          margin-right: 6px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }

      .evaluate-text {
        color: #000;
        line-height: 17px;
      }

      .goods-msg {
        margin-top: 6px;
        line-height: 18px;
        color: $icon-color;
      }
    }

    .details-shops-wrap {
      width: 100%;
      height: 120px;
      margin-top: 10px;
      background: #fff;
      padding: 10px;

      .details-shops {
        height: 65px;
        width: 100%;
        display: flex;
        margin-bottom: 8px;

        img {
          width: 50px;
          height: 50px;
          border: 1px solid #ccc;
          margin-right: 10px;
        }

        .shops-name {
          display: flex;
          flex-direction: column;
          align-items: start;

          .shops-title {
            font-size: 16px;
            line-height: 30px;
          }

          .tips {
            color: #fff;
            background: #ff1665;
            padding: 2px 5px;
            border-radius: 10px;
          }
        }
      }

      .details-msg {
        padding: 0 20px;
        display: flex;
        @include flex-between();
      }
    }
  }
</style>
