import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        /* this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Invalid State', icon: 'pi pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-box', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    { label: 'Message', icon: 'pi pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Prime Blocks',
                items: [
                    { label: 'Free Blocks', icon: 'pi pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'All Blocks', icon: 'pi pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },
            {
                label: 'Utilities',
                items: [
                    { label: 'PrimeIcons', icon: 'pi pi-prime', routerLink: ['/utilities/icons'] },
                    { label: 'PrimeFlex', icon: 'pi pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-bookmark' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-bookmark' },
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-question', routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-search', url: ['https://github.com/primefaces/arc-frontend'], target: '_blank'
                    }
                ]
            }
        ]; */

        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'Sales Management',
                items: [
                    {
                        label: 'Local Purchase Orders',
                        icon: 'pi pi-align-justify',
                        routerLink: ['/lpo'],
                    },
                    {
                        label: 'Quotations',
                        icon: 'pi pi-star',
                        routerLink: ['/quotations'],
                    },
                ],
            },
            {
                label: 'Project Management',
                items: [
                    {
                        label: 'Projects',
                        icon: 'pi pi-th-large',
                        routerLink: ['/projects'],
                    },
                ],
            },
            {
                label: 'Client Management',
                items: [
                    {
                        label: 'Clients',
                        icon: 'pi pi-box',
                        routerLink: ['/clients'],
                    },
                ],
            },
            {
                label: 'Vendor Management',
                items: [
                    {
                        label: 'Vendors',
                        icon: 'pi pi-table',
                        routerLink: ['/vendors'],
                    },
                ],
            },
            {
                label: 'Employee Management',
                items: [
                    {
                        label: 'Employees',
                        icon: 'pi pi-users',
                        routerLink: ['/employees'],
                    },
                ],
            },
            {
                label: 'Trade Management',
                items: [
                    {
                        label: 'Trades',
                        icon: 'pi pi-share-alt',
                        routerLink: ['/trades'],
                    },
                ],
            },
            {
                label: 'Inventory Management',
                items: [
                    {
                        label: 'Inventory',
                        icon: 'pi pi-list',
                        routerLink: ['/inventory'],
                    },
                ],
            },
            {
                label: 'Camp Management',
                items: [
                    {
                        label: 'Rooms',
                        icon: 'pi pi-link',
                        routerLink: ['/rooms'],
                    },
                ],
            },
        ];
    }
}
