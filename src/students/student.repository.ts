import { EntityRepository, Repository } from "typeorm";
import { CreateStudentDto } from "./dto/create-student.dto";
import { Student } from "./student.entity";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {

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

    async getStudents(createStudentDto: CreateStudentDto): Promise<Student[]> {
        const { name, dateofbirth, email, age } = createStudentDto;
        const query = this.createQueryBuilder('student');

        const tasks = await query.getMany();
        return tasks;
    }

    getYears(birthday : string) {
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