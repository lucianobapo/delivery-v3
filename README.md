# delivery-v3

## Dev command
***First time run***
```shell
php artisan make:auth
npm install font-awesome --save-dev
php artisan vendor:publish --tag=erpnetWidgetResourceGulpfile
gulp --gulpfile=gulpfileErpnetWidgetResource.js
```

***Updating run***
```shell
git cmt && ssh delivery-v3.ilhanet.com
cd code/erpnet-v5/ && git pull && composer install && exit
```

## Production command
***First time run***
```shell
ssh erpnet-v5.ilhanet.com
cd code/erpnet-v5/ && git pull && composer install && exit
```

***First time run***
```shell
rsync -rvztPhe ssh /home/luciano/code/erpnet-v5/.env.production erpnet-v5.ilhanet.com:code/erpnet-v5/.env
php artisan vendor:publish --tag=erpnetWidgetResourceFonts --force
php artisan vendor:publish --tag=erpnetMigratesMigrations --force
sudo ./permissions.sh
php artisan migrate
```
