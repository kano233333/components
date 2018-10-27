function broadcast(obj){
    var bImg = obj.PEl.getElementsByTagName('img');
    var imgLength = bImg.length;
    var PWidth = obj.PEl.clientWidth;
    var preventI = 1;
    if(obj.method) {
        setPager();
    }
    var pagerDot = obj.pagerEl.getElementsByTagName('p');
    obj.PEl.style.left = -PWidth+'px';

    //切换图片
    function move(direct){
        obj.PEl.style.transition = obj.transitionStr;
        preventI+=direct;
        obj.PEl.style.left = -preventI*PWidth + 'px';
        //解决第一张和最后一张图片
        if(preventI === imgLength-1){
            setTimeout(function(){
                obj.PEl.style.transition = '0s';
                obj.PEl.style.left = -PWidth + 'px';
                preventI=1;
            },obj.shiftTime);
        }
        if(preventI === 0 && direct===-1){
            setTimeout(function(){
                obj.PEl.style.transition = '0s';
                obj.PEl.style.left = -PWidth*(imgLength-2) + 'px';
                preventI=bImg.length-2;
            },obj.shiftTime);
        }
    }

    window[obj.xxx]=setInterval(function(){
        move(-1);
        shiftPager();
    },obj.setTime);
    //鼠标移入
    obj.PEl.parentNode.onmouseenter = function(){
        clearInterval(window[obj.xxx]);
        if(obj.method){
            obj.arronLeftEl.style.visibility = 'visible';
            obj.arronLeftEl.style.opacity = '1';
            obj.arronRightEl.style.visibility = 'visible';
            obj.arronRightEl.style.opacity = '1';
        }
    };
    //鼠标移出
    obj.PEl.parentNode.onmouseleave = function(){
        if(obj.method){
            obj.arronLeftEl.style.opacity = '0';
            obj.arronLeftEl.style.visibility = 'hidden';
            obj.arronRightEl.style.opacity = '0';
            obj.arronRightEl.style.visibility = 'hidden';
        }
        window[obj.xxx]=setInterval(function(){
            move(1);
            shiftPager();
        },obj.setTime);
    };
    //箭头的点击
    if(obj.method){
        obj.arronRightEl.onclick = function(){
            move(1);
            shiftPager();
        };
        obj.arronLeftEl.onclick = function(){
            move(-1);
            shiftPager();
        };
    }
    //设置小圆点
    function setPager(){
        for(var i=0;i<imgLength-2;i++){
            var pagerDotX = document.createElement('p');
            if(i===0){
                pagerDotX.className = obj.pagerClassName2;
            }else{
                pagerDotX.className = obj.pagerClassName1;
            }
            obj.pagerEl.appendChild(pagerDotX);
        }
    }
    //切换小圆点
    function shiftPager(){
        for(var i=0;i<imgLength-2;i++){
            pagerDot[i].className = obj.pagerClassName1;
        }
        var k = preventI-1;
        if(preventI === imgLength-1){
            k=0;
        }else if(preventI === 0){
            k=pagerDot.length-1;
        }
        pagerDot[k].className = obj.pagerClassName2;
    }
    //小圆点的点击
    (function(){
        for(var i=0;i<pagerDot.length;i++){
            (function(i){
                pagerDot[i].onclick = function(){
                    preventI = i;
                    move(1);
                    shiftPager();
                }
            })(i);
        }
    })();
}

//html中 第一张图和最后一张图 是 显示时的 最后一张和第一张
var castObj = {
    PEl:broadcastParent, //轮播图的父节点
    transitionStr:'1s all',  //css里设置的transition (配合transition使用)
    setTime:3000,  //图片停留的时间
    shiftTime:1000,  //切换图片的时间
    pagerEl:pagerEl,  //小圆点节点
    pagerClassName1:'pager-dot1',  //非当前图片小圆点的样式的className
    pagerClassName2:'pager-dot2', //当前图片小圆点的样式的className
    xxx:'aaa',  //定时器名称，随便来
    method:'1',  //method=1 鼠标移入有箭头[填写arron相关参数] ;  method=0 没有箭头
    //箭头设置的是visibility和opacity,配合transition使用
    arronLeftEl:document.querySelector('.arronLeft'),  //左箭头节点
    arronRightEl:document.querySelector('.arronRight')  //右键头节点
};