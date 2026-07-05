const needle=document.getElementById("needle");

let currentAngle=0;

document.body.addEventListener("pointerdown",e=>{

const cx=window.innerWidth/2;
const cy=window.innerHeight/2;

const dx=e.clientX-cx;
const dy=cy-e.clientY;

let angle=Math.atan2(dx,dy)*180/Math.PI;

if(angle<0) angle+=360;

spinCompass(angle);

});

function spinCompass(target){

const start=currentAngle;

const totalRotation=720+target-start;

const duration=2200;

const startTime=performance.now();

function animate(time){

let t=(time-startTime)/duration;

if(t>1)t=1;

let ease=1-Math.pow(1-t,3);

let wobble=Math.sin(t*18*Math.PI)*(1-t)*18;

let angle=start+totalRotation*ease+wobble;

needle.style.transform=`rotate(${angle}deg)`;

if(t<1){

requestAnimationFrame(animate);

}else{

currentAngle=target;

needle.style.transform=`rotate(${target}deg)`;

}

}

requestAnimationFrame(animate);

}
