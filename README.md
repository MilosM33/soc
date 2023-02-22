# Modular ESHOP framework

## How to install
- Backend
    1. Go to eshop-backend
    2. Type composer install
    3. Create mysql database called eshop or change in .env file
    4. Migrate databse php artisan migrate:fresh
    5. Add data to database php artisan db:seed
    6. Run backend by php artisan serve

- Frontend
    1. Go to eshop-frontend
    2. Type npm install
    3. Run frontend by npm start

### Technologies used
- Laravel
- Mysql
- React
- Typescript
- Axios
- React Query