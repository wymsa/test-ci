import 'dotenv/config';

import fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import { DatabaseService } from './services/database';
import { config } from './common/config';
import { ShortenerRepository } from './repositories/shortener';
import { ShortenerService } from './services/shortener';
import { shortenerRoutes } from './routes/shortener';

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  }
});

const { DATABASE_URL } = config;

async function main() {
  try {
    const databaseService = new DatabaseService(DATABASE_URL);
    await databaseService.connect();

    const shortenerRepository = new ShortenerRepository(databaseService.database);
    const shortenerService = new ShortenerService(shortenerRepository);

    server.register(shortenerRoutes(shortenerService), { prefix: '/shortener' });

    server.get('/', (request: FastifyRequest, reply: FastifyReply) => {
      return reply.status(200).send('OK');
    });

    await server.listen({ port: 3000 });
  } catch (error) {
    server.log.error(error, 'Server Error');
  }
}

main();
