#!/bin/bash
docker-compose up mysql-db -d

npx prisma migrate deploy

npx prisma db push