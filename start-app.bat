@echo off
echo Starting Angular 8 ItemList Application...
echo.
echo Note: This application requires Node.js 16 or lower for development server.
echo Current Node.js version:
node --version
echo.
echo If you encounter OpenSSL errors, please:
echo 1. Use Node.js 16 or lower, OR
echo 2. Build production version with: npm run build
echo.
echo Attempting to start development server...
echo.
ng serve --open --port 4200
pause