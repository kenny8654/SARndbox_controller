# SARndbox_controller

Control sandbox with web

## Download first
sudo apt-get install libxtst-dev libpng++-dev
cd semantic/
npx gulp build

## Automatic start up after boot
npm install -g pm2
pm2 start app.js -i 1
pm2 startup
pm2 save



