/* BioVirtua 3D scenes. Three.js r128. One canvas per page, lazy-init, dpr-capped,
   paused offscreen, reduced-motion + no-WebGL fallbacks. */
(function(){
  'use strict';
  var RM=window.__BV_RM;
  var canvas=document.getElementById('scene-canvas'); if(!canvas)return;
  var poster=document.getElementById('scene-poster');
  function showPoster(){ if(poster)poster.style.opacity='1'; canvas.style.opacity='0'; }
  if(typeof THREE==='undefined'){ showPoster(); return; }
  // WebGL support check
  try{var tc=document.createElement('canvas');if(!(tc.getContext('webgl')||tc.getContext('experimental-webgl'))){showPoster();return;}}catch(e){showPoster();return;}

  var scene=canvas.getAttribute('data-scene')||'signature';
  var isMobile=matchMedia('(max-width:820px)').matches;
  var lowPower=isMobile;
  var DPR=Math.min(window.devicePixelRatio||1, isMobile?1.0:1.5);

  var renderer,cam,threeScene,points,raf,running=false,visible=true,t0=performance.now();
  var progress=0; // scroll progress 0..1 for signature
  var introMorph=RM?1:0; // 0 cloud -> 1 standing (assemble)

  function rand(a,b){return a+Math.random()*(b-a);}
  // sample points along a capsule between p0 and p1 with radius r
  function seg(out,n,p0,p1,r){
    for(var i=0;i<n;i++){
      var t=Math.random(), x=p0[0]+(p1[0]-p0[0])*t, y=p0[1]+(p1[1]-p0[1])*t, z=p0[2]+(p1[2]-p0[2])*t;
      var a=Math.random()*Math.PI*2, rr=r*Math.sqrt(Math.random());
      out.push(x+Math.cos(a)*rr, y+rand(-r,r)*0.5, z+Math.sin(a)*rr);
    }
  }
  function ball(out,n,c,r){for(var i=0;i<n;i++){var u=Math.random(),v=Math.random(),th=2*Math.PI*u,ph=Math.acos(2*v-1),rr=r*Math.cbrt(Math.random());out.push(c[0]+rr*Math.sin(ph)*Math.cos(th),c[1]+rr*Math.cos(ph),c[2]+rr*Math.sin(ph)*Math.sin(th));}}
  // Build a humanoid point set. pose: 'stand' | 'stride'. Returns Float32Array length count*3.
  function humanoid(count,pose){
    var p=[]; var stride=pose==='stride';
    var alloc={head:0.10,torso:0.30,armL:0.11,armR:0.11,legL:0.19,legR:0.19};
    var n=function(f){return Math.floor(count*f);};
    ball(p,n(alloc.head),[0,2.55,0],0.32);
    seg(p,n(alloc.torso),[0,2.25,0],[0,1.15,0],0.34);
    // arms
    if(stride){ seg(p,n(alloc.armL),[-0.28,2.15,0],[-0.75,1.75,0.5],0.12); seg(p,n(alloc.armL)/1,[-0.75,1.75,0.5],[-0.9,1.2,0.9],0.10);
      seg(p,n(alloc.armR),[0.28,2.15,0],[0.7,1.7,-0.5],0.12); seg(p,n(alloc.armR)/1,[0.7,1.7,-0.5],[0.95,2.05,-0.3],0.10); }
    else { seg(p,n(alloc.armL),[-0.28,2.15,0],[-0.5,1.5,0],0.12); seg(p,n(alloc.armL)/1,[-0.5,1.5,0],[-0.58,0.85,0.05],0.10);
      seg(p,n(alloc.armR),[0.28,2.15,0],[0.5,1.5,0],0.12); seg(p,n(alloc.armR)/1,[0.5,1.5,0],[0.58,0.85,0.05],0.10); }
    // legs
    if(stride){ seg(p,n(alloc.legL),[-0.16,1.15,0],[-0.35,0.6,0.55],0.15); seg(p,n(alloc.legL)/1,[-0.35,0.6,0.55],[-0.4,0.05,0.95],0.12);
      seg(p,n(alloc.legR),[0.16,1.15,0],[0.3,0.55,-0.5],0.15); seg(p,n(alloc.legR)/1,[0.3,0.55,-0.5],[0.42,0.1,-0.85],0.12); }
    else { seg(p,n(alloc.legL),[-0.16,1.15,0],[-0.2,0.55,0],0.16); seg(p,n(alloc.legL)/1,[-0.2,0.55,0],[-0.22,0,0],0.12);
      seg(p,n(alloc.legR),[0.16,1.15,0],[0.2,0.55,0],0.16); seg(p,n(alloc.legR)/1,[0.2,0.55,0],[0.22,0,0],0.12); }
    // pad to exact count
    while(p.length<count*3){p.push(rand(-0.4,0.4),rand(0.2,2.6),rand(-0.3,0.3));}
    var arr=new Float32Array(count*3); for(var i=0;i<count*3;i++)arr[i]=p[i]; return arr;
  }
  function cloud(count,r){var a=new Float32Array(count*3);for(var i=0;i<count;i++){var u=Math.random(),v=Math.random(),th=2*Math.PI*u,ph=Math.acos(2*v-1),rr=r*(0.5+0.5*Math.cbrt(Math.random()));a[i*3]=rr*Math.sin(ph)*Math.cos(th);a[i*3+1]=1.3+rr*Math.cos(ph)*0.9;a[i*3+2]=rr*Math.sin(ph)*Math.sin(th);}return a;}
  function dataField(count){var a=new Float32Array(count*3);for(var i=0;i<count;i++){a[i*3]=rand(-3.4,3.4);a[i*3+1]=rand(0.2,3.0);a[i*3+2]=rand(-1.2,1.2);}return a;}
  function dial(count){var a=new Float32Array(count*3);for(var i=0;i<count;i++){var ang=rand(0,Math.PI*2),ring=Math.random()<0.5?1.6:rand(0.2,1.6);a[i*3]=Math.cos(ang)*ring;a[i*3+1]=1.3+Math.sin(ang)*ring;a[i*3+2]=rand(-0.12,0.12);}return a;}
  function timeline(count){var a=new Float32Array(count*3);for(var i=0;i<count;i++){var x=rand(-3.2,3.2);a[i*3]=x;a[i*3+1]=1.3+Math.sin(x*1.6)*0.5+rand(-0.15,0.15);a[i*3+2]=rand(-0.4,0.4);}return a;}
  function wave(count){var a=new Float32Array(count*3);for(var i=0;i<count;i++){var x=rand(-3,3),z=rand(-1.6,1.6);a[i*3]=x;a[i*3+1]=1.3+Math.sin(x*1.4+z)*0.4;a[i*3+2]=z;}return a;}

  function targetsFor(sceneName,count){
    if(sceneName==='signature')return [cloud(count,3.2),humanoid(count,'stand'),dataField(count),humanoid(count,'stride')];
    if(sceneName==='dial')return [cloud(count,2.6),dial(count)];
    if(sceneName==='timeline')return [cloud(count,2.6),timeline(count)];
    if(sceneName==='limb')return [cloud(count,2.4),humanoid(count,'stride')];
    if(sceneName==='wave')return [cloud(count,2.6),wave(count)];
    if(sceneName==='constellation')return [cloud(count,3.0),dataField(count)];
    return [cloud(count,2.6),humanoid(count,'stand')];
  }

  var COUNT = scene==='signature' ? (isMobile?6000:16000) : (isMobile?2500:6000);

  var vert=[
'precision highp float;',
'attribute vec3 aP0; attribute vec3 aP1; attribute vec3 aP2; attribute vec3 aP3; attribute float aR;',
'uniform float uMorph; uniform float uTime; uniform float uSize; uniform float uKeys;',
'varying float vLife;',
'vec3 pick(){',
'  float m=clamp(uMorph,0.0,uKeys);',
'  vec3 a; vec3 b; float f;',
'  if(m<1.0){a=aP0;b=aP1;f=m;}',
'  else if(m<2.0){a=aP1;b=aP2;f=m-1.0;}',
'  else {a=aP2;b=aP3;f=m-2.0;}',
'  return mix(a,b,smoothstep(0.0,1.0,f));',
'}',
'void main(){',
'  vec3 p=pick();',
'  float tw=0.08+aR*0.12;',
'  p.x+=sin(uTime*0.6+aR*22.0)*tw;',
'  p.y+=cos(uTime*0.5+aR*18.0)*tw;',
'  p.z+=sin(uTime*0.7+aR*30.0)*tw;',
'  vLife=aR;',
'  vec4 mv=modelViewMatrix*vec4(p,1.0);',
'  gl_PointSize=uSize*(300.0/-mv.z)*(0.6+aR*0.8);',
'  gl_Position=projectionMatrix*mv;',
'}'].join('\n');
  var frag=[
'precision highp float;',
'uniform vec3 uColA; uniform vec3 uColB; uniform float uOpacity;',
'varying float vLife;',
'void main(){',
'  vec2 c=gl_PointCoord-0.5; float d=length(c);',
'  if(d>0.5)discard;',
'  float alpha=smoothstep(0.5,0.0,d);',
'  vec3 col=mix(uColA,uColB,vLife);',
'  gl_FragColor=vec4(col,alpha*uOpacity);',
'}'].join('\n');

  var uniforms;
  function init(){
    try{
      renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:false,powerPreference:'high-performance'});
      renderer.setPixelRatio(DPR); resize();
      threeScene=new THREE.Scene();
      cam=new THREE.PerspectiveCamera(52,canvas.clientWidth/canvas.clientHeight,0.1,100);
      cam.position.set(0,1.5,6);
      var tg=targetsFor(scene,COUNT); while(tg.length<4)tg.push(tg[tg.length-1]);
      var geo=new THREE.BufferGeometry();
      geo.setAttribute('position',new THREE.BufferAttribute(tg[0],3));
      geo.setAttribute('aP0',new THREE.BufferAttribute(tg[0],3));
      geo.setAttribute('aP1',new THREE.BufferAttribute(tg[1],3));
      geo.setAttribute('aP2',new THREE.BufferAttribute(tg[2],3));
      geo.setAttribute('aP3',new THREE.BufferAttribute(tg[3],3));
      var rnd=new Float32Array(COUNT); for(var i=0;i<COUNT;i++)rnd[i]=Math.random();
      geo.setAttribute('aR',new THREE.BufferAttribute(rnd,1));
      uniforms={uMorph:{value:introMorph},uTime:{value:0},uSize:{value:scene==='signature'?2.2:1.9},
        uKeys:{value:scene==='signature'?3.0:1.0},
        uColA:{value:new THREE.Color(0x22C7D6)},uColB:{value:new THREE.Color(0xFF6A4D)},uOpacity:{value:0.92}};
      var mat=new THREE.ShaderMaterial({uniforms:uniforms,vertexShader:vert,fragmentShader:frag,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
      points=new THREE.Points(geo,mat); threeScene.add(points);
      if(poster)poster.style.opacity='0';
      // intro assemble
      if(!RM&&scene==='signature'){ window.addEventListener('bv:loaded',assemble); setTimeout(assemble,1200); }
      bindScroll(); observe(); start();
    }catch(err){ console.warn('scene init failed',err); showPoster(); }
  }
  var assembled=false;
  function assemble(){ if(assembled)return; assembled=true;
    var s=performance.now(); function step(n){var p=Math.min(1,(n-s)/1600);uniforms.uMorph.value=Math.max(uniforms.uMorph.value,p);if(p<1)requestAnimationFrame(step);} requestAnimationFrame(step); }

  function bindScroll(){
    if(scene==='signature'){
      var hero=document.querySelector('.hero');
      if(typeof gsap!=='undefined'&&gsap.registerPlugin&&window.ScrollTrigger&&!RM&&hero){
        gsap.registerPlugin(ScrollTrigger);
        var st=ScrollTrigger.create({trigger:hero,start:'top top',end:'+=150%',pin:true,scrub:0.6,
          onUpdate:function(self){progress=self.progress;}});
        window.dispatchEvent(new CustomEvent('bv:arc',{detail:{scene:'signature',start:st.start,end:st.end}}));
      } else {
        // reduced-motion / no-gsap: map window scroll within first 1.5vh
        window.addEventListener('scroll',function(){progress=Math.min(1,window.scrollY/(window.innerHeight*1.2));},{passive:true});
      }
    } else {
      window.addEventListener('scroll',function(){var r=canvas.getBoundingClientRect();progress=1-Math.max(0,Math.min(1,(r.top+r.height*0.3)/window.innerHeight));},{passive:true});
    }
  }
  function observe(){
    if(!('IntersectionObserver'in window))return;
    new IntersectionObserver(function(en){en.forEach(function(x){visible=x.isIntersecting;});},{threshold:0.02}).observe(canvas);
    document.addEventListener('visibilitychange',function(){visible=!document.hidden;});
  }
  function resize(){var w=canvas.clientWidth||canvas.offsetWidth||window.innerWidth,h=canvas.clientHeight||canvas.offsetHeight||window.innerHeight;renderer.setSize(w,h,false);if(cam){cam.aspect=w/h;cam.updateProjectionMatrix();}}
  window.addEventListener('resize',function(){if(renderer)resize();});

  function frame(now){
    raf=requestAnimationFrame(frame);
    if(!visible)return;
    var t=(now-t0)/1000; uniforms.uTime.value=t;
    if(scene==='signature'){
      // idle sits at standing(1); scroll drives 1->3
      var target=1+progress*2;
      uniforms.uMorph.value=Math.max(uniforms.uMorph.value*(assembled?0:1), assembled?target:uniforms.uMorph.value);
      if(assembled)uniforms.uMorph.value=target<1?uniforms.uMorph.value:target;
      // camera orbit + rise
      var ang=-0.5+progress*4.2, radius=6-progress*1.0, hgt=0.5+progress*1.9;
      cam.position.set(Math.sin(ang)*radius,hgt+1.0,Math.cos(ang)*radius);
      cam.lookAt(0,1.5,0);
      if(!assembled){cam.position.set(Math.sin(t*0.15)*6,1.6,Math.cos(t*0.15)*6);cam.lookAt(0,1.4,0);}
    } else {
      uniforms.uMorph.value=Math.min(1,0.15+progress*0.9);
      points.rotation.y=t*0.12+progress*0.6;
      cam.position.set(Math.sin(t*0.1)*0.6,1.5,6-progress*0.6);cam.lookAt(0,1.3,0);
    }
    renderer.render(threeScene,cam);
  }
  function start(){if(running)return;running=true;raf=requestAnimationFrame(frame);}
  window.addEventListener('beforeunload',function(){if(raf)cancelAnimationFrame(raf);if(renderer)renderer.dispose();});

  // expose movement-check driver (limb scene reacts to slider)
  window.__mcScene=function(v){progress=v;};

  // lazy init after first paint
  if('requestIdleCallback'in window)requestIdleCallback(init,{timeout:600}); else setTimeout(init,300);
})();
