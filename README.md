# Avito test job

&nbsp;
## Задание

[Текст задания](./README_avito.md).  
[Оригинал](https://github.com/avito-tech/sx-frontend-trainee-assignment).

Задание выполнено на React и на Angular, а также на Vue (но в [отдельном репозитории](https://github.com/1ike/test-task-avito-vue)).

**Примечания:** 
 - Подгрузка вложенных комментариев по клику на корневые не сделана, т.к. для счетчика комментариев (всех, а не только корневых), надо все равно грузить все комментарии. Поэтому загружаются все, но отображаются только корневые, вложенные отображаются по клику на корневые. Возможно, на Vue сделаю наоборот - счетчик только для корневых, подгрузка по кликам на корневые.
 - На домашней странице грузятся все 100 новостей (на React), но отображаются 10 (настраивается переменными окружения), клик на кнопку "Show more" только лишь отображает дополнительные 10 новостей, подгрузкой не занимается. Это и не требовалось по условиям задания, возможные варианты реализаций оставил на другие фреймворки. Например, на Angular при клике каждый раз подгружается с обновлением списка все кол-во новостей, требуемое для отображения на текущий момент.
 - В целях изучения возможностей Redux Toolkit загрузка новостей и комментариев сделана разными способами - с помощью RTK Query и create(AsyncThunk/EntityAdapter/Slice) соответственно.  

 Добавлен бекенд на NestJS. Это сделано не для улучшения API, а для пробы NestJS, и API просто дублируется (единственное улучшение - ограничение кол-ва загружаемых новостей и их валидация с последующей фильтрацией). Вторая причина неизменности API - желание проверить Angular и Vue в тех же условиях, что и React. T.e. все варианты фронта могут работать без бекенда.

&nbsp;

## Демо

[https://1ike.github.io/test-task-avito/](https://1ike.github.io/test-task-avito/) &nbsp; (react).  

\* Для [нормальной работы с GitHub Pages](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing) была изменена стратегия маршрутизации в react-router-dom на hashHistory.

&nbsp;

## Использование

### Установите зависимости:

`yarn install`

&nbsp;

### React:

Для сборки скрипта введите

`yarn workspace @test-task-avito/react build`

Для разработки или оценки результата ([на живой странице](http://localhost:3000/)) введите

`yarn workspace @test-task-avito/react start`

&nbsp;

Для React также доступно развертывание приложения с использованием docker:

`docker-compose up -d --build`

После запуска контейнера с помощью этой команды откройте в браузере url [http://localhost:3001/](http://localhost:3001/)  


&nbsp;

### NestJS:

Для сборки скрипта введите

`yarn workspace @test-task-avito/nest build`
&nbsp;

Для разработки введите

`yarn workspace @test-task-avito/nest start:dev`

&nbsp;

### Angular:

Для сборки скрипта введите

`yarn workspace @test-task-avito/angular build`

Для оценки [результата](http://localhost:4200/) введите

`yarn workspace @test-task-avito/angular start`

Для разработки ([на живой странице](http://localhost:4200/)) введите

`yarn workspace @test-task-avito/angular watch`