A=document.getElementById
B=document.all;
C=document.layers;
T1=new Array("http://dynamicdrive.com/dynamicindex13/trail1.gif",38,35,"http://dynamicdrive.com/dynamicindex13/trail2.gif",30,31,"http://dynamicdrive.com/dynamicindex13/trail3.gif",28,26,"http://dynamicdrive.com/dynamicindex13/trail4.gif",22,21,"http://dynamicdrive.com/dynamicindex13/trail5.gif",16,16,"http://dynamicdrive.com/dynamicindex13/trail6.gif",10,10)

var offsetx=15 //x offset of trail from mouse pointer
var offsety=10 //y offset of trail from mouse pointer

nos=parseInt(T1.length/3)
rate=50
ie5fix1=0;
ie5fix2=0;
rightedge=B? document.body.clientWidth-T1[1] : window.innerWidth-T1[1]-20
bottomedge=B? document.body.scrollTop+document.body.clientHeight-T1[2] : window.pageYOffset+window.innerHeight-T1[2]

for (i=0;i<nos;i++){
createContainer("CUR"+i,i*10,i*10,i*3+1,i*3+2,"","<img src='"+T1[i*3]+"' width="+T1[(i*3+1)]+" height="+T1[(i*3+2)]+" border=0>")
}

function createContainer(N,Xp,Yp,W,H,At,HT,Op,St){
with (document){
write((!A && !B) ? "<layer id='"+N+"' left="+Xp+" top="+Yp+" width="+W+" height="+H : "<div id='"+N+"'"+" style='position:absolute;left:"+Xp+"; top:"+Yp+"; width:"+W+"; height:"+H+"; ");
if(St){
if (C)
write(" style='");
write(St+";' ")
}
else write((A || B)?"'":"");
write((At)? At+">" : ">");
write((HT) ? HT : "");
if (!Op)
closeContainer(N)
}
}

function closeContainer(){
document.write((A || B)?"</div>":"</layer>")
}

function getXpos(N){
if (A)
return parseInt(document.getElementById(N).style.left)
else if (B)
return parseInt(B[N].style.left)
else
return C[N].left
}

function getYpos(N){
if (A)
return parseInt(document.getElementById(N).style.top)
else if (B)
return parseInt(B[N].style.top)
else
return C[N].top
}

function moveContainer(N,DX,DY){
c=(A)? document.getElementById(N).style : (B)? B[N].style : (C)? C[N] : "";
if (!B){
rightedge=window.innerWidth-T1[1]-20
bottomedge=window.pageYOffset+window.innerHeight-T1[2]
}
c.left=Math.min(rightedge, DX+offsetx);
c.top=Math.min(bottomedge, DY+offsety);
}
function cycle(){
//if (IE5) 
if (document.all&&window.print){
ie5fix1=document.body.scrollLeft;
ie5fix2=document.body.scrollTop;
}
for (i=0;i<(nos-1);i++){
moveContainer("CUR"+i,getXpos("CUR"+(i+1)),getYpos("CUR"+(i+1)))
}
}

function newPos(e){
moveContainer("CUR"+(nos-1),(B)?event.clientX+ie5fix1:e.pageX+2,(B)?event.clientY+ie5fix2:e.pageY+2)
}

function getedgesIE(){
rightedge=document.body.clientWidth-T1[1]
bottomedge=document.body.scrollHeight-T1[2]
}

if (B){
window.onload=getedgesIE
window.onresize=getedgesIE
}

if(document.layers)
document.captureEvents(Event.MOUSEMOVE)
document.onmousemove=newPos
setInterval("cycle()",rate)
</script>