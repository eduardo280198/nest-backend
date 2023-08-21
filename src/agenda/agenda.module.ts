import { Module } from '@nestjs/common';
import { AgendaController } from './agenda.controller';
import { AgendaService } from "./agenda.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Persona, PersonaSchema } from "./entities/persona.entity";


@Module({
  controllers: [AgendaController],
  providers: [AgendaService],
  imports: [

    ConfigModule.forRoot(),

    MongooseModule.forFeature([
      {
        name: Persona.name,
        schema: PersonaSchema
      }
    ]),

  ]
})
export class AgendaModule {}
