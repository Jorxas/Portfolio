// Navbar scroll effect
window.addEventListener('scroll', function() {
	const navbar = document.getElementById('mainNav');
	if (!navbar) return;
	if (window.scrollY > 10) {
		navbar.classList.add('navbar-scrolled');
	} else {
		navbar.classList.remove('navbar-scrolled');
	}
});

// Smooth scroll to projects
function scrollToProjects() {
	const el = document.getElementById('projects');
	if (el) {
		el.scrollIntoView({ behavior: 'smooth' });
	}
}

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
document.addEventListener('DOMContentLoaded', function() {
	const animatedElements = document.querySelectorAll('.animate-fade-in');
	animatedElements.forEach(el => {
		observer.observe(el);
	});
});
