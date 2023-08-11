import { User, UserSchema } from "./entities/user.entity";
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { MongooseModule } from "@nestjs/mongoose";

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [

    ConfigModule.forRoot(),

    // Se conecta la entidad/modelo que se creo previamente a la base de datos
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '1h'}
    })
  ]
})
export class AuthModule {}
