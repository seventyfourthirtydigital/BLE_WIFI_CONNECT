import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const appModule = await NestFactory.createApplicationContext(AppModule);
  const app = appModule.get(AppService);
  //await app.listen(3000);
  app.run();

}
bootstrap();
