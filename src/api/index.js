import axiosInstance from './request';
import jsonp from 'jsonp';

// 定义请求登录方法
export const reqLogin = (username, password) => axiosInstance.post('/login', {username, password});

// 定义请求天气的方法
export const reqWeather = (cityName) => {
  return new Promise((resolve, reject) => {
    window.cancelJsonp = jsonp(
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

// 定义请求添加分类方法
export const reqAddCategory = (categoryName, parentId) => axiosInstance.post('/manage/category/add', {categoryName, parentId});




