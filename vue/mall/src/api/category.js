import axios from 'axios';
import {SUCC_CODE, TIMEOUT} from './config';
const CancelToken = axios.CancelToken;
let cancel;

// 获取内容数据--ajax
export const getCategoryContent = (id) => {
  cancel && cancel('取消了前一次的请求！');
  cancel = '';
  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  }).then(res => {
    if (res.data.code === SUCC_CODE) {
      return res.data.content;
    }
    throw new Error('没有成功获取到数据！');
  }).catch(err => {
    if (axios.isCancel(err)) {
      console.log('Request canceled');
      console.log(err);
    } else {
      console.log(err);
    }
    return [
      {
        linkUrl: 'https://www.imooc.com',
        picUrl: require('assets/img/404.png')
      }
    ];
  });
};
