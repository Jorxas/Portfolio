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
		title: "3 kleine JavaScript-Tricks für interaktive Webseiten",
		content: `
			<p>JavaScript macht Webseiten lebendig und interaktiv. In diesem Artikel zeige ich dir 3 praktische Tricks, die du sofort in deine Projekte integrieren kannst, um das Nutzererlebnis zu verbessern.</p>

			<h2>Trick 1: Smooth Scroll für Navigation</h2>
			<p>Erstelle sanfte Scroll-Animationen für deine Navigation, die das Nutzererlebnis deutlich verbessern:</p>

			<pre><code>// Smooth Scroll für alle internen Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Alternative mit Offset für fixierte Navigation
function smoothScrollTo(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}</code></pre>

			<h3>Verwendung:</h3>
			<pre><code>&lt;nav&gt;
    &lt;a href="#home"&gt;Startseite&lt;/a&gt;
    &lt;a href="#about"&gt;Über mich&lt;/a&gt;
    &lt;a href="#contact"&gt;Kontakt&lt;/a&gt;
&lt;/nav&gt;

&lt;button onclick="smoothScrollTo('contact', 100)"&gt;
    Zum Kontakt scrollen
&lt;/button&gt;</code></pre>

			<h2>Trick 2: Lazy Loading für Bilder</h2>
			<p>Verbessere die Ladezeit deiner Webseite mit Lazy Loading für Bilder:</p>

			<pre><code>// Lazy Loading für Bilder
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Fallback für ältere Browser
function lazyLoadFallback() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
}

// Initialisierung
if ('IntersectionObserver' in window) {
    lazyLoadImages();
} else {
    lazyLoadFallback();
}</code></pre>

			<h3>HTML-Struktur:</h3>
			<pre><code>&lt;img data-src="image.jpg" alt="Beschreibung" class="lazy"&gt;
&lt;img data-src="another-image.jpg" alt="Beschreibung" class="lazy"&gt;</code></pre>

			<h3>CSS für Lazy Loading:</h3>
			<pre><code>.lazy {
    opacity: 0;
    transition: opacity 0.3s ease-in;
}

.lazy.loaded {
    opacity: 1;
}</code></pre>

			<h2>Trick 3: Toast-Benachrichtigungen</h2>
			<p>Erstelle elegante Toast-Benachrichtigungen für Feedback an den Nutzer:</p>

			<pre><code>// Toast-Benachrichtigungssystem
class Toast {
    constructor() {
        this.createToastContainer();
    }

    createToastContainer() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            \`;
            document.body.appendChild(container);
        }
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = \`toast toast-\${type}\`;
        toast.style.cssText = \`
            background: \${this.getBackgroundColor(type)};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        \`;
        toast.textContent = message;

        const container = document.getElementById('toast-container');
        container.appendChild(toast);

        // Animation einblenden
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Automatisch ausblenden
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    getBackgroundColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        return colors[type] || colors.info;
    }
}

// Verwendung
const toast = new Toast();
toast.show('Erfolgreich gespeichert!', 'success');
toast.show('Ein Fehler ist aufgetreten', 'error');
toast.show('Bitte warten...', 'info');</code></pre>

			<h3>Integration in Formulare:</h3>
			<pre><code>// Formular-Submission mit Toast-Feedback
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simuliere API-Call
    const formData = new FormData(this);
    
    // Toast für "Wird gesendet..."
    toast.show('Nachricht wird gesendet...', 'info');
    
    // Simuliere Server-Antwort
    setTimeout(() => {
        toast.show('Nachricht erfolgreich gesendet!', 'success');
        this.reset();
    }, 2000);
});</code></pre>

			<h2>Bonus: Kombination der Tricks</h2>
			<p>Kombiniere alle drei Tricks für eine noch bessere Nutzererfahrung:</p>

			<pre><code>// Initialisierung aller Tricks
document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll initialisieren
    initSmoothScroll();
    
    // Lazy Loading initialisieren
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }
    
    // Toast-System initialisieren
    window.toast = new Toast();
    
    // Beispiel: Toast beim Scrollen zu bestimmten Sektionen
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.id;
                toast.show(\`Willkommen im \${sectionName} Bereich!\`, 'info', 2000);
            }
        });
    });
    
    sections.forEach(section => sectionObserver.observe(section));
});</code></pre>

			<h2>Performance-Tipps</h2>
			<ul>
				<li><strong>Debouncing:</strong> Verzögere häufige Events wie Scroll oder Resize</li>
				<li><strong>Event Delegation:</strong> Nutze Event-Bubbling für bessere Performance</li>
				<li><strong>Throttling:</strong> Begrenze die Ausführungsfrequenz von Funktionen</li>
				<li><strong>Cleanup:</strong> Entferne Event-Listener und Observer bei Bedarf</li>
			</ul>

			<p>Diese drei JavaScript-Tricks können deine Webseiten sofort interaktiver und benutzerfreundlicher machen. Beginne mit einem Trick und erweitere schrittweise - du wirst den Unterschied sofort bemerken!</p>
		`,
		date: "25. April 2025",
		author: "Jordan Freddy",
		category: "Frontend",
		image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		readTime: "8 Min."
	},
	"4": {
		title: "Inhalte einfach mit Bootstrap-Utilities organisieren",
		content: `
			<p>Als Entwickler habe ich oft gesehen, wie Bootstrap-Utilities unterschätzt werden. Viele greifen sofort zu Custom CSS, obwohl Bootstrap bereits alles bietet, was man braucht. In diesem Artikel teile ich meine Erfahrungen und zeige dir, wie du mit Utilities professionelle Layouts erstellst.</p>

			<h2>Warum ich Bootstrap-Utilities liebe</h2>
			<p>Als ich anfing, Bootstrap zu nutzen, war ich skeptisch. "Warum sollte ich mich auf vordefinierte Klassen beschränken?", dachte ich. Aber nach einigen Projekten habe ich gemerkt, dass Utilities nicht nur Zeit sparen, sondern auch die Codequalität verbessern.</p>

			<h2>1. Spacing - Der Schlüssel zu sauberen Layouts</h2>
			<p>Eines der größten Probleme in der Webentwicklung ist inkonsistente Abstände. Bootstrap-Utilities lösen das elegant:</p>

			<p><strong>Mein Tipp:</strong> Beginne immer mit <code>m-0</code> und <code>p-0</code> und füge dann gezielt Abstände hinzu. Das verhindert unerwartete Margins.</p>

			<pre><code>&lt;!-- Meine bevorzugte Herangehensweise --&gt;
&lt;div class="card m-0 p-3"&gt;
    &lt;h3 class="mb-3"&gt;Titel&lt;/h3&gt;
    &lt;p class="mb-4"&gt;Inhalt mit konsistentem Abstand&lt;/p&gt;
    &lt;div class="d-flex justify-content-end"&gt;
        &lt;button class="btn btn-primary"&gt;Aktion&lt;/button&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>

			<h2>2. Flexbox-Utilities - Meine Geheimwaffe</h2>
			<p>Flexbox hat die Webentwicklung revolutioniert, und Bootstrap macht es noch einfacher. Hier sind meine Lieblingskombinationen:</p>

			<p><strong>Problemlösung:</strong> Wenn du Elemente zentrieren musst, nutze <code>d-flex align-items-center justify-content-center</code>. Das funktioniert in 90% der Fälle.</p>

			<pre><code>&lt;!-- Navigation mit Flexbox --&gt;
&lt;nav class="d-flex justify-content-between align-items-center p-3"&gt;
    &lt;div class="d-flex align-items-center"&gt;
        &lt;img src="logo.png" class="me-3" alt="Logo"&gt;
        &lt;h1 class="mb-0"&gt;Meine Website&lt;/h1&gt;
    &lt;/div&gt;
    &lt;div class="d-flex gap-3"&gt;
        &lt;a href="#" class="nav-link"&gt;Start&lt;/a&gt;
        &lt;a href="#" class="nav-link"&gt;Über uns&lt;/a&gt;
    &lt;/div&gt;
&lt;/nav&gt;</code></pre>

			<h2>3. Grid-System - Responsive Design leicht gemacht</h2>
			<p>Das Grid-System von Bootstrap ist genial, aber viele Entwickler nutzen es nicht optimal. Hier ist mein Ansatz:</p>

			<p><strong>Meine Strategie:</strong> Beginne immer mit <code>col-12</code> und füge dann responsive Breakpoints hinzu. Das garantiert, dass dein Layout auf allen Geräten funktioniert.</p>

			<pre><code>&lt;!-- Responsive Card-Grid --&gt;
&lt;div class="row g-4"&gt;
    &lt;div class="col-12 col-md-6 col-lg-4"&gt;
        &lt;div class="card h-100"&gt;
            &lt;div class="card-body d-flex flex-column"&gt;
                &lt;h5 class="card-title"&gt;Card 1&lt;/h5&gt;
                &lt;p class="card-text flex-grow-1"&gt;Inhalt...&lt;/p&gt;
                &lt;button class="btn btn-primary align-self-start"&gt;Mehr&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;!-- Weitere Cards... --&gt;
&lt;/div&gt;</code></pre>

			<h2>4. Text-Utilities - Typografie professionell gestalten</h2>
			<p>Gute Typografie macht den Unterschied zwischen einer amateurhaften und einer professionellen Website. Bootstrap-Utilities helfen dabei:</p>

			<p><strong>Mein Geheimnis:</strong> Kombiniere <code>fw-bold</code> mit <code>text-primary</code> für wichtige Überschriften. Das schafft visuelle Hierarchie.</p>

			<pre><code>&lt;!-- Typografie-Hierarchie --&gt;
&lt;h1 class="display-4 fw-bold text-primary mb-4"&gt;Haupttitel&lt;/h1&gt;
&lt;h2 class="h3 fw-semibold text-secondary mb-3"&gt;Untertitel&lt;/h2&gt;
&lt;p class="lead text-muted"&gt;Einleitender Text mit Lead-Klasse&lt;/p&gt;
&lt;p class="small text-muted"&gt;Kleiner Text für Zusatzinformationen&lt;/p&gt;</code></pre>

			<h2>5. Farb-Utilities - Konsistente Farbpalette</h2>
			<p>Farben sind entscheidend für die Benutzererfahrung. Bootstrap's Farb-Utilities sorgen für Konsistenz:</p>

			<p><strong>Meine Regel:</strong> Verwende <code>text-muted</code> für sekundäre Informationen und <code>text-primary</code> für Call-to-Actions.</p>

			<pre><code>&lt;!-- Farbhierarchie --&gt;
&lt;div class="alert alert-success"&gt;
    &lt;h4 class="alert-heading text-success"&gt;Erfolg!&lt;/h4&gt;
    &lt;p class="mb-0"&gt;Deine Aktion wurde erfolgreich ausgeführt.&lt;/p&gt;
&lt;/div&gt;

&lt;div class="alert alert-warning"&gt;
    &lt;h4 class="alert-heading text-warning"&gt;Achtung!&lt;/h4&gt;
    &lt;p class="mb-0"&gt;Bitte überprüfe deine Eingaben.&lt;/p&gt;
&lt;/div&gt;</code></pre>

			<h2>6. Border-Utilities - Struktur schaffen</h2>
			<p>Borders helfen dabei, Inhalte zu strukturieren und zu trennen. Hier sind meine bevorzugten Anwendungen:</p>

			<p><strong>Mein Tipp:</strong> Nutze <code>border-0</code> für Cards, die du mit <code>shadow</code> hervorheben möchtest.</p>

			<pre><code>&lt;!-- Card mit Border und Shadow --&gt;
&lt;div class="card border-0 shadow-sm"&gt;
    &lt;div class="card-header bg-transparent border-bottom"&gt;
        &lt;h5 class="mb-0"&gt;Card-Header&lt;/h5&gt;
    &lt;/div&gt;
    &lt;div class="card-body"&gt;
        &lt;p&gt;Card-Inhalt...&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>

			<h2>7. Display-Utilities - Responsive Verhalten</h2>
			<p>Display-Utilities sind essentiell für responsive Design. Hier ist mein Ansatz:</p>

			<p><strong>Meine Strategie:</strong> Verstecke Elemente auf kleinen Bildschirmen mit <code>d-none d-md-block</code> und zeige sie auf größeren Bildschirmen.</p>

			<pre><code>&lt;!-- Responsive Navigation --&gt;
&lt;nav class="navbar navbar-expand-lg"&gt;
    &lt;div class="container"&gt;
        &lt;a class="navbar-brand" href="#"&gt;Logo&lt;/a&gt;
        
        &lt;!-- Desktop Navigation --&gt;
        &lt;div class="d-none d-lg-flex navbar-nav ms-auto"&gt;
            &lt;a class="nav-link" href="#"&gt;Desktop Link&lt;/a&gt;
        &lt;/div&gt;
        
        &lt;!-- Mobile Toggle --&gt;
        &lt;button class="d-lg-none navbar-toggler"&gt;
            &lt;span class="navbar-toggler-icon"&gt;&lt;/span&gt;
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/nav&gt;</code></pre>

			<h2>8. Position-Utilities - Präzise Positionierung</h2>
			<p>Position-Utilities sind perfekt für Overlays, Tooltips und modale Elemente:</p>

			<p><strong>Mein Geheimnis:</strong> Kombiniere <code>position-absolute</code> mit <code>top-50 start-50 translate-middle</code> für perfekte Zentrierung.</p>

			<pre><code>&lt;!-- Zentriertes Modal --&gt;
&lt;div class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"&gt;
    &lt;div class="modal-dialog"&gt;
        &lt;div class="modal-content"&gt;
            &lt;div class="modal-header"&gt;
                &lt;h5 class="modal-title"&gt;Modal Titel&lt;/h5&gt;
            &lt;/div&gt;
            &lt;div class="modal-body"&gt;
                &lt;p&gt;Modal Inhalt...&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>

			<h2>9. Shadow-Utilities - Tiefe und Dimension</h2>
			<p>Schatten verleihen deinen Elementen Tiefe und machen sie interessanter:</p>

			<p><strong>Meine Regel:</strong> Verwende <code>shadow-sm</code> für subtile Effekte und <code>shadow-lg</code> für starke Akzente.</p>

			<pre><code>&lt;!-- Card mit verschiedenen Schatten --&gt;
&lt;div class="row g-4"&gt;
    &lt;div class="col-md-4"&gt;
        &lt;div class="card shadow-sm"&gt;Leichter Schatten&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="col-md-4"&gt;
        &lt;div class="card shadow"&gt;Standard Schatten&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="col-md-4"&gt;
        &lt;div class="card shadow-lg"&gt;Starker Schatten&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>

			<h2>10. Meine Lieblingskombinationen</h2>
			<p>Nach vielen Monaten  mit Bootstrap habe ich einige Kombinationen entwickelt, die ich immer wieder verwende:</p>

			<pre><code>&lt;!-- Hero-Sektion --&gt;
&lt;section class="bg-primary text-light py-5"&gt;
    &lt;div class="container"&gt;
        &lt;div class="row justify-content-center text-center"&gt;
            &lt;div class="col-lg-8"&gt;
                &lt;h1 class="display-4 fw-bold mb-4"&gt;Willkommen&lt;/h1&gt;
                &lt;p class="lead mb-4"&gt;Eine fesselnde Einleitung...&lt;/p&gt;
                &lt;div class="d-flex justify-content-center gap-3"&gt;
                    &lt;button class="btn btn-light btn-lg px-4"&gt;Primär&lt;/button&gt;
                    &lt;button class="btn btn-outline-light btn-lg px-4"&gt;Sekundär&lt;/button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/section&gt;

&lt;!-- Feature-Card --&gt;
&lt;div class="card border-0 shadow-sm h-100"&gt;
    &lt;div class="card-body d-flex flex-column p-4"&gt;
        &lt;div class="text-primary mb-3"&gt;
            &lt;i class="fas fa-star fa-2x"&gt;&lt;/i&gt;
        &lt;/div&gt;
        &lt;h5 class="card-title fw-bold mb-3"&gt;Feature Titel&lt;/h5&gt;
        &lt;p class="card-text text-muted flex-grow-1"&gt;Feature Beschreibung...&lt;/p&gt;
        &lt;a href="#" class="btn btn-outline-primary align-self-start"&gt;Mehr erfahren&lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>

			<h2>11. Häufige Fehler und wie du sie vermeidst</h2>
			<p>In meiner Zeit mit Bootstrap habe ich viele Fehler gemacht. Hier sind die häufigsten und wie du sie vermeidest:</p>

			<ul>
				<li><strong>Inkonsistente Abstände:</strong> Verwende immer die gleichen Spacing-Klassen für ähnliche Elemente</li>
				<li><strong>Überflüssige Custom CSS:</strong> Prüfe immer zuerst, ob Bootstrap bereits eine Utility-Klasse bietet</li>
				<li><strong>Vergessene responsive Klassen:</strong> Teste deine Layouts auf verschiedenen Bildschirmgrößen</li>
				<li><strong>Überkomplexe Kombinationen:</strong> Halte deine Utility-Kombinationen einfach und lesbar</li>
			</ul>

			<h2>12. Wann du Custom CSS verwenden solltest</h2>
			<p>Trotz der vielen Utilities gibt es Situationen, in denen Custom CSS sinnvoll ist:</p>

			<pre><code>/* Custom CSS für spezielle Anforderungen */
.text-gradient {
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}</code></pre>

			<h2>Fazit</h2>
			<p>Bootstrap-Utilities haben meine Entwicklungspraxis revolutioniert. Sie sparen nicht nur Zeit, sondern sorgen auch für konsistente, wartbare und responsive Layouts. Der Schlüssel liegt darin, die Utilities als Werkzeuge zu verstehen und sie intelligent zu kombinieren.</p>

			<p><strong>Mein Rat:</strong> Beginne mit den Basics, experimentiere mit Kombinationen und entwickle deine eigenen Best Practices. Mit der Zeit wirst du merken, wie mächtig und flexibel Bootstrap-Utilities wirklich sind.</p>

			
		`,
		date: "28. April 2025",
		author: "Jordan Freddy",
		category: "Frontend",
		image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		readTime: "12 Min."
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