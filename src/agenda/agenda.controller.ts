import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AgendaService } from "./agenda.service";
import { CreatePersonaDto } from "./dto/create-persona.dto";
import { Persona } from "./entities/persona.entity";
import { UpdatePersonaDto } from "./dto/update-persona.dto";

@Controller('agenda')
export class AgendaController {

  constructor( private readonly agendaService : AgendaService ) {}

  @Post('/agregar')
  addPersona( @Body() createPersonaDto : CreatePersonaDto ){

    return this.agendaService.addPersona( createPersonaDto );
  }

  @Delete(':id')
  delete( @Param('id') id : string ){


    return this.agendaService.remove( id );
  }

  @Patch(':id')
  update(@Param('id') id : string,
         @Body() personaActualizada : UpdatePersonaDto
        ) : Promise<Persona | null> {

    return this.agendaService.update( id, personaActualizada);
  }

  @Get(`:id`)
  findById ( @Param('id') id: string ){

    return this.agendaService.getPersonaById( id );
  }

  @Get()
  findAll( @Request() req : Request ) {

    return this.agendaService.findAll();
  }
}
