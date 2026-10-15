@echo off
setlocal enabledelayedexpansion
title Visualizador de Estruturas de Dados e Algoritmos v2.0.0
cd /d "%~dp0"

echo ===================================================================
echo  Visualizador de Estruturas de Dados e Algoritmos v2.0.0
echo  Iniciando a aplicacao...
echo ===================================================================

:: Verifica se o Python esta disponivel para rodar via servidor local (recomendado)
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Iniciando servidor local seguro via Python...
    python run.py
    exit /b 0
)

:: Caso o Python nao esteja instalado, abre a versao standalone codificando caracteres especiais (#)
echo Abrindo versao standalone no navegador via PowerShell...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0open_app.ps1"

exit /b 0
