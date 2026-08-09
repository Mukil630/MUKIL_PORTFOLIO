gsap.registerPlugin(ScrollTrigger);

/* ================= 1-3. Hero entrance (cream cover, heynesh-style) ================= */
const heroTL = gsap.timeline({defaults:{ease:'power3.out'}})
  .from('.wordmark', {opacity:0, scale:1.08, duration:1.1, ease:'power2.out'})
  .from('.hc-badge-left', {opacity:0, y:-16, duration:0.6}, "-=0.6")
  .from('.hc-tags span', {opacity:0, x:16, duration:0.5, stagger:0.08}, "-=0.5")
  .to('.hc-photo', {
      opacity:1, filter:'blur(0px) saturate(1) contrast(1)', scale:1,
      duration:1.3, ease:'power2.out'
    }, "-=0.5")
  .from('.hc-copy .eyebrow', {opacity:0, y:14, duration:0.5}, "-=0.9")
  .from('.hc-headline', {opacity:0, y:30, duration:0.8}, "-=0.4")
  .from('.hc-actions .btn', {opacity:0, y:14, duration:0.5, stagger:0.1}, "-=0.3")
  .from('.hc-badge-right', {opacity:0, y:16, duration:0.5}, "-=0.4")
  .from('.hc-sub', {opacity:0, y:14, duration:0.5}, "-=0.4");

/* Add floating + hover classes after entrance animation completes */
heroTL.eventCallback('onComplete', () => {
  const col = document.querySelector('.hc-photo-col');
  const photo = document.querySelector('.hc-photo');
  if (col) col.classList.add('hero-ready');
  if (photo) photo.classList.add('hero-ready');
});

/* ================= 3b. Hero → About scroll transition (parallax + fade) ================= */
(function heroToAboutTransition() {
  const heroSection = document.querySelector('.hero-cream');
  const heroGrid = document.querySelector('.hero-cream-grid');
  const heroPhoto = document.querySelector('.hc-photo');
  const wordmark = document.querySelector('.wordmark-wrap');
  const scrollCue = document.querySelector('.scroll-cue');

  if (!heroSection || !heroGrid) return;

  const easeInOut = 'power2.inOut';
  const duration = 0.8;

  /* Hero content fades out + image scales to 0.96 while scrolling */
  gsap.to(heroGrid, {
    opacity: 0,
    y: -30,
    ease: easeInOut,
    scrollTrigger: {
      trigger: heroSection,
      start: '60% top',
      end: 'bottom top',
      scrub: true,
    }
  });

  /* Hero photo scales to 0.96 on scroll */
  if (heroPhoto) {
    gsap.to(heroPhoto, {
      scale: 0.96,
      ease: easeInOut,
      scrollTrigger: {
        trigger: heroSection,
        start: '40% top',
        end: 'bottom top',
        scrub: true,
      }
    });
  }

  /* Wordmark parallax — moves slightly slower (parallax effect) */
  if (wordmark) {
    gsap.to(wordmark, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  }

  /* Scroll cue fades out early */
  if (scrollCue) {
    gsap.to(scrollCue, {
      opacity: 0,
      y: 10,
      scrollTrigger: {
        trigger: heroSection,
        start: '20% top',
        end: '40% top',
        scrub: true,
      }
    });
  }
})();

/* ================= 3c. About section — enhanced fade-up animations ================= */
(function aboutAnimations() {
  const aboutSection = document.querySelector('.about');
  const aboutPhoto = document.querySelector('.about-photo');
  const aboutCopy = document.querySelector('.about-copy');
  const aboutHead = document.querySelector('.about .section-head');

  if (!aboutSection) return;

  const easeInOut = 'power2.inOut';

  /* About section head — fade up */
  if (aboutHead) {
    gsap.from(aboutHead.children, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: easeInOut,
      scrollTrigger: {
        trigger: aboutHead,
        start: 'top 85%',
        once: true,
      }
    });
  }

  /* About photo — slides from bottom with smooth reveal */
  if (aboutPhoto) {
    gsap.from(aboutPhoto, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: easeInOut,
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 75%',
        once: true,
      }
    });
  }

  /* About text — smooth staggered appearance */
  if (aboutCopy) {
    const children = aboutCopy.querySelectorAll('p, .about-meta');
    gsap.from(aboutCopy, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: easeInOut,
      scrollTrigger: {
        trigger: aboutCopy,
        start: 'top 85%',
        once: true,
      }
    });
    /* Stagger the inner elements for a smooth cascade */
    gsap.from(children, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.12,
      ease: easeInOut,
      scrollTrigger: {
        trigger: aboutCopy,
        start: 'top 80%',
        once: true,
      }
    });
  }
})();

