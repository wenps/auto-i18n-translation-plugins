
    // 导入国际化JSON文件
    import langJSON from './index.json'
    (function () {
    // 定义翻译函数
    let $t = function (key, val, nameSpace) {
      // 获取指定命名空间下的语言包
      const langPackage = $t[nameSpace];
      // 返回翻译结果，如果不存在则返回默认值
      return (langPackage || {})[key] || val;
    };
    // 定义简单翻译函数，直接返回传入的值
    let $$t = function (val) {
      return val;
    };
    // 定义设置语言包的方法
    $t.locale = function (locale, nameSpace) {
      // 将指定命名空间下的语言包设置为传入的locale
      $t[nameSpace] = locale || {};
    };
    // 将翻译函数挂载到window对象上，如果已经存在则使用已有的
    window.$t = window.$t || $t;
    // 将简单翻译函数挂载到window对象上
    window.$$t = $$t;
    // 定义从JSON文件中获取指定键的语言对象的方法
    window._getJSONKey = function (key, insertJSONObj = undefined) {
        // 获取JSON对象
        const JSONObj = insertJSONObj;
        // 初始化语言对象
        const langObj = {};
        // 遍历JSON对象的所有键
        Object.keys(JSONObj).forEach((value) => {
            // 将每个语言的对应键值添加到语言对象中
            langObj[value] = JSONObj[value][key];
        });
        // 返回语言对象
        return langObj;
    };
    })();
    // 定义语言映射对象
    const langMap = {
        'ja': window?.lang?.ja || window._getJSONKey('ja', langJSON),
'ko': window?.lang?.ko || window._getJSONKey('ko', langJSON),
'en': window?.lang?.en || window._getJSONKey('en', langJSON),
'ru': window?.lang?.ru || window._getJSONKey('ru', langJSON),
'zhcn': window?.lang?.zhcn || window._getJSONKey('zh-cn', langJSON)
    };
    // 从本地存储中获取当前语言，如果不存在则使用源语言
    const lang = window.localStorage.getItem('lang') || 'zhcn';
    // 根据当前语言设置翻译函数的语言包
    window.$t.locale(langMap[lang], 'lang');
  