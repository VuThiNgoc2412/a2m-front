import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  private events: EventSource;

  connect(){
    this.events = new EventSource(environment.backApiUrl + '/public/subscribe/20230807084858850');

    console.log(123)
    this.events.onmessage = event => {
      console.log(event);
      console.log(event.data);

      // const parsedData = JSON.parse(event.data);
      // switch (parsedData.type) {
      //   case "init-connection":
      //     setProcess(parsedData.processId);
      // }
    }
  };


  // private eventSource: EventSource | undefined;

  // connect(): Observable<any> {
  //   return new Observable<any>(observer => {
  //     this.eventSource = new EventSource(environment.backApiUrl + '/public/sse');
      
  //     this.eventSource.onmessage = event => {
  //       observer.next(event.data);
  //     };

  //     this.eventSource.onerror = error => {
  //       observer.error(error);
  //       observer.complete();
  //     };

  //     this.eventSource.close = () => {
  //       observer.complete();
  //     };
  //   });
  // }

  disconnect() {
    if (this.events) {
      this.events.close();
      // this.events = undefined;
    }
  }
}