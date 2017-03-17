# Steel Kiwi Dev Skill Manager

## Technologies stack

* AngularJS 2
* NodeJS Express
* MongoDB
* Docker Compose

## Development environment

1. Be sure to have node (^7.6.0), npm (^4.1.2), docker and docker-compose installed
1. Run `docker-compose up`
1. SPA is available under [http://localhost:4200](http://localhost:4200)
1. API is available under [http://localhost:3042](http://localhost:3042)

## Developing SPA

1. If you have angular-cli globally installed - then be sure to check that your version is 1.0.0-rc.2
1. If you have another version of globally installed angular - then remove it with next commands: `npm uninstall -g angular-cli`, `npm uninstall -g @angular/cli`, `hash -r`
1. Install required version of angular-cli `npm install -g @angular/cli@1.0.0-rc.2`
1. Run `cd spa`, `npm install`

## Adding admin permission after first deploy

1. Login with admin credentials to the app (to have user instance stored in db)
1. Connect to mongo machine (for Docker container exec `docker exec -it mongo_container_name bash`)
1. Execute `mongo`
1. Execute `use skdsmdb`
1. Execute `db.users.update({email: 'email@steelkiwi.com'}, {$set: {permissions: ['admin']}})`

