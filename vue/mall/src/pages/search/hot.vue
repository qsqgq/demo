<template>
    <div class="hot">
      <h4 class="hot-title">热门搜索</h4>
      <div class="loading-container" v-if="!hots.length">
        <me-loading/>
      </div>
      <ul class="hot-list" v-else>
        <li class="hot-item" v-for="(item, index) in hots" :key="index" @click="$_selectItem(item.hotWord)">{{item.hotWord}}</li>
      </ul>
    </div>
</template>

<script>
  import MeLoading from 'base/loading';
  import {getSearchHotKeyword} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';

  export default {
    name: 'SearchHot',
    components: {
      MeLoading
    },
    mixins: [searchMixin],
    created() {
      this.getHotKeyword().then(res => {
        this.$emit('loaded');
      });
    },
    data() {
      return {
        hots: []
      };
    },
    methods: {
      getHotKeyword() {
        return getSearchHotKeyword().then(data => {
          return new Promise(resolve => {
            if (data) {
              this.hots = data;
              resolve();
            }
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .hot {
    width: 100%;
    background: #fff;
    padding-left: 10px;
    border-bottom: 1px solid $border-color;
    margin-bottom: 10px;
    &-title{
      height: 34px;
      line-height: 34px;
      font-weight: bold;
      font-size: $font-size-l;
    }
    &-list {
      display: flex;
      flex-wrap: wrap;
    }
    &-item {
      background: #f0f2f5;
      margin: 0 10px 10px 0;
      padding: 8px;
      color: #686868;
      border-radius: 4px;
    }
  }
  .loading-container {
    padding: 10px 0;
  }
</style>
