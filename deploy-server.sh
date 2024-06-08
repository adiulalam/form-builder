#!/bin/bash
source .env

export MYSQL_HOST="db"
export DATABASE_URL="mysql://$MYSQL_USER:$MYSQL_PASSWORD@$MYSQL_HOST:$MYSQL_PORT/$MYSQL_DATABASE"

export PORT=$PORT

echo "Waiting for `$MYSQL_HOST` on `$MYSQL_PORT` to come up..."
until nc -z $MYSQL_HOST $MYSQL_PORT; do
    echo "Waiting for database connection..."
    sleep 1
done
echo "Database is up, proceeding with setup..."

npx prisma migrate deploy
npx prisma db push --skip-generate

node server.js