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

    private resourceUrlTask = SERVER_API_URL + SERVICE_GDATA + '/api/tasks';

    private resourceUrlEs = SERVER_API_URL + SERVICE_GDATA + '/api/esinfos';

    private resourceUrlRelation = SERVER_API_URL + SERVICE_GDATA + '/api/maprelations';

    constructor(private http: HttpClient) {}

    addloginfo(log: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resourceUrlgdata}/add`, log, { observe: 'response' });
    }
    addTaskinfo(tsk: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resourceUrlTask}/add`, tsk, { observe: 'response' });
    }

    queryDatainfo(req?: any): Observable<HttpResponse<any[]>> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrlgdata, { params: options, observe: 'response' });
    }

    queryTaskinfo(req?: any): Observable<HttpResponse<any[]>> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrlTask, { params: options, observe: 'response' });
    }

    queryEsinfo(name: any): Observable<HttpResponse<any[]>> {
        return this.http.post<any[]>(`${this.resourceUrlEs}/findByname`, name, { observe: 'response' });
    }

    queryMapRelation(req?: any): Observable<HttpResponse<any[]>> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrlRelation, { params: options, observe: 'response' });
    }

    deleteIDList(idList: number[]): Observable<HttpResponse<any>> {
        return this.http.post(`${this.resourceUrlgdata}` + '/delete', idList, { observe: 'response' });
    }
}
