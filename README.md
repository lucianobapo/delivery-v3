# delivery-v3

## Dev command
***First time run***
```shell
php artisan make:auth
npm install font-awesome --save-dev
php artisan vendor:publish --tag=erpnetWidgetResourceGulpfile
gulp --gulpfile=gulpfileErpnetWidgetResource.js
```
***plugins***
```shell
ionic plugin add cordova-plugin-facebook4 --variable APP_ID="123456789" --variable APP_NAME="myApplication"
ionic plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=
```

***Updating run***
```shell
npm run build && npm run minify && gulp --production
git cmt && ssh delivery-v3.ilhanet.com
cd ~/code/delivery-v3/ && git pull && exit
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
