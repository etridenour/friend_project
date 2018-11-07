db = require('./models')

db.users.create(
  {
    firstName: 'james',
    lastName: 'sewell',
    email: 'james@james.com',
    password: 'password',
    secretpin: '1234'

  }
)
db.users.create(
  {
    firstName: 'bob',
    lastName: 'sanders',
    email: 'bob@bob.com',
    password: 'password',
    secretpin: '3456'

  }
)

db.users.create(
  {
    firstName: 'sabrina',
    lastName: 'clarington',
    email: 'sabrina@sabrina.com',
    password: 'password',
    secretpin: '5783'

  }
)

db.users.create(
  {
    firstName: 'todd',
    lastName: 'jenkins',
    email: 'todd@todd.com',
    password: 'password',
    secretpin: '4535'

  }
)