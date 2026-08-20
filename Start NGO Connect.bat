@echo off
title NGO Connect - Launcher
color 0A
echo.
echo  ==========================================
echo    NGO CONNECT - Starting up...
echo  ==========================================
echo.

:: Kill old processes on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000 " ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1

:: Kill old processes on port 5500
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5500 " ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1

echo  [1/2] Starting Backend API...
start "NGO-Backend" /min "D:\NGO Connect\backend\start-backend.bat"

timeout /t 6 /nobreak >nul

echo  [2/2] Starting Frontend...
start "NGO-Frontend" /min "D:\NGO Connect\start-frontend.bat"

timeout /t 4 /nobreak >nul

echo.
echo  Opening NGO Connect in browser...
start "" "http://localhost:5500"
echo.
echo  Done! Site is at http://localhost:5500
timeout /t 3 /nobreak >nul
exit
