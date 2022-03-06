import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

export const getKafkaConfig = (configService: ConfigService): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: configService.get('KAFKA_BROKERS')?.split(','),
      clientId: 'notification',
    },
    consumer: {
      groupId: 'notification-consumer',
    },
  },
});
