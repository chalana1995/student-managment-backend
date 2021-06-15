import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './student.entity';
import { StudentsService } from './students.service';
import { diskStorage } from 'multer';
import { editFileName, excelFileFilter } from './file-upload.utils';

@Controller('students')
export class StudentsController {

    constructor(private studentservice: StudentsService) { }

    @Get('getid/:id')
    getStudentById(@Param('id', ParseIntPipe) id: number): Promise<Student> {
        return this.studentservice.getStudentById(id);
    }

    @Post('add')
    @UsePipes(ValidationPipe)
    createTask(@Body() createstudentDto: CreateStudentDto): Promise<Student> {
        return this.studentservice.createStudent(createstudentDto);
    }

    @Post('callres')
    readResCall(@Body() res:any): Promise<any> 
    {
       return this.studentservice.readObj(res);
    }

    @Delete('delete/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.studentservice.deleteStudent(id);
    }

    @Patch('/:id/update')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() createstudentDto: CreateStudentDto): Promise<Student> {
        return this.studentservice.updateStudent(id, createstudentDto)
    }

    @Get()
    getStudents(@Query() page) {
        return this.studentservice.getStudents(page);
    }

    @Get('getCount')
    getStudentCount(){
        return this.studentservice.getCountofStudent();
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            fileFilter: excelFileFilter,
        }),
    )
    async uploadFile(@UploadedFile() file) {
        console.log(file);
        const newSavedfile = file.filename;
        await this.studentservice.uplaodFileUpload(newSavedfile);
        Logger.log('file is uploading');
    }
}
