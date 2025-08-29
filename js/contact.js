// Contact form handling with Formspree
document.getElementById('contactForm').addEventListener('submit', function(e) {
	e.preventDefault();
	
	// Get form elements
	const form = this;
	const submitBtn = document.getElementById('submitBtn');
	const submitText = document.getElementById('submitText');
	const submitSpinner = document.getElementById('submitSpinner');
	
	// Get form data
	const formData = new FormData(form);
	const name = formData.get('name');
	const email = formData.get('email');
	const subject = formData.get('subject');
	const message = formData.get('message');
	
	// Validation
	if (!name || !email || !subject || !message) {
		showNotification('Bitte fülle alle Pflichtfelder aus.', 'error');
		return;
	}
	
	// Email validation
	if (!isValidEmail(email)) {
		showNotification('Bitte gib eine gültige E-Mail-Adresse ein.', 'error');
		return;
	}
	
	// Show loading state
	submitBtn.disabled = true;
	submitText.textContent = 'Wird gesendet...';
	submitSpinner.classList.remove('d-none');
	
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
			showNotification('Nachricht erfolgreich gesendet! Ich melde mich bald bei dir.', 'success');
			form.reset();
		} else {
			throw new Error('Network response was not ok');
		}
	})
	.catch(error => {
		console.error('Error:', error);
		showNotification('Fehler beim Senden der Nachricht. Bitte versuche es später erneut.', 'error');
	})
	.finally(() => {
		// Reset button state
		submitBtn.disabled = false;
		submitText.textContent = 'Nachricht senden';
		submitSpinner.classList.add('d-none');
	});
});

// Email validation function
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Notification function
function showNotification(message, type = 'info') {
	// Create notification element
	const notification = document.createElement('div');
	notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
	notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
	notification.innerHTML = `
		${message}
		<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
	`;
	
	// Add to page
	document.body.appendChild(notification);
	
	// Auto remove after 5 seconds
	setTimeout(() => {
		if (notification.parentNode) {
			notification.remove();
		}
	}, 5000);
}

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