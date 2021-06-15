import { Student } from "../student.entity"


export class PaginatedProductsResultDto {
    data: Student[]
    page: number
    limit: number
    totalCount: number
  }