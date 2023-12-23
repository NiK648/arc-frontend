import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trade } from '../api/trade';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TradeService {
    constructor(private http: HttpClient) {}

    getTrades(): Observable<Trade[]> {
        return this.http.get<Trade[]>('assets/demo/data/trades.json');
    }
}
