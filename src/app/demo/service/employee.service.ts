import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../api/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(private httpClient: HttpClient) {}

    public getEmployees() {
        return this.httpClient.get<Employee[]>(
            'assets/demo/data/employees.json'
        );
    }
}
