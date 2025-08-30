 // Blog posts data
 const posts = {
	"1": {
		title: "Webseiten wie ein Profi strukturieren: Semantische Tags in HTML5",
		content: `
			<p>Die Struktur einer Webseite ist fundamental für ihre Qualität. Mit semantischen HTML5-Tags kannst du professionelle, zugängliche und SEO-optimierte Websites erstellen. Hier erfährst du, wie du die wichtigsten semantischen Tags richtig einsetzt.</p>

			<h2>Was sind semantische Tags?</h2>
			<p>Semantische Tags geben dem Browser und Suchmaschinen eine klare Bedeutung über den Inhalt. Sie verbessern die Zugänglichkeit und machen deinen Code verständlicher.</p>

			<h2>1. &lt;header&gt; - Der Kopfbereich</h2>
			<p>Der Header enthält meist das Logo, die Navigation und wichtige Informationen über die Seite.</p>
			
			<pre><code>&lt;header&gt;
    &lt;h1&gt;Meine Website&lt;/h1&gt;
    &lt;nav&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;a href="#home"&gt;Startseite&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="#about"&gt;Über uns&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/nav&gt;
&lt;/header&gt;</code></pre>

			<h2>2. &lt;nav&gt; - Navigation</h2>
			<p>Kennzeichnet den Navigationsbereich deiner Website. Screen Reader können so schnell zur Navigation springen.</p>

			<h2>3. &lt;main&gt; - Hauptinhalt</h2>
			<p>Enthält den wichtigsten Inhalt der Seite. Es sollte nur ein &lt;main&gt;-Element pro Seite geben.</p>

			<h2>4. &lt;section&gt; - Abschnitte</h2>
			<p>Gruppiert thematisch zusammengehörige Inhalte. Jede Section sollte eine Überschrift haben.</p>

			<pre><code>&lt;section&gt;
    &lt;h2&gt;Unsere Dienstleistungen&lt;/h2&gt;
    &lt;p&gt;Wir bieten verschiedene Services an...&lt;/p&gt;
&lt;/section&gt;</code></pre>

			<h2>5. &lt;article&gt; - Selbstständige Inhalte</h2>
			<p>Für Inhalte, die auch allein stehen können: Blog-Posts, News-Artikel, Kommentare.</p>

			<h2>6. &lt;aside&gt; - Zusatzinformationen</h2>
			<p>Für Inhalte, die zum Hauptinhalt gehören, aber nicht direkt damit verbunden sind: Sidebars, Werbung, verwandte Links.</p>

			<h2>7. &lt;footer&gt; - Fußbereich</h2>
			<p>Enthält Kontaktinformationen, Copyright, Links zu sozialen Medien.</p>

			<h2>Vorteile semantischer Tags</h2>
			<ul>
				<li><strong>Zugänglichkeit:</strong> Screen Reader können die Struktur besser verstehen</li>
				<li><strong>SEO:</strong> Suchmaschinen verstehen den Inhalt besser</li>
				<li><strong>Wartbarkeit:</strong> Code ist leichter zu verstehen und zu pflegen</li>
				<li><strong>Zukunftssicherheit:</strong> Standards-konformer Code</li>
			</ul>

			<h2>Beispiel einer vollständigen Struktur</h2>
			<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="de"&gt;
&lt;head&gt;
    &lt;title&gt;Meine Website&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;Website-Titel&lt;/h1&gt;
        &lt;nav&gt;Navigation&lt;/nav&gt;
    &lt;/header&gt;
    
    &lt;main&gt;
        &lt;article&gt;
            &lt;h2&gt;Hauptinhalt&lt;/h2&gt;
            &lt;p&gt;Inhalt...&lt;/p&gt;
        &lt;/article&gt;
        
        &lt;aside&gt;
            &lt;h3&gt;Zusatzinfo&lt;/h3&gt;
        &lt;/aside&gt;
    &lt;/main&gt;
    
    &lt;footer&gt;
        &lt;p&gt;Copyright 2025&lt;/p&gt;
    &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

			<p>Semantische HTML5-Tags sind der Schlüssel zu professionellen, zugänglichen und suchmaschinenoptimierten Websites. Beginne heute damit, sie in deine Projekte zu integrieren!</p>
		`,
		date: "12. April 2025",
		author: "Jordan Freddy",
		category: "Frontend",
		image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		readTime: "10 Min."
	},
	"2": {
		title: "Responsive Design mit Flexbox und Grid erstellen",
		content: `
			<p>Moderne CSS-Layout-Techniken haben die Webentwicklung revolutioniert. Flexbox und Grid ermöglichen es uns, komplexe, responsive Layouts zu erstellen, die auf allen Geräten perfekt funktionieren.</p>

			<h2>Warum Flexbox und Grid?</h2>
			<p>Traditionelle Layout-Methoden mit Float und Position waren umständlich und fehleranfällig. Flexbox und Grid bieten intuitive, mächtige Werkzeuge für moderne Layouts.</p>

			<h2>1. Flexbox - Flexible Box Layout</h2>
			<p>Flexbox ist ideal für eindimensionale Layouts - entweder in Zeilen oder Spalten. Perfekt für Navigationen, Card-Layouts und flexible Inhalte.</p>

			<h3>Grundlegende Flexbox-Eigenschaften</h3>
			<pre><code>.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.item {
    flex: 1;
    margin: 10px;
}</code></pre>

			<h3>Responsive Navigation mit Flexbox</h3>
			<pre><code>.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

@media (max-width: 768px) {
    .nav-links {
        flex-direction: column;
        gap: 1rem;
    }
}</code></pre>

			<h2>2. CSS Grid - Zweidimensionale Layouts</h2>
			<p>Grid ist perfekt für zweidimensionale Layouts. Du definierst Zeilen und Spalten und platzierst Elemente genau dort, wo du sie haben möchtest.</p>

			<h3>Grid-Container einrichten</h3>
			<pre><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: auto;
    gap: 2rem;
    padding: 2rem;
}</code></pre>

			<h3>Responsive Grid-Layout</h3>
			<pre><code>.responsive-grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1rem;
}

@media (max-width: 768px) {
    .responsive-grid {
        grid-template-columns: 1fr;
    }
}</code></pre>

			<h2>3. Kombination von Flexbox und Grid</h2>
			<p>Die wahre Stärke liegt in der Kombination beider Techniken. Grid für das Hauptlayout, Flexbox für die Inhalte innerhalb der Grid-Zellen.</p>

			<pre><code>.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-content {
    flex: 1;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}</code></pre>

			<h2>4. Responsive Design Best Practices</h2>
			<ul>
				<li><strong>Mobile-First:</strong> Beginne mit dem kleinsten Screen und erweitere</li>
				<li><strong>Flexible Einheiten:</strong> Verwende rem, em, %, vw/vh statt px</li>
				<li><strong>Breakpoints:</strong> Definiere klare Breakpoints für verschiedene Geräte</li>
				<li><strong>Testen:</strong> Teste auf echten Geräten, nicht nur im Browser</li>
			</ul>

			<h2>5. Praktisches Beispiel: Portfolio-Layout</h2>
			<pre><code>.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

.portfolio-item {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.portfolio-item:hover {
    transform: translateY(-5px);
}

.portfolio-image {
    flex: 0 0 200px;
    background-size: cover;
    background-position: center;
}

.portfolio-content {
    flex: 1;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
}

.portfolio-actions {
    display: flex;
    gap: 1rem;
    margin-top: auto;
}</code></pre>

			<h2>Browser-Support und Fallbacks</h2>
			<p>Flexbox und Grid werden von allen modernen Browsern unterstützt. Für ältere Browser kannst du Fallbacks verwenden:</p>

			<pre><code>/* Fallback für ältere Browser */
.container {
    display: block; /* Fallback */
}

/* Moderne Browser */
@supports (display: flex) {
    .container {
        display: flex;
    }
}</code></pre>

			<p>Flexbox und Grid haben die CSS-Layout-Landschaft revolutioniert. Mit diesen Techniken kannst du moderne, responsive und wartbare Websites erstellen. Beginne heute damit, sie in deine Projekte zu integrieren!</p>
		`,
		date: "18. April 2025",
		author: "Jordan Freddy",
		category: "Frontend",
		image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		readTime: "12 Min."
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