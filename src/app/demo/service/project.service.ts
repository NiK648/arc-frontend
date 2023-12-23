import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../api/project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private httpClient: HttpClient) {}

    public getProjects() {
        return this.httpClient.get<Project[]>('assets/demo/data/projects.json');
    }
}
