// Generate every route as src/site/<route>/index.html from a shared shell + content.mjs.
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as C from './content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'src', 'site');

const esc = (s='') => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const money = n => '$'+n;

/* ---------- graphic kit (SVG) ---------- */
const SEAL = `<svg class="seal" viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="46" stroke="#22C7D6" stroke-width="1.4"/><g stroke="#22C7D6" stroke-width="1.4">${Array.from({length:36}).map((_,i)=>{const a=i*Math.PI/18;const r1=46,r2=i%3===0?38:42;return `<line x1="${50+Math.cos(a)*r1}" y1="${50+Math.sin(a)*r1}" x2="${50+Math.cos(a)*r2}" y2="${50+Math.sin(a)*r2}"/>`;}).join('')}</g><text x="50" y="58" text-anchor="middle" font-family="Space Grotesk,sans-serif" font-size="26" font-weight="600" fill="#F7FAFC">BV</text></svg>`;
const ico = {
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  arrow:'<svg class="btn-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  scan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M3 12h18"/></svg>',
  score:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20a8 8 0 1 0-8-8"/><path d="M12 12l4-3"/><circle cx="12" cy="12" r="1.6"/></svg>',
  symmetry:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M9 7 4 12l5 5M15 7l5 5-5 5"/></svg>',
  session:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.2"/><path d="M12 8v6M8 21l4-7 4 7M6 11h12"/></svg>',
  replay:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
  household:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="2.4"/><circle cx="16" cy="8" r="2.4"/><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M13 20c0-3 2.5-5 5-5s3 1.4 3 3"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 11l5 5 5-5M5 21h14"/></svg>'
};
const check = ico.check;

/* ---------- app UI mockups ---------- */
function deviceScore(){
  return `<div class="device" data-reveal="scale"><div class="screen"><div class="appbar"><b>BioVirtua</b><span>SCAN COMPLETE</span></div><div class="appbody">
  <div class="bigscore">74<small>MOBILITY SCORE</small></div>
  <div style="margin-top:14px"><div class="readout"><span>Range of motion</span><span>82</span></div><div class="bar"><i data-w="82%"></i></div>
  <div class="readout"><span>Symmetry</span><span>68</span></div><div class="bar"><i data-w="68%"></i></div>
  <div class="readout"><span>Movement quality</span><span>71</span></div><div class="bar"><i data-w="71%"></i></div></div>
  </div></div></div>`;
}
function deviceScan(){
  return `<div class="device" data-reveal="scale"><div class="screen"><div class="appbar"><b>BioVirtua</b><span>LIVE SCAN</span></div><div class="appbody" style="position:relative;min-height:220px">
  <svg viewBox="0 0 120 200" style="width:100%;height:200px" aria-hidden="true">
   <g stroke="#22C7D6" stroke-width="1.4" fill="none" opacity="0.9"><circle cx="60" cy="30" r="10"/><line x1="60" y1="40" x2="60" y2="105"/><line x1="60" y1="55" x2="34" y2="80"/><line x1="60" y1="55" x2="86" y2="80"/><line x1="60" y1="105" x2="42" y2="160"/><line x1="60" y1="105" x2="78" y2="160"/></g>
   <g fill="#FF6A4D">${[[60,30],[60,55],[34,80],[86,80],[60,105],[42,160],[78,160]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3"/>`).join('')}</g>
   <line x1="0" y1="8" x2="120" y2="8" stroke="#22C7D6" stroke-width="1"><animate attributeName="y1" values="8;190;8" dur="3.2s" repeatCount="indefinite"/><animate attributeName="y2" values="8;190;8" dur="3.2s" repeatCount="indefinite"/></line>
  </svg><div class="readout" style="margin-top:8px"><span>tracking 17 points</span><span>2:00</span></div></div></div></div>`;
}
function deviceReplay(){
  return `<div class="device" data-reveal="scale"><div class="screen"><div class="appbar"><b>BioVirtua</b><span>4D REPLAY</span></div><div class="appbody">
  <svg viewBox="0 0 120 150" style="width:100%;height:150px" aria-hidden="true"><g opacity="0.35" stroke="#22C7D6" fill="none" stroke-width="1.2"><path d="M30 120 Q40 60 40 40"/><path d="M90 120 Q80 60 80 40"/></g><g stroke="#FF6A4D" stroke-width="1.6" fill="none"><circle cx="60" cy="26" r="8"/><line x1="60" y1="34" x2="60" y2="90"/><line x1="60" y1="50" x2="40" y2="70"/><line x1="60" y1="50" x2="80" y2="70"/></g></svg>
  <div class="bar" style="margin-top:8px"><i data-w="60%"></i></div><div class="readout"><span>0:00</span><span>replay</span><span>0:04</span></div></div></div></div>`;
}

/* ---------- shell ---------- */
const NAV = [['/','Home'],['/plans','Plans'],['/movement-check','Movement Check'],['/blog','Blog'],['/about','About'],['/contact','Contact']];
function header(){
  return `<header class="hdr"><div class="wrap hdr-inner">
    <a class="brand" href="/">${SEAL}<span style="font-family:var(--f-head)"><b>Bio</b><span>Virtua</span></span></a>
    <nav class="nav">${NAV.map(([h,l])=>`<a href="${h}"><span class="lbl">${l}</span></a>`).join('')}</nav>
    <div class="hdr-cta">
      <button class="cartpill" aria-label="Open plan cart">Plan <span class="count cart-count" style="display:none">0</span></button>
      <a class="btn pulse" href="/plans"><span>Purchase a Plan</span>${ico.arrow}</a>
      <button class="menu-btn" aria-label="Menu" aria-expanded="false"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
    </div>
  </div><nav class="mnav">${NAV.map(([h,l])=>`<a href="${h}">${l}</a>`).join('')}<a href="/plans" style="color:var(--coral)">Purchase a Plan</a></nav></header>`;
}
function smsBlock(){
  return `<div class="sms" id="sms"><h3>Join Our SMS List</h3>
   <p class="lede" style="font-size:1rem">Scan reminders, new session drops, and plan updates. Text alerts from ${C.BRAND}.</p>
   <form class="sms-form" novalidate>
     <input type="tel" placeholder="Your Phone Number" aria-label="Your Phone Number" autocomplete="tel"/>
     <label class="consent"><input type="checkbox" class="c1"/> <span>I agree to the <a href="/terms-of-service">Terms</a> &amp; <a href="/privacy-policy">Privacy Policy</a></span></label>
     <label class="consent"><input type="checkbox" class="c2"/> <span>I agree to receive SMS marketing notifications from ${C.BRAND}. Reply HELP for help or call/email ${C.PHONE} / ${C.EMAIL} STOP to cancel. Msg &amp; data rates may apply. Msg frequency varies. Information gathered in the SMS campaign will not be shared with third parties or affiliates for marketing purposes. Read our <a href="/terms-of-service">Terms</a> and <a href="/privacy-policy">Privacy Policy</a>.</span></label>
     <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><button class="btn btn-teal" type="submit"><span>Submit</span></button><span class="formmsg" role="status"></span></div>
   </form></div>`;
}
function footer(){
  return `<footer class="foot"><div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="/" style="margin-bottom:14px">${SEAL}<span><b>Bio</b><span>Virtua</span></span></a>
        <div class="addr">${C.ENTITY}<br>${C.ADDRESS}<br>${C.PHONE}<br><a href="mailto:${C.EMAIL}" style="display:inline;padding:0;color:var(--teal)">${C.EMAIL}</a></div>
        <p class="disclaimer">${esc(C.disclaimer)}</p>
      </div>
      <div><h4>Product</h4>${NAV.slice(1).map(([h,l])=>`<a href="${h}">${l}</a>`).join('')}<a href="/movement-check">Movement Check</a></div>
      <div><h4>Company</h4><a href="/about">About</a><a href="/contact">Contact</a><a href="${C.LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a></div>
      <div><h4>Legal</h4><a href="/terms-of-service">Terms of Service</a><a href="/privacy-policy">Privacy Policy</a></div>
    </div>
    <div style="margin-top:44px">${smsBlock()}</div>
    <div class="foot-bottom"><span>© ${C.YEAR} ${C.ENTITY}</span><span>Made with markerless motion. No wearables.</span></div>
  </div></footer>`;
}
function cartDrawer(){
  return `<div class="drawer-scrim" id="scrim"></div>
  <aside class="drawer" id="drawer" aria-label="Plan cart"><header><h3>Your Plan Cart</h3><button class="x" aria-label="Close">×</button></header>
   <div class="items"></div>
   <footer><div class="tot"><span>Total</span><span class="v mono">$0</span></div><button class="btn btn-block" data-checkout><span>Proceed to Checkout</span>${ico.arrow}</button></footer>
  </aside>`;
}
function loader(){
  return `<div id="loader"><div class="boot">calibrating capture volume</div><div class="pct">0</div><div class="pbar"><i></i></div><button class="skip">skip</button></div>`;
}
const CDN = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lenis/1.1.13/lenis.min.js" defer></script>
<script src="/assets/js/app.js" defer></script>
<script src="/assets/js/scene.js" defer></script>`;

