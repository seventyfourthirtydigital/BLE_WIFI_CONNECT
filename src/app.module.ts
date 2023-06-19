import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WifiService } from './wifi.service';

@Module({
 // imports: [],
  //controllers: [AppController],
  providers: [AppService,WifiService],
})
export class AppModule {}
