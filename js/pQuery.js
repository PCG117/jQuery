/*
 * @Author: your name
 * @Date: 2020-09-12 16:55:58
 * @LastEditTime: 2020-09-15 11:18:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jQuery\js\pQuery.js
 */
;(function(window){
    var pQuery=function(selector){
        return new pQuery.fn.init(selector);
    }
    pQuery.fn=pQuery.prototype={
        constructor:pQuery,
        pQuery:'1.0.0',
        init:function(selector){
            var selector=pQuery.trim(selector);
            if(!selector){
                return this
            }
            else if(pQuery.isFunction(selector)){
                document.addEventListener('DOMContentLoaded',function(){
                    selector();
                });
                this[0]=document;
                this.length=1;
            }
            else if(pQuery.isString(selector)){
                if(pQuery.isHTML(selector)){
                    var tempDom=document.createElement('div')
                    tempDom.innerHTML=selector;
                    [].push.apply(this,tempDom.children);
                    this.length=tempDom.children.length;
                }else{
                    var doms= document.querySelectorAll(selector);
                    [].push.apply(this,doms);
                    this.length=doms.length;
                    this.selector=selector;
                }
            }
            else if(pQuery.isArray(selector)){
                [].push.apply(this,selector);
                this.length=selector.length;
            }
            else{
                this[0]=selector;
                this.length=1;
            }
            return this
        },
        toArray:function(){
            return [].slice.call(this);
        },
        get:function(num){
            if(num){
                if(num>=0){
                    return this[num];
                }else{
                    return this[this.length+num]
                }
            }else{
                return this.toArray();
            }
        },
        each:function(fn){
            return pQuery.each(this,fn)
        },
        map:function(fn){
            return pQuery(pQuery.map(this.fn));
        }
    }
    pQuery.extend=pQuery.fn.extend=function(){
        for(var key in obj){
            this[key]=obj[key];
        }
    }
    pQuery.extend({
        trim:function(str){
            if(pQuery.isString(str)){
            return str.replace(/^\s+|\s+$/g,'');
        } else {
            return str;
        }
    },
        isFunction:function(str){
            return typeof str==='function';
        },
        isString:function(str){
            return typeof str === 'string';
        },
        isHTML:function(str){
            return str.charAt(0)=='<'&& str.charAt(str.length-1)=='>'&&str.length>=3;
        },
        isArray:function(str){
            return pQuery.isObject(str)&&length in str
        },
        isObject:function(str){
            return typeof str === 'object'
        },
        each:function(arr,fn){
            if(pQuery.isArray(arr)){
                for(var i=0;i<arr.length;i++){
                    var res=fn.call(arr[i],i,arr[i]);
                    if(res==false){
                        break;
                    }else if (res==true) {
                        continue;
                    }
                }
            }else{
                for(var key in arr){
                    var res=fn.call(arr[key],key,arr[key]);
                    if(res==false){
                        break;
                    }else if (res==true){
                        continue;
                    }
                }
            }
            return arr;
        },
        map:function(arr,fn){
            var resArr=[];
            if(pQuery.isArray(arr)){
                for(var i=0;i<arr.length;i++){
                    var res=fn(arr[i],i);
                    if(res){
                        resArr.push(res);
                    }
                }
            }else{
                for(var key in arr){
                    var res=fn(arr[key],key);
                    if(res){
                        resArr.push(res);
                    }
                }
            }
            return resArr;
        }
    })
        pQuery.fn.extend({
            css: function (arg1, arg2) {
                if (pQuery.isString(arg1)) {
                    if (arguments.length == 1) {
                        if (this[0].currentStyle) {
                            return this[0].currentStyle[arg1];
                        } else {
                            return getComputedStyle(this[0], false)[arg1];
                        }
                    } else if (arguments.length == 2) {
                        this.each(function () {
                            this.style[arg1] = arg2;
                        });
                    }
                } else if (pQuery.isObject(arg1)) {
                    this.each(function () {
                        for (var key in arg1) {
                            this.style[key] = arg1[key];
                        }
                    });
                }
                return this;
            },   
    })
    pQuery.fn.init.prototype=pQuery.fn;
    window.pQuery=window.$=pQuery;
})(window);