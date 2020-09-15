# nodejs-mentoring

#### 1. To create new USER use:
```
POST: localhost:3700/user
```
```
BODY: {
    login: "Anna",
    password: "1aB123",
    age: "15"
}
```

#### 2. To update existing USER use:
```
PUT: localhost:3700/user/:id
```
````
BODY: {
    login: 'Denis'
}
````
#### 3. To delete existing USER use:
```
DELETE: localhost:3700/user/:id
```
#### 4. To get existing USER use:
```
GET: localhost:3700/user/:id
```
#### 5. To get auto-suggest list from limit users, sorted by login property and filtered by loginSubstring in the login property:
```
GET: localhost:3700/user?limit=10&substring=re
```