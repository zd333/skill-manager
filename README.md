# Steel Kiwi Dev Skill Manager

## Technologies stack

* AngularJS 2
* NodeJS Express
* MongoDB
* Docker Compose

## Setting first admin

1. Login with admin credentials to the app (to have user instance stored in db)
1. Connect to mongo machine (for Docker container exec `docker exec -it mongo_container_name bash`)
1. Execute `mongo`
1. Execute `use skdsmdb`
1. Execute `db.users.update({email: 'email@steelkiwi.com'}, {$set: {permissions: ['admin']}})`

