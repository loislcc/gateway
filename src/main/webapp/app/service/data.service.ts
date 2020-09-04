import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { createRequestOption } from 'app/shared';
import { SERVER_API_URL, SERVICE_GDATA } from 'app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private resourceUrlgdata = SERVER_API_URL + SERVICE_GDATA + '/api/loginfos';

    constructor(private http: HttpClient) {}

    addloginfo(log: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resourceUrlgdata}/add`, log, { observe: 'response' });
    }

    queryDatainfo(req?: any): Observable<HttpResponse<any[]>> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrlgdata, { params: options, observe: 'response' });
    }
}
