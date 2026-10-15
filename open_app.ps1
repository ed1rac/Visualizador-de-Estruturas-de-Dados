$htmlPath = Join-Path $PSScriptRoot "visualizador-standalone.html"
$uri = [System.Uri]$htmlPath
Write-Host "Abrindo visualizador no navegador padrao..."
Write-Host "URL: $($uri.AbsoluteUri)"
Start-Process $uri.AbsoluteUri
