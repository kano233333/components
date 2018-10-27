export function lattice(obj,width,height,xNum,yNum,mag=1){
    for(let i=0;i<obj.length;i++){
        obj[i].style.top=Math.floor(i/xNum)*width*mag+'px';
    }
    for(let i=0;i<obj.length;i++){
        obj[i].style.left=i%yNum*height*mag+'px';
    }
}