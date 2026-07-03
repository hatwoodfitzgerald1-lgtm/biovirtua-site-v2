/* BioVirtua site interactivity. No framework. Defensive per-page wiring. */
(function(){
  'use strict';
  var qs=new URLSearchParams(location.search);
  var forceRM=qs.get('qa')==='rm';
  var prefersRM=forceRM||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
  var isTouch=matchMedia('(hover: none)').matches;
  window.__BV_RM=prefersRM;

  /* ---------- preloader ---------- */
  function loader(){
    var el=document.getElementById('loader'); if(!el) return;
    var pctEl=el.querySelector('.pct'), barEl=el.querySelector('.pbar i'), bootEl=el.querySelector('.boot');
    var lines=['calibrating capture volume','loading tracked points','resolving score engine','ready'];
    var done=false;
    function finish(){ if(done)return; done=true; el.classList.add('done'); document.documentElement.style.overflow='';
      window.dispatchEvent(new Event('bv:loaded')); setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); },800); }
    el.querySelector('.skip')&&el.querySelector('.skip').addEventListener('click',finish);
    if(prefersRM){ finish(); return; }
    document.documentElement.style.overflow='hidden';
    var p=0, li=0;
    var t=setInterval(function(){
      p=Math.min(100,p+Math.random()*16+6);
      if(pctEl)pctEl.textContent=Math.floor(p);
      if(barEl)barEl.style.width=p+'%';
      var idx=Math.min(lines.length-1,Math.floor(p/26));
      if(idx!==li){li=idx; if(bootEl)bootEl.textContent=lines[li];}
      if(p>=100){clearInterval(t); setTimeout(finish,320);}
    },140);
    setTimeout(finish,4000); // hard cap
  }
  loader();

  /* ---------- smooth scroll (Lenis) ---------- */
  function initLenis(){
    if(prefersRM||typeof Lenis==='undefined')return null;
    var lenis=new Lenis({lerp:0.1,smoothWheel:true});
    function raf(t){lenis.raf(t);requestAnimationFrame(raf);} requestAnimationFrame(raf);
    document.documentElement.classList.add('lenis');
    window.__lenis=lenis;
    // anchor links
    document.addEventListener('click',function(e){
      var a=e.target.closest('a[href^="#"]'); if(!a)return;
      var id=a.getAttribute('href'); if(id.length<2)return;
      var t=document.querySelector(id); if(t){e.preventDefault(); lenis.scrollTo(t,{offset:-70});}
    });
    return lenis;
  }

  /* ---------- reveals + counters (IntersectionObserver) ---------- */
  function reveals(){
    var els=document.querySelectorAll('[data-reveal],[data-stagger]');
    if(prefersRM){els.forEach(function(e){e.classList.add('in');}); countAll(); return;}
    var io=new IntersectionObserver(function(en){
      en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('in');
        if(x.target.hasAttribute('data-stagger')){ var k=0; [].forEach.call(x.target.children,function(c){c.style.transitionDelay=(k*70)+'ms';k++;}); }
        if(x.target.querySelectorAll){ x.target.querySelectorAll('[data-count]').forEach(count); if(x.target.hasAttribute('data-count'))count(x.target); }
        if(x.target.querySelectorAll){ x.target.querySelectorAll('.bar i[data-w]').forEach(function(b){b.style.width=b.getAttribute('data-w');}); }
        io.unobserve(x.target);
      }});
    },{threshold:.16,rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(e){io.observe(e);});
    // standalone counters/bars not wrapped
    document.querySelectorAll('[data-count]').forEach(function(e){io.observe(e);});
    document.querySelectorAll('.bar i[data-w]').forEach(function(b){io.observe(b.closest('.tile,.appbody,.device,section')||b);});
  }
  function countAll(){document.querySelectorAll('[data-count]').forEach(function(e){e.textContent=e.getAttribute('data-count');}); document.querySelectorAll('.bar i[data-w]').forEach(function(b){b.style.width=b.getAttribute('data-w');});}
  function count(el){
    if(el.__done)return; el.__done=1;
    var to=parseFloat(el.getAttribute('data-count')), suf=el.getAttribute('data-suf')||'', dur=1100, st=performance.now();
    function tick(now){var p=Math.min(1,(now-st)/dur);var e=1-Math.pow(1-p,3);el.textContent=(Math.round(to*e*10)/10).toString().replace(/\.0$/,'')+suf;if(p<1)requestAnimationFrame(tick);}
    requestAnimationFrame(tick);
  }

  /* ---------- header + mobile menu ---------- */
  function header(){
    var h=document.querySelector('.hdr'); if(!h)return;
    var f=function(){h.classList.toggle('scrolled',window.scrollY>20);}; f();
    window.addEventListener('scroll',f,{passive:true});
    var mb=document.querySelector('.menu-btn'), mn=document.querySelector('.mnav');
    if(mb&&mn){mb.addEventListener('click',function(){var o=mn.classList.toggle('open');mb.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';});
      mn.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mn.classList.remove('open');document.body.style.overflow='';});});}
  }

  /* ---------- decode-on-hover ---------- */
  function decode(){
    if(prefersRM||isTouch)return;
    var glyph='0123456789/#<>*+=';
    document.querySelectorAll('.nav a .lbl,[data-decode]').forEach(function(el){
      var real=el.textContent, raf;
      el.addEventListener('mouseenter',function(){
        var i=0; cancelAnimationFrame(raf); var start=performance.now();
        function run(now){var p=(now-start)/420; i=Math.floor(p*real.length);
          var out=''; for(var k=0;k<real.length;k++){out+= k<i?real[k]:(real[k]===' '?' ':glyph[Math.floor(Math.random()*glyph.length)]);}
          el.textContent=out; if(p<1)raf=requestAnimationFrame(run); else el.textContent=real;}
        raf=requestAnimationFrame(run);
      });
    });
  }

  /* ---------- magnetic buttons ---------- */
  function magnetic(){
    if(prefersRM||isTouch)return;
    document.querySelectorAll('.btn,.cartpill').forEach(function(b){
      b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();var x=e.clientX-r.left-r.width/2;var y=e.clientY-r.top-r.height/2;b.style.transform='translate('+(x*.28)+'px,'+(y*.4)+'px)';});
      b.addEventListener('mouseleave',function(){b.style.transform='';});
    });
  }

  /* ---------- CART ---------- */
  var STORE='bv_cart_v1';
  function read(){try{return JSON.parse(localStorage.getItem(STORE))||[];}catch(e){return window.__cart||[];}}
  function write(c){window.__cart=c;try{localStorage.setItem(STORE,JSON.stringify(c));}catch(e){}}
  function cartCount(){return read().reduce(function(n,i){return n+(i.qty||1);},0);}
  function money(n){return '$'+(Math.round(n*100)/100).toLocaleString('en-US');}
  function priceOf(it){return it.oneTime?it.price:(it.cadence==='annual'?it.annual:it.monthly);}
  function syncCount(){var c=cartCount();document.querySelectorAll('.cart-count').forEach(function(e){e.textContent=c;e.style.display=c?'inline-grid':'none';});}
  function addToCart(item){
    var c=read();
    if(item.oneTime){ var ex=c.find(function(i){return i.id===item.id;}); if(ex){ex.qty=(ex.qty||1)+1;} else c.push(Object.assign({qty:1},item)); }
    else { c=c.filter(function(i){return i.id!==item.id;}); c.push(Object.assign({qty:1},item)); } // one subscription per id
    write(c); syncCount(); renderDrawer(); openDrawer(); flashPill();
  }
  window.bvAddToCart=addToCart;
  function removeItem(id,cadence){var c=read().filter(function(i){return !(i.id===id&&(i.cadence||'')===(cadence||''));});write(c);syncCount();renderDrawer();renderCheckout();}
  function flashPill(){var p=document.querySelector('.cartpill');if(p){p.animate([{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:360,easing:'cubic-bezier(0.16,0.84,0.24,1)'});}}

  var scrim,drawer;
  function openDrawer(){if(drawer){drawer.classList.add('open');scrim.classList.add('open');}}
  function closeDrawer(){if(drawer){drawer.classList.remove('open');scrim.classList.remove('open');}}
  function renderDrawer(){
    drawer=document.getElementById('drawer'); scrim=document.getElementById('scrim'); if(!drawer)return;
    var items=read(), box=drawer.querySelector('.items'), tot=drawer.querySelector('.tot .v'), foot=drawer.querySelector('footer');
    if(!items.length){box.innerHTML='<div class="empty"><div class="mono" style="color:var(--muted-dark)">Your plan cart is empty</div><a class="btn btn-teal" href="/plans"><span>Browse Plans</span></a></div>';foot.style.display='none';return;}
    foot.style.display='';
    box.innerHTML=items.map(function(i){
      var per=i.oneTime?'one time':(i.cadence==='annual'?'billed annually':'billed monthly');
      var line=priceOf(i)*(i.qty||1);
      return '<div class="citem"><div><div class="nm">'+i.name+'</div><div class="meta">'+money(priceOf(i))+' · '+per+(i.qty>1?' · x'+i.qty:'')+'</div></div><div class="mono">'+money(line)+'</div><button class="rm" data-id="'+i.id+'" data-cad="'+(i.cadence||'')+'">Remove</button></div>';
    }).join('');
    var total=items.reduce(function(s,i){return s+priceOf(i)*(i.qty||1);},0);
    if(tot)tot.textContent=money(total);
    box.querySelectorAll('.rm').forEach(function(b){b.addEventListener('click',function(){removeItem(b.getAttribute('data-id'),b.getAttribute('data-cad'));});});
  }
  function wireDrawer(){
    scrim=document.getElementById('scrim'); drawer=document.getElementById('drawer');
    document.querySelectorAll('.cartpill,[data-open-cart]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();renderDrawer();openDrawer();});});
    if(scrim)scrim.addEventListener('click',closeDrawer);
    if(drawer){var x=drawer.querySelector('.x');if(x)x.addEventListener('click',closeDrawer);
      var co=drawer.querySelector('[data-checkout]');if(co)co.addEventListener('click',function(){location.href='/checkout';});}
    renderDrawer();
  }

  /* ---------- add-to-cart buttons on plan pages ---------- */
  function wirePlanButtons(){
    document.querySelectorAll('[data-add]').forEach(function(b){
      b.addEventListener('click',function(e){
        e.preventDefault();
        var d=JSON.parse(b.getAttribute('data-add'));
        var cad=d.oneTime?null:(currentCadence());
        addToCart(Object.assign({},d,{cadence:cad}));
      });
    });
  }

  /* ---------- plan cadence toggle ---------- */
  function currentCadence(){var t=document.querySelector('.toggle button.on');return t?t.getAttribute('data-cad'):'annual';}
  function planToggle(){
    var tg=document.querySelector('.toggle'); if(!tg)return;
    tg.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){
      tg.querySelectorAll('button').forEach(function(x){x.classList.remove('on');});b.classList.add('on');
      var cad=b.getAttribute('data-cad');
      document.querySelectorAll('.plan[data-monthly]').forEach(function(p){
        var amt=p.querySelector('.amt'),per=p.querySelector('.per'),save=p.querySelector('.save');
        var m=p.getAttribute('data-monthly'),a=p.getAttribute('data-annual'),sv=p.getAttribute('data-save');
        if(!m)return;
        if(cad==='annual'){amt.textContent='$'+a;per.textContent='/yr';save.textContent=sv?('save $'+sv+' a year'):'';}
        else{amt.textContent='$'+m;per.textContent='/mo';save.textContent='';}
      });
    });});
  }

  /* ---------- SMS opt-in ---------- */
  function smsForms(){
    document.querySelectorAll('form.sms-form').forEach(function(f){
      f.addEventListener('submit',function(e){
        e.preventDefault();
        var tel=f.querySelector('input[type=tel]'),c1=f.querySelector('.c1'),c2=f.querySelector('.c2'),msg=f.querySelector('.formmsg');
        var digits=(tel.value||'').replace(/\D/g,'');
        if(digits.length<10){msg.className='formmsg err';msg.textContent='Enter a valid phone number';return;}
        if(!c1.checked||!c2.checked){msg.className='formmsg err';msg.textContent='Please agree to both to continue.';return;}
        msg.className='formmsg ok';msg.textContent="You're on the list. Reply STOP anytime to cancel.";
        f.reset();
      });
    });
  }

  /* ---------- contact form ---------- */
  function contactForm(){
    var f=document.getElementById('contact-form'); if(!f)return;
    f.addEventListener('submit',function(e){e.preventDefault();
      var ok=true;
      ['c-name','c-email','c-msg'].forEach(function(id){var el=document.getElementById(id);var w=el.closest('.fld');var bad=!el.value.trim()||(id==='c-email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));w.classList.toggle('bad',bad);var er=w.querySelector('.field-err');if(er)er.textContent=bad?'Required':'';if(bad)ok=false;});
      if(!ok)return;
      document.getElementById('contact-ok').textContent='Thanks. A real person will reply within one business day.';
      f.reset();
    });
  }

  /* ---------- checkout ---------- */
  function renderCheckout(){
    var box=document.getElementById('co-summary'); if(!box)return;
    var items=read();
    if(!items.length){location.href='/plans';return;}
    var lis=items.map(function(i){var per=i.oneTime?'one time':(i.cadence==='annual'?'billed annually':'billed monthly');return '<div class="li"><span>'+i.name+'<span class="meta"> · '+per+'</span></span><span class="mono">'+money(priceOf(i)*(i.qty||1))+'</span></div>';}).join('');
    var total=items.reduce(function(s,i){return s+priceOf(i)*(i.qty||1);},0);
    box.querySelector('.lines').innerHTML=lis;
    box.querySelector('.grand .v').textContent=money(total);
  }
  function luhn(n){n=(n||'').replace(/\D/g,'');if(n.length<13)return false;var s=0,a=false;for(var i=n.length-1;i>=0;i--){var d=+n[i];if(a){d*=2;if(d>9)d-=9;}s+=d;a=!a;}return s%10===0;}
  function checkout(){
    var f=document.getElementById('checkout-form'); if(!f)return;
    renderCheckout();
    var cardIn=f.querySelector('#cc-num');
    if(cardIn)cardIn.addEventListener('input',function(){var v=cardIn.value.replace(/\D/g,'').slice(0,16);cardIn.value=v.replace(/(.{4})/g,'$1 ').trim();});
    f.addEventListener('submit',function(e){
      e.preventDefault(); var ok=true;
      f.querySelectorAll('[required]').forEach(function(el){
        var w=el.closest('.fld'); var bad=false; var v=el.value.trim();
        if(!v)bad=true;
        else if(el.type==='email')bad=!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
        else if(el.id==='cc-num')bad=!luhn(v);
        else if(el.id==='cc-cvv')bad=!/^\d{3,4}$/.test(v);
        if(w){w.classList.toggle('bad',bad);var er=w.querySelector('.field-err');if(er)er.textContent=bad?(el.id==='cc-num'?'Enter a valid card number':(el.id==='cc-cvv'?'3 or 4 digits':'Required')):'';}
        if(bad)ok=false;
      });
      var ack=document.getElementById('ack'); var ackw=ack?ack.closest('.ack'):null;
      if(ack&&!ack.checked){ok=false;if(ackw)ackw.style.color='var(--coral)';}else if(ackw)ackw.style.color='';
      if(!ok){var first=f.querySelector('.fld.bad');if(first)first.scrollIntoView({behavior:prefersRM?'auto':'smooth',block:'center'});return;}
      var ref='BV-'+Date.now().toString(36).toUpperCase().slice(-6);
      try{sessionStorage.setItem('bv_order',JSON.stringify({ref:ref,items:read()}));}catch(e){}
      location.href='/order-confirmed';
    });
  }
  function orderConfirmed(){
    var box=document.getElementById('order-box'); if(!box)return;
    var o=null; try{o=JSON.parse(sessionStorage.getItem('bv_order'));}catch(e){}
    if(o&&o.items){
      var ref=box.querySelector('.ref'); if(ref)ref.textContent=o.ref;
      var list=box.querySelector('.olist');
      if(list)list.innerHTML=o.items.map(function(i){var per=i.oneTime?'one time':(i.cadence==='annual'?'annual':'monthly');return '<li><b>'+i.name+'</b> <span class="mono" style="color:var(--muted-dark)">('+per+')</span></li>';}).join('');
    }
    write([]); syncCount(); try{sessionStorage.removeItem('bv_order');}catch(e){}
  }

  /* ---------- interactive feature: Movement Check ---------- */
  function movementCheck(){
    var root=document.getElementById('mc'); if(!root)return;
    var state={area:null,sit:null,activity:null,goal:null,household:false,slide:60};
    var recWrap=document.getElementById('mc-result');
    root.querySelectorAll('.chip').forEach(function(c){
      c.addEventListener('click',function(){
        var g=c.getAttribute('data-g'),v=c.getAttribute('data-v');
        if(g==='household'){state.household=!state.household;c.classList.toggle('on');}
        else{root.querySelectorAll('.chip[data-g="'+g+'"]').forEach(function(x){x.classList.remove('on');});c.classList.add('on');state[g]=v;}
        update();
      });
    });
    var slider=document.getElementById('mc-slide');
    if(slider)slider.addEventListener('input',function(){state.slide=+slider.value;update();});
    function recommend(){
      if(state.household)return plansData.household;
      if(state.goal==='performance')return plansData.performance;
      if(state.goal==='recovery'||state.sit==='8h+')return plansData.mobility;
      if(state.activity==='high')return plansData.performance;
      return plansData.mobility;
    }
    function weeks(){ if(state.area==='ankles')return '4 to 6 weeks'; if(state.area==='shoulders')return '6 to 10 weeks'; if(state.area==='back')return '6 to 8 weeks'; return '5 to 8 weeks'; }
    function update(){
      if(!state.area){return;}
      var before=document.getElementById('mc-before'), after=document.getElementById('mc-after'), delta=document.getElementById('mc-delta'), fa=document.getElementById('mc-focus'), wk=document.getElementById('mc-weeks');
      var base=52+(state.sit==='8h+'?-6:state.sit==='<4h'?4:0);
      var proj=base+Math.round((state.slide/100)*26);
      if(before)before.textContent=base; if(after)after.textContent=proj;
      if(delta)delta.textContent='+'+(proj-base);
      if(fa)fa.textContent=state.area;
      if(wk)wk.textContent=weeks();
      // bar
      var bar=document.getElementById('mc-bar'); if(bar)bar.style.width=Math.min(100,proj)+'%';
      var rec=recommend();
      var rc=document.getElementById('mc-rec');
      if(rc){ rc.querySelector('.rn').textContent=rec.name; rc.querySelector('.rp').textContent=rec.priceLabel; rc.querySelector('.rd').textContent=rec.short;
        var btn=rc.querySelector('[data-add]'); btn.setAttribute('data-add',JSON.stringify(rec.cartData)); }
      if(recWrap)recWrap.classList.add('show');
      if(window.__mcScene)window.__mcScene(state.slide/100);
    }
    // wire recommend button add
    root.addEventListener('click',function(e){var b=e.target.closest('#mc-rec [data-add]');if(!b)return;e.preventDefault();var d=JSON.parse(b.getAttribute('data-add'));var cad=d.oneTime?null:'annual';addToCart(Object.assign({},d,{cadence:cad}));});
  }
  var plansData={
    mobility:{name:'BioVirtua Mobility',priceLabel:'$19/mo or $180/yr',short:'Scoring plus the full guided session library, for one person.',cartData:{id:'mobility',name:'BioVirtua Mobility',monthly:19,annual:180}},
    performance:{name:'BioVirtua Performance',priceLabel:'$39/mo or $348/yr',short:'Adds multi-angle capture, 4D replay, and adaptive weekly programs.',cartData:{id:'performance',name:'BioVirtua Performance',monthly:39,annual:348}},
    household:{name:'BioVirtua Household',priceLabel:'$468/yr',short:'Everything in Performance for up to five profiles.',cartData:{id:'household',name:'BioVirtua Household',monthly:39,annual:468}}
  };

  /* ---------- arc QA hook ---------- */
  if(qs.get('qa')==='arc'){window.addEventListener('bv:arc',function(e){console.log('[bv:arc]',e.detail);});}

  /* ---------- boot ---------- */
  function boot(){
    initLenis(); reveals(); header(); decode(); magnetic();
    wireDrawer(); wirePlanButtons(); planToggle(); smsForms(); contactForm(); checkout(); orderConfirmed(); movementCheck();
    syncCount();
    // active nav
    var path=location.pathname.replace(/\/$/,'')||'/';
    document.querySelectorAll('.nav a,.mnav a').forEach(function(a){var h=(a.getAttribute('href')||'').replace(/\/$/,'')||'/';if(h===path)a.classList.add('active');});
  }
  if(document.readyState!=='loading')boot(); else document.addEventListener('DOMContentLoaded',boot);
})();
