import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Stream } from './stream.model';

@Injectable()
export class StreamsService {
  constructor(private http: Http) { }

  getStreamsList(): Observable<Array<Stream>> {
    return this.http
      .get('/api/v0/streams')
      .map(responseStreams => responseStreams.json() as Array<Stream>);
  }

  addStream(newStream): Observable<Stream> {
    return this.http
      .post('/api/v0/streams', newStream)
      .map(responseStream => responseStream.json() as Stream);
  }
}
