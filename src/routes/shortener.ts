import { FastifyInstance } from 'fastify';
import { ShortenerService } from '../services/shortener';
import { ShortenerController } from '../controllers/shortener';

export function shortenerRoutes(service: ShortenerService) {
  const controller = new ShortenerController(service);

  return function (fastify: FastifyInstance) {
    fastify.post('/', controller.create.bind(controller));
    fastify.get('/', controller.getAll.bind(controller));
  };
}