function page({title,desc,body,sceneAttr='',bodyClass='',loaderOn=false}){
  title = title.replace(/ — /g,' · '); // honor the no-dash rule in titles too
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}"/>
<meta name="theme-color" content="#070B1A"/>
<link rel="canonical" href="https://${C.DOMAIN}${''}"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(desc)}"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="/assets/og.svg"/>
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/assets/css/site.css"/>
</head><body class="${bodyClass}">
<div class="grain" aria-hidden="true"></div>
${loaderOn?loader():''}
${header()}
<main${sceneAttr}>${body}</main>
${footer()}
${cartDrawer()}
${CDN}
</body></html>`;
}

/* ---------- shared blocks ---------- */
function seenRow(){
  return `<div class="seen" data-stagger>${C.asSeenIn.map(s=>`<a href="${s.url}" target="_blank" rel="noopener"><span class="out">${esc(s.outlet)}</span><span class="nm">${esc(s.name)}</span></a>`).join('')}</div>`;
}
function planCard(p,{detail=false}={}){
  const priceBlock = p.oneTime
    ? `<div class="price"><span class="amt">$${p.price}</span><span class="per">one time</span></div><div class="save">no subscription</div>`
    : p.annualOnly
      ? `<div class="price"><span class="amt">$${p.annual}</span><span class="per">/yr</span></div><div class="save">under $94 per person</div>`
      : `<div class="price"><span class="amt">$${p.annual}</span><span class="per">/yr</span></div><div class="save">save $${p.annualSave} a year</div>`;
  const dataAttr = p.oneTime
    ? ` data-monthly="" `
    : p.annualOnly
      ? ` data-monthly="" data-annual="${p.annual}" `
      : ` data-monthly="${p.monthly}" data-annual="${p.annual}" data-save="${p.annualSave}" `;
  const cartData = JSON.stringify(p.oneTime?{id:p.id,name:p.name,oneTime:true,price:p.price}:{id:p.id,name:p.name,monthly:p.monthly||p.annual,annual:p.annual});
  return `<article class="plan${p.featured?' featured':''}"${dataAttr} data-reveal>
    ${p.featured?'<span class="flag">Most popular</span>':''}
    <h3>${p.name}</h3><div class="ptag">${esc(p.tagline)}</div>
    ${priceBlock}
    <ul>${p.inclusions.map(i=>`<li>${check}<span>${esc(i)}</span></li>`).join('')}</ul>
    <div class="foot">
      <button class="btn btn-block" data-add='${cartData.replace(/'/g,"&#39;")}'><span>${p.cta}</span>${ico.arrow}</button>
      ${detail?'':`<a href="/plans/${p.id}" class="mono" style="display:block;text-align:center;margin-top:12px;color:var(--muted-dark);font-size:.78rem" data-decode>View details</a>`}
    </div>
  </article>`;
}
function testimonialCard(t){
  const initials=t.name.split(' ').map(w=>w[0]).join('').slice(0,2);
  return `<article class="tcard" data-reveal><span class="metric">${esc(t.metric)}</span><blockquote>“${esc(t.quote)}”</blockquote><div class="who"><span class="medallion">${initials}</span><span><span class="n">${esc(t.name)}</span><br><span class="r">${esc(t.role)}</span></span></div></article>`;
}
function faqBlock(items){
  return `<div class="faq">${items.map(f=>`<details data-reveal><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;
}

/* ---------- pages ---------- */
function home(){
  const body = `
  <section class="hero chapter-dark" ${''}>
    <div id="scene-poster" style="position:absolute;inset:0;background:radial-gradient(60% 60% at 60% 40%,rgba(34,199,214,.18),transparent 70%);opacity:0;transition:opacity .6s"></div>
    <canvas id="scene-canvas" data-scene="signature"></canvas>
    <div class="wrap"><div class="hero-grid">
      <span class="eyebrow" data-reveal>${esc(C.hero.eyebrow)}</span>
      <h1 class="h-hero" data-reveal>${esc(C.hero.headline)}</h1>
      <p class="lede" data-reveal>${esc(C.hero.sub)}</p>
      <div class="cta-row" data-reveal>
        <a class="btn btn-lg pulse" href="${C.hero.primary.href}"><span>${C.hero.primary.label}</span>${ico.arrow}</a>
        <a class="btn btn-ghost btn-lg" href="${C.hero.secondary.href}"><span>${C.hero.secondary.label}</span></a>
      </div>
      <div class="scan-badges" data-reveal><span><i></i>~2 minute scan</span><span><i></i>No wearables</span><span><i></i>Phone or laptop camera</span></div>
    </div></div>
    <div class="scrollcue">scroll to sequence</div>
  </section>

  <section class="sec chapter-navy"><div class="wrap center">
    <span class="eyebrow" data-reveal>Recognized work</span>
    <p class="lede center" style="margin:12px auto 26px" data-reveal>${esc(C.asSeenInCaption)}</p>
    ${seenRow()}
  </div></section>

  <section class="sec chapter-light" id="how"><div class="wrap">
    <div class="head-row"><div><span class="eyebrow" data-reveal>How it works</span><h2 class="h1" data-reveal style="margin-top:12px">Three steps, about two minutes</h2></div><a class="btn btn-teal" href="/plans" data-reveal><span>Purchase a Plan</span>${ico.arrow}</a></div>
    <div class="steps">${C.howItWorks.map(s=>`<div class="step" data-reveal><div class="num">${s.n}</div><div><h3>${s.title}</h3><p>${esc(s.body)}</p></div></div>`).join('')}</div>
  </div></section>

  <section class="sec chapter-dark"><div class="wrap">
    <div class="two-col">
      <div><span class="eyebrow" data-reveal>What your scan reads</span><h2 class="h1" data-reveal style="margin:12px 0 16px">Range, symmetry, and movement quality. Read separately.</h2>
      <p class="lede" data-reveal>They are three different measurements answering three different questions, and knowing which one is low is most of the fix. See all three side by side, then follow a plan that works on the right one.</p>
      <div class="cta-row mt-m" data-reveal><a class="btn btn-ghost" href="/blog/range-of-motion-symmetry-movement-quality"><span>Read the guide</span></a><a class="btn btn-ghost" href="/movement-check"><span>Try Movement Check</span></a></div></div>
      ${deviceScore()}
    </div>
  </div></section>

  <section class="sec chapter-navy"><div class="wrap">
    <div class="head-row"><div><span class="eyebrow" data-reveal>Plans</span><h2 class="h1" data-reveal style="margin-top:12px">Pick how you want to measure</h2></div>
      <div class="toggle" data-reveal role="tablist" aria-label="Billing period"><button data-cad="monthly">Monthly</button><button class="on" data-cad="annual">Annual</button></div></div>
    <div class="grid g4">${C.plans.map(p=>planCard(p)).join('')}</div>
    <p class="mono" style="color:var(--muted-dark);font-size:.8rem;margin-top:18px" data-reveal>All prices proposed. Household is annual only and covers up to five profiles for under $94 per person.</p>
  </div></section>

  <section class="sec chapter-dark"><div class="wrap">
    <div class="head-row"><div><span class="eyebrow" data-reveal>Inside the app</span><h2 class="h1" data-reveal style="margin-top:12px">Scan. Score. Replay.</h2></div></div>
    <div class="device-row">${deviceScan()}${deviceScore()}${deviceReplay()}</div>
  </div></section>

  <section class="sec chapter-light"><div class="wrap">
    <div class="head-row"><div><span class="eyebrow" data-reveal>Why it is built this way</span><h2 class="h1" data-reveal style="margin-top:12px">Made to be used again</h2></div></div>
    <div class="grid g3" data-stagger>${C.valueProps.map(v=>`<div class="tile"><div class="ico">${ico[v.icon]||ico.scan}</div><h3>${esc(v.title)}</h3><p>${esc(v.body)}</p></div>`).join('')}</div>
  </div></section>

  <section class="sec chapter-navy"><div class="wrap">
    <div class="head-row"><div><span class="eyebrow" data-reveal>What people measured</span><h2 class="h1" data-reveal style="margin-top:12px">Numbers that moved</h2></div></div>
    <div class="grid g3" data-stagger>${C.testimonials.slice(0,3).map(testimonialCard).join('')}</div>
    <div class="grid g2 mt-m" data-stagger>${C.testimonials.slice(3).map(testimonialCard).join('')}</div>
  </div></section>

  <section class="sec chapter-dark"><div class="wrap"><div class="two-col">
    <div><span class="eyebrow" data-reveal>Our story</span><h2 class="h1" data-reveal style="margin:12px 0 16px">${esc(C.about.title)}</h2><p class="lede" data-reveal>${esc(C.storyTeaser)}</p><div class="cta-row mt-m" data-reveal><a class="btn btn-ghost" href="/about"><span>Read about BioVirtua</span>${ico.arrow}</a></div></div>
    <div data-reveal="scale">${SEAL.replace('class="seal"','style="width:min(320px,70%);margin:0 auto"')}</div>
  </div></div></section>`;
  return page({title:'BioVirtua — See how you move, in about two minutes',desc:C.hero.sub,body,loaderOn:true,bodyClass:'home'});
}

function plansPage(){
  const body=`
  <section class="phero chapter-dark"><canvas id="scene-canvas" data-scene="dial"></canvas><div id="scene-poster"></div>
   <div class="wrap"><div class="crumbs"><a href="/">Home</a> / Plans</div>
   <span class="eyebrow" data-reveal>Plans</span><h1 class="h1" data-reveal style="margin:12px 0 14px;font-size:clamp(2.2rem,5vw,3.6rem)">Measure how you move, then work on it</h1>
   <p class="lede" data-reveal>Three subscription tiers and a one-time report. Every plan includes the two-minute camera scan and your Mobility Score. All prices proposed.</p>
   <div class="toggle mt-m" data-reveal role="tablist"><button data-cad="monthly">Monthly</button><button class="on" data-cad="annual">Annual</button></div>
   </div></section>
  <section class="sec chapter-navy"><div class="wrap">
   <div class="grid g4">${C.plans.map(p=>planCard(p)).join('')}</div>
   <p class="mono" style="color:var(--muted-dark);font-size:.82rem;margin-top:20px" data-reveal>Household is annual only and covers up to five named profiles, each with a private history, for under $94 per person a year. The 4D Movement Report is a one-time download with no subscription.</p>
  </div></section>
  <section class="sec chapter-light"><div class="wrap" style="max-width:820px">
   <span class="eyebrow" data-reveal>Questions</span><h2 class="h1" data-reveal style="margin:12px 0 22px">Good to know before you buy</h2>
   ${faqBlock(C.faqs)}
   <div class="cta-row mt-l" data-reveal><a class="btn" href="#top" onclick="window.scrollTo({top:0});return false"><span>Purchase a Plan</span>${ico.arrow}</a></div>
  </div></section>`;
  return page({title:'Plans — BioVirtua',desc:'BioVirtua plans: Mobility, Performance, Household, and a one-time 4D Movement Report. Camera-based mobility scoring and guided at-home programs.',body});
}

function planDetail(p){
  const priceLine = p.oneTime?`$${p.price} one time`:p.annualOnly?`$${p.annual} per year`:`$${p.monthly}/mo or $${p.annual}/yr`;
  const cartData = JSON.stringify(p.oneTime?{id:p.id,name:p.name,oneTime:true,price:p.price}:{id:p.id,name:p.name,monthly:p.monthly||p.annual,annual:p.annual});
  const dev = p.id==='performance'?deviceReplay():p.id==='report'?deviceScore():deviceScan();
  const scene = p.id==='performance'?'limb':p.id==='household'?'constellation':p.id==='report'?'wave':'dial';
  const body=`
  <section class="phero chapter-dark"><canvas id="scene-canvas" data-scene="${scene}"></canvas><div id="scene-poster"></div>
   <div class="wrap"><div class="crumbs"><a href="/">Home</a> / <a href="/plans">Plans</a> / ${p.name}</div>
   <div class="two-col" style="align-items:center">
    <div><span class="eyebrow" data-reveal>${p.oneTime?'One-time download':'Subscription plan'}</span>
     <h1 class="h1" data-reveal style="margin:12px 0 12px">${p.name}</h1>
     <p class="lede" data-reveal>${esc(p.short)}</p>
     <div class="price mt-m" data-reveal style="font-family:var(--f-head)"><span class="amt" style="font-size:2.4rem;font-weight:600">${priceLine}</span></div>
     <div class="cta-row mt-m" data-reveal><button class="btn btn-lg" data-add='${cartData.replace(/'/g,'&#39;')}'><span>${p.cta}</span>${ico.arrow}</button><button class="btn btn-ghost btn-lg cartpill" data-open-cart><span>View cart</span></button></div>
    </div>
    ${dev}
   </div></div></section>
  <section class="sec chapter-light"><div class="wrap">
   <div class="two-col">
    <div><span class="eyebrow" data-reveal>What is included</span><ul class="plan" style="border:0;background:none;padding:0;margin-top:16px">${p.inclusions.map(i=>`<li data-reveal>${check}<span>${esc(i)}</span></li>`).join('')}</ul></div>
    <div><span class="eyebrow" data-reveal>Who it is for</span><p class="lede" data-reveal style="margin-top:14px">${esc(p.forWho)}</p>
    <p class="disclaimer" data-reveal style="margin-top:20px">${esc(C.disclaimer)}</p></div>
   </div>
   <div class="cta-row mt-l center" style="justify-content:center" data-reveal><button class="btn btn-lg" data-add='${cartData.replace(/'/g,'&#39;')}'><span>${p.cta}</span>${ico.arrow}</button></div>
  </div></section>`;
  return page({title:`${p.name} — BioVirtua`,desc:esc(p.short),body});
}

function checkoutPage(){
  const yrs=Array.from({length:9}).map((_,i)=>2026+i);
  const body=`
  <section class="phero chapter-dark" style="padding-bottom:0"><canvas id="scene-canvas" data-scene="wave"></canvas><div id="scene-poster"></div>
   <div class="wrap"><div class="crumbs"><a href="/plans">Plans</a> / Checkout</div><h1 class="h1" data-reveal style="margin-top:8px">Checkout</h1><p class="lede" data-reveal>Secure, sectioned, and complete. No real charge is made in this preview.</p></div></section>
  <section class="sec chapter-navy" style="padding-top:48px"><div class="wrap"><form id="checkout-form" novalidate><div class="co-grid">
   <div>
    <div class="cosec"><h3><span class="n">01</span> Contact information</h3>
     <div class="frow two"><label class="fld"><span>First name</span><input required autocomplete="given-name"/><em class="field-err"></em></label><label class="fld"><span>Last name</span><input required autocomplete="family-name"/><em class="field-err"></em></label></div>
     <div class="frow two" style="margin-top:16px"><label class="fld"><span>Email</span><input type="email" required autocomplete="email"/><em class="field-err"></em></label><label class="fld"><span>Phone</span><input type="tel" required autocomplete="tel"/><em class="field-err"></em></label></div>
    </div>
    <div class="cosec"><h3><span class="n">02</span> Billing address</h3>
     <div class="frow"><label class="fld"><span>Full name</span><input required autocomplete="name"/><em class="field-err"></em></label></div>
     <div class="frow" style="margin-top:16px"><label class="fld"><span>Address line 1</span><input required autocomplete="address-line1"/><em class="field-err"></em></label></div>
     <div class="frow" style="margin-top:16px"><label class="fld"><span>Address line 2 (optional)</span><input autocomplete="address-line2"/></label></div>
     <div class="frow three" style="margin-top:16px"><label class="fld"><span>City</span><input required autocomplete="address-level2"/><em class="field-err"></em></label><label class="fld"><span>State / Province</span><input required autocomplete="address-level1"/><em class="field-err"></em></label><label class="fld"><span>ZIP / Postal</span><input required autocomplete="postal-code"/><em class="field-err"></em></label></div>
     <div class="frow" style="margin-top:16px"><label class="fld"><span>Country</span><select required autocomplete="country"><option value="">Select country</option><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option><option>Other</option></select><em class="field-err"></em></label></div>
    </div>
    <div class="cosec"><h3><span class="n">03</span> Payment details</h3>
     <div class="badges"><span>VISA</span><span>Mastercard</span><span>Amex</span><span>Discover</span></div>
     <div class="frow"><label class="fld"><span>Name on card</span><input required autocomplete="cc-name"/><em class="field-err"></em></label></div>
     <div class="frow" style="margin-top:16px"><label class="fld"><span>Card number</span><input id="cc-num" inputmode="numeric" required autocomplete="cc-number" placeholder="0000 0000 0000 0000"/><em class="field-err"></em></label></div>
     <div class="frow three" style="margin-top:16px">
       <label class="fld"><span>Expiry month</span><select id="cc-mm" required autocomplete="cc-exp-month"><option value="">MM</option>${Array.from({length:12}).map((_,i)=>`<option>${String(i+1).padStart(2,'0')}</option>`).join('')}</select><em class="field-err"></em></label>
       <label class="fld"><span>Expiry year</span><select id="cc-yy" required autocomplete="cc-exp-year"><option value="">YYYY</option>${yrs.map(y=>`<option>${y}</option>`).join('')}</select><em class="field-err"></em></label>
       <label class="fld"><span>CVV <small style="color:var(--muted-dark)">(3 to 4 digits)</small></span><input id="cc-cvv" inputmode="numeric" required autocomplete="cc-csc"/><em class="field-err"></em></label>
     </div>
    </div>
   </div>
   <aside><div class="summary" id="co-summary">
     <h3 style="font-family:var(--f-head);font-size:1.2rem;margin-bottom:10px">Order summary</h3>
     <div class="lines"></div>
     <div class="li"><span>Subtotal</span><span class="mono grand-sub"></span></div>
     <div class="grand tot"><span>Total</span><span class="v"></span></div>
     <label class="ack"><input type="checkbox" id="ack"/> <span>I understand BioVirtua is a wellness and fitness product and not a medical device.</span></label>
     <button class="btn btn-block btn-lg" type="submit"><span>Place Order</span>${ico.arrow}</button>
     <p class="note">No real charge is made in this preview.</p>
   </div></aside>
  </div></form></div></section>`;
  return page({title:'Checkout — BioVirtua',desc:'Complete your BioVirtua plan purchase.',body});
}

function orderConfirmed(){
  const body=`<section class="phero chapter-dark" style="min-height:70vh;display:flex;align-items:center"><canvas id="scene-canvas" data-scene="constellation"></canvas><div id="scene-poster"></div>
   <div class="wrap center" id="order-box">
    <div class="medallion" style="width:64px;height:64px;margin:0 auto 20px;font-size:1.4rem">✓</div>
    <span class="eyebrow" style="justify-content:center" data-reveal>Order confirmed</span>
    <h1 class="h1" data-reveal style="margin:12px 0 12px">You're all set</h1>
    <p class="lede center" style="margin-inline:auto" data-reveal>Order reference <span class="mono ref" style="color:var(--teal)">BV-XXXXXX</span>. Here is what you purchased:</p>
    <ul class="olist mono" style="list-style:none;padding:0;margin:22px auto;max-width:420px;display:grid;gap:8px;color:var(--ink-dark)"></ul>
    <p class="lede center" style="margin-inline:auto" data-reveal>Next: download the app, run your first two-minute scan, and get your baseline Mobility Score.</p>
    <div class="cta-row mt-m" style="justify-content:center" data-reveal><a class="btn btn-lg" href="/movement-check"><span>Try Movement Check</span>${ico.arrow}</a><a class="btn btn-ghost btn-lg" href="/"><span>Back to Home</span></a></div>
   </div></section>`;
  return page({title:'Order Confirmed — BioVirtua',desc:'Your BioVirtua order is confirmed.',body});
}

function blogIndex(){
  const body=`<section class="phero chapter-dark"><canvas id="scene-canvas" data-scene="timeline"></canvas><div id="scene-poster"></div>
   <div class="wrap"><div class="crumbs"><a href="/">Home</a> / Blog</div><span class="eyebrow" data-reveal>Field notes</span><h1 class="h1" data-reveal style="margin:12px 0 14px">Reading movement, in plain language</h1><p class="lede" data-reveal>How the scan works, what the numbers mean, and how to build a routine you will actually keep.</p></div></section>
  <section class="sec chapter-navy"><div class="wrap"><div class="grid g3" data-stagger>${C.posts.map(p=>`<a class="postcard" href="/blog/${p.slug}"><span class="postmeta"><span>${p.read}</span></span><h3>${esc(p.title)}</h3><p class="dek">${esc(p.dek)}</p><span class="go" data-decode>Read →</span></a>`).join('')}</div></div></section>`;
  return page({title:'Blog — BioVirtua',desc:'BioVirtua field notes on movement, mobility scoring, and markerless camera capture.',body});
}

function postViz(kind){
  if(kind==='score')return `<div class="bodymap" style="aspect-ratio:16/6;display:grid;place-items:center"><div style="text-align:center"><div class="deltabig">74</div><div class="mono" style="color:var(--teal);font-size:.7rem;letter-spacing:.2em">MOBILITY SCORE = ROM + SYMMETRY + QUALITY</div></div></div>`;
  if(kind==='three')return `<div class="grid g3" data-stagger>${[['Range','how far a joint travels','82'],['Symmetry','how evenly left matches right','68'],['Quality','how smooth the motion is','71']].map(r=>`<div class="tile" style="text-align:center"><div class="stat">${r[2]}</div><h3 style="margin-top:6px">${r[0]}</h3><p>${r[1]}</p></div>`).join('')}</div>`;
  if(kind==='camera')return `<div class="bodymap" style="aspect-ratio:16/7">${deviceScan().replace('class="device"','class="device" style="max-width:220px;margin:0 auto"')}</div>`;
  if(kind==='routine')return `<div class="grid g4" data-stagger>${['Short','Anchored','Responsive','Never miss twice'].map((s,i)=>`<div class="tile" style="text-align:center"><div class="stat">${String(i+1).padStart(2,'0')}</div><h3 style="margin-top:6px">${s}</h3></div>`).join('')}</div>`;
  if(kind==='fourd')return `<div class="bodymap" style="aspect-ratio:16/6;display:grid;place-items:center"><svg viewBox="0 0 320 90" style="width:90%" aria-hidden="true"><g stroke="#22C7D6" fill="none" stroke-width="1.4" opacity=".5">${Array.from({length:6}).map((_,i)=>`<circle cx="${20+i*56}" cy="${45+Math.sin(i)*14}" r="4"/>`).join('')}</g><path d="M20 45 Q76 20 132 55 T244 40 T300 52" stroke="#FF6A4D" fill="none" stroke-width="1.6"/><text x="6" y="82" font-family="IBM Plex Mono" font-size="9" fill="#9fb0c9">space  x  time</text></svg></div>`;
  return '';
}
function post(p){
  let injected=false;
  const blocks=p.blocks.map((b,idx)=>{
    let out='';
    if(b.t==='p')out=`<p data-reveal>${esc(b.c)}</p>`;
    else if(b.t==='h2')out=`<h2 data-reveal>${esc(b.c)}</h2>`;
    else if(b.t==='pull')out=`<blockquote class="pullquote" data-reveal="mask">${esc(b.c)}</blockquote>`;
    if(b.t==='h2'&&!injected){injected=true;out=postViz(p.viz)+out;}
    return out;
  }).join('\n');
  const idx=C.posts.findIndex(x=>x.slug===p.slug); const next=C.posts[(idx+1)%C.posts.length];
  const body=`<article>
   <section class="phero chapter-dark"><canvas id="scene-canvas" data-scene="wave"></canvas><div id="scene-poster"></div>
    <div class="wrap article"><div class="crumbs"><a href="/">Home</a> / <a href="/blog">Blog</a></div>
     <span class="postmeta" data-reveal><span>${p.read}</span><span>BioVirtua</span></span>
     <h1 class="h1" data-reveal style="margin:14px 0 0;font-size:clamp(2rem,4.6vw,3.2rem)">${esc(p.title)}</h1>
     <p class="dek" data-reveal>${esc(p.dek)}</p></div></section>
   <section class="sec chapter-light" style="padding-top:56px"><div class="wrap article"><div class="article-body">${blocks}</div>
    <div class="scanline" style="margin:40px 0"></div>
    <div class="cta-row" data-reveal><a class="btn" href="/plans"><span>Purchase a Plan</span>${ico.arrow}</a><a class="btn btn-ghost" href="/blog/${next.slug}"><span>Next: ${esc(next.title.split(':')[0].split(',')[0]).slice(0,32)}</span></a></div>
   </div></section>
  </article>`;
  return page({title:`${esc(p.title)} — BioVirtua`,desc:esc(p.dek),body});
}

function movementCheck(){
  const body=`<section class="phero chapter-dark" style="padding-bottom:0"><canvas id="scene-canvas" data-scene="limb"></canvas><div id="scene-poster"></div>
   <div class="wrap"><div class="crumbs"><a href="/">Home</a> / Movement Check</div><span class="eyebrow" data-reveal>Interactive</span><h1 class="h1" data-reveal style="margin:12px 0 12px">Movement Check</h1><p class="lede" data-reveal>Answer four quick questions and drag the slider to model how much range you could open up. We will point you to the right plan. This is a wellness estimate, not a diagnosis.</p></div></section>
  <section class="sec chapter-navy"><div class="wrap"><div class="mc" id="mc">
   <div class="opts">
    <div class="optgroup" data-reveal><div class="lab">Where do you feel tightest?</div><div class="chips">${['hips','shoulders','back','ankles'].map(v=>`<button class="chip" data-g="area" data-v="${v}">${v}</button>`).join('')}</div></div>
    <div class="optgroup" data-reveal><div class="lab">How long do you sit each day?</div><div class="chips">${[['<4h','<4h'],['4-8h','4 to 8h'],['8h+','8h+']].map(v=>`<button class="chip" data-g="sit" data-v="${v[0]}">${v[1]}</button>`).join('')}</div></div>
    <div class="optgroup" data-reveal><div class="lab">Current activity level</div><div class="chips">${['low','medium','high'].map(v=>`<button class="chip" data-g="activity" data-v="${v}">${v}</button>`).join('')}</div></div>
    <div class="optgroup" data-reveal><div class="lab">Your main goal</div><div class="chips">${['mobility','recovery','performance'].map(v=>`<button class="chip" data-g="goal" data-v="${v}">${v}</button>`).join('')}</div>
     <div class="chips" style="margin-top:10px"><button class="chip" data-g="household" data-v="1">For my whole household</button></div></div>
   </div>
   <div class="panel" data-reveal>
    <div class="lab mono" style="color:var(--muted-dark);font-size:.72rem;letter-spacing:.1em">MODELED RANGE, <span id="mc-focus">pick an area</span></div>
    <div class="bodymap" style="aspect-ratio:16/7;margin-top:12px"><div class="bar" style="position:absolute;left:8%;right:8%;top:50%"><i id="mc-bar" data-w="60%" style="width:60%"></i></div></div>
    <input class="slider" id="mc-slide" type="range" min="0" max="100" value="60" aria-label="Effort over time"/>
    <div style="display:flex;justify-content:space-between" class="mono"><span style="color:var(--muted-dark);font-size:.72rem">today <b id="mc-before" style="color:#fff">52</b></span><span class="deltabig" id="mc-delta" style="font-size:1.6rem">+16</span><span style="color:var(--muted-dark);font-size:.72rem">projected <b id="mc-after" style="color:var(--teal)">68</b></span></div>
    <p class="mono" style="color:var(--muted-dark);font-size:.74rem;margin-top:10px">Estimated time to improvement: <span id="mc-weeks" style="color:var(--teal)">pick an area</span></p>
    <div class="result-plan" id="mc-result"><div class="lab mono" style="color:var(--coral);font-size:.72rem;letter-spacing:.1em">RECOMMENDED FOR YOU</div>
     <div id="mc-rec"><h3 class="rn" style="margin:8px 0 4px">BioVirtua Mobility</h3><div class="rp mono" style="color:var(--muted-dark);font-size:.82rem">$19/mo or $180/yr</div><p class="rd" style="color:var(--ink-dark);font-size:.92rem;margin:8px 0 14px">Scoring plus the full guided session library.</p>
     <button class="btn btn-block" data-add='{"id":"mobility","name":"BioVirtua Mobility","monthly":19,"annual":180}'><span>Purchase a Plan</span>${ico.arrow}</button></div>
    </div>
   </div>
  </div></div></section>`;
  return page({title:'Movement Check — BioVirtua',desc:'Answer four quick questions and see which BioVirtua plan fits how you move.',body});
}

function about(){
  const blocks=C.about.blocks.map(b=>b.t==='pull'?`<blockquote class="pullquote" data-reveal="mask">${esc(b.c)}</blockquote>`:`<p data-reveal>${esc(b.c)}</p>`).join('\n');
  const body=`<section class="phero chapter-dark"><canvas id="scene-canvas" data-scene="timeline"></canvas><div id="scene-poster"></div>
   <div class="wrap article"><div class="crumbs"><a href="/">Home</a> / About</div><span class="eyebrow" data-reveal>About</span><h1 class="h1" data-reveal style="margin:12px 0 0">${esc(C.about.title)}</h1></div></section>
  <section class="sec chapter-light" style="padding-top:56px"><div class="wrap article"><div class="article-body">${blocks}</div></div></section>
  <section class="sec chapter-navy"><div class="wrap"><span class="eyebrow" data-reveal>The path here</span><h2 class="h1" data-reveal style="margin:12px 0 30px">From the lab to your living room</h2>
   <div class="grid g4" data-stagger>${C.about.timeline.map(t=>`<div class="tile"><div class="stat" style="font-size:1.8rem">${t.y}</div><p style="margin-top:8px">${esc(t.c)}</p></div>`).join('')}</div>
   <div class="mt-l">${seenRow()}</div>
   <div class="cta-row mt-l" data-reveal><a class="btn btn-lg" href="/plans"><span>Purchase a Plan</span>${ico.arrow}</a></div>
  </div></section>`;
  return page({title:'About — BioVirtua',desc:'BioVirtua brought markerless, camera-based movement measurement out of the lab and into a consumer app. Here is the story.',body});
}

function contact(){
  const body=`<section class="phero chapter-dark"><canvas id="scene-canvas" data-scene="dial"></canvas><div id="scene-poster"></div>
   <div class="wrap"><div class="crumbs"><a href="/">Home</a> / Contact</div><span class="eyebrow" data-reveal>Contact</span><h1 class="h1" data-reveal style="margin:12px 0 12px">Talk to a real person</h1><p class="lede" data-reveal>${esc(C.contactIntro)}</p></div></section>
  <section class="sec chapter-navy"><div class="wrap"><div class="two-col" style="align-items:start">
   <form id="contact-form" novalidate>
    <div class="frow"><label class="fld"><span>Name</span><input id="c-name" required/><em class="field-err"></em></label></div>
    <div class="frow" style="margin-top:16px"><label class="fld"><span>Email</span><input id="c-email" type="email" required/><em class="field-err"></em></label></div>
    <div class="frow" style="margin-top:16px"><label class="fld"><span>Topic</span><select id="c-topic"><option>Plans &amp; billing</option><option>How the scan works</option><option>Something else</option></select></label></div>
    <div class="frow" style="margin-top:16px"><label class="fld"><span>Message</span><textarea id="c-msg" rows="5" required style="width:100%;padding:.85em 1em;border-radius:10px;border:1px solid var(--line-dark);background:rgba(0,0,0,.25);color:#fff;font-family:var(--f-body)"></textarea><em class="field-err"></em></label></div>
    <div class="cta-row mt-m"><button class="btn" type="submit"><span>Send message</span>${ico.arrow}</button><span id="contact-ok" class="formmsg ok"></span></div>
   </form>
   <div><span class="eyebrow" data-reveal>Details</span>
    <div class="addr mt-s" data-reveal style="color:var(--muted-dark);line-height:2"><b style="color:#fff">${C.ENTITY}</b><br>${C.ADDRESS}<br><a href="tel:+18887799781" style="color:var(--teal)">${C.PHONE}</a><br><a href="mailto:${C.EMAIL}" style="color:var(--teal)">${C.EMAIL}</a><br><a href="${C.LINKEDIN}" target="_blank" rel="noopener" style="color:var(--teal)">LinkedIn</a></div>
    <p class="disclaimer mt-m" data-reveal>${esc(C.disclaimer)}</p>
   </div>
  </div></div></section>`;
  return page({title:'Contact — BioVirtua',desc:'Contact the BioVirtua team about plans, billing, or how the scan works.',body});
}

function legal(title,slug,html){
  const body=`<section class="phero chapter-dark" style="padding-bottom:0"><canvas id="scene-canvas" data-scene="wave"></canvas><div id="scene-poster"></div>
   <div class="wrap article"><div class="crumbs"><a href="/">Home</a> / ${title}</div><h1 class="h1" data-reveal style="margin-top:8px">${title}</h1></div></section>
  <section class="sec chapter-light" style="padding-top:48px"><div class="wrap article"><div class="article-body legal">${html}</div></div></section>`;
  return page({title:`${title} — BioVirtua`,desc:`${title} for ${C.ENTITY}.`,body});
}

function notFound(){
  const body=`<section class="phero chapter-dark" style="min-height:78vh;display:flex;align-items:center"><canvas id="scene-canvas" data-scene="constellation"></canvas><div id="scene-poster"></div>
   <div class="wrap center"><div class="big404">404</div><span class="eyebrow" style="justify-content:center" data-reveal>Signal lost</span>
   <h1 class="h1" data-reveal style="margin:12px 0 12px">We could not track that page</h1>
   <p class="lede center" style="margin-inline:auto" data-reveal>The point you were looking for is off the map. Let us get you back to something measurable.</p>
   <div class="cta-row mt-m" style="justify-content:center" data-reveal><a class="btn btn-lg" href="/plans"><span>Browse Plans</span>${ico.arrow}</a><a class="btn btn-ghost btn-lg" href="/"><span>Home</span></a></div></div></section>`;
  return page({title:'Page not found — BioVirtua',desc:'Page not found.',body});
}

/* ---------- legal html ---------- */
const TOS_HTML = `
<p><em>Welcome to BioVirtua. These Terms of Service ("Terms") govern your access to and use of the biovirtua.com website and the resources and services made available through it (collectively, the "Services"), operated by ${C.ENTITY} ("BioVirtua," "we," "us," or "our"). By accessing or using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please discontinue use of the Services.</em></p>
<h2>1. Company Information</h2><p>Company: ${C.ENTITY}. Mailing Address: 75 Eastern Ave, Suite 204, St. Johnsbury, VT 05819, United States. Phone: ${C.PHONE}. Email: ${C.EMAIL}.</p>
<h2>2. Nature of Services</h2><p>BioVirtua sells a consumer wellness and fitness software subscription and related digital products. Using the markerless, camera-based movement technology the company has developed since 2016, the BioVirtua app lets a customer use an ordinary phone or laptop camera, with no wearable sensors, to complete a guided movement scan that produces a Mobility Score and readouts on range of motion, symmetry, and movement quality, and then follow guided at-home mobility and recovery programs. The company offers this through paid subscription plans (Mobility, Performance, and a multi-profile Household plan, billed monthly or annually) purchased and managed online, and it also offers a one-time downloadable 4D Movement Report for customers who want a single assessment without a subscription. BioVirtua provides these offerings solely as wellness and fitness tools for general mobility and movement improvement. It does not provide medical diagnosis, treatment, or a medical device, and it does not sell or share customer information as a lead generation service.</p>
<h2>3. Wellness and Fitness Disclaimer</h2><p>BioVirtua is a wellness and fitness product. It measures movement and mobility and provides guided at-home movement programs. It does not diagnose, treat, cure, or prevent any medical condition, and it is not a medical device or a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before beginning any new exercise or movement program, particularly if you have an injury, a medical condition, or any concern about your ability to exercise safely. Your use of the Services and any movement programs is at your own risk. Movement measurements, scores, and readouts are estimates provided for general wellness and informational purposes and should not be relied upon as medical measurements.</p>
<h2>4. Eligibility and Acceptable Use</h2><p>You must be at least 18 years of age, or the age of majority in your jurisdiction, to use the Services. By using the Services, you represent that you meet this requirement and that any information you provide is accurate and current. You agree to use the Services only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use of, the Services by any third party. You agree not to attempt to gain unauthorized access to any portion of the Services, disrupt their operation, or use them to transmit harmful or unlawful content.</p>
<h2>5. Intellectual Property</h2><p>All content on the Services, including text, graphics, logos, icons, images, and the compilation thereof, is the property of ${C.ENTITY} or its content suppliers and is protected by applicable intellectual property laws. The BioVirtua name and logo are marks of the Company. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written permission.</p>
<h2>6. Third-Party Content and Links</h2><p>The Services may reference, summarize, or link to third-party content, products, and websites for convenience and informational purposes. Such references do not constitute endorsement, and we are not responsible for the accuracy, availability, or content of third-party materials. Your interactions with any third party are solely between you and that party.</p>
<h2>7. SMS Messaging: Promotional Marketing Only</h2><p>${C.ENTITY} operates an SMS messaging program strictly for promotional marketing purposes. By enrolling in this program, you acknowledge and agree to the following terms:</p>
<ul><li><b>Program Description:</b> By opting in, you consent to receive recurring automated promotional marketing text messages from BioVirtua at the mobile number you provide. Consent to receive marketing text messages is not a condition of any purchase.</li>
<li><b>Message Frequency:</b> Message frequency varies.</li>
<li><b>Message and Data Rates:</b> Message and data rates may apply.</li>
<li><b>Opting Out and Help:</b> You may opt out of the SMS program at any time by texting the keyword STOP to [INSERT SHORT CODE]. After you send STOP, we will send a one-time message confirming that you have been unsubscribed, and no further messages will be sent. For assistance, text the keyword HELP to [INSERT SHORT CODE], or contact us at ${C.EMAIL} or ${C.PHONE}.</li>
<li><b>Supported Carriers:</b> Supported carriers include AT&amp;T, T-Mobile, Metro PCS, Verizon Wireless, US Cellular, Google Voice, Cellular One, Cellcom, Cellular South, Interop, and Clearsky. Carriers are not liable for delayed or undelivered messages.</li>
<li><b>Privacy:</b> No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Information sharing with subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</li></ul>
<h2>8. Disclaimer of Warranties</h2><p>The Services are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or free of harmful components, or that any information provided is complete, accurate, or current.</p>
<h2>9. Limitation of Liability</h2><p>To the fullest extent permitted by law, ${C.ENTITY} and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss arising from your access to, use of, or inability to use the Services, or reliance on any information provided through them, even if advised of the possibility of such damages.</p>
<h2>10. Indemnification</h2><p>You agree to indemnify and hold harmless ${C.ENTITY} and its affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your use of the Services or your violation of these Terms.</p>
<h2>11. Governing Law</h2><p>These Terms are governed by and construed in accordance with the laws of the State of Vermont, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Vermont.</p>
<h2>12. Changes to These Terms</h2><p>We may update these Terms from time to time to reflect changes in our Services or applicable law. The current version will always be posted on this page, and your continued use of the Services after any update constitutes acceptance of the revised Terms.</p>
<h2>13. Contact Information</h2><p>Company: ${C.ENTITY}. Phone: ${C.PHONE}. Email: ${C.EMAIL}. Address: 75 Eastern Ave, Suite 204, St. Johnsbury, VT 05819, United States.</p>`;

const PP_HTML = `
<p><em>${C.ENTITY} ("BioVirtua," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect through biovirtua.com (the "Services"), how we use and protect it, and the choices available to you.</em></p>
<h2>Company Information</h2><p>Company: ${C.ENTITY}. Address: 75 Eastern Ave, Suite 204, St. Johnsbury, VT 05819, United States. Phone: ${C.PHONE}. Email: ${C.EMAIL}.</p>
<h2>1. Information We Collect</h2><p>We collect information you provide directly to us, such as your name, email address, and mobile phone number when you contact us, submit a form, or opt in to our SMS program. We also automatically collect limited technical information, such as device type, browser, and usage data, when you interact with the Services.</p>
<h2>2. How We Use Your Information</h2><p>We use the information we collect to operate and improve the Services, respond to your inquiries, deliver the updates and SMS messages you request, maintain the security and integrity of the Services, and comply with legal obligations.</p>
<h2>3. How We Share Your Information</h2><p>We do not sell your personal information. We may share information with trusted service providers who perform functions on our behalf (such as hosting, analytics, and customer support), and only to the extent necessary for them to provide those services. We may also disclose information when required by law or to protect our rights and the safety of others.</p>
<h2>4. SMS Messaging and Mobile Data</h2><p>When you opt in to our SMS program, we collect your mobile phone number and your consent records in order to deliver the text messages you have requested. The categories of information collected through the SMS program are used solely to operate the program and send the messages you signed up to receive. No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Information sharing with subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. You may cancel SMS messages at any time by replying STOP, and you may request help by replying HELP. Message frequency varies, and message and data rates may apply.</p>
<h2>5. Cookies and Tracking Technologies</h2><p>The Services may use cookies and similar technologies to remember your preferences, understand how the Services are used, and improve your experience. You can control cookies through your browser settings, although disabling them may affect certain features.</p>
<h2>6. Data Security</h2><p>We implement reasonable administrative, technical, and physical safeguards designed to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>
<h2>7. Data Retention</h2><p>We retain personal information only for as long as necessary to fulfill the purposes described in this Policy, to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
<h2>8. Your Privacy Rights and Choices</h2><p>Depending on your jurisdiction, you may have the right to access, correct, or delete your personal information, or to object to or restrict certain processing. To exercise these rights, contact us using the details below. You may also opt out of SMS messages at any time by replying STOP.</p>
<h2>9. Children's Privacy</h2><p>The Services are intended for individuals who are at least 18 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can take appropriate action.</p>
<h2>10. Third-Party Links</h2><p>The Services may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites, and we encourage you to review their privacy policies.</p>
<h2>11. Changes to This Privacy Policy</h2><p>We may update this Privacy Policy from time to time. The most current version will always be available on this page, and your continued use of the Services indicates your acceptance of any changes.</p>
<h2>12. Contact Us</h2><p>Company: ${C.ENTITY}. Phone: ${C.PHONE}. Email: ${C.EMAIL}. Address: 75 Eastern Ave, Suite 204, St. Johnsbury, VT 05819, United States.</p>`;

/* ---------- write all ---------- */
const routes = {
  '/': home(),
  '/plans': plansPage(),
  '/checkout': checkoutPage(),
  '/order-confirmed': orderConfirmed(),
  '/blog': blogIndex(),
  '/movement-check': movementCheck(),
  '/about': about(),
  '/contact': contact(),
  '/terms-of-service': legal('Terms of Service','terms-of-service',TOS_HTML),
  '/privacy-policy': legal('Privacy Policy','privacy-policy',PP_HTML),
  '/404': notFound()
};
C.plans.forEach(p=>{ routes['/plans/'+p.id]=planDetail(p); });
C.posts.forEach(p=>{ routes['/blog/'+p.slug]=post(p); });

async function run(){
  try { await fs.rm(OUT,{recursive:true,force:true}); } catch(e){ /* some mounts block unlink; overwriting is fine */ }
  for(const [route,html] of Object.entries(routes)){
    const dir = route==='/'?OUT:path.join(OUT,route.replace(/^\//,''));
    await fs.mkdir(dir,{recursive:true});
    const file=path.join(dir,'index.html');
    try { await fs.writeFile(file,html,'utf8'); }
    catch(e){ try { await fs.unlink(file); } catch(_){} await fs.writeFile(file,html,'utf8'); }
  }
  console.log('generated',Object.keys(routes).length,'routes ->',OUT);
}
run().catch(e=>{console.error(e);process.exit(1);});
