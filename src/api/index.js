import jsonp from 'jsonp';
import axiosInstance from './ajax';

// 定义登录请求方法
export const reqLogin = (username, password) => axiosInstance.post('/login', {username, password});

// 定义验证用户信息的方法
export const reqValidateUser = (id) => axiosInstance.post('/validate/user', {id});

// 定义请求天气的方法
export const reqWeather = (cityName) => {
  return new Promise((resolve, reject) => {
    jsonp(
      `http://api.map.baidu.com/telematics/v3/weather?location=${cityName}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      {},
      function (err, data) {
        if (err) {
          console.log('请求天气失败', err);
          // 请求失败
          reject('请求天气失败');
        } else {
          // 请求成功
          const { weather, dayPictureUrl } = data.results[0].weather_data[0];
          resolve({
            weather,
            dayPictureUrl
          });
        }
      }
    )
  })
};

// 定义获取分类列表的方法
export const reqGetCategory = (parentId) => axiosInstance.get('/manage/category/list', {
  params: {
    parentId
  }
});

// 定义添加分类的方法
export const reqAddCategory = (parentId, categoryName) => axiosInstance.post('/manage/category/add', {parentId, categoryName});

// 定义修改分类名称的方法
export const reqUpdateCategoryName = (categoryId, categoryName) => axiosInstance.post('/manage/category/update', {categoryId, categoryName});

// 定义获取产品的方法
export const reqGetProduct = (pageNum, pageSize) => axiosInstance.get('/manage/product/list', {
  params: {
    pageNum,
    pageSize
  }
});












