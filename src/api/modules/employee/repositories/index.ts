import { getRepository } from 'typeorm';
import { Employees } from '../../../../typeorm/entities/Employee';

export class EmployeeRepository {
  async createOne(employee: Employees): Promise<Employees> {
    const employeeRepository = getRepository(Employees);
    const employeeObject = employeeRepository.create(employee);
    return employeeRepository.save(employeeObject);
  }

  async getOne(email: string): Promise<Employees> {
    const employee = getRepository(Employees).findOne({ where: { email } });
    if (!employee) {
      return null;
    }
    employee;
  }
}
