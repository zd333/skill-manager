import { Observable } from 'rxjs/Rx';
import { BasePdp, Pdp } from './pdp.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PdpsService {

  constructor(private http: Http) { }

  addPdp(newPdp: BasePdp): Observable<Pdp> {
    return this.http
      .post('/api/v0/pdps', newPdp)
      .map(responsePdp => new Pdp(responsePdp.json()));
  }
}
