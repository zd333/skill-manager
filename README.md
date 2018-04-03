# Dev Skill Manager

## Technologies stack

* AngularJS 2
* NodeJS/Express
* MongoDB/Mongoose
* Docker/Docker Compose

## Development environment

Be sure to have node (^7.6.0), npm (^4.1.2), docker and docker-compose installed.

Run `docker-compose up` to launch the project in dev mode.
SPA is available under [http://localhost:4200](http://localhost:4200)
API is available under [http://localhost:3042](http://localhost:3042)

Please note, when you update package.json (as well as other files outside src folders, e.g. .angular-cli.json) in host system - the changes are not automatically reflected in containers (this is true for both back-end and spa apps).
Use next commands to update npm packages in SPA/back-end container (use your actual container names):

* `docker cp spa/package.json skdsm_spa_1:/spa-dist/` / `docker cp backend/package.json skdsm_express_1:/backend-dist/`
* `docker exec skdsm_spa_1 npm install` / `docker exec skdsm_express_1 npm install`

### Developing SPA

TODO: add yarn to SPA
If you have angular-cli globally installed - then be sure to check that your version is 1.0.0-rc.2.
If you have another version of globally installed angular - then remove it with next commands:

* `npm uninstall -g angular-cli`
* `npm uninstall -g @angular/cli`
* `hash -r`

Install required version of angular-cli `npm install -g @angular/cli@1.0.0-rc.2`.

If you want your IDE to resolve imports - then you have to install node modules in your host system. Run `cd spa`, `npm install` in host system.

To serve SPA in dev/prod mode run `ng serve`/`ng serve --environment prod`.
To lint SPA run `ng lint`

## Deploy

### SPA

All production-specific settings are defined in spa/environments/environments.prod.ts
Run `ng build --environment prod` to build SPA. Result artifacts will be stored in the `dist/` directory.

### Back-end API app

If the values of `SKDSM_PORT`, `SKDSM_MONGO_CONN`, `SKDSM_GOOGLE_CLIENT_SECRET` environment variables are not defined - then dev values are used. Use this commands ro run back-end app (set actual value for Mongo connection string and Google client secret):

1. `export SKDSM_PORT=8080 SKDSM_MONGO_CONN=mongodb://<mongo_host>:<mongo_port>/skdsmdb SKDSM_GOOGLE_CLIENT_SECRET=<secret_from_google_console>`
1. `cd backend/src`
1. `node app.js`


### Creating the very first admin (required after first deploy when DB is empty)

1. Login with admin credentials to the app (to have user instance stored in db)
1. Connect to mongo machine (for Docker container exec `docker exec -it mongo_container_name bash`)
1. Execute `mongo`
1. Execute `use skdsmdb`
1. Execute `db.users.update({email: 'email@steelkiwi.com'}, {$set: {permissions: ['admin']}})`

