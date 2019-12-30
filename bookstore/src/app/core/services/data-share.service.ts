import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataShareService {

  shareDataSubject = new Subject<any>();

  constructor() { }

  sendData(data: any): void {
    this.shareDataSubject.next(data);
  }
}
