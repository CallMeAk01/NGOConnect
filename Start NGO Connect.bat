@echo off
title NGO Connect
color 0A
echo.
echo  Starting NGO Connect...
echo.
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000 " ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5500 " ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
echo  [1/2] Starting Backend...
start "" /min cmd /c "cd /d "D:\NGO Connect\backend" ^&^& node dist\src\main"
timeout /t 5 /nobreak >nul
echo  [2/2] Starting Frontend...
start "" /min cmd /c "cd /d "D:\NGO Connect" ^&^& npx serve -p 5500"
timeout /t 4 /nobreak >nul
echo  Opening browser...
start "" "http://localhost:5500"
exit