# SARndbox_controller

Control sandbox with web

## Download first
sudo apt-get install libxtst-dev libpng++-dev

cd semantic/

npx gulp build

## Automatic start up after boot
npm install -g pm2

pm2 start app.js -i 1 --watch

pm2 startup

pm2 save

## Enable to shutdown/rebbot by non-root users
### Method1
sudo chmod u+s /sbin/reboot

sudo chmod u+s /sbin/shutdown
### Method2
sudo vi /etc/sudoers
```
user hostname=NOPASSWD: /sbin/shutdown -h now
user hostname=NOPASSWD: /sbin/reboot
```

