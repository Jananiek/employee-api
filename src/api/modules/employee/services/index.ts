import { Employees } from '../../../../typeorm/entities/Employee';
import { CustomError } from '../../../../utils/errorHandle/customErrors';
import { EmployeeRepository } from '../repositories';
export class EmployeeService {
  protected employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async createOne(employee: Employees): Promise<Employees> {
    const isExists = await this.employeeRepository.getOne(employee.email);
    if (isExists) {
      throw new CustomError('Employee email address is already exists');
    }
    const result = await this.employeeRepository.createOne(employee);
    if (!result) return null;
    return result;
  }
  public async getOne(email: string): Promise<Employees> {
    const result = await this.employeeRepository.getOne(email);
    if (!result) {
      return null;
    }
    return result;
  }
}
