/* MUKIL PORTFOLIO V2 — interaction layer */
(() => {
  if (typeof gsap === 'undefined') return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const q = (s,root=document) => root.querySelector(s);
  const qa = (s,root=document) => [...root.querySelectorAll(s)];

  /* Ambient particle field */
  const hero = q('.hero-cream');
  if (hero && !reduce) {
    const field = document.createElement('div'); field.className='v2-particles'; hero.appendChild(field);
    for(let i=0;i<28;i++){
      const p=document.createElement('span'); p.className='v2-particle';
      p.style.left=(Math.random()*100)+'%'; p.style.top=(Math.random()*100)+'%';
      field.appendChild(p);
      gsap.to(p,{y:gsap.utils.random(-90,90),x:gsap.utils.random(-60,60),opacity:gsap.utils.random(.12,.55),duration:gsap.utils.random(3,7),repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()*2});
    }
  }

  /* Cinematic hero intro — layered rather than a simple fade */
  if (!reduce) {
    const tl=gsap.timeline({defaults:{ease:'power4.out'}});
    tl.from('.wordmark',{opacity:0,scale:1.16,filter:'blur(18px)',duration:1.4})
      .from('.hc-badge-left',{opacity:0,y:-25,filter:'blur(8px)',duration:.65},'-=.8')
      .from('.hc-tags span',{opacity:0,x:35,filter:'blur(5px)',duration:.45,stagger:.07},'-=.45')
      .to('.hc-photo',{opacity:1,filter:'blur(0px) saturate(1) contrast(1)',scale:1,duration:1.35},'-=.7')
      .from('.live-status-pill',{opacity:0,y:15,scale:.96,duration:.45},'-=.85')
      .from('.hc-copy .eyebrow',{opacity:0,y:15,duration:.45},'-=.3')
      .from('.hc-headline',{opacity:0,y:45,filter:'blur(10px)',duration:.85},'-=.25')
      .from('.hc-actions .btn',{opacity:0,y:20,scale:.96,duration:.45,stagger:.1},'-=.45')
      .from('.hc-sub',{opacity:0,y:20,duration:.5},'-=.35');
  }

  /* Scroll-driven hero depth */
  if (!reduce && typeof ScrollTrigger !== 'undefined') {
    gsap.to('.wordmark-wrap',{y:-120,scale:1.08,ease:'none',scrollTrigger:{trigger:'.hero-cream',start:'top top',end:'bottom top',scrub:1}});
    gsap.to('.hc-photo-col',{y:-35,rotate:1.5,ease:'none',scrollTrigger:{trigger:'.hero-cream',start:'top top',end:'bottom top',scrub:1}});
    gsap.to('.hc-copy',{y:-75,ease:'none',scrollTrigger:{trigger:'.hero-cream',start:'top top',end:'bottom top',scrub:1}});
  }

  /* Reveal sections as they enter */
  qa('.section-head,.about-photo,.about-copy,.j-card,.project-snap,.stack-col,.contact-inner').forEach((el,i)=>{
    if (reduce) return;
    el.setAttribute('data-v2-reveal','');
    gsap.to(el,{opacity:1,y:0,filter:'blur(0px)',duration:.85,ease:'power3.out',delay:(i%3)*.04,scrollTrigger:{trigger:el,start:'top 86%',once:true}});
  });

  /* Project cards react to pointer position */
  qa('.project-snap').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      card.style.setProperty('--mx',`${e.clientX-r.left}px`); card.style.setProperty('--my',`${e.clientY-r.top}px`);
      if (!reduce) gsap.to(card,{rotationY:(e.clientX-r.left-r.width/2)/55,rotationX:-(e.clientY-r.top-r.height/2)/55,transformPerspective:1000,duration:.35,ease:'power2.out'});
    });
    card.addEventListener('pointerleave',()=>{if(!reduce)gsap.to(card,{rotationX:0,rotationY:0,duration:.55,ease:'power3.out'})});
  });

  /* Image reveal: scale from cinematic crop */
  qa('.project-visual-full img,.about-photo img').forEach(img=>{
    img.classList.add('v2-image');
    if (reduce) img.classList.add('is-visible');
    else if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.create({trigger:img,start:'top 88%',once:true,onEnter:()=>img.classList.add('is-visible')});
  });

  /* Magnetic buttons */
  qa('.btn,.nav-cta,.ai-widget-launcher').forEach(btn=>{
    if(reduce) return;
    btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.12,y:(e.clientY-r.top-r.height/2)*.12,duration:.25,ease:'power2.out'})});
    btn.addEventListener('pointerleave',()=>gsap.to(btn,{x:0,y:0,duration:.4,ease:'elastic.out(1,.5)'}));
  });

  /* Make the marquee feel alive */
  if (!reduce && q('.marquee-track')) gsap.to('.marquee-track',{xPercent:-50,duration:16,ease:'none',repeat:-1});

  /* Keep ScrollTrigger stable after images settle */
  window.addEventListener('load',()=>{if(typeof ScrollTrigger!=='undefined')ScrollTrigger.refresh()},{once:true});
})();
