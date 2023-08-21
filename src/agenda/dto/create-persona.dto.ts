import { IsString } from "class-validator";


export class CreatePersonaDto {

  @IsString()
  name      : string;

  @IsString()
  lastName  : string;

  @IsString()
  cellPhone : string;

  @IsString()
  email    ?: string;

  @IsString()
  address   : string;


}