// SCROLL REVEAL
const elements = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});


// PARTICLE BACKGROUND
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<120;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2.5
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    p.y += 0.4;
    if(p.y > canvas.height) p.y = 0;

    ctx.fillStyle = "#00aaff";
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();


// CURSOR GLOW
document.addEventListener("mousemove", e => {
  let glow = document.createElement("div");
  glow.style.position = "fixed";
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  glow.style.width = "10px";
  glow.style.height = "10px";
  glow.style.borderRadius = "50%";
  glow.style.background = "#00aaff";
  glow.style.opacity = "0.5";
  glow.style.pointerEvents = "none";
  document.body.appendChild(glow);

  setTimeout(()=>glow.remove(),200);
});


// SMOOTH SCROLL
document.querySelectorAll("a").forEach(a=>{
  a.addEventListener("click", e=>{
    const href = a.getAttribute("href");

    // SOLO link interni (#)
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)
        .scrollIntoView({ behavior: "smooth" });
    }
  });
});