import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Persona {

  // Es creado de forma automatica por Mongo
  // PD: Viva Mongo sisisi
  _id      ?: string;

  @Prop( { required: true } )
  name      : string;

  @Prop( { required: true } )
  lastName  : string;


  @Prop( { required: true } )
  cellPhone : string;

  @Prop( { required: true } )
  email     : string;

  @Prop( { required: true } )
  address    : string;
}

export const PersonaSchema = SchemaFactory.createForClass( Persona );