/* ================= 4. Count-up stats ================= */
document.querySelectorAll('.stat-num').forEach(el=>{
  const target = parseFloat(el.dataset.count);
  const decimal = el.dataset.decimal === 'true';
  const suffix = el.dataset.suffix || '';
  const obj = {val:0};
  ScrollTrigger.create({
    trigger: el, start:'top 90%', once:true,
    onEnter: ()=>{
      gsap.to(obj, {
        val: target, duration:1.6, ease:'power2.out',
        onUpdate: ()=>{ el.textContent = (decimal ? obj.val.toFixed(2) : Math.round(obj.val)) + suffix; }
      });
    }
  });
});

/* ================= 5. Generic scroll reveals ================= */
/* Note: about-photo and about-copy are now handled by the enhanced about animation above,
   so we exclude them here to avoid double-animation conflicts. */
gsap.utils.toArray('.project-card, .stack-col, .contact-inner')
  .forEach((el, i)=>{
    gsap.from(el, {
      opacity:0, y:30, duration:0.8, ease:'power3.out',
      scrollTrigger: {trigger: el, start:'top 85%'},
      delay: (i % 4) * 0.06
    });
  });

gsap.utils.toArray('.section-head').forEach(el=>{
  /* Skip about section-head since it has its own enhanced animation */
  if (el.closest('.about')) return;
  gsap.from(el.children, {
    opacity:0, y:24, duration:0.7, stagger:0.1, ease:'power3.out',
    scrollTrigger: {trigger: el, start:'top 85%'}
  });
});

/* ================= 6. Pinned horizontal journey timeline ================= */
(function journeyScroll(){
  const track = document.querySelector('.journey-track');
  const pin = document.querySelector('.journey-pin');
  if(!track || window.matchMedia('(max-width: 800px)').matches) return;

  function getScrollAmount(){
    const trackWidth = track.scrollWidth;
    return -(trackWidth - window.innerWidth + window.innerWidth*0.06);
  }

  let tween = gsap.to(track, {
    x: getScrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: '.journey',
      start: 'top top',
      end: () => `+=${Math.abs(getScrollAmount())}`,
      scrub: 0.6,
      pin: true,
      invalidateOnRefresh: true
    }
  });

  gsap.utils.toArray('.j-card').forEach(card=>{
    gsap.from(card, {
      opacity:0.3, scale:0.94, duration:0.6,
      scrollTrigger: {
        trigger: card, containerAnimation: tween,
        start: 'left 90%', toggleActions:'play none none reverse'
      }
    });
  });
})();

/* ================= 7. Marquee ================= */
gsap.to('.marquee-track', {
  xPercent: -50, duration: 18, ease: 'none', repeat: -1
});

/* ================= 8. Email copy ================= */
const emailBtn = document.getElementById('email-copy');
emailBtn.addEventListener('click', ()=>{
  navigator.clipboard.writeText(emailBtn.dataset.email).then(()=>{
    const tag = emailBtn.querySelector('span');
    const original = tag.textContent;
    tag.textContent = 'copied!';
    setTimeout(()=> tag.textContent = original, 1500);
  });
});


/* ================= PROJECTS SECTION - PINNED HORIZONTAL SCROLL (LIKE JOURNEY) ================= */
(function projectsHorizontalScroll(){
  const track = document.querySelector('.projects-container');
  const pin = document.querySelector('.projects-pin');
  if(!track) return;
  
  if(window.matchMedia('(max-width: 800px)').matches) return;

  function getScrollAmount(){
    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth - (12 * window.innerWidth / 100);
    return -(trackWidth - viewportWidth);
  }

  let tween = gsap.to(track, {
    x: getScrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: '.projects-scroll-snap',
      start: 'top top',
      end: () => `+=${Math.abs(getScrollAmount())}`,
      scrub: 0.6,
      pin: true,
      invalidateOnRefresh: true
    }
  });

  gsap.utils.toArray('.project-snap').forEach(project=>{
    gsap.from(project, {
      opacity:0.5, scale:0.95, duration:0.6,
      scrollTrigger: {
        trigger: project, 
        containerAnimation: tween,
        start: 'left 80%', 
        toggleActions:'play none none reverse'
      }
    });
  });
})();


/* ================= Navigation smooth scroll ================= */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* Scroll CTA button */
const scrollCueBtn = document.querySelector('.scroll-cue');
if (scrollCueBtn) {
  scrollCueBtn.addEventListener('click', () => {
    window.scrollBy({ top: window.innerHeight * 0.5, behavior: 'smooth' });
  });
}
