import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClientService } from '../demo/service/client.service';
import { Client } from '../demo/api/client';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    providers: [MessageService],
})
export class ClientComponent implements OnInit {
    clientDialog: boolean = false;

    deleteClientDialog: boolean = false;

    deleteClientsDialog: boolean = false;

    clients: Client[] = [];

    client: Client = {} as Client;

    selectedClients: Client[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private clientService: ClientService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.clientService
            .getClients()
            .subscribe((data) => (this.clients = data));

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'address', header: 'Address' },
        ];
    }

    openNew() {
        this.client = {} as Client;
        this.submitted = false;
        this.clientDialog = true;
    }

    deleteSelectedClients() {
        this.deleteClientsDialog = true;
    }

    editClient(client: Client) {
        this.client = { ...client };
        this.clientDialog = true;
    }

    deleteClient(client: Client) {
        this.deleteClientDialog = true;
        this.client = { ...client };
    }

    confirmDeleteSelected() {
        this.deleteClientsDialog = false;
        this.clients = this.clients.filter(
            (val) => !this.selectedClients.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Clients Deleted',
            life: 3000,
        });
        this.selectedClients = [];
    }

    confirmDelete() {
        this.deleteClientDialog = false;
        this.clients = this.clients.filter((val) => val.id !== this.client.id);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Client Deleted',
            life: 3000,
        });
        this.client = {} as Client;
    }

    hideDialog() {
        this.clientDialog = false;
        this.submitted = false;
    }

    saveClient() {
        this.submitted = true;

        if (this.client.name?.trim()) {
            if (this.client.id) {
                // @ts-ignore
                this.clients[this.findIndexById(this.client.id)] = this.client;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Client Updated',
                    life: 3000,
                });
            } else {
                this.client.id = this.createId();
                this.clients.push(this.client);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Client Created',
                    life: 3000,
                });
            }

            this.clients = [...this.clients];
            this.clientDialog = false;
            this.client = {} as Client;
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): number {
        return Math.max(...this.clients.map((c) => c.id)) + 1;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
