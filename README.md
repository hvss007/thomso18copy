# Thomso'18
- Clone the Repository
-  Install MongoDb [https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04]
-  Create Role 
```sh 
db.createRole({ createRole: <Role Name>, privileges: [ {
  resource: { db: <Databae Name>, collection: "" },
  actions: [ "find","insert","update","createIndex","createCollection","remove" ]}
], roles: [{ role: "read", db: <Databae Name>}] })
```
- Create User
```sh
- db.createUser({"user" : <User name>,pwd: <Password>, "roles" : [{"role" : <Role Name Created>, "db" : <Databae Name>}]})

```
- Make a new file named .env and copy the text from .env.sample to it. Fill the credentials of the database.

- Run Following Commands
```sh
-  Run npm install
-  Run npm start
-  Run npm run serve(for http) or npm run https(for https)
```