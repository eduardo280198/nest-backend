import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import * as bcrypjs from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from "./entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloads } from "./interfaces/jwt-payloads";
import { LoginResponse } from "./interfaces/login-response";
import { RegisterDto } from "./dto/register.dto";


@Injectable()
export class AuthService {

  constructor(

    @InjectModel( User.name )
    private userModel : Model<User>,

    private jwtService : JwtService

  ) {}

  async create(createUserDto: CreateUserDto) : Promise<User> {

    try{

      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({

        // 1.- Encriptar la contraseña
        password: bcrypjs.hashSync( password, 12 ),

        ...userData
      });

      await newUser.save();
      const { password:_, ...user } = newUser.toJSON();

      // 2.- Guardar el usuario

      return user;

    }catch (error){

      if(error.code === 11000){
        throw new BadRequestException(`${ createUserDto.email } ya existe`);
      }
      throw new InternalServerErrorException('Algo muh malo paso!');
    }

  }

  async register ( registerDto : RegisterDto) : Promise <LoginResponse> {

    const user = await this.create( registerDto );

    return {

      user  : user,
      token : this.getToken({ id: user._id })
    }

  }

  async login( loginDto : LoginDto ) : Promise <LoginResponse>{

    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email } );

    if ( !user ) {

      throw new UnauthorizedException('Credenciales no validas - email');
    }

    if ( !bcrypjs.compareSync( password, user.password) ) {

      throw new UnauthorizedException( 'Credenciales no validas - password');
    }

    const { password: _, ...rest } = user.toJSON();

    return {
      // ...rest,
      // token: 'xd.xd.xd'
      user: rest,
      token: this.getToken({ id: user.id })
    }

  }

  findAll() : Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById( id : string ){

    const user = await this.userModel.findById( id );

    const {password : _, ...rest} = user.toJSON();
    return rest;

  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getToken( payloads : JwtPayloads){

    const token = this.jwtService.sign(payloads);
    return token;

  }
}
