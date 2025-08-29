 // Projects data
 const allProjects = [
	{
		title: "Simon Goes Multiplayer",
		description: "Verteiltes Multiplayer‑Spiel mit Echtzeit‑Synchronisation (MQTT). Backend in Java (Vert.x) mit MariaDB; Frontend in HTML/CSS/JS; DevOps via Docker Compose.",
		image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=2070&q=80",
		techStack: ["Java (Vert.x)", "MariaDB", "MQTT", "Docker", "HTML/CSS/JS"],
		demoUrl: "#",
		codeUrl: "https://git.thm.de/gen1002-informatik-projekt-sose25/student-project-work/group-05",
		category: "Web App",
	},
	{
		title: "To‑Do App",
		description: "Task‑Management‑Anwendung mit responsivem UI. Backend Java (Vert.x), Frontend Bootstrap & Vanilla JS, Deployment via Docker, Versionskontrolle mit Git.",
		image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=2072&q=80",
		techStack: ["Java (Vert.x)", "Bootstrap", "JavaScript", "Docker", "Git"],
		demoUrl: "#",
		codeUrl: "https://git.thm.de/jfpt62/pi-2-ss-25-fr-1-o",
		category: "Web App",
	},
	{
		title: "Function Plotter",
		description: "Java‑basiertes Tool zum Plotten von Funktionen mit Fokus auf Streams, Collections und funktionaler Programmierung.",
		image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2072&q=80",
		techStack: ["Java", "Markdown", "HTML/CSS"],
		demoUrl: "#",
		codeUrl: "#",
		category: "Website",
	},
	{
		title: "Persönliche Projekte (GitHub)",
		description: "Kleine Web‑Apps (Rechner, Mini‑Tools), Prototypen für E‑Commerce und eine Plattform zur Aktivitäten‑Referenzierung. Fokus auf Frontend‑Design und UX.",
		image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2070&q=80",
		techStack: ["JavaScript", "HTML", "CSS", "Bootstrap"],
		demoUrl: "#",
		codeUrl: "#",
		category: "Website",
	},
];

let activeCategory = "All";
let searchTerm = "";

// Create project card HTML
function createProjectCard(project) {
	const techBadges = project.techStack.map(tech => 
		`<span class="tech-badge">${tech}</span>`
	).join('');

	return `
		<div class="col-lg-4 col-md-6 project-item" data-category="${project.category}">
			<div class="card project-card h-100">
				<img src="${project.image}" class="card-img-top" alt="${project.title}">
				<div class="card-body d-flex flex-column">
					<h5 class="card-title fw-bold">${project.title}</h5>
					<p class="card-text text-muted-foreground flex-grow-1">${project.description}</p>
					<div class="mb-3">
						${techBadges}
					</div>
					<div class="d-flex gap-2">
						<button class="btn btn-disabled" disabled>Live‑Demo</button>
						<a href="${project.codeUrl}" class="btn btn-outline-custom">Code ansehen</a>
						<button class="btn btn-disabled" disabled>Live‑Page</button>
					</div>
				</div>
			</div>
		</div>
	`;
}

// Filter and display projects
function filterProjects() {
	const filteredProjects = allProjects.filter(project => {
		const matchesCategory = activeCategory === "All" || project.category === activeCategory;
		const matchesSearch = searchTerm === "" || 
			project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
		
		return matchesCategory && matchesSearch;
	});

	const projectsGrid = document.getElementById('projectsGrid');
	const noResults = document.getElementById('noResults');

	if (filteredProjects.length > 0) {
		projectsGrid.innerHTML = filteredProjects.map(project => createProjectCard(project)).join('');
		projectsGrid.classList.remove('d-none');
		noResults.classList.add('d-none');
	} else {
		projectsGrid.classList.add('d-none');
		noResults.classList.remove('d-none');
	}
}

// Reset filters
function resetFilters() {
	activeCategory = "All";
	searchTerm = "";
	document.getElementById('searchInput').value = "";
	
	// Update filter buttons
	document.querySelectorAll('.filter-btn').forEach(btn => {
		btn.classList.remove('active');
		btn.classList.remove('btn-custom');
		btn.classList.add('btn-outline-custom');
	});
	
	document.querySelector('.filter-btn[data-category="All"]').classList.add('active');
	document.querySelector('.filter-btn[data-category="All"]').classList.remove('btn-outline-custom');
	document.querySelector('.filter-btn[data-category="All"]').classList.add('btn-custom');
	
	filterProjects();
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
	// Display all projects initially
	filterProjects();

	// Filter button event listeners
	document.querySelectorAll('.filter-btn').forEach(btn => {
		btn.addEventListener('click', function() {
			const cat = this.getAttribute('data-category');
			activeCategory = (cat === 'Alle') ? 'All' : cat;
			
			// Update button states
			document.querySelectorAll('.filter-btn').forEach(b => {
				b.classList.remove('active');
				b.classList.remove('btn-custom');
				b.classList.add('btn-outline-custom');
			});
			
			this.classList.add('active');
			this.classList.remove('btn-outline-custom');
			this.classList.add('btn-custom');
			
			filterProjects();
		});
	});

	// Search input event listener
	document.getElementById('searchInput').addEventListener('input', function() {
		searchTerm = this.value;
		filterProjects();
	});

	// Intersection Observer for animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver(function(entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);

	// Observe all animated elements
	const animatedElements = document.querySelectorAll('.animate-fade-in');
	animatedElements.forEach(el => {
		observer.observe(el);
	});
});