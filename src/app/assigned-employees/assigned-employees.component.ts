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
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
    selector: 'app-assigned-employees',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
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
        CalendarModule,
        MultiSelectModule,
    ],
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

    public title: string = '';

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

    workStatus: SelectItem[] = [
        {
            label: 'Present',
            value: EmployeeType.Internal,
        },
        {
            label: 'External',
            value: EmployeeType.External,
        },
    ];

    public notAdded: any[] = [
        {
            id: 1,
            firstName: 'Horn',
            lastName: 'Ingram',
            vendorId: 9,
            projectId: 2,
            tradeId: 12,
            email: 'horningram@exoblue.com',
            phone: '+971 9884273725',
            type: 2,
        },
        {
            id: 2,
            firstName: 'Lilly',
            lastName: 'Raymond',
            vendorId: 1,
            projectId: 16,
            tradeId: 11,
            email: 'lillyraymond@exoblue.com',
            phone: '+971 8964843384',
            type: 2,
        },
        {
            id: 3,
            firstName: 'Sonja',
            lastName: 'Yates',
            vendorId: 3,
            projectId: 37,
            tradeId: 13,
            email: 'sonjayates@exoblue.com',
            phone: '+971 8475493786',
            type: 2,
        },
        {
            id: 4,
            firstName: 'Chapman',
            lastName: 'Willis',
            vendorId: 5,
            projectId: 4,
            tradeId: 3,
            email: 'chapmanwillis@exoblue.com',
            phone: '+971 8685212871',
            type: 1,
        },
        {
            id: 5,
            firstName: 'Robinson',
            lastName: 'Whitley',
            vendorId: 10,
            projectId: 8,
            tradeId: 10,
            email: 'robinsonwhitley@exoblue.com',
            phone: '+971 8325773501',
            type: 1,
        },
        {
            id: 6,
            firstName: 'Helga',
            lastName: 'Salas',
            vendorId: 3,
            projectId: 39,
            tradeId: 6,
            email: 'helgasalas@exoblue.com',
            phone: '+971 8744982593',
            type: 1,
        },
        {
            id: 7,
            firstName: 'Isabelle',
            lastName: 'Cobb',
            vendorId: 7,
            projectId: 23,
            tradeId: 9,
            email: 'isabellecobb@exoblue.com',
            phone: '+971 9694742326',
            type: 2,
        },
        {
            id: 8,
            firstName: 'Kari',
            lastName: 'Velazquez',
            vendorId: 7,
            projectId: 18,
            tradeId: 6,
            email: 'karivelazquez@exoblue.com',
            phone: '+971 8164012864',
            type: 1,
        },
        {
            id: 9,
            firstName: 'Bertha',
            lastName: 'Bond',
            vendorId: 5,
            projectId: 22,
            tradeId: 5,
            email: 'berthabond@exoblue.com',
            phone: '+971 8075422356',
            type: 2,
        },
        {
            id: 10,
            firstName: 'Blackburn',
            lastName: 'Fowler',
            vendorId: 1,
            projectId: 9,
            tradeId: 11,
            email: 'blackburnfowler@exoblue.com',
            phone: '+971 9444623663',
            type: 1,
        },
        {
            id: 11,
            firstName: 'Macias',
            lastName: 'Ayers',
            vendorId: 9,
            projectId: 8,
            tradeId: 11,
            email: 'maciasayers@exoblue.com',
            phone: '+971 9655643908',
            type: 1,
        },
        {
            id: 12,
            firstName: 'Clemons',
            lastName: 'Pearson',
            vendorId: 2,
            projectId: 25,
            tradeId: 3,
            email: 'clemonspearson@exoblue.com',
            phone: '+971 8105092630',
            type: 1,
        },
        {
            id: 13,
            firstName: 'Bernice',
            lastName: 'Levine',
            vendorId: 10,
            projectId: 8,
            tradeId: 4,
            email: 'bernicelevine@exoblue.com',
            phone: '+971 8185143664',
            type: 1,
        },
        {
            id: 14,
            firstName: 'Jody',
            lastName: 'Wise',
            vendorId: 8,
            projectId: 3,
            tradeId: 11,
            email: 'jodywise@exoblue.com',
            phone: '+971 8395593509',
            type: 1,
        },
        {
            id: 15,
            firstName: 'Reid',
            lastName: 'Steele',
            vendorId: 11,
            projectId: 17,
            tradeId: 9,
            email: 'reidsteele@exoblue.com',
            phone: '+971 8774853057',
            type: 1,
        },
        {
            id: 16,
            firstName: 'Iva',
            lastName: 'Daugherty',
            vendorId: 7,
            projectId: 7,
            tradeId: 4,
            email: 'ivadaugherty@exoblue.com',
            phone: '+971 8484632705',
            type: 2,
        },
        {
            id: 17,
            firstName: 'Lizzie',
            lastName: 'Beach',
            vendorId: 11,
            projectId: 33,
            tradeId: 2,
            email: 'lizziebeach@exoblue.com',
            phone: '+971 8875813831',
            type: 2,
        },
        {
            id: 18,
            firstName: 'Margarita',
            lastName: 'Juarez',
            vendorId: 1,
            projectId: 36,
            tradeId: 7,
            email: 'margaritajuarez@exoblue.com',
            phone: '+971 8484523274',
            type: 2,
        },
        {
            id: 19,
            firstName: 'Skinner',
            lastName: 'Reilly',
            vendorId: 11,
            projectId: 18,
            tradeId: 7,
            email: 'skinnerreilly@exoblue.com',
            phone: '+971 9374912081',
            type: 2,
        },
        {
            id: 20,
            firstName: 'Finch',
            lastName: 'Ray',
            vendorId: 12,
            projectId: 28,
            tradeId: 6,
            email: 'finchray@exoblue.com',
            phone: '+971 8964693973',
            type: 1,
        },
        {
            id: 21,
            firstName: 'Adela',
            lastName: 'Lewis',
            vendorId: 5,
            projectId: 24,
            tradeId: 2,
            email: 'adelalewis@exoblue.com',
            phone: '+971 8645952557',
            type: 2,
        },
        {
            id: 22,
            firstName: 'Chase',
            lastName: 'Stone',
            vendorId: 8,
            projectId: 27,
            tradeId: 6,
            email: 'chasestone@exoblue.com',
            phone: '+971 8824033837',
            type: 1,
        },
        {
            id: 23,
            firstName: 'Yvonne',
            lastName: 'Stein',
            vendorId: 9,
            projectId: 6,
            tradeId: 8,
            email: 'yvonnestein@exoblue.com',
            phone: '+971 9194212014',
            type: 2,
        },
        {
            id: 24,
            firstName: 'Mara',
            lastName: 'Velez',
            vendorId: 4,
            projectId: 7,
            tradeId: 5,
            email: 'maravelez@exoblue.com',
            phone: '+971 8274633340',
            type: 2,
        },
        {
            id: 25,
            firstName: 'Lucy',
            lastName: 'Lancaster',
            vendorId: 8,
            projectId: 10,
            tradeId: 1,
            email: 'lucylancaster@exoblue.com',
            phone: '+971 8275363010',
            type: 2,
        },
        {
            id: 26,
            firstName: 'Shauna',
            lastName: 'Fitzpatrick',
            vendorId: 2,
            projectId: 25,
            tradeId: 3,
            email: 'shaunafitzpatrick@exoblue.com',
            phone: '+971 9485732972',
            type: 1,
        },
        {
            id: 27,
            firstName: 'Guerra',
            lastName: 'Tanner',
            vendorId: 4,
            projectId: 6,
            tradeId: 14,
            email: 'guerratanner@exoblue.com',
            phone: '+971 9365803159',
            type: 1,
        },
        {
            id: 28,
            firstName: 'Morrison',
            lastName: 'Mooney',
            vendorId: 2,
            projectId: 26,
            tradeId: 1,
            email: 'morrisonmooney@exoblue.com',
            phone: '+971 8264683727',
            type: 2,
        },
        {
            id: 29,
            firstName: 'Graciela',
            lastName: 'Bryant',
            vendorId: 9,
            projectId: 28,
            tradeId: 3,
            email: 'gracielabryant@exoblue.com',
            phone: '+971 9525663962',
            type: 2,
        },
        {
            id: 30,
            firstName: 'James',
            lastName: 'Decker',
            vendorId: 11,
            projectId: 22,
            tradeId: 4,
            email: 'jamesdecker@exoblue.com',
            phone: '+971 9604213521',
            type: 1,
        },
        {
            id: 31,
            firstName: 'Sosa',
            lastName: 'Melendez',
            vendorId: 12,
            projectId: 31,
            tradeId: 5,
            email: 'sosamelendez@exoblue.com',
            phone: '+971 9284353881',
            type: 1,
        },
        {
            id: 32,
            firstName: 'Battle',
            lastName: 'Franco',
            vendorId: 10,
            projectId: 10,
            tradeId: 3,
            email: 'battlefranco@exoblue.com',
            phone: '+971 9084152742',
            type: 1,
        },
        {
            id: 33,
            firstName: 'Nielsen',
            lastName: 'Meadows',
            vendorId: 8,
            projectId: 4,
            tradeId: 14,
            email: 'nielsenmeadows@exoblue.com',
            phone: '+971 9414863308',
            type: 2,
        },
        {
            id: 34,
            firstName: 'Munoz',
            lastName: 'Petersen',
            vendorId: 9,
            projectId: 40,
            tradeId: 11,
            email: 'munozpetersen@exoblue.com',
            phone: '+971 8964942455',
            type: 2,
        },
        {
            id: 35,
            firstName: 'Mcfadden',
            lastName: 'Chandler',
            vendorId: 8,
            projectId: 20,
            tradeId: 10,
            email: 'mcfaddenchandler@exoblue.com',
            phone: '+971 8035912454',
            type: 1,
        },
        {
            id: 36,
            firstName: 'Rochelle',
            lastName: 'Gaines',
            vendorId: 6,
            projectId: 13,
            tradeId: 13,
            email: 'rochellegaines@exoblue.com',
            phone: '+971 8995913909',
            type: 2,
        },
        {
            id: 37,
            firstName: 'Day',
            lastName: 'Battle',
            vendorId: 12,
            projectId: 44,
            tradeId: 10,
            email: 'daybattle@exoblue.com',
            phone: '+971 9645282635',
            type: 1,
        },
        {
            id: 38,
            firstName: 'Estella',
            lastName: 'Diaz',
            vendorId: 5,
            projectId: 43,
            tradeId: 3,
            email: 'estelladiaz@exoblue.com',
            phone: '+971 8825212525',
            type: 2,
        },
        {
            id: 39,
            firstName: 'Anita',
            lastName: 'Pratt',
            vendorId: 9,
            projectId: 10,
            tradeId: 4,
            email: 'anitapratt@exoblue.com',
            phone: '+971 9815202692',
            type: 2,
        },
        {
            id: 40,
            firstName: 'Frye',
            lastName: 'Mcgowan',
            vendorId: 3,
            projectId: 18,
            tradeId: 10,
            email: 'fryemcgowan@exoblue.com',
            phone: '+971 8075063761',
            type: 2,
        },
        {
            id: 41,
            firstName: 'Opal',
            lastName: 'Davidson',
            vendorId: 5,
            projectId: 14,
            tradeId: 14,
            email: 'opaldavidson@exoblue.com',
            phone: '+971 9165592447',
            type: 1,
        },
        {
            id: 42,
            firstName: 'Erickson',
            lastName: 'Rivas',
            vendorId: 10,
            projectId: 12,
            tradeId: 14,
            email: 'ericksonrivas@exoblue.com',
            phone: '+971 9855812098',
            type: 1,
        },
        {
            id: 43,
            firstName: 'Margo',
            lastName: 'Mccall',
            vendorId: 6,
            projectId: 26,
            tradeId: 8,
            email: 'margomccall@exoblue.com',
            phone: '+971 9854802113',
            type: 1,
        },
        {
            id: 44,
            firstName: 'Cathy',
            lastName: 'Zimmerman',
            vendorId: 3,
            projectId: 15,
            tradeId: 14,
            email: 'cathyzimmerman@exoblue.com',
            phone: '+971 8145213681',
            type: 2,
        },
        {
            id: 45,
            firstName: 'Lauren',
            lastName: 'Houston',
            vendorId: 5,
            projectId: 34,
            tradeId: 9,
            email: 'laurenhouston@exoblue.com',
            phone: '+971 9124233100',
            type: 2,
        },
        {
            id: 46,
            firstName: 'Landry',
            lastName: 'Wallace',
            vendorId: 6,
            projectId: 30,
            tradeId: 11,
            email: 'landrywallace@exoblue.com',
            phone: '+971 8305343999',
            type: 2,
        },
        {
            id: 47,
            firstName: 'White',
            lastName: 'Blevins',
            vendorId: 3,
            projectId: 20,
            tradeId: 5,
            email: 'whiteblevins@exoblue.com',
            phone: '+971 9974392432',
            type: 1,
        },
        {
            id: 48,
            firstName: 'Delores',
            lastName: 'Bell',
            vendorId: 3,
            projectId: 6,
            tradeId: 11,
            email: 'deloresbell@exoblue.com',
            phone: '+971 9025342738',
            type: 1,
        },
        {
            id: 49,
            firstName: 'Fern',
            lastName: 'Mcgee',
            vendorId: 4,
            projectId: 36,
            tradeId: 8,
            email: 'fernmcgee@exoblue.com',
            phone: '+971 8494133711',
            type: 2,
        },
        {
            id: 50,
            firstName: 'Murray',
            lastName: 'Preston',
            vendorId: 8,
            projectId: 45,
            tradeId: 7,
            email: 'murraypreston@exoblue.com',
            phone: '+971 8105732232',
            type: 1,
        },
    ];

    public get notAddedItems(): any[] {
        return this.notAdded.map((n) => ({
            ...n,
            name: `${n.firstName} ${n.lastName}`,
        }));
    }

    public employeesToAdd = [];

    constructor(
        private employeeService: EmployeeService,
        private projectService: ProjectService,
        private vendorService: VendorService,
        private tradeService: TradeService,
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

        this.notAdded.forEach((e) => {
            e.tradeName = this.trades.find((t) => t.value === e.tradeId)?.label;
            e.projectName = this.projects.find(
                (t) => t.value === e.projectId
            )?.label;
            e.vendorName = this.vendors.find(
                (t) => t.value === e.vendorId
            )?.label;
        });

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'address', header: 'Address' },
        ];

        const id = this.route.snapshot.params['id'];
        if (this.type === 'project') {
            const project = this.projects.find((p) => p.value == id)?.label;
            this.title = `${project} - Assigned Employees`;
        } else if (this.type === 'vendor') {
            const vendor = this.vendors.find((p) => p.value == id)?.label;
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

    addEmployees() {
        const newE = this.notAdded.filter((n) =>
            this.employeesToAdd.includes(n.id)
        );
        this.employees.push(...newE);
        this.employeesToAdd = [];
        this.employeeDialog = false;
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
