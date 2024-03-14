#!/bin/bash
source .env

PORT="4000"
export DATABASE_URL="mysql://$MYSQL_USER:$MYSQL_PASSWORD@db:$MYSQL_PORT/$MYSQL_DATABASE"
export PORT=$PORT
export NEXTAUTH_URL="http://localhost:$PORT"

npx prisma migrate deploy
npx prisma db push

node server.js