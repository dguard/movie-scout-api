import { MovieService } from "./movie.service";
import { Request } from "express";
import { Controller, Get, Req } from "@nestjs/common";

@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
  ) {}

  @Get()
  async getAllExchangeRate(@Req() request: Request): Promise<any> {
    const title = request.query.title as any
    if(!title) return {}

   return this.movieService.findAll(title)
  }

}
