import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getKafkaConfig } from './configs/kafka.config';
import compression from 'fastify-compress';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyHelmet from 'fastify-helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );
  await app.register(fastifyHelmet);
  // Only use gzip because brotli is quite slow, needs more performance benchmark
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>(getKafkaConfig(configService));
  await app.startAllMicroservices();
}
bootstrap();
