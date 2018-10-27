function broadcastImg(obj){
    let newI=0;
    let preClassName=obj.el[0].className;
    createBo();
    let boEl=document.getElementsByClassName(obj.boClassName);
    let arrowLeft=document.querySelector(obj.arrowName[0]);
    let arrowRight=document.querySelector(obj.arrowName[1]);
    obj.el[0].style.display='block';

    window[obj.xxx]=setInterval(imgAnimate,3000);

    obj.el[0].parentNode.parentNode.onmouseleave=function(){
        arrowLeft.style.display='none';
        arrowRight.style.display='none';
        window[obj.xxx]=setInterval(imgAnimate,3000);
    };
    obj.el[0].parentNode.parentNode.onmouseenter=function(){
        arrowLeft.style.display='block';
        arrowRight.style.display='block';
        clearInterval(window[obj.xxx]);
    };

    arrowLeftClick();
    arrowRightClick();
    clickBo();
    function imgAnimate(){
        let i=newI;
        obj.el[newI].className=preClassName+" "+obj.animate[0];
        obj.el[newI].addEventListener('animationend',function imgAnimateDetail(){
            obj.el[newI].style.display='none';
            newI++;
            if(newI===obj.el.length){
                newI=0;
            }
            obj.el[newI].style.display='block';
            obj.el[newI].className=preClassName+" "+obj.animate[1];
            shiftBo(i);
            obj.el[i].removeEventListener('animationend',imgAnimateDetail,false);
        });
    }

    function createBo(){
        for(let i=0;i<obj.el.length && i<obj.boMax ;i++) {
            obj.boParentEl.innerHTML =obj.boParentEl.innerHTML + obj.boElHtml;
            if(obj.method===2) {
                document.getElementsByClassName(obj.boClassName)[i].value = i + 1;
            }
        }
        document.getElementsByClassName(obj.boClassName)[0].className=obj.boChangeClassName;
    }

    function shiftBo(i){
        document.getElementsByClassName(obj.boChangeClassName)[0].className=obj.boClassName;
        boEl[newI].className=obj.boChangeClassName;
    }

    function clickBo(){
        let child=obj.boParentEl.children;
        for(let i=0;i<child.length;i++){
            child[i].onclick=function(){
                obj.el[newI].className=preClassName+" "+obj.animate[0];
                obj.el[newI].addEventListener('animationend',remove(i));
            };
        }
    }
    function remove(i){
        let k=newI;
        obj.el[newI].style.display='none';
        if(i===obj.el.length){
            i=0;
        }else if(i===-1){
            i=obj.el.length-1;
        }
        newI=i;
        obj.el[newI].style.display='block';
        obj.el[newI].className=preClassName+" "+obj.animate[1];
        shiftBo(i);
        obj.el[k].removeEventListener('animationend',remove,false);
    }

    function arrowLeftClick(){
        arrowLeft.onclick=function() {
            obj.el[newI].className = preClassName + " " + obj.animate[0];
            let i = newI - 1;
            obj.el[newI].addEventListener('animationend', remove(i));
        }
    }
    function arrowRightClick(){
        arrowRight.onclick=function() {
            obj.el[newI].className = preClassName + " " + obj.animate[0];
            let i = newI + 1;
            obj.el[newI].addEventListener('animationend', remove(i));
        }
    }

}

let broad={
    el:document.querySelectorAll('#box-img img'),  //图片节点
    animate:["animated fadeOutLeft","animated fadeInRight"], //出去 进来 animate
    boParentEl:document.getElementById('box-pager'), //圆点的父节点
    boElHtml:"<div class='pager'></div>", //圆点的 html
    boClassName:'pager', //圆点的 ClassName
    boMax:5, //最大的圆点数
    method:1, //method=1 : 小圆点   method=2 : 带页码
    boChangeClassName:'pager4', //改变后的圆点 className  【通过改变className 来改变圆点样式】
    xxx:'xxx',  //定时器 随便什么名字
    arrowName:['#box-left','#box-right']  //箭头 【选择器形式】
};
broadcastImg(broad);