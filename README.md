# Oklahoma City Jail Blotter Processor

## Local development

### Install
Requirements:
- Node 12+
- Docker

On MacOS, it is recommended to install Node using Homebrew:
```sh
brew install node
```

Clone the repo, then run
```sh
npm install
```

This project uses [StandardJS](https://standardjs.com/). Please make sure your files are correctly linted before pushing.

### Running the tests
```sh
# npm run download-fixtures
npm test

# Optional, to run more extensive tests:
# npm run download-fixtures all
# Then run `npm test` as usual
```

### Running the app
Start the server.
```sh
docker-compose up
docker exec sqlserver /opt/mssql-tools/bin/sqlcmd -U sa -P Password@123 -Q "create database temp"
AUTH_TOKEN=abc PORT=8080 npm start
```
Run the job.
```sh
curl -X POST -d '{"token":"abc"}' localhost:8080/run
```
To shut down the DB and remove all local DB data, run `docker-compose down`.

### Manually parsing a single PDF
As usual make sure the DB is running (`docker-compose up`).
```sh
npm run migrate
node src/index.js test/fixtures/some_specific_file.pdf
```
Then inspect `tokens.txt` and `parsed.json`

To update the test data for that file:
```sh
node src/index.js test/fixtures/some_specific_file.pdf update
```
To save that file to the database:
```sh
node src/index.js test/fixtures/some_specific_file.pdf save
```

### Inspecting the DB
As usual make sure the DB is running (`docker-compose up`).
```sh
npm run psql
```
If you do not have `psql` you can install it by running: `brew install postgresql`.

### DB changes
1. Create a new migration file, the migration file's name must match the pattern and have the current date and time.
2. Make changes to the database structures in the migration file.
3. Update the model files.
4. Verify that it works: `docker-compose down && docker-compose up`, then `npm start`.
5. Finally but most importantly: have someone knowledgeable review your changes.

### Deploying to production

Due to the low frequency of changes, this process is not fully automated.
1. Test all changes locally
2. Commit and push the changes
3. Run `./scripts/push.sh`
4. Still in the Google Cloud Console, go to Cloud Run, jail-blotter-processor, click Deploy New Revision, use the Select button to pick the latest image.
5. At the bottom of the page, click Deploy
