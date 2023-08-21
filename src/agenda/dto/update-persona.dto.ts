import { IsString } from "class-validator";

export class UpdatePersonaDto {

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