import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TradeService } from '../demo/service/trade.service';
import { Trade } from '../demo/api/trade';

@Component({
    selector: 'app-trade',
    templateUrl: './trade.component.html',
    styleUrls: ['./trade.component.scss'],
    providers: [MessageService],
})
export class TradeComponent implements OnInit {
    tradeDialog: boolean = false;

    deleteTradeDialog: boolean = false;

    deleteTradesDialog: boolean = false;

    trades: Trade[] = [];

    trade: Trade = {} as Trade;

    selectedTrades: Trade[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private tradeService: TradeService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.tradeService.getTrades().subscribe((data) => (this.trades = data));

        this.cols = [
            { field: 'slno', header: 'SL NO' },
            { field: 'tradeName', header: 'Trade' },
            { field: 'rate', header: 'Rate/Hrs. (AED)' },
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' },
        ];
    }

    openNew() {
        this.trade = {} as Trade;
        this.submitted = false;
        this.tradeDialog = true;
    }

    deleteSelectedTrades() {
        this.deleteTradesDialog = true;
    }

    editTrade(trade: Trade) {
        this.trade = { ...trade };
        this.tradeDialog = true;
    }

    deleteTrade(trade: Trade) {
        this.deleteTradeDialog = true;
        this.trade = { ...trade };
    }

    confirmDeleteSelected() {
        this.deleteTradesDialog = false;
        this.trades = this.trades.filter(
            (val) => !this.selectedTrades.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Trades Deleted',
            life: 3000,
        });
        this.selectedTrades = [];
    }

    confirmDelete() {
        this.deleteTradeDialog = false;
        this.trades = this.trades.filter((val) => val.slno !== this.trade.slno);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Trade Deleted',
            life: 3000,
        });
        this.trade = {} as Trade;
    }

    hideDialog() {
        this.tradeDialog = false;
        this.submitted = false;
    }

    saveTrade() {
        this.submitted = true;

        if (this.trade.tradeName?.trim()) {
            if (this.trade.slno) {
                // @ts-ignore
                this.trades[this.findIndexById(this.trade.slno)] = this.trade;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Trade Updated',
                    life: 3000,
                });
            } else {
                this.trade.slno = this.createId();
                this.trades.push(this.trade);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Trade Created',
                    life: 3000,
                });
            }

            this.trades = [...this.trades];
            this.tradeDialog = false;
            this.trade = {} as Trade;
        }
    }

    findIndexById(slno: number): number {
        let index = -1;
        for (let i = 0; i < this.trades.length; i++) {
            if (this.trades[i].slno === slno) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): number {
        return Math.max(...this.trades.map((t) => t.slno)) + 1;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
