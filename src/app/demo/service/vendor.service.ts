import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../api/vendor';

@Injectable({ providedIn: 'root' })
export class VendorService {
    constructor(private httpClient: HttpClient) {}

    public getVendors() {
        return this.httpClient.get<Vendor[]>('assets/demo/data/vendors.json');
    }
}
