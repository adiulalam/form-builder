#!/bin/bash
source .env

echo "Waiting for $MYSQL_HOST to come up..."
until nc -z 'db' 3306; do
    echo "Waiting for database connection..."
    sleep 1
done
echo "Database is up, proceeding with setup..."

npx prisma migrate deploy
npx prisma db push --skip-generate

node server.js