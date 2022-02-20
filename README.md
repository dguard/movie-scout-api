<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
  
<p align="center">IMDB API for movie-scout</p>

## Description

[DEMO](http://ec2-3-129-72-17.us-east-2.compute.amazonaws.com:8888/movies?title=the%20lord)


| Service         | Repo                                                 |
|-----------------|------------------------------------------------------|
| React Native 📦 | [movie-scout](https://github.com/dguard/movie-scout) |
| API 🐍          | [movie-scout-api] (you are inside)                   |

## How this looks
<p align="left">
  <img src="/captures/console.png" alt="screenshot" />
</p>
<p align="left">
  <img src="/captures/api-json.png" alt="screenshot" />
</p>


## Installation

```bash
$ yarn
```

## Prepare (runs after yarn)
```
$ npm run prepare
```

## Env
```
$ cp .env-sample .env
```
And fill out the .env file, eg.:
```
PORT=8888
ROOT_DIR=/var/www/movie-scout-api
BASE_URL=http://localhost:8888
```
## Running the app

```bash
# dev
$ yarn run dev
```

## Up Systemd Service (ubuntu only)
```
$ npm run up-service
```

### Remove Systemd Service (ubuntu only)
```
$ npm run remove-service
```
## Stay in touch

- Contributor: [Alexander Serditov](https://cv.digitallyconstructed.ru/)

## License

[MIT licensed](LICENSE).
