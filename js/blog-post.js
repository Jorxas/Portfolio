 // Blog posts data - will be loaded from JSON file
let posts = {};

// Function to load blog posts from JSON file
async function loadBlogPosts() {
	try {
		const response = await fetch('data/blog-posts.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		posts = data.posts;
		return posts;
	} catch (error) {
		console.error('Error loading blog posts:', error);
		// Fallback to empty object if JSON loading fails
		posts = {};
		return posts;
	}
}

// Get post ID from URL parameter
function getPostId() {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('id');
}

// Load and display post
async function loadPost() {
	// First load the blog posts data
	await loadBlogPosts();
	
	const postId = getPostId();
	const post = posts[postId];

	if (!post) {
		// Show 404 message
		document.querySelector('.article-content').innerHTML = `
			<div class="text-center py-5">
				<h1 class="display-4 fw-bold mb-4">Beitrag nicht gefunden</h1>
				<p class="text-muted-foreground mb-4">Der gesuchte Beitrag existiert nicht.</p>
				<a href="blog.html" class="btn btn-custom">
					<i class="fas fa-arrow-left me-2"></i>
					Zurück zum Blog
				</a>
			</div>
		`;
		return;
	}

	// Update page title
	document.title = `${post.title} - Jordan Freddy Portfolio`;

	// Insert hero image
	document.getElementById('heroImageContainer').innerHTML = `
		<img src="${post.image}" alt="${post.title}" class="hero-image">
	`;

	// Insert post meta
	document.getElementById('postMeta').innerHTML = `
		<span class="me-3"><i class="fas fa-user"></i> ${post.author}</span>
		<span class="me-3"><i class="fas fa-calendar"></i> ${post.date}</span>
		<span class="me-3"><i class="fas fa-tag"></i> ${post.category}</span>
		<span><i class="fas fa-clock"></i> ${post.readTime}</span>
	`;

	// Insert post title
	document.getElementById('postTitle').textContent = post.title;

	// Insert post content
	document.getElementById('postContent').innerHTML = post.content;
	
	// Add a temporary class to ensure content is visible
	document.body.classList.add('content-loaded');
	
	// Scroll to top of the page to ensure content is visible after content is loaded
	setTimeout(() => {
		// Get navbar height and scroll to just below it
		const navbar = document.querySelector('.navbar');
		const navbarHeight = navbar ? navbar.offsetHeight : 80;
		
		window.scrollTo({
			top: navbarHeight,
			behavior: 'smooth'
		});
		
		// Focus on the article content to ensure it's visible
		const articleContent = document.querySelector('.article-content');
		if (articleContent) {
			articleContent.scrollIntoView({ 
				behavior: 'smooth', 
				block: 'start' 
			});
		}
	}, 100);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
	loadPost();

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
