import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { Student } from "src/students/student.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type:'postgres',
    host: 'localhost',  //postgresdb
    port: 5432,
    username:'postgres',
    password:'123456',
    database:'studentmanagment',
    entities: [Student],
    synchronize: true
}