import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Creating a microservice instance with the AppModule
  const app = await NestFactory.createMicroservice(AppModule, {
    // Setting the transport layer to RabbitMQ
    transport: Transport.RMQ,
    options: {
      // URL of the RabbitMQ server
      urls: [
        'amqps://jdhgzqai:R2dwAUk-WOnJ8jhCRaNvza0_uOWLH5ZW@toad.rmq.cloudamqp.com/jdhgzqai',
      ],
      // Queue name which the microservice will listen to
      queue: 'main_queue',
      // Queue options configuration
      queueOptions: {
        durable: false, // Setting the queue to non-durable (will not survive a broker restart)
      },
    },
  });

  // Start listening for messages
  await app.listen();

  // Log to indicate the microservice is up and running
  console.log(`🚀 Microservice app is listening`);
}

// Calling the bootstrap function to start the application
bootstrap();
