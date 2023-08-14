import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class SearchService {

 dataEmitter = new EventEmitter<string>();

  raiseDataEmitterEvent(data: string){
    this.dataEmitter.emit(data);
  }
  constructor() { }
}
