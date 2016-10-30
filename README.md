# Get started

```shell
$ git clone https://github.com/goramm/node-rest.git
$ cd node-rest
$ npm install
$ gulp
$ http://localhost:8000/api/books
$ gulp test
```


# Mongo import data

```shell
mongoimport --db bookAPI --collection books --drop --file books-dataset.json --jsonArray
```