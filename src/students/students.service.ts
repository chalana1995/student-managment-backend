import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import {CreateResDto} from './dto/res-call.dto';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';
//import readXlsxFile from 'read-excel-file';



const schema = {
    'name': {
        prop: 'name',
        type: String
    },
    'dateofbirth': {
        prop: 'dateofbirth',
        type: Date
    },
    'email': {
        prop: 'email',
        type: String
    }
}

@Injectable()
export class StudentsService {


    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>
    ) { }

    readXlsxFile = require('read-excel-file/node');

    async getStudentById(id: number): Promise<Student> {
        const found = await this.studentRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Student with This "{$id}" not found`);
        }
        return found;
    }

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
        const { name, dateofbirth, email, age } = createStudentDto;

        const student = new Student();
        student.name = createStudentDto.name;
        student.dateofbirth = createStudentDto.dateofbirth;
        student.email = createStudentDto.email;
        student.age = this.getYears(createStudentDto.dateofbirth);

        await student.save();
        return student;
    }

    async readObj(callResDto: CreateResDto){
        console.log("++++++res++++++",callResDto);
    }

    async deleteStudent(id: number): Promise<void> {
        const result = await this.studentRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Student with This "{$id}" not found`);
        }
    }

    async updateStudent(id: number, createStudentDto: CreateStudentDto): Promise<Student> {
        const task = await this.getStudentById(id);
        task.name = createStudentDto.name;
        task.dateofbirth = createStudentDto.dateofbirth;
        task.email = createStudentDto.email;
        task.age = this.getYears(createStudentDto.dateofbirth);

        task.save();

        return task;
    }

    async getStudents(page) {
        return await this.studentRepository.find({
            // take: 5,
            // skip: 5 * (page -1),
            take: page.take,
            skip: page.skip
        })  
    }

    async getCountofStudent() {
        return await this.studentRepository.count();
    }
    

    async uplaodFileUpload(fileName: string) {
        

        this.readXlsxFile('./uploads/' + fileName, { schema }).then(({ rows, errors }) => {
            rows.forEach(key => {
                const student = new Student();
                //  console.log(" key name =====",key.name);
                student.name = key.name;
                student.dateofbirth = key.dateofbirth;
                student.email = key.email;
                student.age = this.getYears(key.dateofbirth);

                student.save();
            });
        });
    }



    getYears(birthday: string) {
        let years = new Date().getFullYear() - new Date(birthday).getFullYear();
        let month = new Date().getMonth() - new Date(birthday).getMonth();
        let dateDiff = new Date().getDay() - new Date(birthday).getDay();
        if (dateDiff < 0) {
            month -= 1;
        }
        if (month < 0) {
            years -= 1;
        }
        return years;
    }
}
