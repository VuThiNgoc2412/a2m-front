import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataResponse } from "app/_model/resp/data-response";
import { Book } from "app/_model/user/book.model";
import { WaitList } from "app/_model/user/waitlist.model";
import { HeadersUtil } from "app/_util/headers-util";
import { environment } from "environments/environment";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})
//notification
export class User0104Service {

    constructor(private http: HttpClient){

    }
    getNotification(): Observable<any>{
        const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
        const url = environment.backApiUrl + '/user/notification/get';
        return this.http.get<DataResponse>(url, { headers: headers });
    }

    // insert(book: Book){
    //     const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    //     const url = environment.backApiUrl + '/user/notification/insert';
    //     return this.http.post<DataResponse>(url, book, { headers: headers });
    // }

    // delete(book: Book){
    //     const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    //     const url = environment.backApiUrl + '/user/waitlist/delete';
    //     return this.http.post<DataResponse>(url, book, { headers: headers });
    // }

}