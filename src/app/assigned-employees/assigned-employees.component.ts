import { Component, Input, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { EmployeeService } from '../demo/service/employee.service';
import { Employee, EmployeeType } from '../demo/api/employee';
import { TradeService } from '../demo/service/trade.service';
import { VendorService } from '../demo/service/vendor.service';
import { ProjectService } from '../demo/service/project.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-assigned-employees',
    standalone: true,
    imports: [CommonModule, TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        InputMaskModule,
        CalendarModule,],
    templateUrl: './assigned-employees.component.html',
    styleUrls: ['./assigned-employees.component.scss'],
    providers: [MessageService],
})
export class AssignedEmployeesComponent implements OnInit {
    @Input() type: 'project' | 'vendor';

    employeeDialog: boolean = false;

    logTimeDialog: boolean = false;

    logTimeModel = {
        logDate: new Date(),
        logTime: '',
    };

    deleteEmployeeDialog: boolean = false;

    deleteEmployeesDialog: boolean = false;

    employees: Employee[] = [];

    employee: Employee = {} as Employee;

    selectedEmployees: Employee[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    trades: SelectItem[] = [];

    vendors: SelectItem[] = [];

    projects: SelectItem[] = [];

    currentDate = new Date();

    public title: string = "";

    typeOptions: SelectItem[] = [{
        label: 'Internal',
        value: EmployeeType.Internal,
    }, {
        label: 'External',
        value: EmployeeType.External,
    }];

    workStatus: SelectItem[] = [{
        label: 'Present',
        value: EmployeeType.Internal,
    }, {
        label: 'External',
        value: EmployeeType.External,
    }];

    constructor(
        private employeeService: EmployeeService,
        private projectService: ProjectService,
        private vendorService: VendorService,
        private tradeService: TradeService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    async ngOnInit() {
        this.trades = (await firstValueFrom(this.tradeService.getTrades())).map(
            (t) => ({
                label: t.tradeName,
                value: t.slno,
            })
        );
        this.vendors = (
            await firstValueFrom(this.vendorService.getVendors())
        ).map((t) => ({
            label: t.name,
            value: t.id,
        }));
        this.projects = (
            await firstValueFrom(this.projectService.getProjects())
        ).map((t) => ({
            label: t.name,
            value: t.id,
        }));
        this.employeeService.getEmployees().subscribe((data) => {
            this.employees = data;
            this.employees.forEach((e) => {
                e.tradeName = this.trades.find(
                    (t) => t.value === e.tradeId
                )?.label;
                e.projectName = this.projects.find(
                    (t) => t.value === e.projectId
                )?.label;
                e.vendorName = this.vendors.find(
                    (t) => t.value === e.vendorId
                )?.label;
            });
        });

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'address', header: 'Address' },
        ];

        const id = this.route.snapshot.params['id'];
        if (this.type === 'project') {
            const project = this.projects.find(p => p.value == id)?.label;
            this.title = `${project} - Assigned Employees`;
        } else if (this.type === 'vendor') {
            const vendor = this.vendors.find(p => p.value == id)?.label;
            this.title = `${vendor} - Employees`;
        }
    }

    openNew() {
        this.employee = {} as Employee;
        this.submitted = false;
        this.employeeDialog = true;
    }

    deleteSelectedEmployees() {
        this.deleteEmployeesDialog = true;
    }

    editEmployee(employee: Employee) {
        this.employee = { ...employee };
        this.employeeDialog = true;
    }

    deleteEmployee(employee: Employee) {
        this.deleteEmployeeDialog = true;
        this.employee = { ...employee };
    }

    confirmDeleteSelected() {
        this.deleteEmployeesDialog = false;
        this.employees = this.employees.filter(
            (val) => !this.selectedEmployees.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Employees Deleted',
            life: 3000,
        });
        this.selectedEmployees = [];
    }

    confirmDelete() {
        this.deleteEmployeeDialog = false;
        this.employees = this.employees.filter(
            (val) => val.id !== this.employee.id
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Employee Deleted',
            life: 3000,
        });
        this.employee = {} as Employee;
    }

    hideDialog() {
        this.employeeDialog = false;
        this.submitted = false;
    }

    openLogTime(employee: Employee) {
        this.employee = employee;
        this.logTimeDialog = true;
    }

    hideLogTimeDialog() {
        this.logTimeDialog = false;
        this.employee = {} as Employee;
        this.logTimeModel = {
            logDate: new Date(),
            logTime: '',
        };
    }

    logTime() {
        this.logTimeDialog = false;
        this.employee = {} as Employee;
        this.logTimeModel = {
            logDate: new Date(),
            logTime: '',
        };
    }

    saveEmployee() {
        this.submitted = true;

        this.employee.tradeName = this.trades.find(
            (t) => t.value === this.employee.tradeId
        )?.label;
        this.employee.projectName = this.projects.find(
            (t) => t.value === this.employee.projectId
        )?.label;
        this.employee.vendorName = this.vendors.find(
            (t) => t.value === this.employee.vendorId
        )?.label;

        if (this.employee.firstName?.trim()) {
            if (this.employee.id) {
                // @ts-ignore
                this.employees[this.findIndexById(this.employee.id)] =
                    this.employee;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Employee Updated',
                    life: 3000,
                });
            } else {
                this.employee.id = this.createId();
                this.employees.push(this.employee);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Employee Created',
                    life: 3000,
                });
            }

            this.employees = [...this.employees];
            this.employeeDialog = false;
            this.employee = {} as Employee;
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): number {
        return Math.max(...this.employees.map((c) => c.id)) + 1;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    back() {
        const id = this.route.snapshot.params['id'];
        this.router.navigate([this.type + 's']);
    }
}
