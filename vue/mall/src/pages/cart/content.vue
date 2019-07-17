<template>
    <div class="content">
      <div class="content-header">
        <div class="content-address">
          <i class="iconfont icon-home"></i>
          朝阳区三环到...
        </div>
        <div class="content-edit">编辑商品</div>
      </div>
      <div class="content-cart">
        <div class="content-title">
          <div class="content-tipAll" :class="{'checked':checkedAll}" @click="checkAllItem"></div>
          <div class="content-freight">
            <i class="iconfont icon-msg"></i>
            已免运费
          </div>
        </div>
        <transition-group name="list" class="content-list" tag="ul">
          <li class="content-item" v-for="(item, idx) in items" :key="idx">
            <div class="item-wrap">
              <div class="content-tips" :class="{'checked':item.checked}" @click="selected(item)"></div>
              <img :src="item.picUrl" alt="" class="content-pic">
              <div class="item-text">
                <p class="item-title">{{item.name}}</p>
                <p class="item-text-content" v-if="item.msg!==''">{{item.msg}}</p>
              </div>
            </div>
            <div class="item-price-wrap">
              <div></div>
              <div class="item-price">¥<span>{{item.UnitPrice}}</span></div>
              <div class="item-num">
                <div class="item-reduce" @click="reduce(item)">-</div>
                <input class="item-number" v-model="item.num" value="item.num"/>
                <div class="item-increase" @click="add(item)">+</div>
              </div>
            </div>
            <p class="content-del"><a href="javascrtpt:;" @click="cartDelete(item)">删除</a></p>
          </li>
        </transition-group>
      </div>
      <div class="content-total">
        <div class="content-totalPrice">合计：<strong>¥{{totalPrice}}.00</strong></div>
        <input class="content-settlement" :value="'结算('+totalNum+')'"/>
      </div>
      <me-log v-if="added" content="宝贝不能再减少了"></me-log>
    </div>
</template>

<script>
  import {getCartItem} from './config';
  import MeLog from 'base/log';
  export default {
    name: 'CartContent',
    components: {
      MeLog
    },
    data() {
      return {
        items: [],
        totalPrice: 0,
        totalNum: 0,
        checkedAll: false,
        curItem: '',
        added: false
      };
    },
    created() {
      this.getTtems();
    },
    methods: {
      getTtems() {
        this.items = getCartItem;
      },
      reduce(number) {
        number.num--;
        if (number.num < 1) {
          this.added = true;
          setTimeout(() => {
            this.added = !this.added;
          });
          number.num = 1;
        }
        this.checkTotalPrice();
        this.checkTotal();
      },
      add(number) {
        number.num++;
        this.checkTotalPrice();
        this.checkTotal();
      },
      selected(item) {
        if (typeof item.checked === 'undefined') {
          this.$set(item, 'checked', true);
        } else {
          item.checked = !item.checked;
        }
        this.checkTotalPrice();
        this.checkTotal();
        let itemsChecked = [];
        this.items.forEach((item, index) => {
          if (item.checked) {
            itemsChecked.push(item);
          }
        });
        if (itemsChecked.length === this.items.length) {
          this.checkedAll = true;
          this.checkTotalPrice();
          this.checkTotal();
        } else {
          this.checkedAll = false;
        }
      },
      checkAllItem() {
        this.items.forEach((item, index) => {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true);
            this.checkedAll = true;
          } else if (item.checked) {
            this.checkedAll = false;
            item.checked = undefined;
          }
        });
        this.checkTotalPrice();
        this.checkTotal();
      },
      checkTotalPrice() {
        this.totalPrice = 0;
        this.items.forEach((item, index) => {
          if (item.checked) {
            this.totalPrice += parseInt(item.num) * item.UnitPrice;
          }
        });
      },
      checkTotal() {
        this.totalNum = 0;
        this.items.forEach((item, index) => {
          if (item.checked) {
            this.totalNum += parseInt(item.num);
          }
        });
      },
      cartDelete(item) {
        this.curItem = item;
        let index = this.items.indexOf(this.curItem);
        this.items.splice(index, 1);
        setTimeout(() => {
          this.$emit('remove-item');
        }, 100);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .content {
    width: 100%;
    overflow: hidden;
    &-header {
    width: 100%;
    height: 50px;
    margin-bottom: 5px;
    background: #fff;
    display: flex;
    @include flex-between();
    padding: 0 10px;
    font-size: 14px;
    color: #ccc;
    .iconfont {
      font-size: 18px;
    }
  }
  &-edit {
    color: $header-bgc-translucent;
  }
  &-cart {
    background: #fff;
    overflow: hidden;
    width: 100%;
  }
  &-title {
    display: flex;
    @include flex-between();
    padding: 10px 10px;
    border-bottom: 1px solid $border-color;
  }
  &-tipAll {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
  &-tips {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ccc;
    position: absolute;
    top: 35%;
    left: 15px;
  }
  &-freight {
    font-size: 14px;
  }
  &-item {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 30px 10px 30px 40px;
    position: relative;
    .item-wrap {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 10px;
    }
    .item-title {
      @include ellipsis();
      line-height: 16px;
    }
    .item-text-content {
      border: 1px solid $border-color;
      padding: 5px;
      margin: 10px 10px;
    }
    .item-price-wrap {
      display: flex;
      justify-content: space-around;
    }
    .item-price {
      color: $header-bgc-translucent;
      span {
        font-size: 14px;
      }
    }
    .item-reduce,
    .item-increase,
    .item-number {
      display: inline-block;
      background: #ccc;
      width: 30px;
      height: 30px;
      font-size: 16px;
      text-align: center;
      line-height: 30px;
    }
  }
  &-pic {
    width: 60px;
    height: 60px;
    margin: 0 10px;
  }
  &-text {
    flex: 1;
  }
  &-total {
    width: 100%;
    background: #fff;
    display: flex;
    padding: 20px 10px;
    @include flex-between();
    font-size: 16px;
    strong {
      color: #de181b;
    }
  }
  &-settlement {
    width: 100px;
    height: 40px;
    border-radius: 20px;
    background: #ff951f;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
  &-del {
    position: absolute;
    right: 30px;
    bottom: 0;
  }
  .checked {
    background: #de181b;
  }
}
  .list-enter-active,
  .list-leave-active {
      transition: height .5s;
    }
  .list-enter,
  .list-leave-to {
      height: 0;
    }
</style>
