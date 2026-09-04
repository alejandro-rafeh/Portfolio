const projects = [
  {
    title: "Voxel Terrain",
    category: "personal",
    tag: "Action",
    video:
      "./video/terrain.mp4",
    languages: ["C"],
    timeline: [
      { date: "04/11/2024"},
      
    ]
  },
  {
    title: "Unreal AI",
    category: "personal",
    tag: "RPG",
    video:
      "./video/AI.mp4",
    languages: ["C++", "Unreal", "Blueprint","BTT"],
    timeline: [
      { date: "04/11/2024" },
    ]
  },{
    title: "OpenGl",
    category: "personal",
    tag: "RPG",
    video:
      "./video/OpenGl.mp4",
    languages: ["C++", "OpenGl"],
    timeline: [
      { date: "04/11/2024" },
    ]
  },
  {
    title: "Topidia",
    category: "group",
    tag: "Tools",
    youtubeId: "an9J-PH7FdY",
    languages: ["C++", "Unreal", "Blueprint"],
    timeline: [
      { date: "04/11/2024" },
   
    ]
  }
];

const projectsList = document.getElementById("projects-list");
const projectTimeline = document.getElementById("project-timeline");

const categoryLabels = {
  personal: "Proyectos personales",
  group: "Proyectos de grupo"
};

function renderProjects() {
  if (!projectsList) return;

  projectsList.innerHTML = ["personal", "group"]
    .map((category) => {
      const categoryProjects = projects.filter((project) => project.category === category);

      return `
        <section class="project-group" aria-labelledby="${category}-projects-title">
          <div class="project-group-header">
            <span class="eyebrow">${category === "personal" ? "Autonomía" : "Colaboración"}</span>
            <h3 id="${category}-projects-title">${categoryLabels[category]}</h3>
          </div>
          <div class="project-group-list">
            ${categoryProjects
              .map(
                (project) => `
        <article class="project-card">
          <div class="project-media">
          ${project.youtubeId
            ? `<iframe src="https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&mute=1&rel=0" title="Video de YouTube de ${project.title}" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
            : `<video autoplay muted loop playsinline poster="./images/Screenshot 2026-09-01 210318.png">
                <source src="${project.video}" type="video/mp4" />
              </video>`}
          </div>

          <div class="project-content">
            <h3>${project.title}</h3>

            <div class="project-languages">
              ${project.languages.map((language) => `<span>${language}</span>`).join("")}
            </div>

          </div>
        </article>
                `
              )
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");

  projectsList.querySelectorAll("video").forEach((video) => {
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {
      video.addEventListener("canplay", () => video.play().catch(() => {}), { once: true });
    });
  });

  if (projectTimeline) {
    projectTimeline.innerHTML = projects
      .map(
        (project) => `
          <div class="rail-item">
            <strong>${project.title}</strong>
            <div class="rail-dates">
              ${project.timeline
                .map(
                  (item) => `
                    <div class="rail-entry">
                      <span class="rail-date">${item.date}</span>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        `
      )
      .join("");
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas?.getContext("2d");

if (canvas && ctx) {
  let circles = [];
  const mouse = { x: 0, y: 0 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    circles = [];

    for (let i = 0; i < 180; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.4 + 1,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: (Math.random() - 0.5) * 0.7
      });
    }
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  resizeCanvas();
  createParticles();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(167, 139, 250, 0.25)";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      circle.x += circle.speedX;
      circle.y += circle.speedY;

      if (circle.x < 0 || circle.x > canvas.width) circle.speedX *= -1;
      if (circle.y < 0 || circle.y > canvas.height) circle.speedY *= -1;

      const dx = mouse.x - circle.x;
      const dy = mouse.y - circle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        const force = (120 - distance) / 120;
        circle.x -= (dx / distance) * force * 1.5;
        circle.y -= (dy / distance) * force * 1.5;
      }

      for (let j = i + 1; j < circles.length; j++) {
        const other = circles[j];
        const dx2 = other.x - circle.x;
        const dy2 = other.y - circle.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if (distance2 < 90) {
          ctx.beginPath();
          ctx.moveTo(circle.x, circle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

renderProjects();