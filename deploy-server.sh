#!/bin/bash
source .env

export DATABASE_URL="mysql://$MYSQL_USER:$MYSQL_PASSWORD@db:$MYSQL_PORT/$MYSQL_DATABASE"
export PORT=4000
export NEXTAUTH_URL="http://localhost:4000"

npx prisma migrate deploy
npx prisma db push

node server.js