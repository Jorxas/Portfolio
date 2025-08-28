 // Blog posts data
const allPosts = [
	{
		id: "1",
		title: "10 Tipps für sauberen Code",
		excerpt: "Praktische Tipps und Best Practices, um sauberen, wartbaren Code zu schreiben, für den dir dein Zukunfts‑Ich danken wird.",
		date: "15. Mai 2023",
		image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Entwicklung",
	},
	{
		id: "2",
		title: "Die Zukunft des Webdesigns: Trends im Blick",
		excerpt: "Neue Trends im Webdesign – von KI‑getriebenen Interfaces bis hin zu immersiven Erlebnissen – und wie sie das Web prägen.",
		date: "22. Juni 2023",
		image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2055&q=80",
		category: "Design",
	},
	{
		id: "3",
		title: "Barrierefreie Webanwendungen bauen",
		excerpt: "So erstellst du Webanwendungen, die für alle nutzbar sind – inklusive Menschen mit Behinderungen – und warum das wichtig ist.",
		date: "8. Juli 2023",
		image: "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Barrierefreiheit",
	},
	{
		id: "4",
		title: "Einstieg in React Hooks",
		excerpt: "Ein einsteigerfreundlicher Leitfaden, um React Hooks zu verstehen und effizient in Projekten einzusetzen.",
		date: "19. August 2023",
		image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Entwicklung",
	},
	{
		id: "5",
		title: "Farbpsychologie im Webdesign",
		excerpt: "Wie Farbwahl Wahrnehmung und Verhalten beeinflusst – und wie du sie sinnvoll in Designs einsetzt.",
		date: "5. September 2023",
		image: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		category: "Design",
	},
	{
		id: "6",
		title: "Website‑Performance optimieren",
		excerpt: "Strategien, um Ladezeiten, Responsivität und Gesamtleistung deiner Website spürbar zu verbessern.",
		date: "12. Oktober 2023",
		image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
		category: "Performance",
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