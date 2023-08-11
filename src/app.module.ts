import { Module } from '@nestjs/common';

import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Habilita el uso de las variables de entorno(? hay que instalar la libreria correspondiente

    MongooseModule.forRoot(process.env.MONGO_URI), // Se conecta a la base de datos de mongoDb, proporcionandole la ip. Se debe de instalar la libreria correspondiente

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
