# Ionic

- установить расширение в vscode: Ionic: Official extension for Ionic and Capacitor development

- npm install -g @ionic/cli
- ionic start myApp blank --type=angular
- cd myApp
- ionic cap add android

- ionic cap open android (если надо открыть в AS)

- ionic cap run android (запуск через capacitor cli) (--target=192.168.1.2:5555  --no-sync)

# Работа с внешним эмулятором

C:\Users\prep\AppData\Local\Android\Sdk\emulator

./emulator -list-avds

./emulator -avd <имя_вашего_эмулятора>

Найдите исполняемый файл emulator.exe в папке emulator внутри Android SDK.

Создайте ярлык на рабочем столе и добавьте в свойства ярлыка параметр -avd <имя_вашего_эмулятора>.

## Добавление пути к Android Sdk

- создать в папке android фалй local.properties

```
sdk.dir=C:\\Users\\asv\\AppData\\Local\\Android\\Sdk
```

## Горячая перезагрузка

- ionic serve --no-open --host=0.0.0.0 --port=8100 --configuration=production

**Замечание**: открытие удобного предварительного просмотра в vs code работает только при запуске Web через плагин

**Замечание**: можно собрать приложеине на устройство только первый раз. Потом отладку вести чере web. Изменения автоматически будут синхронизироваться
