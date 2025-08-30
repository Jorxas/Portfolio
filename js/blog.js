 // Blog posts data
const allPosts = [
	{
		id: "1",
		title: "Webseiten wie ein Profi strukturieren: Semantische Tags in HTML5",
		excerpt: "Entdecke, wie du semantische HTML5-Tags verwendest, um eine professionelle und zugängliche Webstruktur zu erstellen.",
		date: "12. April 2025",
		image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Frontend",
	},
	{
		id: "2",
		title: "Responsive Design mit Flexbox und Grid erstellen",
		excerpt: "Lerne moderne CSS-Layout-Techniken mit Flexbox und Grid für professionelle, responsive Websites.",
		date: "18. April 2025",
		image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Frontend",
	},
	{
		id: "3",
		title: "JavaScript: Die Sprache des modernen Webs",
		excerpt: "Von Variablen und Funktionen bis zu ES6+ Features, DOM-Manipulation und asynchroner Programmierung.",
		date: "25. Juli 2025",
		image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Frontend",
	},
	{
		id: "4",
		title: "Bootstrap Framework: Schnelle und responsive Webentwicklung",
		excerpt: "Lerne Bootstrap kennen - Grid-System, Komponenten, Utilities und wie du professionelle Websites schnell erstellst.",
		date: "28. April 2025",
		image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Frontend",
	},
	{
		id: "5",
		title: "Java Programmierung: Von OOP bis Collections",
		excerpt: "Grundlagen der Java-Programmierung - Objektorientierung, Collections Framework und moderne Java-Features.",
		date: "15. Dezember 2024",
		image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Backend",
	},
	{
		id: "6",
		title: "Vert.x Framework: Event-driven Microservices",
		excerpt: "Entdecke Vert.x - ein event-driven, non-blocking Framework für skalierbare Microservices und reaktive Anwendungen.",
		date: "30. Juni 2025",
		image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Backend",
	},
	{
		id: "7",
		title: "SQL Datenbanken: Von SELECT bis JOIN",
		excerpt: "Grundlagen der SQL-Programmierung - Abfragen, Tabellen, Beziehungen und Datenbankdesign.",
		date: "10. August 2025",
		image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
		category: "Database",
	},
	{
		id: "8",
		title: "Docker Container: Containerisierung leicht gemacht",
		excerpt: "Lerne Docker kennen - Container erstellen, Images bauen und Anwendungen in isolierten Umgebungen deployen.",
		date: "22. August 2025",
		image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "DevOps",
	},
	{
		id: "9",
		title: "Git & GitHub: Versionskontrolle für Entwickler",
		excerpt: "Mastere Git und GitHub - Branches, Commits, Pull Requests und kollaborative Entwicklung in Teams.",
		date: "5. September 2025",
		image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "DevOps",
	},
	{
		id: "10",
		title: "Gaming: Meine Leidenschaft für Videospiele",
		excerpt: "Von Retro-Klassikern bis zu modernen AAA-Titeln - meine Gaming-Journey und die Spiele, die mich geprägt haben.",
		date: "18. September 2025",
		image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Hobby",
	},
	{
		id: "11",
		title: "MQTT Protokoll: Echtzeit-Kommunikation für IoT",
		excerpt: "Entdecke MQTT - das Message Queuing Telemetry Transport Protokoll für effiziente IoT-Kommunikation und Echtzeit-Datenübertragung.",
		date: "2. Oktober 2025",
		image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Backend",
	},
	{
		id: "12",
		title: "Anime & Manga: Eine Reise durch japanische Animation",
		excerpt: "Meine Entdeckung der Anime-Welt - von Klassikern wie Dragon Ball bis zu modernen Meisterwerken wie Attack on Titan.",
		date: "15. Oktober 2025",
		image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Hobby",
	},
	{
		id: "13",
		title: "Salsa Tanz: Rhythmus und Leidenschaft",
		excerpt: "Meine Tanz-Journey mit Salsa - von den ersten Schritten bis zu komplexen Figuren und der Freude am Tanzen.",
		date: "28. Oktober 2025",
		image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Hobby",
	},
	{
		id: "14",
		title: "Filme: Meine Liebe zum Kino",
		excerpt: "Von Blockbustern bis zu Independent-Filmen - meine Filmempfehlungen und die Geschichten, die mich bewegen.",
		date: "10. November 2025",
		image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Hobby",
	},
	{
		id: "15",
		title: "Musik: Die universelle Sprache",
		excerpt: "Meine musikalischen Entdeckungen - von Klassik bis Pop, und wie Musik mein Leben bereichert.",
		date: "25. November 2025",
		image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Hobby",
	},
	{
		id: "16",
		title: "Kickboxing: Kraft, Disziplin und Selbstverteidigung",
		excerpt: "Meine Kickboxing-Journey - Training, Wettkämpfe und die mentalen und physischen Vorteile des Kampfsports.",
		date: "8. Dezember 2025",
		image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Hobby",
	},
	{
		id: "17",
		title: "Klavier: Die Magie der Tasten",
		excerpt: "Meine Klavier-Journey - von ersten Melodien bis zu komplexen Stücken und der Freude am Musizieren.",
		date: "20. Dezember 2025",
		image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Hobby",
	},
	{
		id: "18",
		title: "Programmierung: Meine Leidenschaft für Code",
		excerpt: "Warum ich programmiere - von der ersten Zeile Code bis zu komplexen Projekten und der Freude am Problemlösen.",
		date: "5. Januar 2026",
		image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Hobby",
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

// Newsletter subscription with Formspree
document.addEventListener('DOMContentLoaded', function() {
	const newsletterForm = document.getElementById('newsletterForm');
	if (newsletterForm) {
		newsletterForm.addEventListener('submit', function(e) {
			e.preventDefault();
			
			const form = this;
			const email = document.getElementById('newsletterEmail').value;
			const submitBtn = document.getElementById('newsletterBtn');
			const btnText = document.getElementById('newsletterBtnText');
			const spinner = document.getElementById('newsletterSpinner');
			const messageDiv = document.getElementById('newsletterMessage');
			
			// Validation
			if (!email || !isValidEmail(email)) {
				showNewsletterMessage('Bitte gib eine gültige E-Mail-Adresse ein.', 'error');
				return;
			}
			
			// Show loading state
			submitBtn.disabled = true;
			btnText.textContent = 'Wird abonniert...';
			spinner.classList.remove('d-none');
			
			// Prepare form data
			const formData = new FormData();
			formData.append('newsletter_email', email);
			formData.append('subject', 'Newsletter Abonnement - Jordan Freddy Portfolio');
			formData.append('message', `Neue Newsletter-Anmeldung: ${email}`);
			
			// Submit to Formspree
			fetch(form.action, {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json'
				}
			})
			.then(response => {
				if (response.ok) {
					showNewsletterMessage('Erfolgreich abonniert! Du erhältst bald Updates zu neuen Artikeln.', 'success');
					form.reset();
				} else {
					throw new Error('Network response was not ok');
				}
			})
			.catch(error => {
				console.error('Error:', error);
				showNewsletterMessage('Fehler beim Abonnieren. Bitte versuche es später erneut.', 'error');
			})
			.finally(() => {
				// Reset button state
				submitBtn.disabled = false;
				btnText.textContent = 'Abonnieren';
				spinner.classList.add('d-none');
			});
		});
	}
});

// Email validation function
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Newsletter message function
function showNewsletterMessage(message, type = 'info') {
	const messageDiv = document.getElementById('newsletterMessage');
	if (messageDiv) {
		messageDiv.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show mt-3`;
		messageDiv.innerHTML = `
			${message}
			<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
		`;
		messageDiv.classList.remove('d-none');
		
		// Auto hide after 5 seconds
		setTimeout(() => {
			messageDiv.classList.add('d-none');
		}, 5000);
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