@echo off
echo 🚀 Configurando Backend do E-commerce Cart...

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Por favor, instale o Node.js primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
node --version

REM Verificar se npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm não encontrado. Por favor, instale o npm primeiro.
    pause
    exit /b 1
)

echo ✅ npm encontrado
npm --version

REM Instalar dependências
echo 📦 Instalando dependências...
npm install

REM Verificar se o arquivo .env existe
if not exist .env (
    echo ⚙️  Criando arquivo .env...
    copy .env.example .env
    echo ✅ Arquivo .env criado. Por favor, configure suas variáveis de ambiente.
) else (
    echo ✅ Arquivo .env já existe.
)

REM Compilar TypeScript
echo 🔨 Compilando TypeScript...
npm run build

echo.
echo 🎉 Setup concluído!
echo.
echo 📋 Próximos passos:
echo 1. Configure o arquivo .env com suas credenciais do MongoDB
echo 2. Inicie o MongoDB (local ou Atlas)
echo 3. Execute 'npm run seed' para popular o banco com produtos de exemplo
echo 4. Execute 'npm run dev' para iniciar o servidor em modo desenvolvimento
echo.
echo 🔗 Endpoints disponíveis:
echo - Health Check: http://localhost:3001/health
echo - API Base: http://localhost:3001/api
echo.
pause