Write-Host "Docker-Image wird erstellt..." -ForegroundColor Green
docker build -t portfolio-jordan .

Write-Host ""
Write-Host "Container wird gestartet..." -ForegroundColor Green
Write-Host "Ihre Website ist verfügbar unter: http://localhost:8080" -ForegroundColor Yellow
Write-Host ""
Write-Host "Drücken Sie Ctrl+C zum Beenden des Servers" -ForegroundColor Cyan
Write-Host ""

docker run -p 8080:80 portfolio-jordan

