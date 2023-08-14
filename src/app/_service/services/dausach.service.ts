import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "environments/environment";
import { DauSach } from 'app/_model/sys/book/book.model';
import { HeadersUtil } from 'app/_util/headers-util';
import { DataResponse } from 'app/_model/resp/data-response';

@Injectable({
    providedIn: 'root'
})
export class DauSachService {
    constructor(private http: HttpClient) { }
    apiMessange: any;
    postData(dausach: DauSach, quantity: number): Observable<any> {
        console.log("Starting add");
        const apiUrl = `http://localhost:8096/api/admin/sys0201/add?quantity=${quantity}`;
        // console.log(accessToken);
        // console.log(quantity);
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const jsonData = JSON.stringify(dausach);
        return this.http.post(`${apiUrl}`, jsonData, { headers });
    }
    getData(): Observable<any> {
        const apiUrl = environment.backApiUrl + '/admin/sys0201/get'
        console.log("Fetching");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.get(`${apiUrl}`, { headers });
    }

    getBookDetail(bookCode: string): Observable<any> {
        const apiUrl = environment.backApiUrl + `/admin/sys0201/get/${bookCode}`
        console.log("Fetching book detail");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.get(`${apiUrl}`, { headers });
    }

    changeStatus(status: any, bookCode: string): Observable<any> {
        console.log("Starting to change status");
        const apiUrl = environment.backApiUrl + `/admin/sys0201/status/${bookCode}?status=${status}`;
        // console.log(accessToken);
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.put(`${apiUrl}`, '', { headers });
    }

    updateBookTitle(dausach: DauSach): Observable<any> {
        console.log("Starting to update book title");
        const apiUrl = environment.backApiUrl + `/admin/sys0201/update`;
        // console.log(accessToken);
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.put(`${apiUrl}`, dausach, { headers });
    }

    getBookData(bookCode: string): Observable<any> {
        const apiUrl = environment.backApiUrl + `/admin/sys0203/get/${bookCode}`
        console.log("Fetching");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.get(`${apiUrl}`, { headers });
    }

    addBook(bookCode: string, quantity: number): Observable<any> {
        const apiUrl = environment.backApiUrl + `/admin/sys0203/add/${bookCode}?quantity=${quantity}`
        console.log("Adding books");
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        return this.http.post(`${apiUrl}`, '', { headers });
    }

    //không cần token lấy cho home
    getBookTitle(page: Number): Observable<any> {
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        // const url = environment.backApiUrl + '/public/getBookTitle';
        const url = environment.backApiUrl + '/public/getBookTitle?page=' + page;
        return this.http.get<DataResponse>(url, { headers: headers });
    }

    //không cần token lấy cho home
    getBookTitleDetail(bookCode: String): Observable<any>{
    //   const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
      // const url = environment.backApiUrl + '/public/get/${bookCode}';
      const url = environment.backApiUrl + `/public/get/${bookCode}`
      return this.http.get<DataResponse>(url);
     }

    getBookBySearch(input: String): Observable<any> {
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        // const url = environment.backApiUrl + '/public/getBookTitle';
        const url = environment.backApiUrl + '/public/getBookTitleSearch?search=' + input;
        return this.http.get<DataResponse>(url, { headers: headers });
    }
}

