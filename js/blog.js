 // Blog posts data - will be loaded from JSON file
let allPosts = [];

// Function to load blog posts from JSON file
async function loadBlogPosts() {
	try {
		const response = await fetch('data/blog-posts.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		
		// Convert JSON posts to array format and filter out empty posts
		allPosts = Object.entries(data.posts)
			.map(([id, post]) => ({
				id: id,
				title: post.title,
				excerpt: post.excerpt || post.content.substring(0, 150) + '...',
				date: post.date,
				image: post.image,
				category: post.category,
				hasContent: post.content && post.content.trim().length > 0
			}))
			.filter(post => post.hasContent); // Only show posts with actual content
			
		return allPosts;
	} catch (error) {
		console.error('Error loading blog posts:', error);
		// Fallback to empty array if JSON loading fails
		allPosts = [];
		return allPosts;
	}
}

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

// Initialize page (robust for cases where DOM is already ready on mobile)
async function initBlogPage() {
	// Load blog posts from JSON first
	await loadBlogPosts();
	
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
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initBlogPage);
} else {
	// DOM is already ready
	initBlogPage();
}