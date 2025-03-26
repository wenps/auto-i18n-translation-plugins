"use strict";var t=require("@vitalets/google-translate-api"),n=require("tunnel"),e=require("axios"),o=require("crypto-js"),r=require("@babel/types"),a=require("node:path"),i=require("node:fs");function s(t){var n=Object.create(null);return t&&Object.keys(t).forEach((function(e){if("default"!==e){var o=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(n,e,o.get?o:{enumerable:!0,get:function(){return t[e]}})}})),n.default=t,Object.freeze(n)}var c=s(r),l=function(t,n){return l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])},l(t,n)};function u(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function e(){this.constructor=t}l(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}var p,f,g,h=function(){return h=Object.assign||function(t){for(var n,e=1,o=arguments.length;e<o;e++)for(var r in n=arguments[e])Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r]);return t},h.apply(this,arguments)};function y(t,n,e,o){return new(e||(e=Promise))((function(r,a){function i(t){try{c(o.next(t))}catch(t){a(t)}}function s(t){try{c(o.throw(t))}catch(t){a(t)}}function c(t){var n;t.done?r(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(i,s)}c((o=o.apply(t,n||[])).next())}))}function d(t,n){var e,o,r,a,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(c){return function(s){if(e)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(e=1,o&&(r=2&s[0]?o.return:s[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(6===s[0]&&i.label<r[1]){i.label=r[1],r=s;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(s);break}r[2]&&i.ops.pop(),i.trys.pop();continue}s=n.call(t,i)}catch(t){s=[6,t],o=0}finally{e=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}}function v(t,n,e){if(e||2===arguments.length)for(var o,r=0,a=n.length;r<a;r++)!o&&r in n||(o||(o=Array.prototype.slice.call(n,0,r)),o[r]=n[r]);return t.concat(o||Array.prototype.slice.call(n))}"function"==typeof SuppressedError&&SuppressedError,function(t){t.ZH="zh-cn",t.EN="en",t.JA="ja",t.KO="ko",t.RU="ru"}(p||(p={})),function(t){t.google="Google",t.youdao="Youdao"}(f||(f={})),exports.TranslateTypeEnum=void 0,(g=exports.TranslateTypeEnum||(exports.TranslateTypeEnum={})).FULL_AUTO="full-auto",g.SEMI_AUTO="semi-auto";var x,b=new Map([["有道翻译","请前往有道翻译官方申请翻译key，默认会有50的额度，并请检查额度是否充足。"],["百度翻译","请前往百度翻译官方申请翻译key，每个月都有免费额度，并请检查额度是否充足。"]]),O=function(){function t(t,n,e){this.queue=[],this.isRunning=!1,this.fn=t,this.delay=n,this.timeout=e}return t.prototype.execute=function(){for(var t=this,n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return new Promise((function(e,o){t.queue.push({args:n,resolve:e,reject:o}),t.run(),t.timeout&&setTimeout((function(){o(new Error("IntervalQueue timeout"))}),t.timeout)}))},t.prototype.wait=function(){return y(this,arguments,void 0,(function(t){return void 0===t&&(t=this.delay),d(this,(function(n){switch(n.label){case 0:return[4,new Promise((function(n){return setTimeout(n,t)}))];case 1:return n.sent(),[2]}}))}))},t.prototype.run=function(){return y(this,void 0,void 0,(function(){var t,n,e,o,r,a;return d(this,(function(i){switch(i.label){case 0:if(this.isRunning)return[2];i.label=1;case 1:if(!(t=this.queue.shift()))return[3,7];n=t.args,e=t.resolve,o=t.reject,this.isRunning=!0,i.label=2;case 2:return i.trys.push([2,4,,5]),r=e,[4,this.fn.apply(this,n)];case 3:return r.apply(void 0,[i.sent()]),[3,5];case 4:return a=i.sent(),o(a),[3,5];case 5:return[4,this.wait()];case 6:return i.sent(),[3,1];case 7:return this.isRunning=!1,[2]}}))}))},t}(),T=function(){function t(t){var n,e,o;this.option=t,this.option.interval&&(this.option.fetchMethod=(n=this.option.fetchMethod,e=this.option.interval,o=new O(n.bind(null),e),function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return o.execute.apply(o,t)}))}return t.prototype.getErrorMessage=function(t){return t instanceof Error?t.message:String(t)},t.prototype.translate=function(t,n,e){return y(this,void 0,void 0,(function(){var o,r,a;return d(this,(function(i){switch(i.label){case 0:o="",i.label=1;case 1:return i.trys.push([1,3,,4]),[4,this.option.fetchMethod(t,n,e)];case 2:return o=i.sent(),[3,4];case 3:return r=i.sent(),a=this.option.name,console.error("翻译api".concat(a?"【".concat(a,"】"):"","请求异常：").concat(this.getErrorMessage(r))+"\n"+b&&b.has(a)&&b.get(a)),[3,4];case 4:return[2,o]}}))}))},t}(),S=function(e){function o(o){var r=e.call(this,{name:"Google翻译",fetchMethod:function(e,a,i){return y(r,void 0,void 0,(function(){return d(this,(function(r){switch(r.label){case 0:return[4,t.translate(e,h({from:a,to:i},o.proxyOption?{fetchOptions:{agent:n.httpsOverHttp({proxy:o.proxyOption})}}:{}))];case 1:return[2,r.sent().text||""]}}))}))}})||this;return r}return u(o,e),o}(T),m=function(t){function n(n){var r,a=t.call(this,{name:"有道翻译",fetchMethod:function(t,r,i){return y(a,void 0,void 0,(function(){var a,s,c,l,u,p,f;return d(this,(function(g){switch(g.label){case 0:return a=(new Date).getTime(),s=Math.round((new Date).getTime()/1e3),c=n.appId+this.truncate(t)+a+s+n.appKey,l=o.SHA256(c).toString(o.enc.Hex),u={q:t,appKey:n.appId,salt:a,from:this.getTranslateKey(r),to:this.getTranslateKey(i),sign:l,signType:"v3",curtime:s},[4,e.post("https://openapi.youdao.com/api",u,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},proxy:n.proxy})];case 1:return p=g.sent(),[2,(null===(f=p.data.translation)||void 0===f?void 0:f[0])||""]}}))}))},interval:null!==(r=n.interval)&&void 0!==r?r:1e3})||this;return a.YOUDAO_TRANSLATE_KEY_CONVERT_MAP={"zh-cn":"zh-CHS","zh-tw":"zh-CHT"},a}return u(n,t),n.prototype.truncate=function(t){if(t.length<=20)return t;var n=t.length;return t.substring(0,10)+n+t.substring(n-10)},n.prototype.getTranslateKey=function(t){return this.YOUDAO_TRANSLATE_KEY_CONVERT_MAP[t]||t},n}(T),j=function(){function t(){}return t.originLang="",t}(),E=((x={})[p.ZH]=/[\u4e00-\u9fff]/,x[p.EN]=/[a-zA-Z]/,x[p.JA]=/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/,x[p.KO]=/[\uAC00-\uD7A3]/,x[p.RU]=/[йцукенгшщзхъфывапролджэячсмитьбюё .-]{1,}/,x);function w(t){var n=j.originLang;return E[n].test(t)}function L(t,n){for(var e=0;e<n.length;e++){if(("string"==typeof n[e]?new RegExp(n[e]):n[e]).test(t))return!0}return!1}function _(t){var n="";return r.isCallExpression(t)&&(n=r.isMemberExpression(t.callee)?function t(n,e){return e+="."+n.property.name,r.isMemberExpression(n.object)?t(n.object,e):e=n.object.name+e}(t.callee,""):t.callee.name||""),n}function A(t,n){var e=t.match(n);return e?e.filter((function(t,n){return e.indexOf(t)===n})):[]}function N(t,n,e){var o=exports.option.namespace,a=t.trim(),i=a.replace(/'/g,'"').replace(/(\n)/g,"\\n"),s=e||k(i);if(n){var c=r.stringLiteral(a);return c.extra={raw:"'".concat(i,"'"),rawValue:a},r.callExpression(r.identifier(exports.option.translateKey),[r.stringLiteral(s),c,r.stringLiteral(o)])}return"".concat(exports.option.translateKey,"('").concat(s,"','").concat(i,"','").concat(o,"')")}function k(t){for(var n=0,e=0;e<t.length;e++){n=(n<<5)-n+t.charCodeAt(e),n|=0}return Math.abs(n).toString(36)+t.length.toString(36)}var P=function(t){return t.replace(/\\u[\dA-Fa-f]{4}/g,(function(t){return String.fromCharCode(parseInt(t.replace(/\\u/g,""),16))}))};function K(t,n){if(void 0===n&&(n=new WeakMap),"object"!=typeof t||null===t)return t;if(n.has(t))return n.get(t);if(t instanceof Date)return new Date(t);if(t instanceof RegExp)return new RegExp(t.source,t.flags);var e=Array.isArray(t)?[]:{};n.set(t,e);for(var o=0,r=v(v([],Object.keys(t),!0),Object.getOwnPropertySymbols(t).filter((function(n){return t.propertyIsEnumerable(n)})),!0);o<r.length;o++){var a=r[o];e[a]=K(t[a],n)}return e}var J=Object.freeze({__proto__:null,checkAgainstRegexArray:L,cloneDeep:K,createI18nTranslator:N,extractCnStrings:function(t){return A(t,/[^\x00-\xff]+/g)},extractFunctionName:_,extractStrings:A,generateId:k,hasOriginSymbols:w,removeComments:function(t){return t=(t=(t=t.replace(/\/\/.*?\n/g,"")).replace(/\/\*[\s\S]*?\*\//g,"")).replace(/<!--[\s\S]*?-->/g,"")},truncate:function(t){if(t.length<=20)return t;var n=t.length;return t.substring(0,10)+n+t.substring(n-10)},unicodeToString:P}),F={tab:{char:"\t",size:1},space:{char:" ",size:4}},C={type:"tab"},M=[],R=function(t){return"\\".concat(M.push(t),"\\")},I=function(t,n){return M[+n-1]},z=function(t,n){return new Array(t+1).join(n)};function U(t,n){void 0===n&&(n=C);var e="string"==typeof t?t:JSON.stringify(t),o=F[n.type];if(!o)throw new Error('Unrecognized indent type: "'.concat(n.type,'"'));return function(t,n){M=[];var e="",o=0;t=t.replace(/\\./g,R).replace(/(".*?"|'.*?')/g,R).replace(/\s+/g,"");for(var r=0;r<t.length;r++){var a=t.charAt(r);switch(a){case"{":case"[":e+=a+"\n"+z(++o,n);break;case"}":case"]":e+="\n"+z(--o,n)+a;break;case",":e+=",\n"+z(o,n);break;case":":e+=": ";break;default:e+=a}}return e.replace(/\[[\d,\s]+?\]/g,(function(t){return t.replace(/\s/g,"")})).replace(/\\(\d+)\\/g,I).replace(/\\(\d+)\\/g,I)}(e,z(n.size||o.size,o.char))}function D(){var t=exports.option.translateKey,n=exports.option.namespace,e=exports.option.originLang,o=v(v([],exports.option.targetLangList,!0),[e],!1).map((function(t){return[t.replace("-",""),t]})).map((function(t){return"'".concat(t[0],"': (globalThis && globalThis.").concat(n," && globalThis.").concat(n,".").concat(t[0],") ? globalThis.").concat(n,".").concat(t[0]," : globalThis._getJSONKey('").concat(t[1],"', langJSON)")})).join(",\n"),r="\n    // 导入国际化JSON文件\n    import langJSON from './index.json'\n    (function () {\n    // 定义翻译函数\n    let ".concat(t," = function (key, val, nameSpace) {\n      // 获取指定命名空间下的语言包\n      const langPackage = ").concat(t,"[nameSpace];\n      // 返回翻译结果，如果不存在则返回默认值\n      return (langPackage || {})[key] || val;\n    };\n    // 定义简单翻译函数，直接返回传入的值\n    let $").concat(t," = function (val) {\n      return val;\n    };\n    // 定义设置语言包的方法\n    ").concat(t,".locale = function (locale, nameSpace) {\n      // 将指定命名空间下的语言包设置为传入的locale\n      ").concat(t,"[nameSpace] = locale || {};\n    };\n    // 将翻译函数挂载到globalThis对象上，如果已经存在则使用已有的\n    globalThis.").concat(t," = globalThis.").concat(t," || ").concat(t,";\n    // 将简单翻译函数挂载到globalThis对象上\n    globalThis.$").concat(t," = $").concat(t,";\n    // 定义从JSON文件中获取指定键的语言对象的方法\n    globalThis._getJSONKey = function (key, insertJSONObj = undefined) {\n        // 获取JSON对象\n        const JSONObj = insertJSONObj;\n        // 初始化语言对象\n        const langObj = {};\n        // 遍历JSON对象的所有键\n        Object.keys(JSONObj).forEach((value) => {\n            // 将每个语言的对应键值添加到语言对象中\n            langObj[value] = JSONObj[value][key];\n        });\n        // 返回语言对象\n        return langObj;\n    };\n    })();\n    // 定义语言映射对象\n    const langMap = {\n        ").concat(o,"\n    };\n    // 存储语言是否存在\n    // 判断 globalThis.localStorage.getItem 是否为函数\n    const isFunction = (fn) => {\n        return typeof fn === 'function';\n    };\n    const withStorageLang = isFunction && globalThis && globalThis.localStorage && \n    isFunction(globalThis.localStorage.getItem) && globalThis.localStorage.getItem('").concat(n,"');\n    // 从本地存储中获取当前语言，如果不存在则使用源语言\n    const lang = withStorageLang ? globalThis.localStorage.getItem('").concat(n,"') : '").concat(e.replace("-",""),"';\n    // 根据当前语言设置翻译函数的语言包\n    globalThis.").concat(t,".locale(langMap[lang], '").concat(n,"');\n  "),s=a.join(exports.option.globalPath,"index.js"),c=!0;i.existsSync(s)&&(c=k(r)!==k(i.readFileSync(s,"utf-8")));c&&i.writeFileSync(s,r)}function q(){var t=a.join(exports.option.globalPath,"index.json");i.existsSync(t)||i.writeFileSync(t,JSON.stringify({}))}function $(){var t=a.join(exports.option.globalPath,"index.json");try{return i.readFileSync(t,"utf-8")}catch(t){return"ENOENT"===t.code?console.log("❌读取JSON配置文件异常，文件不存在"):console.log("❌读取JSON配置文件异常，无法读取文件"),JSON.stringify({})}}function Y(t,n){void 0===n&&(n=void 0);var e=n||JSON.parse($()),o={};return Object.keys(e).forEach((function(n){o[n]=e[n][t]})),o}function H(t){var n=a.join(exports.option.globalPath,"index.json"),e=U(t);i.existsSync(n)?i.writeFileSync(n,e):console.log("❌JSON配置文件写入异常，文件不存在")}var W=Object.freeze({__proto__:null,buildSetLangConfigToIndexFile:function(){if(exports.option.buildToDist){var t={};exports.option.langKey.forEach((function(n){t[n]=Y(n)})),i.existsSync(exports.option.distPath)&&i.readdir(exports.option.distPath,(function(n,e){n?console.error("❌构建文件夹为空，翻译配置无法写入"):e.forEach((function(n){if(n.startsWith(exports.option.distKey)&&n.endsWith(".js")){var e=a.join(exports.option.distPath,n);i.readFile(e,"utf-8",(function(n,o){if(n)return console.log(e),void console.error("❌构建主文件不存在，翻译配置无法写入");var r="";Object.keys(t).forEach((function(n){r+="globalThis['".concat(exports.option.namespace,"']['").concat(n,"']=").concat(JSON.stringify(t[n]),";")}));try{i.writeFileSync(e,"globalThis['".concat(exports.option.namespace,"']={};").concat(r)+o),console.info("恭喜：翻译配置写入构建主文件成功🌟🌟🌟")}catch(n){console.error("翻译配置写入构建主文件失败:",n)}}))}}))}))}},getLangObjByJSONFileWithLangKey:Y,getLangTranslateJSONFile:$,initLangFile:function(){i.existsSync(exports.option.globalPath)||i.mkdirSync(exports.option.globalPath),q(),D()},initLangTranslateJSONFile:q,initTranslateBasicFnFile:D,setLangTranslateJSONFile:H});var B="\n┇┇┇\n",G=/\n┇ *┇ *┇\n/,V={};function X(t,n){V[t]||(V[t]=n)}function Z(){return V}function Q(t,n,e){return y(this,void 0,void 0,(function(){var o,r,a,i;return d(this,(function(s){switch(s.label){case 0:return o={},Object.keys(t).forEach((function(e){n[e]||(o[e]=t[e])})),Object.values(o).length?(console.info("进入新增语言补全翻译..."),[4,tt(o,e)]):[2];case 1:if((r=s.sent()).length!==Object.values(t).length)return console.error("翻译异常，翻译结果缺失❌"),[2];a=r,console.info("翻译成功⭐️⭐️⭐️"),Object.keys(o).forEach((function(t,e){n[t]=a[e]})),console.log("开始写入JSON配置文件..."),i=JSON.parse($()),Object.keys(o).forEach((function(t){i[t][e]=n[t]}));try{H(i),console.info("JSON配置文件写入成功⭐️⭐️⭐️")}catch(t){console.error("❌JSON配置文件写入失败"+t)}return console.info("新增语言翻译补全成功⭐️⭐️⭐️"),[2]}}))}))}function tt(t,n){return y(this,void 0,void 0,(function(){var e,o,r;return d(this,(function(a){switch(a.label){case 0:for(e=function(t,n){void 0===n&&(n=4500);for(var e=B.length,o=[],r=[],a=0,i=function(){if(r.length>0){var t=r.join(B).length;t>n&&console.warn("缓冲区提交异常：生成块长度 ".concat(t," 超过限制")),o.push(r.join(B)),r=[],a=0}},s=0,c=t;s<c.length;s++){var l=c[s],u=l.length+(r.length>0?e:0);l.length>n?(r.length>0&&i(),l.length>1.5*n&&console.warn("超长文本告警：检测到长度 ".concat(l.length," 字符的文本项，可能影响翻译质量")),o.push(l)):(a+u>n&&i(),a+=u,r.push(l))}return i(),o}(Object.values(t)),o=[],r=0;r<e.length;r++)o.push(exports.option.translator.translate(e[r],exports.option.originLang,n));return[4,Promise.all(o)];case 1:return[2,a.sent().map((function(t){var n=function(t,n){return t.split(n).map((function(t){return t.trim()}))};if(G.test(t))return n(t,G);var e=t.split("\n").find((function(t){return 3===t.length})),o=[];e&&(o=n(t,new RegExp("\\n".concat(e,"\\n"))));var r=o.filter(Boolean);return r.length>1?r:n(t,G)})).flat()]}}))}))}var nt=Object.freeze({__proto__:null,SEPARATOR:B,SPLIT_SEPARATOR_REGEX:G,autoTranslate:function(){return y(this,void 0,void 0,(function(){var t,n,e,o,r,a,i,s;return d(this,(function(c){switch(c.label){case 0:if(t={},exports.option.langKey.forEach((function(n){t[n]=Y(n)})),n=JSON.parse(JSON.stringify(Z())),e={},Object.keys(n).forEach((function(o){t[exports.option.originLang][o]||(e[o]=n[o])})),0===Object.keys(e).length)return console.info("✅ 当前没有需要翻译的新内容"),[2];o={},r=0,c.label=1;case 1:return r<exports.option.langKey.length?(a=exports.option.langKey[r],0===r?(o[exports.option.originLang]=Object.values(e),[3,3]):(console.info("开始自动翻译..."),[4,tt(e,exports.option.langKey[r])])):[3,4];case 2:if((i=c.sent()).length!==Object.keys(e).length)return console.error("❌ 使用付费翻译时，请检查翻译API额度是否充足，或是否已申请对应翻译API使用权限（如使用有道翻译）"),console.error("❌ 翻译结果不完整\n                预期数量: ".concat(Object.keys(e).length,"\n                实际数量: ").concat(i.length,"\n                样例数据: ").concat(JSON.stringify(i.slice(0,3)))),[2];o[a]=i,console.info("✅ ".concat(a," 翻译完成")),c.label=3;case 3:return r++,[3,1];case 4:Object.keys(e).forEach((function(n,e){exports.option.langKey.forEach((function(r){t[r][n]=o[r][e]}))})),console.log("📄 构建配置文件数据结构..."),s={},Object.keys(t[exports.option.originLang]).forEach((function(n){s[n]={},exports.option.langKey.forEach((function(e){s[n][e]=t[e][n]}))}));try{H(s),console.info("🎉 多语言配置文件已成功更新")}catch(t){console.error("❌ 配置文件写入失败，原因:",t)}return[2]}}))}))},completionTranslateAndWriteConfigFile:Q,getLangObj:Z,initLangObj:function(t){Object.keys(V)||(V=t)},get langObj(){return V},languageConfigCompletion:function(t){var n=this;if(Object.keys(t)){var e=[],o=JSON.parse($());exports.option.targetLangList.forEach((function(t){var n=Y(t,o);e.push({key:t,curLangObj:n})})),e.forEach((function(e){return y(n,void 0,void 0,(function(){return d(this,(function(n){switch(n.label){case 0:return[4,Q(t,e.curLangObj,e.key)];case 1:return n.sent(),[2]}}))}))}))}},setLangObj:X}),et=function(t){function n(n){var r,a=t.call(this,{name:"百度翻译",fetchMethod:function(t,r,i){return y(a,void 0,void 0,(function(){var a,s,c,l,u;return d(this,(function(p){switch(p.label){case 0:return a=(new Date).getTime(),s={q:t,appid:n.appId,from:this.getTranslateKey(r),to:this.getTranslateKey(i),salt:a,sign:o.MD5(n.appId+t+a+n.appKey).toString()},[4,e.post("https://fanyi-api.baidu.com/api/trans/vip/translate",s,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},proxy:n.proxy})];case 1:return c=p.sent(),l=null===(u=c.data)||void 0===u?void 0:u.trans_result.map((function(t){return t.dst})).filter((function(t,n){return n%2==0})).join(B),[2,l||""]}}))}))},interval:null!==(r=n.interval)&&void 0!==r?r:1e3})||this;return a.Baidu_TRANSLATE_KEY_CONVERT_MAP={"zh-cn":"zh",ja:"jp",ko:"kor"},a}return u(n,t),n.prototype.getTranslateKey=function(t){return this.Baidu_TRANSLATE_KEY_CONVERT_MAP[t]||t},n}(T),ot=Object.freeze({__proto__:null,BaiduTranslator:et,GoogleTranslator:S,Translator:T,YoudaoTranslator:m}),rt=["$i8n","console.log","$t","require","$$i8n","$$t","_createCommentVNode"],at={translateKey:"$t",excludedCall:[],excludedPattern:[/\.\w+$/],excludedPath:["node_modules"],includePath:[/src\//,/src\\/],globalPath:"./lang",distPath:"",distKey:"index",originLang:p.ZH,targetLangList:["en"],langKey:[],namespace:"lang",buildToDist:!1,translator:new S({proxyOption:{port:7890,host:"127.0.0.1",headers:{"User-Agent":"Node"}}}),translatorOption:void 0,translateType:exports.TranslateTypeEnum.FULL_AUTO};function it(t){if(exports.option.translateType!==exports.TranslateTypeEnum.SEMI_AUTO){var n=t.node,e=t.parent,o=n.value;if(["zh-cn","ja","ko"].some((function(t){return exports.option.originLang.includes(t)||exports.option.originLang===t})))try{o=P(o)}catch(t){console.log("转换异常")}if(w(o)&&exports.option.excludedPattern.length&&!L(o,v([],exports.option.excludedPattern,!0))){var r=_(e);if(c.isImportDeclaration(e)||e.key===n||c.isCallExpression(e)&&r&&exports.option.excludedCall.includes(r))return;var a=void 0;if(c.isJSXAttribute(e)){var i=N(o,!0);a=c.jSXExpressionContainer(i)}else a=N(o,!0);t.replaceWith(a)}}}function st(t){var n,e=t.node;if(e.callee.name===exports.option.translateKey)if(exports.option.translateType===exports.TranslateTypeEnum.SEMI_AUTO){var o=e.arguments||[];if(1===o.length){var r=N((null===(n=o[0])||void 0===n?void 0:n.value)||"",!0);t.replaceWith(r),ct(r)}}else exports.option.translateType===exports.TranslateTypeEnum.FULL_AUTO&&ct(e)}function ct(t){var n=t.arguments||[],e=c.isStringLiteral(n[0])?n[0].value:"",o=c.isStringLiteral(n[1])?n[1].value:"";e&&o&&c.isStringLiteral(n[1])&&X(e,o)}function lt(t){if(exports.option.translateType!==exports.TranslateTypeEnum.SEMI_AUTO){var n=t.node,e=t.parent;if(n.value){var o=n.value.raw||n.value.cooked;if(["zh-cn","ja","ko"].some((function(t){return exports.option.originLang.includes(t)||exports.option.originLang===t})))try{o=P(o)}catch(t){console.log("转换异常")}if(o&&w(o)&&exports.option.excludedPattern.length&&!L(o,v([],exports.option.excludedPattern,!0))){var a=_(e);if(r.isCallExpression(e)&&a&&exports.option.excludedCall.includes(a))return;var i=N(o);n.value.raw=n.value.cooked="${".concat(i,"}");var s=k(o);s&&o&&X(s,o)}}}}function ut(t){if(console.log("jsx text"),exports.option.translateType!==exports.TranslateTypeEnum.SEMI_AUTO){var n=t.node.value;if(["zh-cn","ja","ko"].some((function(t){return exports.option.originLang.includes(t)||exports.option.originLang===t})))try{n=P(n)}catch(t){console.log("转换异常")}if(w(n)&&exports.option.excludedPattern.length&&!L(n,v([],exports.option.excludedPattern,!0))){var e=N(n,!0),o=c.jSXExpressionContainer(e);t.replaceWith(o)}}}exports.option=h({},at);var pt=Object.freeze({__proto__:null,default:function(){return{visitor:{StringLiteral:it,JSXText:ut,TemplateElement:lt,CallExpression:st}}}});exports.BaiduTranslator=et,exports.FunctionFactoryOption=j,exports.GoogleTranslator=S,exports.Translator=T,exports.YoudaoTranslator=m,exports.baseUtils=J,exports.checkOption=function(){return exports.option.translateKey?exports.option.namespace?exports.option.buildToDist&&!exports.option.distKey?(console.log("❌请配置打包后生成文件的主文件名称"),!1):exports.option.buildToDist&&!exports.option.distPath?(console.log("❌请配置打包后生成文件的位置"),!1):exports.option.originLang?!(!exports.option.targetLangList||!exports.option.targetLangList.length)||(console.error("❌请配置目标翻译语言数组"),!1):(console.error("❌请配置来源语言"),!1):(console.error("❌请配置命名空间"),!1):(console.error("❌请配置翻译调用函数"),!1)},exports.fileUtils=W,exports.filter=pt,exports.initOption=function(t){exports.option=h(h({},at),function(t){var n=K(t);return n.translator=null==t?void 0:t.translator,n.translator||(n.translator=n.translatorOption?new T(n.translatorOption):void 0),n.translator||delete n.translator,n}(t)),exports.option.langKey=v([exports.option.originLang],exports.option.targetLangList,!0),exports.option.excludedCall=v(v(v([],exports.option.excludedCall,!0),rt,!0),[exports.option.translateKey,"$"+exports.option.translateKey],!1)},exports.translateUtils=nt,exports.translator=ot;
//# sourceMappingURL=index.cjs.map
