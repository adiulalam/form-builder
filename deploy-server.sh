#!/bin/bash

if [ -f .env ]; then
    echo "Loading environment variables from .env file"
    source .env
else
    echo ".env file not found, skipping"
fi

# This is the internal port
export MYSQL_PORT="3306"
echo "Exporting MYSQL_PORT to $MYSQL_PORT"

# This is the internal host
export MYSQL_HOST="db"
echo "Exporting MYSQL_HOST to $MYSQL_HOST"

export DATABASE_URL="mysql://$MYSQL_USER:$MYSQL_PASSWORD@$MYSQL_HOST:$MYSQL_PORT/$MYSQL_DATABASE"

export PORT=${PORT:-3000}
echo "Exporting PORT to $PORT"

echo "Waiting for $MYSQL_HOST to come up..."
until nc -z $MYSQL_HOST 3306; do
    echo "Waiting for database connection..."
    sleep 1
done
echo "Database is up, proceeding with setup..."

node node_modules/prisma/build/index.js migrate deploy
node node_modules/prisma/build/index.js db push --skip-generate

node server.js