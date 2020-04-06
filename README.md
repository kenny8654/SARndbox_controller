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

## Enable to change color mode
Add `ColorMapMode/` in `~/src/SARndbox-2.7/etc/SARndbox-2.7`
- Add `map.txt` in `ColorMapMode/`
```
mode1,mode2,mode3,mode4,mode5
```
- Add `HeightColorMap1.cpt` ... `HeightColorMap5.cpt` in in `ColorMapMode/`
```
-40.0    0   0  80
-30.0    0  30 100
-20.0    0  50 102
-12.5   19 108 160
 -0.75  24 140 205
 -0.25 135 206 250
 -0.05 176 226 255
  0.0    0  97  71
  0.25  16 122  47
  2.5  232 215 125
  6.0  161  67   0
  9.0  130  30  30
 14.0  161 161 161
 20.0  206 206 206
 25.0  255 255 255
```
