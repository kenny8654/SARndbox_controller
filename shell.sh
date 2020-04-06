#!/bin/sh

cd /home/user/src/SARndbox-2.7/bin
sudo apt-get install git
sudo apt-get install libxtst-dev libpng++-dev
sudo apt update
sudo apt install nodejs
sudo apt install npm
git clone https://github.com/kenny8654/SARndbox_controller.git
cd SARndbox_controller/
sudo npm install -g gulp
sudo npm install -g node-gyp
npm install gulp-print@5.0.0
npm install
cd semantic/
gulp build
npm install -g pm2
pm2 start app.js -i 1 --watch
pm2 startup
pm2 save
