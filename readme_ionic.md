# Ionic

- установить расширение в vscode: Ionic: Official extension for Ionic and Capacitor development

- npm install -g @ionic/cli
- ionic start myApp blank --type=angular
- cd myApp
- ionic cap add android

- ionic cap open android (если надо откурыть в AS)

- ionic cap run android (запуск черезе capacitor cli) (--target=192.168.1.2:5555  --no-sync)

## Добавление пути к Android Sdk

- создать в папке android фалй local.properties

```
sdk.dir=C:\\Users\\asv\\AppData\\Local\\Android\\Sdk
```

## Горячая перезагрузка

- ionic serve --no-open --host=0.0.0.0 --port=8100 --configuration=production

**Замечание**: открытие удобного предварительного просмотра в vs code работает только при запуске Web через плагин

**Замечание**: можно собрать приложеине на устройство только первый раз. Потом отладку вести чере web. Изменения автоматически будут синхронизироваться
