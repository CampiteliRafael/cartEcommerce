#!/bin/bash

echo "🚀 Configurando Backend do E-commerce Cart..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "✅ npm encontrado: $(npm --version)"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "⚙️  Criando arquivo .env..."
    cp .env.example .env
    echo "✅ Arquivo .env criado. Por favor, configure suas variáveis de ambiente."
else
    echo "✅ Arquivo .env já existe."
fi

# Compilar TypeScript
echo "🔨 Compilando TypeScript..."
npm run build

echo ""
echo "🎉 Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure o arquivo .env com suas credenciais do MongoDB"
echo "2. Inicie o MongoDB (local ou Atlas)"
echo "3. Execute 'npm run seed' para popular o banco com produtos de exemplo"
echo "4. Execute 'npm run dev' para iniciar o servidor em modo desenvolvimento"
echo ""
echo "🔗 Endpoints disponíveis:"
echo "- Health Check: http://localhost:3001/health"
echo "- API Base: http://localhost:3001/api"
echo ""