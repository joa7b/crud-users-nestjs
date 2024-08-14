# Exit immediately if a command exits with a non-zero status
set -e

# Criação do banco de dados
database_configuration() {
  echo "verification if mysql is installed..."
  which mysql
  if [ $? -eq 1 ]; then
    echo "mysql is not installed"
  else
    echo "mysql is already installed."
    echo "Creating database if not exists..."
    mysql -u root -p123456 -e "CREATE DATABASE IF NOT EXISTS crud_users_development;" -h 127.0.0.1
    if [ $? -eq 0 ]; then
      echo "Database created successfully or already exists."
      run_migrations
    else
      echo "Failed to create database."
    fi
  fi
}

# Instalação de dependências
install_dependencies() {
  echo "Installing dependencies..."
  npm install
  echo "Dependencies installed successfully."
}

# Build da aplicação
build_application() {
  echo "Building application..."
  npm run build
  echo "Application built successfully."
}

# Rodar migrações
run_migrations() {
  echo "Running migrations..."
  npm run migration:run
  echo "Migrations completed successfully."
}

# Executa funções
install_dependencies
build_application
database_configuration