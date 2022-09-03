import 'reflect-metadata';
import { expect } from 'chai';
const { EmployeeService } = require('../src/api/modules/employee/services/index.ts');
const employeeService = new EmployeeService();
const { EmployeeStatus } = require('../src/utils/constants/enums.ts');
const sinon = require('sinon');
describe('Employee Service Unit Tests', function () {
  describe('Save Employee functionality', function () {
    it('should successfully add a employee if the email Id with user does not exists in the DB', async function () {
      const name = 'Json';
      const email = 'john@gmail.com';
      const profile_picture =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
      const status = EmployeeStatus.ACTIVE;

      sinon.stub(EmployeeService.prototype, 'getOne').returns(null);
      sinon.stub(EmployeeService.prototype, 'createOne').returns({ name, email, profile_picture, status });
      const returnedEmployee = await employeeService.createOne({
        name,
        email,
        profile_picture,
        status,
      });
      expect(returnedEmployee.name).to.equal(name);
      expect(returnedEmployee.email).to.equal(email);
      expect(returnedEmployee.status).to.equal(status);
      expect(returnedEmployee.profile_picture).to.equal(profile_picture);
      sinon.restore();
    });
    it('should throw an error if the email Id with user exists', async function () {
      const name = 'Json';
      const email = 'john@gmail.com';
      const profile_picture =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
      const status = EmployeeStatus.ACTIVE;
      sinon.stub(EmployeeService.prototype, 'getOne').returns(1);
      await employeeService
        .createOne({
          name,
          email,
          profile_picture,
          status,
        })
        .catch(error => {
          expect(error.message).to.equal('Employee email address is already exists');
        });
    });
  });
});
