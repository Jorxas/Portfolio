 // Blog posts data
const allPosts = [
	{
		id: "1",
		title: "React Hooks: Ein praktischer Leitfaden",
		excerpt: "Lerne React Hooks kennen und verstehe, wie du sie effizient in deinen Frontend-Projekten einsetzen kannst.",
		date: "15. Mai 2023",
		image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Frontend",
	},
	{
		id: "2",
		title: "Node.js API Entwicklung: Von Grund auf",
		excerpt: "Erstelle robuste Backend-APIs mit Node.js, Express und MongoDB für deine Webanwendungen.",
		date: "22. Juni 2023",
		image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Backend",
	},
	{
		id: "3",
		title: "MongoDB vs MySQL: Welche Datenbank wählen?",
		excerpt: "Ein Vergleich zwischen NoSQL und SQL-Datenbanken und wann du welche Technologie einsetzen solltest.",
		date: "8. Juli 2023",
		image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
		category: "Database",
	},
	{
		id: "4",
		title: "CSS Grid vs Flexbox: Wann was verwenden?",
		excerpt: "Entscheidungshilfe für moderne CSS-Layouts und wie du die richtige Technologie für dein Projekt wählst.",
		date: "19. August 2023",
		image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2055&q=80",
		category: "Frontend",
	},
	{
		id: "5",
		title: "Meine Gaming-Entwicklung Journey",
		excerpt: "Wie ich angefangen habe, eigene Spiele zu entwickeln und was ich dabei gelernt habe.",
		date: "5. September 2023",
		image: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Hobby",
	},
	{
		id: "6",
		title: "REST API Design Best Practices",
		excerpt: "Lerne die wichtigsten Prinzipien für das Design von RESTful APIs und wie du sie benutzerfreundlich gestaltest.",
		date: "12. Oktober 2023",
		image: "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Backend",
	},
];

let activeCategory = "All";

// Create blog card HTML
function createBlogCard(post) {
	return `
		<div class="col-lg-4 col-md-6 blog-item" data-category="${post.category}">
			<div class="card blog-card h-100">
				<img src="${post.image}" class="card-img-top" alt="${post.title}">
				<div class="card-body d-flex flex-column">
					<div class="d-flex justify-content-between align-items-start mb-3">
						<span class="category-badge">${post.category}</span>
						<small class="text-muted-foreground">${post.date}</small>
					</div>
					<h5 class="card-title fw-bold">${post.title}</h5>
					<p class="card-text text-muted-foreground flex-grow-1">${post.excerpt}</p>
					<a href="blog-post.html?id=${post.id}" class="btn btn-outline-custom btn-sm align-self-start">Weiterlesen</a>
				</div>
			</div>
		</div>
	`;
}

// Filter and display blog posts
function filterPosts() {
	const filteredPosts = allPosts.filter(post => 
		activeCategory === "All" || post.category === activeCategory
	);

	const blogGrid = document.getElementById('blogGrid');
	const noResults = document.getElementById('noResults');

	if (filteredPosts.length > 0) {
		blogGrid.innerHTML = filteredPosts.map(post => createBlogCard(post)).join('');
		blogGrid.classList.remove('d-none');
		noResults.classList.add('d-none');
	} else {
		blogGrid.classList.add('d-none');
		noResults.classList.remove('d-none');
	}
}

// Newsletter subscription
function subscribeNewsletter() {
	const email = document.getElementById('newsletterEmail').value;
	if (email) {
		alert('Danke für dein Abo!');
		document.getElementById('newsletterEmail').value = '';
	} else {
		alert('Bitte eine gültige E‑Mail‑Adresse eingeben.');
	}
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
	// Display all posts initially
	filterPosts();

	// Filter button event listeners
	document.querySelectorAll('.filter-btn').forEach(btn => {
		btn.addEventListener('click', function() {
			activeCategory = this.getAttribute('data-category');
			// Map German label "Alle" to All
			if (activeCategory === 'Alle') activeCategory = 'All';
			
			// Update button states
			document.querySelectorAll('.filter-btn').forEach(b => {
				b.classList.remove('active');
				b.classList.remove('btn-custom');
				b.classList.add('btn-outline-custom');
			});
			
			this.classList.add('active');
			this.classList.remove('btn-outline-custom');
			this.classList.add('btn-custom');
			
			filterPosts();
		});
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