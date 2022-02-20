import {ExchangeRateService} from "./exchange-rate.service";
import { Request, Response } from "express";
import {Controller, Get, Post, Body, ValidationPipe, Res, Req, UseGuards} from "@nestjs/common";
const fs = require('fs');
const dotenv = require('dotenv')
dotenv.config()

const BASE_URL = 'http://ec2-3-129-72-17.us-east-2.compute.amazonaws.com:8888'
function fs_readFile(filename) {
  return new Promise((resolve, reject) => {
    return fs.readFile(filename, 'utf-8', (err, content) => {
      if(err) return reject(err)

      return resolve(content.toString())
    })
  })
}
async function retrieveMoviesFromFile(title, chosenYear) {
    const fileContent: string = (await fs_readFile(`${process.env.ROOT_DIR}/movie-metadata/${chosenYear}.txt`) as string)

    let newContent = fileContent
    let titleFound = newContent.toLowerCase().indexOf(`"title" : "${title}`)
    const foundMovies = []

    while(titleFound !== -1) {
      let movie
      const movieStartsAt = newContent.toLowerCase().slice(0, titleFound).lastIndexOf('{')
      const movieEndsAt = newContent.toLowerCase().slice(titleFound).indexOf('}')
      movie = newContent.slice(movieStartsAt, titleFound + movieEndsAt + 1)
      const movieObj = JSON.parse(movie.replace(/"_id".*?\n/, ""))
      movieObj["Poster"] = `${BASE_URL}/public/${chosenYear}/${movieObj['imdbID']}.jpg`
      foundMovies.push(movieObj)

      if(movieStartsAt - 1 > 0) {
        newContent = newContent.slice(0, movieStartsAt-1) + newContent.slice(titleFound + movieEndsAt+1)
      } else {
        newContent = newContent.slice(titleFound + movieEndsAt+1)
      }
      titleFound = newContent.toLowerCase().indexOf(`"title" : "${title}`)
    }
   return foundMovies
}

@Controller('movies')
export class ExchangeRateController {
  constructor(
    private readonly exchangeRateService: ExchangeRateService,
  ) {}

  @Get()
  async getAllExchangeRate(@Req() request: Request): Promise<any> {
    const title = request.query.title as any
    console.log(title)
    if(!title) return {}

   const years = Array.from(Array(2015+1)).slice(1980).map((_, index) => { return 1980+index})
   const foundMovies = [Promise.resolve([]) as any].concat(years).reduce((prev, chosenYear) => {
      return new Promise((resolve, reject) => {
        prev.then((initial) => {
          retrieveMoviesFromFile(title, chosenYear).then((res) => {
            console.log(chosenYear, initial.length)
            resolve(initial.concat(res))
          })
        })
      } )
    })
    console.log(foundMovies.length)

    return foundMovies
  }

}
