module.exports = {
  "type": "sqlite",
  "database": "./src/database/database.sqlite",
  "migrations": [
    "./dist/database/migrations/*.js"
  ],
  "entities": [
    "./dist/models/*.js"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}