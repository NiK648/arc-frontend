import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { firstValueFrom } from 'rxjs';
import { Employee, EmployeeType } from 'src/app/demo/api/employee';
import { EmployeeService } from 'src/app/demo/service/employee.service';
import { ProjectService } from 'src/app/demo/service/project.service';
import { TimeLogService } from 'src/app/demo/service/time-log.service';
import { TradeService } from 'src/app/demo/service/trade.service';
import { VendorService } from 'src/app/demo/service/vendor.service';
import jsPDF from 'jspdf';
import autoTable, { ColumnInput } from 'jspdf-autotable';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    providers: [MessageService],
})
export class ReportComponent {
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

    typeOptions: SelectItem[] = [
        {
            label: 'Internal',
            value: EmployeeType.Internal,
        },
        {
            label: 'External',
            value: EmployeeType.External,
        },
    ];

    public title: string = '';

    days: number[] = Array.from({ length: 30 }, (value, index) => index + 1);

    data: any[] = [];

    constructor(
        private employeeService: EmployeeService,
        private projectService: ProjectService,
        private vendorService: VendorService,
        private tradeService: TradeService,
        private timeLogService: TimeLogService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

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

        this.timeLogService.getVendorTimeLogs().subscribe((res) => {
            this.data = res.find((t) => t.vendorId == id).employees;
            this.data.forEach((t) => {
                t.tradeName = this.trades.find(
                    (tr) => tr.value === t.tradeId
                )?.label;
                let sum = 0;
                t.timeLogs.forEach((log) => {
                    t[log.logDate] = log.logTime;
                    sum += Number(
                        log.logTime ? log.logTime.replace('h', '') : 0
                    );
                });
                t.total = sum;
                delete t.timeLogs;
            });
            this.data.sort((a, b) => {
                return a.employeeId - b.employeeId;
            });
        });

        const vendor = this.vendors.find((p) => p.value == id)?.label;
        this.title = `${vendor} - Employee Timesheet`;
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

    exportPdf() {
        const exportColumns: ColumnInput[] = [
            {
                title: 'Id',
                header: 'Id',
                dataKey: 'employeeId',
                key: 'employeeId',
            },
            {
                title: 'Employee Name',
                header: 'Employee Name',
                dataKey: 'employeeName',
                key: 'employeeName',
            },
            {
                title: 'Trade',
                header: 'Trade',
                dataKey: 'tradeName',
                key: 'tradeName',
            },
            {
                title: 'Project',
                header: 'Project',
                dataKey: 'projectName',
                key: 'projectName',
            },
            ...this.days.map((d) => ({
                title: d.toString(),
                header: d.toString(),
                dataKey: d.toString(),
                key: d.toString(),
            })),
        ];
        const days = this.days.map((d) => d.toString());
        const doc = new jsPDF('l', 'px', 'a3', false);
        doc.text(this.title, 30, 30);
        autoTable(doc, {
            margin: {
                top: 40,
            },
            head: [
                [
                    'Id',
                    'Employee Name',
                    'Trade',
                    'Project',
                    ...days,
                    'Total Hours',
                ],
            ],
            //columns: exportColumns,
            body: this.data.map((d) => [
                d.employeeId,
                d.employeeName,
                d.tradeName,
                d.projectName,
                ...days.map((dn) => d[dn]),
                d.total + 'h',
            ]),
        });
        doc.save('timesheet.pdf');
    }
}
