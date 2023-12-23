import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../api/client';

@Injectable({ providedIn: 'root' })
export class ClientService {
    constructor(private httpClient: HttpClient) {}

    public getClients() {
        return this.httpClient.get<Client[]>('assets/demo/data/clients.json');
    }
}
