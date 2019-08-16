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