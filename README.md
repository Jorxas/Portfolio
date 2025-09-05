# Portfolio - Jordan Freddy Pokem Tezo

## 📋 Beschreibung

Persönliches Portfolio von **Jordan Freddy Pokem Tezo**, Informatikstudent an der THM Gießen, spezialisiert auf Softwareentwicklung. Diese Website präsentiert seine Projekte, Fähigkeiten und Erfahrungen im Bereich der Programmierung.

## 🎯 Über mich

Jordan Freddy ist ein **Informatikstudent** (Bachelor) an der THM Gießen mit Spezialisierung auf **Software Engineering** und **Datenanalyse**. Er sucht derzeit eine **Werkstudentenstelle im IT-Bereich**, um sein Wissen zu vertiefen und es in realen Projekten anzuwenden.

### Hauptkompetenzen:
- **Frontend**: HTML/CSS/JavaScript (93%)
- **Backend**: Java (Vert.x)
- **Datenbanken**: MariaDB
- **DevOps**: Docker, Git
- **Kommunikation**: MQTT
- **Tools**: Bootstrap, Font Awesome

## 🚀 Funktionen

### Hauptseiten:
- **🏠 Startseite** (`index.html`) - Allgemeine Präsentation mit Hero-Sektion, Über mich, Projekte und Kontakt
- **👤 Über mich** (`about.html`) - Detaillierte Informationen über Jordan, seine Fähigkeiten und seinen Werdegang
- **💼 Projekte** (`projects.html`) - Vollständiges Projektportfolio mit Filtern und Suche
- **📝 Blog** (`blog.html`) - Artikel und Gedanken zur Technologie
- **📞 Kontakt** (`contact.html`) - Kontaktformular und Verbindungsinformationen

### Technische Funktionen:
- ✅ **Responsives Design** - Kompatibel mit Mobile, Tablet und Desktop
- ✅ **Flüssige Animationen** - Übergangseffekte und CSS-Animationen
- ✅ **Intuitive Navigation** - Feste Navigationsleiste mit aktiven Indikatoren
- ✅ **Projektfilterung** - Suche und Filterung nach Kategorie
- ✅ **Moderne Benutzeroberfläche** - Sauberes Design mit Bootstrap 5
- ✅ **SEO-Optimierung** - Metadaten und semantische Struktur
- ✅ **JSON-basierte Datenverwaltung** - Blogs werden dynamisch aus JSON geladen

## 🛠️ Verwendete Technologien

### Frontend:
- **HTML5** - Semantische Struktur
- **CSS3** - Benutzerdefinierte Styles mit CSS-Variablen
- **JavaScript (ES6+)** - Interaktionen, Animationen und JSON-Integration
- **Bootstrap 5** - CSS-Framework für responsives Design
- **Font Awesome** - Vektorbasierte Icons
- **Google Fonts** - Typografie (Inter, Poppins)

### Backend & Tools:
- **Docker** - Containerisierung und Deployment
- **Nginx** - Webserver für Production
- **Git** - Versionskontrolle
- **JSON** - Datenstruktur für Blog-Inhalte

## 📁 Projektstruktur

```
portfolio/
├── index.html              # Startseite
├── about.html              # Über mich Seite
├── projects.html           # Projekte Seite
├── blog.html               # Blog Seite
├── blog-post.html          # Blog-Artikel Template
├── contact.html            # Kontakt Seite
├── css/                    # CSS Styles
│   ├── common.css          # Gemeinsame Styles
│   ├── index.css
│   ├── about.css
│   ├── projects.css
│   ├── blog.css
│   ├── blog-post.css
│   └── contact.css
├── js/                     # JavaScript Skripte
│   ├── common.js           # Gemeinsame Funktionen
│   ├── index.js
│   ├── about.js
│   ├── projects.js
│   ├── blog.js
│   ├── blog-post.js        # JSON-Integration für Blogs
│   └── contact.js
├── data/                   # Datenstrukturen
│   └── blog-posts.json     # Blog-Inhalte
├── img/                    # Bilder
│   └── meinBild.jpg        # Profilbild
├── Dockerfile              # Docker-Konfiguration
├── docker-run.ps1          # PowerShell-Script zum Starten
├── .dockerignore           # Docker-Ignore-Datei
└── README.md               # Diese Datei
```

## 🚀 Installation und Verwendung

### Voraussetzungen:
- **Docker** (empfohlen für beste Performance)
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)

### 🐳 Mit Docker (Empfohlen):

1. **Repository klonen:**
   ```bash
   git clone [REPO_URL]
   cd portfolio
   ```

2. **Docker-Container starten:**
   ```powershell
   # PowerShell-Script ausführen
   .\docker-run.ps1
   ```

3. **Website öffnen:**
   - Öffnen Sie `http://localhost:8080` in Ihrem Browser

### 🌐 Alternative: Lokaler Webserver

Falls Docker nicht verfügbar ist:

```bash
# Mit Node.js
npx http-server
```

Dann öffnen Sie `http://localhost:8000` in Ihrem Browser.

## 🎨 Architektur und Funktionsweise

### Frontend-Architektur:
- **Modulare Struktur** - Jede Seite hat eigene CSS/JS-Dateien
- **JSON-Integration** - Blog-Inhalte werden dynamisch geladen
- **Responsive Design** - Mobile-First-Ansatz mit Bootstrap
- **Progressive Enhancement** - Funktioniert auch ohne JavaScript

### Datenverwaltung:
- **Statische Inhalte** - HTML-basierte Seiten
- **Dynamische Blogs** - JSON-basierte Inhalte mit JavaScript
- **Bildoptimierung** - Responsive Bilder mit verschiedenen Größen

### Performance:
- **Lazy Loading** - Bilder werden bei Bedarf geladen
- **CSS/JS-Minimierung** - Optimierte Dateigrößen
- **Caching-Strategien** - Browser-Caching für statische Ressourcen

## 📱 Responsives Design

Die Website ist vollständig responsiv und optimiert für:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Projektziele

- ✅ **Professionelle Präsentation** - Moderne und intuitive Benutzeroberfläche
- ✅ **Technische Demonstration** - Zeigt Webentwicklungsfähigkeiten
- ✅ **Kontaktförderung** - Erleichtert Verbindung mit Recruitern
- ✅ **Skalierbarkeit** - Basis für zukünftige Entwicklungen
- ✅ **Performance** - Schnelle Ladezeiten und optimale Benutzererfahrung

## 📞 Kontakt

- **LinkedIn**: [Jordan Freddy](https://www.linkedin.com/in/jordan-freddy)
- **GitHub**: [Jorxas](https://github.com/Jorxas)
- **E-Mail**: Über das Kontaktformular auf der Website

## 📄 Lizenz

Dieses Projekt ist ein persönliches Portfolio. Alle Rechte vorbehalten © 2025 Jordan Freddy Pokem Tezo.

---

*Entwickelt mit ❤️ von Jordan Freddy Pokem Tezo*