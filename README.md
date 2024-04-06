## Instruction to run app

1. `$ cp .env.example .env`
2. Inside .env file write `your_api_key` from https://home.openweathermap.org/api_keys
3. `$ docker compose build`
4. `$ docker compose up` - first time wait for postgres loading

# Swagger

http://localhost:4401/weather-api

# Tests

`$ npm run test` - done
