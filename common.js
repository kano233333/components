//绑定事件 【兼容ie8及以下】
function bind(obj,eventStr,callback){
    if(obj.addEventListener){
        //不支持ie8及以下
        obj.addEventListener(eventStr,callback,false);
    }else{
        //ie8及以下
        obj.attachEvent("on"+eventStr,function(){
            callback.call(obj);
        });
    }
}

let isFormData = (v) => {
  return Object.prototype.toString.call(v) === '[object FormData]';
}
let isObject = (v) => {
  return Object.prototype.toString.call(v) === '[object Object]';
}
function ajax(obj) {
  var ajaxRequest = new window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  var method = obj.method.toUpperCase();
  var url = obj.url;
  var data = obj.data;

  if (method === "GET") {
    if (data) {
      url = url + "?";
      for (var i in data) {
        url = url + i + "=" + data[i] + "&";
      }
      url = url.substring(0, url.length - 1);
    }
    ajaxRequest.open(method, url);
    ajaxRequest.send();
  } else if (method === "POST") {
    ajaxRequest.open(method, url);
    if(isFormData(data)){
      ajaxRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    }else if(isObject(data)){
      ajaxRequest.setRequestHeader("Content-type","application/json; charset=utf-8");
      data = JSON.stringify(data)
    }
    ajaxRequest.send(data);
  }

  ajaxRequest.onreadystatechange = function () {
    if (ajaxRequest.readyState === 4) {
      if (ajaxRequest.status === 200) {
        if (obj.success !== undefined) {
          obj.success(ajaxRequest.responseText);
        }
      } else {
        if (obj.fail !== undefined) {
          obj.fail(ajaxRequest.status);
        }
      }
    }
  }
}