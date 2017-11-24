import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import * as Rx from 'rxjs';

@Injectable()
export class RestDataService {

    // public _pageSize: number;
    // public _baseUri: string;

    constructor(public http: Http, private userService: UserService) {
    }

    getAll<T>(url: string) : Observable<T> {        
        return Rx.Observable.defer(() => Rx.Observable.fromPromise(this.getToken()))
            .flatMap(promiseResult => this.http.get(url, { headers: this.getHeaders(<string>promiseResult) })
                                               .map(response => <T>(<Response>response).json())
            );
    }
    
    private getHeaders(token: string){

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        headers.append("Authorization", "Bearer " + token);
        
        return headers;
    }

    private getToken() {
        return this.userService.getUserData().getToken().then((token) => { return token; });
    }

    // set(baseUri: string, pageSize?: number): void {
    //     this._baseUri = baseUri;
    //     this._pageSize = pageSize;
    // }

    // get(page: number) {
    //     var uri = this._baseUri + page.toString() + this._pageSize.toString();

    //     return this.http.get(uri)
    //         .map(response => (<Response>response));
    // }

    // getWithParams<T>(paramsUrl: string) {
    //     var uri = this._baseUri + paramsUrl;

    //     return this.http.get(uri)
    //         .map(response => <T>(<Response>response).json());
    // }

    // getById<T>(id: number) {
    //     var uri = this._baseUri + id.toString();

    //     return this.http.get(uri)
    //         .map(response => <T>(<Response>response).json());
    // }


    // post<T>(data?: any): Observable<T> {
    //     var uri = this._baseUri;
    //     var dataText = data ? JSON.stringify(data) : "";
    //     return this.http.post(uri, dataText)
    //         .map(response => <T>(<Response>response).json());
    // }

    // put<T>(id: number, data: any): Observable<T> {
    //     var uri = this._baseUri + id.toString();
    //     return this.http.put(uri, JSON.stringify(data))
    //         .map(response =>  <T>(<Response>response).json());
    // }


    // deleteById<T>(id: number) {
    //     var uri = this._baseUri + id.toString();
    //     return this.http.delete(uri)
    //         .map(response => <T>(<Response>response).json());
    // }

    // deleteResource(resource: string) {
    //     return this.http.delete(resource)
    //         .map(response => <any>(<Response>response).json());
    // }
}