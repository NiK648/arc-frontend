import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { VendorService } from '../demo/service/vendor.service';
import { Vendor } from '../demo/api/vendor';

@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    styleUrls: ['./vendor.component.scss'],
    providers: [MessageService],
})
export class VendorComponent implements OnInit {
    vendorDialog: boolean = false;

    deleteVendorDialog: boolean = false;

    deleteVendorsDialog: boolean = false;

    vendors: Vendor[] = [];

    vendor: Vendor = {} as Vendor;

    selectedVendors: Vendor[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private vendorService: VendorService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.vendorService
            .getVendors()
            .subscribe((data) => (this.vendors = data));

        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'address', header: 'Address' },
        ];
    }

    openNew() {
        this.vendor = {} as Vendor;
        this.submitted = false;
        this.vendorDialog = true;
    }

    deleteSelectedVendors() {
        this.deleteVendorsDialog = true;
    }

    editVendor(vendor: Vendor) {
        this.vendor = { ...vendor };
        this.vendorDialog = true;
    }

    deleteVendor(vendor: Vendor) {
        this.deleteVendorDialog = true;
        this.vendor = { ...vendor };
    }

    confirmDeleteSelected() {
        this.deleteVendorsDialog = false;
        this.vendors = this.vendors.filter(
            (val) => !this.selectedVendors.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Vendors Deleted',
            life: 3000,
        });
        this.selectedVendors = [];
    }

    confirmDelete() {
        this.deleteVendorDialog = false;
        this.vendors = this.vendors.filter((val) => val.id !== this.vendor.id);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Vendor Deleted',
            life: 3000,
        });
        this.vendor = {} as Vendor;
    }

    hideDialog() {
        this.vendorDialog = false;
        this.submitted = false;
    }

    saveVendor() {
        this.submitted = true;

        if (this.vendor.name?.trim()) {
            if (this.vendor.id) {
                // @ts-ignore
                this.vendors[this.findIndexById(this.vendor.id)] = this.vendor;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Vendor Updated',
                    life: 3000,
                });
            } else {
                this.vendor.id = this.createId();
                this.vendors.push(this.vendor);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Vendor Created',
                    life: 3000,
                });
            }

            this.vendors = [...this.vendors];
            this.vendorDialog = false;
            this.vendor = {} as Vendor;
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.vendors.length; i++) {
            if (this.vendors[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): number {
        return Math.max(...this.vendors.map((c) => c.id)) + 1;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    export() {
        fetch('assets/demo/data/report.pdf')
            .then((response) => response.blob())
            .then((blob) => {
                // Create a blob URL for the PDF data
                var url = window.URL.createObjectURL(blob);

                // Create a link element to trigger the download
                var a = document.createElement('a');
                a.href = url;
                a.download = 'downloaded.pdf'; // Set the desired file name
                document.body.appendChild(a);

                // Trigger a click event on the link element to initiate the download
                a.click();

                // Clean up by revoking the blob URL and removing the link element
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch((error) => {
                console.error('Failed to download the PDF file: ', error);
            });
    }
}
