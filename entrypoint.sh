#!/bin/sh
set -e

# Asegura corepack/pnpm
if ! command -v pnpm >/dev/null 2>&1; then
  corepack enable
  corepack prepare pnpm@latest --activate
fi

# Si detecta "pnpm dev" ya corriendo -> abre shell interactivo
if ps aux | grep -v grep | grep -q "pnpm dev"; then
  echo "pnpm dev ya está corriendo. Abriendo shell..."
  exec sh
fi

# Instala dependencias si node_modules no existe o está vacío
if [ ! -d node_modules ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
  echo "Instalando dependencias..."
  pnpm install
fi

# NO arrancamos el servidor automáticamente: dejamos el contenedor en un shell
echo "Dependencias listas. Abriendo shell en /app (ejecuta 'pnpm dev' manualmente)"
exec sh