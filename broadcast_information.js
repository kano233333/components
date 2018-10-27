
//-------------------------------第一版（还有问题）--------------------------------------------------

// function shiftPage(el,showNum,cName,speed,method,animateMethod,xxx,boParentElClassName,boStr,boClassName,boMax,changeStyle){
//     let bo;
//     var num=0;
//     createBo(el);
//     if(method===1) {
//         bo[0].style.backgroundColor='#8c8d8d';
//     }else if(method===2){
//         bo[0].style.fontWeight='bold';
//     }
//     var yeShu= boMax*showNum<el.length ? boMax : Math.ceil(el.length/showNum);
//     var chuName=cName;
//     window[xxx]=setInterval(startAnimate,speed);
//     //鼠标移入 移出
//     for(let i=0;i<el.length;i++){
//         el[i].onmouseenter=function(){
//             clearInterval(window[xxx]);
//         };
//         el[i].onmouseleave=function(){
//             window[xxx]=setInterval(startAnimate,speed)
//         }
//     }
//
//     function startAnimate(){
//         console.log(num);
//         for(let i=0;i<el.length;i++){
//             el[i].className=chuName+" "+animateMethod[0];
//             el[i].addEventListener('animationend',function(){
//                 this.style.display='none';
//                 for(let i=num*showNum;i<num*showNum+showNum && i<el.length;i++){
//                     el[i].style.display="block";
//                     el[i].className=chuName+" "+animateMethod[1];
//                 }
//                 shiftBo(num);
//             },false)
//         }
//
//         num++;
//         if(num===yeShu){
//             num=0;
//         }
//     }
//
//     function createBo(){
//         if(Math.ceil(el.length/showNum)===1){
//             return;
//         }
//         for(let i=0;i<Math.ceil(el.length/showNum) && i<boMax ;i++) {
//             $(boParentElClassName).append(boStr);
//         }
//         bo=document.getElementsByClassName(boClassName);
//
//         for(let i=0;i<bo.length;i++){
//             bo[i].value=i+1;
//             bo[i].onclick=function(){
//                 num=i-1;
//                 clearInterval(window[xxx]);
//                 startAnimate();
//             };
//             bo[i].onmouseleave=function(){
//                 clearInterval(window[xxx]);
//                 window[xxx]=setInterval(startAnimate,speed)
//             }
//         }
//
//     }
//
//     function shiftBo(num){
//         $('.'+boClassName).css(
//             changeStyle[0]
//         );
//         for(let item in changeStyle[1]){
//             bo[num].style.item=changeStyle[1][item];
//         }
//     }
// }


//-------------------------------第二版--------------------------------------

//参数是【对象】
function shiftPage(shiftObj){
    let bo;
    var num=0;
    createBo(shiftObj.el);
    //判断el的个数是否大于 最多的页数*每一页展示的数目  大于：yeShu=boMax
    var yeShu= shiftObj.boMax*shiftObj.showNum<shiftObj.el.length ? shiftObj.boMax : Math.ceil(shiftObj.el.length/shiftObj.showNum);
    var chuName=shiftObj.cName;
    //将定时器的变量 绑在 window 下   不绑:清除定时器时 它会找不到对象
    window[shiftObj.xxx]=setInterval(startAnimate,shiftObj.speed);
    //鼠标移入 移出
    for(let i=0;i<shiftObj.el.length;i++){
        shiftObj.el[i].onmouseenter=function(){
            clearInterval(window[shiftObj.xxx]);
        }
        shiftObj.el[i].onmouseleave=function(){
            window[shiftObj.xxx]=setInterval(startAnimate,shiftObj.speed)
        }
    }
    //执行动画
    function startAnimate(){
        for(let i=0;i<shiftObj.el.length;i++){
            //添加 绑定了动画的className
            shiftObj.el[i].className=chuName+" "+shiftObj.animateMethod[0];
            //添加 动画完成后的监听函数  动画完成后 display:none   为应该显示的el添加进入动画
            shiftObj.el[i].addEventListener('animationend',function(){
                this.style.display='none';
                for(let i=num*shiftObj.showNum;i<num*shiftObj.showNum+shiftObj.showNum && i<shiftObj.el.length;i++){
                    shiftObj.el[i].style.display="block";
                    //为应该显示的el添加进入动画
                    shiftObj.el[i].className=chuName+" "+shiftObj.animateMethod[1];
                }
                //转化页码
                shiftBo(num);
            },false)
        }
        num++;
        if(num===yeShu){
            num=0;
        }
    }

    //根据el个数 创建页码  有最大页码数(boMax)的限制
    function createBo(){
        // if(Math.ceil(shiftObj.el.length/shiftObj.showNum)===1){
        //     return;
        // }
        for(let i=0;i<Math.ceil(shiftObj.el.length/shiftObj.showNum) && i<shiftObj.boMax ;i++) {
            $(shiftObj.boParentElClassName).append(shiftObj.boStr);
        }
        bo=document.getElementsByClassName(shiftObj.boClassName);

        for(let i=0;i<bo.length;i++){
            bo[i].value=i+1;
            //点击页码事件
            bo[i].onclick=function(){
                num=i-1;
                clearInterval(window[shiftObj.xxx]);
                startAnimate();
            }
            bo[i].onmouseleave=function(){
                clearInterval(window[shiftObj.xxx]);
                window[shiftObj.xxx]=setInterval(startAnimate,shiftObj.speed)
            }
        }
        //默认第一个页码有样式
        bo[0].setAttribute('style',shiftObj.changeStyle[1]);
    }

    //改变页码样式
    function shiftBo(num){
        $('.'+shiftObj.boClassName).css(
            shiftObj.changeStyle[0]
        )
        bo[num].setAttribute('style',shiftObj.changeStyle[1]);
    }
}


let shift={
             //要切换的东西的数组
    "el":'',
            //一页展示的el数目
    "showNum": 4,
            //el共同拥有的className(非选择器类型)
    "cName":'',
            //切换的时间
    "speed":3500,
            //轮播类型 method=1:切换小圆点类型   method=2:切换 有页码
    "method":1,
            //【数组】  animateMethod[0]:el切出的动画   animateMethod[1]:el切入的动画 【加className , 结合animete.css】
    "animateMethod":['',''],
            //【必填】 定时器需要的变量名 要保证每一个轮播xxx不一样  随便填一个String
    "xxx":'xxx',
            //页码父元素的className(选择器类型)
    "boParentElClassName":'.xxx',
            //页码 append 的字符串
    "boStr":'<div class="teamInfoPaint"></div>',
            //页码共有的className
    "boClassName":"teamInfoPaint",
            //最多的页码数
    "boMax":5,
            //【数组】页码 当前页的样式  changeStyle[0]【对象 驼峰】:非当前页的页码样式   changeStyle[1]【所有样式组成的字符串(style格式的)】
    "changeStyle":[
        {
            "backgroundColor":""
        },
        'background-color:#fff ; font-size:15px;'
    ]
}
