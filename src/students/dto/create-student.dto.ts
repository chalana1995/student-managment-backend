import {IsNotEmpty} from 'class-validator';

export class CreateStudentDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    dateofbirth: string;

    @IsNotEmpty()
    email: string;

    age: number;
}