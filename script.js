document.addEventListener("DOMContentLoaded", () => {
  //stars
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  
  let stars = [];
  
  function initStars() {
    stars = [];
  
    for (let i = 0; i < 250; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  initStars();
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = "white";
  
    for (let i = 0; i < stars.length; i++) {
      let s = stars[i];
  
      s.y -= s.speed;
  
      if (s.y < 0) {
        s.y = canvas.height + Math.random() * 50;
        s.x = Math.random() * canvas.width;
      }
  
      ctx.fillRect(s.x, s.y, s.size, s.size);
    }
  
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener("resize", () => {
    resize();
    initStars();
  });
  
  
  //window popup
  function closeWindow(id) {
    document.getElementById(id).classList.add("hidden");
  }
  
  //window configs
  let highestZ = 1000;
  
  function openWindow(id) {
    const win = document.getElementById(id);
  
    win.classList.remove("hidden");
  
    if (window.innerWidth > 768) {
       win.style.display = "block";
      const rect = win.getBoundingClientRect();
  
          const maxX = window.innerWidth - rect.width;
          const maxY = window.innerHeight - rect.height;
  
          const randomX = Math.random() * Math.max(0, maxX);
          const randomY = Math.random() * Math.max(0, maxY);
  
          win.style.left = randomX + "px";
          win.style.top = randomY + "px";
    } else {
      
      win.style.top = "10px";
      win.style.bottom = "auto";
      win.style.width = "100%";
      win.style.height = "auto";
    }
  
    bringToFront(win);
  }
  
  
  function bringToFront(win) {
    highestZ++;
    win.style.zIndex = highestZ;
  }
  
  document.querySelectorAll(".window").forEach(win => {
    win.addEventListener("mousedown", () => {
      bringToFront(win);
    });
  });
  
  //draggable windows
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let currentWindow = null;
  
  if (window.innerWidth > 768) {
    document.querySelectorAll(".titlebar").forEach(bar => {
      bar.addEventListener("mousedown", (e) => {
        currentWindow = bar.closest(".window");
  
        isDragging = true;
  
        bringToFront(currentWindow);
  
        const rect = currentWindow.getBoundingClientRect();
  
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
      });
    });
  }
  
  document.addEventListener("mousemove", (e) => {
    if (!isDragging || !currentWindow) return;
  
    currentWindow.style.left = (e.clientX - offsetX) + "px";
    currentWindow.style.top = (e.clientY - offsetY) + "px";
  });
  
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
  
  
  //mobile popup
  function closePopup() {
    document.getElementById("mobile-popup").style.display = "none";
  }
  
  
  //mobile dropdown
  function toggleMenu() {
    document.getElementById("menulist").classList.toggle("active");
  }
}};
