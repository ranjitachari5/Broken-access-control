#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# Secure Access Control Platform — One-click dev setup (macOS / Linux)
# Run from: secure-access-platform/backend/
# -----------------------------------------------------------------------------
set -e

echo ""
echo "[1/4] Creating virtual environment..."
python3 -m venv venv

echo "[2/4] Activating venv and installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt

echo "[3/4] Setting up .env..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "      .env created from .env.example — fill in your secrets before running!"
else
    echo "      .env already exists, skipping."
fi

echo ""
echo "[4/4] Done! Start the server with:"
echo "      source venv/bin/activate"
echo "      uvicorn main:app --reload"
echo ""
echo "Swagger UI: http://localhost:8000/api/v1/docs"
