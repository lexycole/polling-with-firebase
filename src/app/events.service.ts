import { Injectable } from '@angular/core';
import { EventResponse, Acknowledgement } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private endpoint = 'https://us-central1-ps-notify-api.cloudfunctions.net/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<EventResponse> {
    return Observable.create((observer: Observer<EventResponse>) => {
      const self = this;
      self.getLatest().subscribe(res => onNext(res), observer.error);

      function onNext(response: EventResponse) {
        observer.next(response);
        if (response.links.next) {
        self.getByRoute<EventResponse>(response.links.next).subscribe(res => onNext(res), observer.error);
        } else {
          observer.complete();
        }
      }
    });
  }

  private getByRoute<T>(route: string): Observable<T> {
    const url = `${this.endpoint}${route}`;
    return this.http.get<T>(url);
  }

  getLatest(): Observable<EventResponse> {
    const route = `/latest`;
    return this.getByRoute<EventResponse>(route);
  }  

  getById(id: number): Observable<EventResponse> {
    const route = `/event/${id}`;
    return this.getByRoute<EventResponse>(route);
  }  

  getAcknowledgements(event: EventResponse): Observable<Acknowledgement[]> {
    return this.getByRoute<Acknowledgement[]>(event.links.acknowledgements);
  }
}
