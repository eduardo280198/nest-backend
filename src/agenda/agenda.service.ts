import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Persona } from "./entities/persona.entity";
import { CreatePersonaDto } from "./dto/create-persona.dto";
import { UpdatePersonaDto } from "./dto/update-persona.dto";


@Injectable()
export class AgendaService {

  constructor(
    @InjectModel( Persona.name )
    private personaModel : Model<Persona>,
  ) {}

  async addPersona (createPersonaDto : CreatePersonaDto ): Promise<Persona>{

    try {

      const {...personaData} = createPersonaDto

      const newPersona = new this.personaModel( {
        ...personaData
      } );

      await newPersona.save();

      const {...persona} = newPersona.toJSON();

      return persona;

    }catch (error) {

      throw new InternalServerErrorException( 'Algo muh malo ah pasao' );

    }

  }

  async getPersonaById( id : string ) {
    const personas = await this.personaModel.findById( id );

    const { ...persona} = personas.toJSON();

    return persona;
  }

  async remove ( id : string ) {

    try{

      return await this.personaModel.findByIdAndDelete(id);
    }catch (e) {

      throw new InternalServerErrorException( e,  'No se logro eliminar' );

    }
  }

  async update ( id : string, personaActualizada : UpdatePersonaDto )  {

    const updatePersona = await this.personaModel.findByIdAndUpdate(id, personaActualizada, { new : true});
    return updatePersona;

  }

  findAll() : Promise<Persona[]> {
    return this.personaModel.find();
  }
}