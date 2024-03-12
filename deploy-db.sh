#!/bin/bash
source .env

if [ $NODE_ENV == 'production' ]
then
    export DATABASE_URL="mysql://$MYSQL_USER:$MYSQL_PASSWORD@db:$MYSQL_PORT/$MYSQL_DATABASE"
fi

docker-compose up mysql-db -d
npx prisma migrate deploy
npx prisma db push

if [ $NODE_ENV == 'production' ]
then
    node server.js
fi