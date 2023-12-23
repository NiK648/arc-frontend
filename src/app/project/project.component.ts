import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/demo/api/project';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProjectService } from 'src/app/demo/service/project.service';
import { ClientService } from '../demo/service/client.service';
import { Client } from '../demo/api/client';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    providers: [MessageService],
})
export class ProjectComponent implements OnInit {
    projectDialog: boolean = false;

    deleteProjectDialog: boolean = false;

    deleteProjectsDialog: boolean = false;

    projects: Project[] = [];

    project: Project = {} as Project;

    selectedProjects: Project[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    clients: SelectItem[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private projectService: ProjectService,
        private clientService: ClientService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.clientService.getClients().subscribe((clients) => {
            this.clients = clients.map((c) => ({
                label: c.name,
                value: c.id,
            }));
            this.projectService.getProjects().subscribe((data) => {
                this.projects = data;
                this.projects.forEach((p) => {
                    p.clientName = this.clients.find(
                        (c) => c.value === p.clientId
                    )?.label;
                });
            });
        });

        this.cols = [
            { field: 'project', header: 'Project' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' },
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' },
        ];
    }

    openNew() {
        this.project = {} as Project;
        this.submitted = false;
        this.projectDialog = true;
    }

    deleteSelectedProjects() {
        this.deleteProjectsDialog = true;
    }

    editProject(project: Project) {
        this.project = { ...project };
        this.projectDialog = true;
    }

    deleteProject(project: Project) {
        this.deleteProjectDialog = true;
        this.project = { ...project };
    }

    confirmDeleteSelected() {
        this.deleteProjectsDialog = false;
        this.projects = this.projects.filter(
            (val) => !this.selectedProjects.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Projects Deleted',
            life: 3000,
        });
        this.selectedProjects = [];
    }

    confirmDelete() {
        this.deleteProjectDialog = false;
        this.projects = this.projects.filter(
            (val) => val.id !== this.project.id
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Project Deleted',
            life: 3000,
        });
        this.project = {} as Project;
    }

    hideDialog() {
        this.projectDialog = false;
        this.submitted = false;
    }

    saveProject() {
        this.submitted = true;

        if (this.project.name?.trim()) {
            if (this.project.id) {
                this.project.clientName = this.clients.find(
                    (c) => c.value === this.project.clientId
                )?.label;
                this.projects[this.findIndexById(this.project.id)] =
                    this.project;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Project Updated',
                    life: 3000,
                });
            } else {
                this.project.id = this.createId();
                this.project.clientName = this.clients.find(
                    (c) => c.value === this.project.clientId
                )?.label;
                this.projects.push(this.project);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Project Created',
                    life: 3000,
                });
            }

            this.projects = [...this.projects];
            this.projectDialog = false;
            this.project = {} as Project;
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): number {
        return Math.max(...this.projects.map((t) => t.id)) + 1;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
