import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeLog } from '../api/time-log';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimeLogService {
    constructor(private httpClient: HttpClient) {}

    public getTimeLogs() {
        return this.httpClient
            .get<TimeLog[]>('assets/demo/data/time-log.json')
            .pipe(
                map((res) => {
                    res.forEach((t) => {
                        t.logDateObj = new Date(t.logDate);
                        t.logTimeNumber = t.logTime.replace('h', '');
                    });
                    return res;
                })
            );
    }

    public getVendorTimeLogs() {
        return this.httpClient.get<any[]>(
            'assets/demo/data/vendor-report.json'
        );
    }
}
