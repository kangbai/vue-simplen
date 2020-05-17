/*
存储localstorage时候最好是封装一个自己的键值，在这个值里存储自己的内容对象，封装一个方法针对自己对象进行操作。避免冲突也会在开发中更方便。
*/
const mystorage = (function mystorage(){
    let ms = "mystorage";
    let storage = window.localStorage;
    if(!window.localStorage){
        alert("浏览器不支持localstorage");
        return false;
    }

    let set = function(key,value){
        //存储
        let mydata = storage.getItem(ms);
        if(!mydata){
            this.init();
            mydata = storage.getItem(ms);
        }
        mydata = JSON.parse(mydata);
        mydata.data[key] = value;
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;

    };

    let get = function(key){
        //读取
        let mydata = storage.getItem(ms);
        if(!mydata){
            return false;
        }
        mydata = JSON.parse(mydata);

        return mydata.data[key];
    };

    let remove = function(key){
        //读取
        let mydata = storage.getItem(ms);
        if(!mydata){
            return false;
        }

        mydata = JSON.parse(mydata);
        delete mydata.data[key];
        storage.setItem(ms,JSON.stringify(mydata));
        return mydata.data;
    };

    let clear = function(){
        //清除对象
        storage.removeItem(ms);
    };

    let init = function(){
        storage.setItem(ms,'{"data":{}}');
    };

    return {
        set : set,
        get : get,
        remove : remove,
        init : init,
        clear : clear
    };



})();


// console.log(mystorage.set('tqtest','tqtestcontent'));//存储
// console.log(mystorage.set('tqtest1','tqtestcontent1'));//存储
// console.log(mystorage.set('tqtest1','newtqtestcontent1'));//修改
// console.log(mystorage.get('tqtest'));//读取
// console.log(mystorage.remove('tqtest'));//删除
// mystorage.clear();//整体清除

export default mystorage