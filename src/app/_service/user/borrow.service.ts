import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "environments/environment";
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { HeadersUtil } from 'app/_util/headers-util';

@Injectable({
    providedIn: 'root'
})
export class BorrowService{
    constructor(private http: HttpClient) {}
    apiMessange: any;

    addPhieuMuon(bookList: DauSach[], phieumuon: phieumuonDto): Observable<any>{
        const apiUrl = environment.backApiUrl + `/user/user0201/add`
        console.log("Adding books");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const jsonData = JSON.stringify(phieumuon);
        console.log(phieumuon);
        return this.http.post(`${apiUrl}`, jsonData, { headers });
    }

}
