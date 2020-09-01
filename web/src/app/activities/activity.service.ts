// Core Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Third Party Imports
import { Observable } from 'rxjs';

// App Imports
import { environment } from 'src/environments/environment';
import { GetAllResponse, Activity, InsertResponse, ActivityTypeAggregation } from './activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private routes = {
    activities: '/activities',
    upload: '/upload',
    filters: '/filters'
  };

  constructor(private httpClient: HttpClient) { }

  getAllRuns(pageNumber: number = 1, pageSize: number = 5, type: string = null): Observable<GetAllResponse> {
    const url = environment.baseUrl + this.routes.activities;

    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    if (type && type !== '') {
      params = params.append('type', type);
    }

    return this
      .httpClient
      .get<GetAllResponse>(url, { params });
  }

  getRun(id: string): Observable<Activity> {
    const url = environment.baseUrl + this.routes.activities + '/' + id;

    return this
      .httpClient
      .get<Activity>(url);
  }

  createActivity(file: File): Observable<InsertResponse> {
    const url = environment.baseUrl + this.routes.upload;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<InsertResponse>(url, formData);
  }

  getFilters(): Observable<ActivityTypeAggregation[]> {
    const url = environment.baseUrl + this.routes.filters;

    return this.httpClient.get<ActivityTypeAggregation[]>(url);
  }
}
