// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
	e.preventDefault();
	
	// Get form data
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const subject = document.getElementById('subject').value;
	const message = document.getElementById('message').value;
	
	// Simple validation
	if (!name || !email || !subject || !message) {
		alert('Please fill in all required fields.');
		return;
	}
	
	// Simulate form submission
	alert('Thank you for your message! I\'ll get back to you soon.');
	
	// Clear form
	this.reset();
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
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