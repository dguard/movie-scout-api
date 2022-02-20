import { Injectable } from '@nestjs/common';
const fs = require("fs");

const dotenv = require('dotenv')
dotenv.config()

@Injectable()
export class MovieService {

  constructor() {}

  fs_readFile(filename) {
    return new Promise((resolve, reject) => {
      return fs.readFile(filename, 'utf-8', (err, content) => {
        if(err) return reject(err)

        return resolve(content.toString())
      })
    })
  }
  async retrieveMoviesFromFile(title, chosenYear) {
    let newContent = (await this.fs_readFile(`${process.env.ROOT_DIR}/movie-metadata/${chosenYear}.txt`) as string)
    let titleFound = newContent.toLowerCase().indexOf(`"title" : "${title}`)
    const foundMovies = []

    while(titleFound !== -1) {
      let movie
      const movieStartsAt = newContent.toLowerCase().slice(0, titleFound).lastIndexOf('{')
      const movieEndsAt = newContent.toLowerCase().slice(titleFound).indexOf('}')
      movie = newContent.slice(movieStartsAt, titleFound + movieEndsAt + 1)
      const movieObj = JSON.parse(movie.replace(/"_id".*?\n/, ""))
      movieObj["Poster"] = `${process.env.BASE_URL}/public/${chosenYear}/${movieObj['imdbID']}.jpg`
      foundMovies.push(movieObj)

      newContent = newContent.slice(titleFound + movieEndsAt+1)
      titleFound = newContent.toLowerCase().indexOf(`"title" : "${title}`)
    }
    return foundMovies
  }

  findAll(title) {
    const years = Array.from(Array(2015+1)).slice(1980).map((_, index) => { return 1980+index})
    return [Promise.resolve([]) as any].concat(years).reduce((prev, chosenYear) => {
      return new Promise((resolve, reject) => {
        prev.then((initial) => {
          this.retrieveMoviesFromFile(title, chosenYear).then((res) => {
            resolve(initial.concat(res))
          })
        })
      } )
    })
  }

}
