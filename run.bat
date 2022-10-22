@echo off
cd ./eshop-backend
start php artisan serve

cd ..
cd ./eshop-frontend
start npm start