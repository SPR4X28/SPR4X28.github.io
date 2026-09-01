const number="01777776453";
const message="Hallo Sauber Raus, ich interessiere mich für eine Entrümpelung bzw. Haushaltsauflösung in Bremen und Umgebung. Ich würde gerne mehr über den Ablauf und die Kosten erfahren.";
document.querySelectorAll("[data-whatsapp]").forEach(a=>a.addEventListener("click",e=>{
 if(number.includes("EINTRAGEN")){e.preventDefault();alert("Bitte zuerst die offizielle WhatsApp-Nummer hinterlegen.");return}
 a.href=`https://wa.me/${number.replace(/\D/g,"")}?text=${encodeURIComponent(message)}`;
}));
const menu=document.querySelector(".menu"), nav=document.querySelector(".header nav");
menu?.addEventListener("click",()=>{const open=nav.dataset.open==="1";nav.dataset.open=open?"0":"1";nav.style.display=open?"":"flex";nav.style.position="absolute";nav.style.top="70px";nav.style.left="0";nav.style.right="0";nav.style.background="#fff";nav.style.padding="22px";nav.style.flexDirection="column";nav.style.borderBottom="1px solid #dce2de"});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
document.querySelectorAll("[data-reveal]").forEach(el => revealObserver.observe(el));

const about = document.querySelector(".about");
window.addEventListener("scroll", () => {
  if (!about) return;
  const y = window.scrollY - about.offsetTop;
  const decor = about.querySelector(".decor-one");
  if (decor && y > -window.innerHeight && y < about.offsetHeight + window.innerHeight) {
    decor.style.transform = `translateY(${Math.max(-18, Math.min(24, y * 0.035))}px)`;
  }
}, {passive:true});

const progress = document.querySelector(".scroll-progress");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progress) progress.style.width = `${pct}%`;
};
window.addEventListener("scroll", updateProgress, {passive:true});
updateProgress();

const motionItems = document.querySelectorAll("[data-motion]");
const motionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("motion-in");
      motionObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.12, rootMargin:"0px 0px -8% 0px"});
motionItems.forEach(el => motionObserver.observe(el));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  const heroMedia = document.querySelector(".hero-media");
  window.addEventListener("scroll", () => {
    if (!heroMedia) return;
    const rect = heroMedia.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const shift = (window.innerHeight / 2 - (rect.top + rect.height/2)) * -0.025;
      heroMedia.style.transform = `translateY(${shift}px)`;
    }
  }, {passive:true});
}

const reduceMotionV7 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotionV7) {
  const parallaxTargets = document.querySelectorAll(".gallery-grid .photo, .situations div, .statement-inner");
  const parallaxTick = () => {
    const vh = window.innerHeight;
    parallaxTargets.forEach((el, idx) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const delta = (r.top + r.height/2 - vh/2) / vh;
      const amount = Math.max(-5, Math.min(5, delta * (idx % 2 ? -7 : 7)));
      if (el.classList.contains("statement-inner")) {
        el.style.transform = `translateY(${amount * .35}px)`;
      } else if (!el.matches(":hover")) {
        el.style.transform = `translateY(${amount}px)`;
      }
    });
  };
  window.addEventListener("scroll", parallaxTick, {passive:true});
  parallaxTick();
}

document.querySelectorAll(".header nav a").forEach(link => link.addEventListener("click", () => {
  if (window.innerWidth <= 900 && nav) nav.style.display = "";
}));

const reducedV10 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedV10) {
  document.querySelectorAll(".about-visual-accent, .about-ring, .marquee-track").forEach(el => {
    el.style.animation = "none";
  });
}
