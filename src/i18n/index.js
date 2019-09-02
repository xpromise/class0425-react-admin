import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { NEED_DEBUG } from '../config';

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  // 加载语言包
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // 选择语言包
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'zh', // 如果转换失败，使用什么默认语言
    debug: NEED_DEBUG, // 调试，生产环境应为false
    // backend: {}, // 可以自定义后台服务器地址
    // detection: {}, // 定义从哪里获取使用哪个语言包，默认：'querystring', 'cookie', 'localStorage', 'navigator'...
    interpolation: {
      escapeValue: false, // 不用转义，因为react默认转义。 已经避免了xss攻击
    },
  });

export default i18n;