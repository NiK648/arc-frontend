import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-assigned-employees',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './assigned-employees.component.html',
    styleUrls: ['./assigned-employees.component.scss'],
})
export class AssignedEmployeesComponent {
    @Input() type: 'project' | 'vendor';
}
