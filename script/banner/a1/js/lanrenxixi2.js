var img_heightnum;
img_heightnum=0;

img_heightnum=document.getElementById('img_heightnum').innerHTML*1;


var img_widthnum;
img_widthnum=0;

img_widthnum=document.getElementById('img_widthnum').innerHTML*1;
var fadeDelay,slidetimer,scrolltimer,c;var autoPlay=false;var bgimages=[];init();play();function carousel(a){this.p=new pagination(a);this.s=new stage();this.selectedIndex=-1;this.busy=false}function pagination(a){this.buttons=[a];var b=0;for(b=0;b<a;b++){this.buttons[b]=new pagebutton(b+1)}}function pagebutton(a){this.id="control"+a;this.elem=document.getElementById(this.id)}function stage(){this.frames=[2];this.frames[0]=new frame(1,true,8);this.frames[1]=new frame(2,true,8);}function frame(b,a,f){this.id="f"+b;this.elem=document.getElementById(this.id);this.activeOverlay=-1;this.imgLoaded=false;this.overlays=[f];var d=1;for(d;d<=f;d++){var e=new overlay(this.id,d);this.overlays[d-1]=e}if(a){this.spots=[f];d=1;for(d;d<=f;d++){var g=new hotspot(this.id,d);this.spots[d-1]=g}}}function hotspot(a,b){this.id=a+"h"+b;this.elem=document.getElementById(this.id)}function overlay(a,b){this.id=a+"t"+b;this.elem=document.getElementById(this.id)}function init(){var a=document.getElementById("numFrame").value;var b="images";for(i=0;i<a;i++){bgimages[i]=document.getElementById(b+(i+1)).value}c=new carousel(a);hit(1);c.s.frames[0].imgLoaded=true;c.selectedIndex=1}function play(){if(autoPlay){return}autoPlay=true;scrolltimer=setInterval(goToNextFrame,8000)}function pause(){if(!autoPlay){return}autoPlay=false;if(scrolltimer==undefined||scrolltimer==null){return}clearInterval(scrolltimer);scrolltimer=null}function restart(){pause();play()}function goToNextFrame(){if(autoPlay){var a=nextFrame();press(a,true)}}function nextFrame(){if(c.selectedIndex==bgimages.length){return 1}else{if(c.selectedIndex<bgimages.length){return((c.selectedIndex*1)+1)}else{return 1}}}function prevFrame(){if(c.selectedIndex>1){return((c.selectedIndex*1)-1)}else{return document.getElementById("numFrame").value}}function loadImg(b){if(b!=-1){var a=c.s.frames[b-1];if(a.imgLoaded){return}}elem=document.getElementById(c.s.frames[b-1].id);elem.style.backgroundImage="url("+bgimages[b-1]+")";c.s.frames[b-1].imgLoaded=true}function hover(a){if(a==-1||a==c.selectedIndex){return}loadImg(a);c.p.buttons[a-1].elem.className="on"}function unhit(a){if(a==-1){return}c.p.buttons[a-1].elem.className="off"}function out(a){if(a==-1||a==c.selectedIndex){return}c.p.buttons[a-1].elem.className="off"}function hit(a){if(a==-1||a==c.selectedIndex){return}c.p.buttons[a-1].elem.className="selected"}function active(){if(c.selectedIndex==-1){return}pause();updateFrame(true)}function deactive(){if(c.selectedIndex==-1){return}var a=c.s.frames[c.selectedIndex-1];if(a==null){return}updateFrame(false);restart()}function updateFrame(d){var b=c.s.frames[c.selectedIndex-1];if(b==null){return}if(b.spots==null){return}var a=b.spots.length;if(!d){clearOverlay(b)}for(a;a>0;a--){}}function clearOverlay(a){if(a.activeOverlay!=-1){var b=a.overlays[a.activeOverlay-1];hideOverlay(b.id);a.activeOverlay=-1}}function fadeOverlay(a){fadeDelay=setTimeout("hideOverlay('"+a+"')",700);hideOtherVisibleOverlays(a)}function hideOtherVisibleOverlays(b){var e=b.substring(0,2);var d=getElementsByClassName(document.getElementById(e),"a","overlay");for(var a=0;a<d.length;a++){if(d[a].style.display=="block"&&d[a].id!=b){d[a].style.display="none"}}}function getElementsByClassName(b,g,a){var f=(g=="*"&&b.all)?b.all:b.getElementsByTagName(g);var j=new Array();a=a.replace(/\-/g,"\\-");var h=new RegExp("(^|\\s)"+a+"(\\s|$)");var e;for(var d=0;d<f.length;d++){e=f[d];if(h.test(e.className)){j.push(e)}}return(j)}function hideOverlay(a){elem=document.getElementById(a);hide(elem);c.s.frames[c.selectedIndex-1].activeOverlay=-1}function showOverlay(b,d){hideOtherVisibleOverlays(b);if(fadeDelay!=undefined){clearTimeout(fadeDelay);fadeDelay=undefined}if(c.s.frames[c.selectedIndex-1].activeOverlay==d){return}clearOverlay(c.s.frames[c.selectedIndex-1]);var a=document.getElementById(b);show(a);c.s.frames[c.selectedIndex-1].activeOverlay=d}function changeOpac(b,d){var a=document.getElementById(d).style;a.opacity=(b/100);a.MozOpacity=(b/100);a.KhtmlOpacity=(b/100);a.filter="alpha(opacity="+b+")"}function showLegal(){elem=document.getElementById("legal");show(elem)}function hideLegal(){elem=document.getElementById("legal");hide(elem)}function hide(a){if(a==null||a.style.display=="none"){return}a.style.display="none"}function show(a){if(a==null||a.style.display=="block"){return}a.style.display="block"}function press(b,a){if(c.busy||b==c.selectedIndex){return}loadImg(b);deactive();hit(b);unhit(c.selectedIndex);slide(b,a);c.selectedIndex=b}function slide(b,a){c.busy=true;if(slidetimer!=undefined||slidetimer!=null){clearTimeout(slidetimer)}(a||b>c.selectedIndex)?scrollRight(b,c.selectedIndex):scrollLeft(b,c.selectedIndex)}function scrollRight(d,a){var b=document.getElementById("stage");b.style.left="0px";reposition(a,0);reposition(d,1);reIndex(d,a);scroll(0,-img_widthnum)}function scrollLeft(d,a){var b=document.getElementById("stage");b.style.left="-"+img_widthnum+"px";reposition(d,0);reposition(a,1);reIndex(d,a);scroll(-img_widthnum,0)}function reIndex(e,b){var d=2;var a=c.s.frames.length;for(a;a>0;a--){if(a!=e&&a!=b){reposition(a,d++)}}}function reposition(b,a){c.s.frames[b-1].elem.style.left=img_widthnum*a+"px"}function scroll(d,a){var b=document.getElementById("stage");next=d,slidetimer=0,interval=50,speed=40;if(d<a){next+=interval}else{if(d>a){next-=interval}}if(next>0||(next<a&&d>a)||(next>a&&d<a)){next=next>0?0:a;b.style.left=next+"px";c.busy=false}else{b.style.left=next+"px";slidetimer=setTimeout("scroll("+next+", "+a+")",speed)}}function highlightA(a){if(a.className=="arrow r-a"){a.className="arrow r-h"}if(a.className=="arrow l-a"){a.className="arrow l-h"}}function dehighlightA(a){if(a.className=="arrow r-h"){a.className="arrow r-a"}else{if(a.className=="arrow l-h"){a.className="arrow l-a"}}}function prevF(){if(c.busy||a==c.selectedIndex){return}var a=prevFrame();loadImg(a);deactive();hit(a);unhit(c.selectedIndex);c.busy=true;if(slidetimer!=undefined||slidetimer!=null){clearTimeout(slidetimer)}scrollLeft(a,c.selectedIndex);c.selectedIndex=a}function nextF(){if(c.busy||a==c.selectedIndex){return}var a=nextFrame();loadImg(a);deactive();hit(a);unhit(c.selectedIndex);c.busy=true;if(slidetimer!=undefined||slidetimer!=null){clearTimeout(slidetimer)}scrollRight(a,c.selectedIndex);c.selectedIndex=a};