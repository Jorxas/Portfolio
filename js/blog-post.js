 // Blog posts data
 const posts = {
	"1": {
		title: "10 Tipps für sauberen Code",
		content: `
			<p>Sauberer Code ist eine der wichtigsten Fähigkeiten für Entwickler. Es geht nicht nur darum, dass der Code funktioniert – er soll auch lesbar, wartbar und skalierbar sein. Hier sind 10 essenzielle Tipps, die dir helfen, besseren Code zu schreiben.</p>

			<h2>1. Aussagekräftige Variablennamen</h2>
			<p>Variablennamen sollten klar ausdrücken, was sie enthalten. Statt generischer Namen wie 'data' oder 'temp' beschreibe den Zweck der Variable.</p>
			
			<pre><code>// Schlecht
const d = new Date();
const u = users.filter(x => x.active);

// Gut
const currentDate = new Date();
const activeUsers = users.filter(user => user.isActive);</code></pre>

			<h2>2. Kleine, fokussierte Funktionen</h2>
			<p>Funktionen sollten eine Sache gut machen. Wenn sie mehrere Dinge tun, teile sie in kleinere Funktionen auf.</p>

			<h2>3. Selbstdokumentierender Code</h2>
			<p>Guter Code erklärt sich weitgehend selbst. Kommentare sind hilfreich, aber die Logik sollte auch ohne viele Kommentare verständlich sein.</p>

			<h2>4. Einheitliche Benennungen</h2>
			<p>Bleibe konsistent bei camelCase, snake_case oder kebab-case. Konsistenz wirkt professionell und verbessert die Lesbarkeit.</p>

			<h2>5. Versionskontrolle effektiv nutzen</h2>
			<p>Häufige, kleine Commits mit aussagekräftigen Messages erleichtern das Nachvollziehen und Zurücksetzen.</p>

			<h2>6. Fehler sauber behandeln</h2>
			<p>Antizipiere Fehlerfälle und behandle sie angemessen. Verhindere unnötige Abstürze.</p>

			<h2>7. Tiefe Verschachtelung vermeiden</h2>
			<p>Zu viele verschachtelte ifs/Loops erschweren das Lesen. Nutze frühe Returns oder zerlege die Logik.</p>

			<h2>8. Toten Code entfernen</h2>
			<p>Nicht genutzter Code (auskommentiert/alt) erhöht nur die Komplexität.</p>

			<h2>9. Linting-Tools einsetzen</h2>
			<p>Tools wie ESLint helfen, Standards durchzusetzen und Probleme früh zu erkennen.</p>

			<h2>10. Regelmäßig refaktorisieren</h2>
			<p>Verbessere deinen Code kontinuierlich. Refactoring hält die Codequalität hoch.</p>

			<p>Sauberen Code zu schreiben ist Übungssache. Fang heute an – die Qualität deiner Projekte wird profitieren.</p>
		`,
		date: "15. Mai 2023",
		author: "Jordan Freddy",
		category: "Entwicklung",
		image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		readTime: "8 Min."
	},
	"2": {
		title: "Die Zukunft des Webdesigns: Trends im Blick",
		content: `
			<p>Webdesign entwickelt sich rasant. Wer moderne, ansprechende Erlebnisse schaffen will, sollte die wichtigsten Trends kennen.</p>

			<h2>1. KI‑getriebene Personalisierung</h2>
			<p>KI ermöglicht dynamische Inhalte und intelligente Layouts – Websites werden adaptiver und nutzerzentrierter.</p>

			<h2>2. Voice User Interface (VUI)</h2>
			<p>Mit Sprachassistenten steigt die Relevanz sprachbasierter Interaktionen. Design muss Sprache mitdenken.</p>

			<h2>3. Immersive 3D‑Erlebnisse</h2>
			<p>WebGL/WebXR erlauben 3D direkt im Browser: Produkt‑Demos, virtuelle Touren, Storytelling.</p>

			<h2>4. Mikro‑Interaktionen & Animationen</h2>
			<p>Feine Animationen geben Feedback und steigern Engagement – dosiert und sinnvoll eingesetzt.</p>

			<h2>5. Dark Mode & Farbpsychologie</h2>
			<p>Dunkle Designs sind Standard geworden. Farben gezielt einsetzen und Kontraste beachten.</p>

			<h2>6. Minimalistische, klare Layouts</h2>
			<p>Viel Weißraum, klare Hierarchie – bessere Lesbarkeit und Fokus.</p>

			<p>Bleibe neugierig und probiere neue Technologien – so entstehen innovative Erlebnisse.</p>
		`,
		date: "22. Juni 2023",
		author: "Jordan Freddy",
		category: "Design",
		image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2055&q=80",
		readTime: "6 Min."
	},
	"3": {
		title: "Barrierefreie Webanwendungen bauen",
		content: `
			<p>Barrierefreiheit ist Grundvoraussetzung für inklusive digitale Erlebnisse. Warum sie zählt – und wie du sie umsetzt.</p>

			<h2>Grundlagen</h2>
			<p>Alle Menschen müssen Seiten nutzen können – auch mit Seh‑, Hör‑, kognitiven oder motorischen Einschränkungen.</p>

			<h2>Mehrwert</h2>
			<ul>
				<li>Größere Zielgruppe</li>
				<li>Bessere SEO</li>
				<li>Weniger rechtliche Risiken</li>
				<li>Besseres Nutzererlebnis</li>
			</ul>

			<h2>WCAG‑Prinzipien</h2>
			<h3>1. Wahrnehmbar</h3>
			<p>Textalternativen, ausreichende Kontraste.</p>
			<h3>2. Bedienbar</h3>
			<p>Tastaturnavigation, keine auslösenden Inhalte.</p>
			<h3>3. Verständlich</h3>
			<p>Klare Sprache, konsistente Navigation.</p>
			<h3>4. Robust</h3>
			<p>Kompatibel mit Assistenztechnologien.</p>

			<h2>Praxis‑Tipps</h2>
			<h3>Semantisches HTML</h3>
			<p>Korrekte Elemente nutzen – sorgt für Struktur.</p>
			<h3>ARIA Labels & Rollen</h3>
			<p>Wenn nötig, ergänzende ARIA‑Attribute einsetzen.</p>
			<h3>Farbe & Kontrast</h3>
			<p>Ausreichende Kontraste, Informationen nicht nur über Farbe transportieren.</p>
			<h3>Testen</h3>
			<p>Automatisiert und mit echten Nutzern testen – Screenreader, Tastaturtests etc.</p>

			<p>Barrierefreiheit ist ein Prozess. Starte mit Basics und verbessere kontinuierlich.</p>
		`,
		date: "8. Juli 2023",
		author: "Jordan Freddy",
		category: "Barrierefreiheit",
		image: "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		readTime: "10 Min."
	}
};

// Get post ID from URL parameter
function getPostId() {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('id');
}

// Load and display post
function loadPost() {
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