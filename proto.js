
//判断 name属性  是存在实例还是原型中  return true : 原型   return false : 实例
function hasPrototypeProperty(obj,name){
    return !obj.hasOwnProperty(name) && name in obj;
}