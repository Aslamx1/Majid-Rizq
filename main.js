/* ================================================================
   Majid Rizq General Hardware Ltd – Main JavaScript
   Author: Built with Claude AI
   Version: 1.0
================================================================ */

// ── LOADER
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const l=document.getElementById('loader');
    l.classList.add('done');
    setTimeout(()=>l.remove(),800);
  },1600);
});

// ── CURSOR
const cursor=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px'});
function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing)}
animRing();
document.querySelectorAll('a,button,.product-card,.tab-btn,.career-card,.sustain-card,.news-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.classList.add('hover');ring.classList.add('hover')});
  el.addEventListener('mouseleave',()=>{cursor.classList.remove('hover');ring.classList.remove('hover')});
});

// ── PARTICLES
const pWrap=document.getElementById('particles');
for(let i=0;i<28;i++){
  const p=document.createElement('div');
  p.className='particle';
  const size=Math.random()*4+2;
  p.style.cssText=`width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${Math.random()*10+6}s;--delay:${Math.random()*8}s;--ty:${-(Math.random()*80+20)}px;--tx:${(Math.random()-0.5)*60}px`;
  pWrap.appendChild(p);
}

// ── NAVBAR SCROLL
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>60);
  document.getElementById('backTop').classList.toggle('show',window.scrollY>400);
});

// ── ACTIVE NAV
const sections=document.querySelectorAll('section[id]');
const navAs=document.querySelectorAll('.nav-links>li>a');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navAs.forEach(a=>{a.classList.remove('active');if(a.getAttribute('href')==='#'+e.target.id)a.classList.add('active')});
    }
  });
},{threshold:.3,rootMargin:'-60px 0px -60px 0px'});
sections.forEach(s=>observer.observe(s));

// ── SCROLL REVEAL
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el=>revealObs.observe(el));

// ── HAMBURGER
const hb=document.getElementById('hamburger'),nl=document.getElementById('nav-links');
function closeMenu(){nl.classList.remove('open');hb.classList.remove('open');document.body.style.overflow=''}
hb.addEventListener('click',()=>{
  const isOpen=nl.classList.toggle('open');
  hb.classList.toggle('open',isOpen);
  document.body.style.overflow=isOpen?'hidden':'';
});
document.addEventListener('click',e=>{if(!nav.contains(e.target))closeMenu()});
// close on nav link click (mobile)
nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));

// ── CONTACT FORM
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const txt = document.getElementById('submitText');
    const msg = document.getElementById('formMsg');
    btn.disabled = true;
    txt.textContent = 'Sending...';
    btn.style.opacity = '0.75';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if(res.ok){
        msg.style.display = 'block';
        msg.style.background = 'rgba(40,160,80,.12)';
        msg.style.color = '#1a6e35';
        msg.style.border = '1px solid rgba(40,160,80,.25)';
        msg.innerHTML = '<i class="fas fa-check-circle" style="margin-right:8px;color:#28a050"></i>Thank you! Your message has been sent. We will get back to you shortly.';
        form.reset();
        txt.textContent = 'Message Sent!';
        btn.style.background = '#2a7a40';
        setTimeout(()=>{txt.textContent='Send Message';btn.disabled=false;btn.style.opacity='1';btn.style.background='';msg.style.display='none'},6000);
      } else {
        throw new Error('Server error');
      }
    } catch(err){
      msg.style.display = 'block';
      msg.style.background = 'rgba(200,50,50,.1)';
      msg.style.color = '#8b2020';
      msg.style.border = '1px solid rgba(200,50,50,.2)';
      msg.innerHTML = '<i class="fas fa-exclamation-circle" style="margin-right:8px;color:#c83232"></i>Something went wrong. Please email us directly at <a href="mailto:info@majidrizq.com" style="color:#6B3A1F;font-weight:600">info@majidrizq.com</a>';
      txt.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  });
}

// ── PRODUCT FILTER
function filterProducts(cat,btn){
  if(btn){document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}
  else{
    document.querySelectorAll('.tab-btn').forEach(b=>{
      const txt=b.querySelector('span')?.textContent||b.textContent;
      b.classList.toggle('active',cat==='all'?txt.includes('All'):txt.toLowerCase().includes(cat==='accessories'?'access':cat==='plates'?'plate':cat==='pipes'?'pipe':cat==='hollow'?'hollow':cat==='wire'?'wire':cat==='steel'?'structural':cat));
    });
  }
  let count=0;
  document.querySelectorAll('.product-card').forEach(card=>{
    const show=cat==='all'||card.dataset.cat===cat;
    card.style.display=show?'block':'none';
    if(show)count++;
  });
  const badge=document.getElementById('product-count');
  if(badge)badge.textContent=count+' Product'+(count!==1?'s':'');
  // scroll to products
  document.getElementById('products')?.scrollIntoView({behavior:'smooth',block:'start'});
}