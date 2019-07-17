<template>
    <div class="history" v-if="historys.length">
      <h4 class="history-title">历史搜索</h4>
      <ul class="g-list">
        <li class="g-list-item" v-for="item in historys" :key="item" @click="$_selectItem(item)">
          <span class="g-list-item">{{item}}</span>
          <i class="iconfont icon-delete" @click.stop="removeItem(item)"></i>
        </li>
      </ul>
      <a href="javascript:;" class="history-btn" @click="showConfirm">
        <i class="iconfont icon-clear"></i>清空历史搜索
      </a>
    </div>
</template>

<script>
  import storage from 'assets/js/storage';
  import {SEARCH_HISTORY_KEYWORD_KEY} from './config';
  import {searchMixin} from 'assets/js/mixins';

  export default {
    name: 'SearchHistory',
    mixins: [searchMixin],
    data() {
      return {
        historys: []
      };
    },
    created() {
      this.getKeyword();
    },
    methods: {
      update() {
        this.getKeyword();
      },
      getKeyword() {
        this.historys = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
      },
      removeItem(item) {
        this.historys = this.historys.filter(val => val !== item);
        storage.get(SEARCH_HISTORY_KEYWORD_KEY, this.historys);
        setTimeout(() => {
          this.$emit('remove-item', item);
        }, 100);
      },
      showConfirm() {
        this.$emit('show-confirm');
      },
      clear() {
        storage.remove(SEARCH_HISTORY_KEYWORD_KEY);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .history{
    background: #fff;
    padding-bottom: 30px;
    &-title {
      height: 34px;
      line-height: 34px;
      font-weight: bold;
      padding: 0 10px;
      font-size: $font-size-l;
    }
    &-btn {
      @include flex-center();
      width: 88%;
      height: 40px;
      background: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 0 auto;
      color: #686868;
    }
    .g-list {
      border-top: 1px solid $border-color;
      margin-bottom: 20px;
    }
  }
</style>
