import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import * as HttpStatus from 'http-status-codes';
import movieEntity from '../models/movie.entity';
import { Movie } from '../models/types';

const routerOpts: Router.IRouterOptions = {
  prefix: '/movies',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx:Koa.Context) => {
  // Get the movie repository from TypeORM.
  const movieRepo:Repository<movieEntity> = getRepository(movieEntity);

  // Find the requested movie.
  const movies = await movieRepo.find();

  // Respond with our movie data.
  ctx.body = {
    data: { movies },
  };
});

router.get('/:movie_id', async (ctx:Koa.Context) => {
  // Get the movie repository from TypeORM.
  const movieRepo:Repository<movieEntity> = getRepository(movieEntity);

  // Find the requested movie.
  const movie = await movieRepo.findOne(ctx.params.movie_id);

  // If the movie doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!movie) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Respond with our movie data.
  ctx.body = {
    data: { movie },
  };
});

router.post('/', async (ctx:Koa.Context) => {
  // Get the movie repository from TypeORM.
  const movieRepo:Repository<movieEntity> = getRepository(movieEntity);

  const {body}=ctx.request
  const movie: Movie = {
    name: body.name,
    releaseYear: body.releaseYear,
    rating: body.rating
  }

  // Create our new movie.
  const movieParams: movieEntity = movieRepo.create(movie);

  // Persist it to the database.
  await movieRepo.save(movieParams);

  // Set the status to 201.

  // Respond with our movie data.ctx.status = HttpStatus.CREATED;
  ctx.body = {
    data: { movie },
  };
});

router.delete('/:movie_id', async (ctx:Koa.Context) => {
  // Get the movie repository from TypeORM.
  const movieRepo:Repository<movieEntity> = getRepository(movieEntity);

  // Find the requested movie.
  const movie = await movieRepo.findOne(ctx.params.movie_id);

  // If the movie doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!movie) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Delete our movie.
  await movieRepo.delete(movie);

  // Respond with no data, but make sure we have a 204 response code.
  ctx.status = HttpStatus.NO_CONTENT;
});

router.patch('/:movie_id', async (ctx:Koa.Context) => {
  // Get the movie repository from TypeORM.
  const movieRepo:Repository<movieEntity> = getRepository(movieEntity);

  // Find the requested movie.
  const movie:movieEntity = await movieRepo.findOne(ctx.params.movie_id);

  // If the movie doesn't exist, then throw a 404.
  // This will be handled upstream by our custom error middleware.
  if (!movie) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  // Merge the existing movie with the new data.
  // This allows for really simple partial (PATCH).
  const updatedMovie = await movieRepo.merge(movie, ctx.request.body);

  // Save the new data.
  movieRepo.save(updatedMovie);


  // Respond with our movie data.// Response with the updated content.
  ctx.body = {
    data: { movie: updatedMovie },
  };
});

export default router;