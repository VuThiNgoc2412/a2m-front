import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse } from 'app/_model/resp/data-response';
import { HeadersUtil } from 'app/_util/headers-util';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Sys0301Service {
  constructor(private http: HttpClient) { }

  getPhieuByStatus(status: number) {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + `/admin/sys0301/phieumuon/${status}`;
    return this.http.get<DataResponse>(url, { headers: headers });
  }



}
