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
			
			// Animate skill bars
			const skillBars = entry.target.querySelectorAll('.skill-progress');
			skillBars.forEach(bar => {
				const width = bar.getAttribute('data-width');
				setTimeout(() => {
					bar.style.width = width + '%';
				}, 300);
			});
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