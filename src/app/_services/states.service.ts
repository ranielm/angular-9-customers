import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { State } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class StateService {
    constructor(
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<State[]>(`${environment.apiUrl}/states`);
    }

}