# Sqlite API Challenge

## ORM Choice

This API was written with sequelize vs the sqlite3 ORM to reduce the usage of written SQL in the API. Doing so was done to maintain readability and usability. 

## Folder structure

The API was written to have a model controller structure with additional helper functions being used for input validation. The input validation mainly uses boolean expressions and one 3rd party package `email-validator` which is lightweight.

## Routes

Routes were divided into 3 primary routes. 

1) `GET` `/request` this will retrieve the book of specified ID. If none is provided, it will return all requested books

2) `POST` `/request` this will make a post request to the API to reserve the specified book. If it is unavailable, it will relay that to the user.

3) `DELETE` `/request` this will remove any current book request.