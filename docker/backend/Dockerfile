FROM php:8.2.3

RUN apt update \
    && apt install -y \
    g++ \
    libicu-dev \
    libpq-dev \
    libzip-dev \
    zip \
    zlib1g-dev \
    && docker-php-ext-install \
    intl \
    opcache \
    pdo \
    pdo_mysql \
    pgsql 

WORKDIR /var/www/laravel_docker

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY ./eshop-backend .

RUN composer update --no-interaction

RUN composer install --no-interaction


EXPOSE 8000

RUN chmod 777 ./run

CMD ["./run"]

