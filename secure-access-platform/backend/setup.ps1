# -----------------------------------------------------------------------------
# Secure Access Control Platform — One-click dev setup (Windows / PowerShell)
# Run from: secure-access-platform/backend/
# -----------------------------------------------------------------------------

Write-Host "`n[1/4] Creating virtual environment..." -ForegroundColor Cyan
python -m venv venv

Write-Host "[2/4] Activating venv and installing dependencies..." -ForegroundColor Cyan
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

Write-Host "[3/4] Setting up .env..." -ForegroundColor Cyan
if (-Not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "      .env created from .env.example — fill in your secrets before running!" -ForegroundColor Yellow
} else {
    Write-Host "      .env already exists, skipping." -ForegroundColor Green
}

Write-Host "[4/4] Done! Start the server with:" -ForegroundColor Green
Write-Host "      .\venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "      uvicorn main:app --reload" -ForegroundColor White
Write-Host ""
Write-Host "Swagger UI: http://localhost:8000/api/v1/docs" -ForegroundColor Cyan
