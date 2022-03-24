# medical-ws

First service Patient (doctolib) by Ihcen Borgi available:

[brg-ib](https://github.com/brg-ib/doctolib_app)

In order to start the application, run the following command:

``` npm run dev ```

Navigate to [localhost:5000] in the browser to view the application


After running the application you should be able to navigate to the following route [localhost:5000/doctors]

For connect to mongoDB

create a ```.env``` file and add the ```MONGO_URI``` variable

for example : 

[MONGO_URI=mongodb://<username>:<password>@cluster0-shard-00-00.wq4ds.mongodb.net:27017,cluster0-shard-00-01.wq4ds.mongodb.net:27017,cluster0-shard-00-02.wq4ds.mongodb.net:27017/medical-ws?ssl=true&replicaSet=atlas-oh9j0s-shard-0&authSource=admin&retryWrites=true&w=majority]

[replace : <username> and <password> by your username and password]


