@echo off
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo === Checking Node/NPM ===
call node --version
call npm --version
echo.
echo === Removing old node_modules ===
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /q package-lock.json
echo.
echo === Installing dependencies ===
call npm install
echo.
echo === Install complete ===
echo.
echo === Starting dev server ===
call npx vite --host
