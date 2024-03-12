#!/bin/bash
source .env

export DATABASE_URL="mysql://$MYSQL_USER:$MYSQL_PASSWORD@db:$MYSQL_PORT/$MYSQL_DATABASE"

npx prisma migrate deploy
npx prisma db push

node server.js