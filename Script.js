let profile = JSON.parse(localStorage.getItem("codingProfile")) || {
  name: "Your Name",
  bio: "Your bio will appear here...",
  skills: "HTML, CSS, JavaScript",
  projects: 0,
  hours: 0,
  snippets: 0
};

function renderProfile() {
  document.getElementById("nameDisplay").textContent = profile.name;
  document.getElementById("bioDisplay").textContent = profile.bio;
  
  // Render skill tags
  const skillsContainer = document.getElementById("skillsDisplay");
  skillsContainer.innerHTML = "";
  profile.skills.split(",").forEach(skill => {
    const span = document.createElement("span");
    span.classList.add("skill-tag");
    span.textContent = skill.trim();
    skillsContainer.appendChild(span);
  });

  document.getElementById("projectsStat").textContent = profile.projects;
  document.getElementById("hoursStat").textContent = profile.hours;
  document.getElementById("snippetsStat").textContent = profile.snippets;
}

document.getElementById("saveBtn").addEventListener("click", () => {
  profile.name = document.getElementById("nameInput").value || profile.name;
  profile.bio = document.getElementById("bioInput").value || profile.bio;
  profile.skills = document.getElementById("skillsInput").value || profile.skills;
  profile.projects = parseInt(document.getElementById("projectsInput").value) || profile.projects;
  profile.hours = parseInt(document.getElementById("hoursInput").value) || profile.hours;
  profile.snippets = parseInt(document.getElementById("snippetsInput").value) || profile.snippets;

  localStorage.setItem("codingProfile", JSON.stringify(profile));
  renderProfile();
  renderChart();
});

function renderChart() {
  const ctx = document.getElementById("activityChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Projects", "Hours", "Snippets"],
      datasets: [{
        label: "Coding Stats",
        data: [profile.projects, profile.hours, profile.snippets],
        backgroundColor: ["#58a6ff", "#3fb950", "#f5c518"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#c9d1d9" } }
      },
      scales: {
        x: { ticks: { color: "#c9d1d9" } },
        y: { ticks: { color: "#c9d1d9" }, beginAtZero: true }
      }
    }
  });
}

renderProfile();
renderChart();
