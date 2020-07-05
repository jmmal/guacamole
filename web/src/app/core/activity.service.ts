import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface GetAllResponse {
  totalCount: number;
  results: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  distance: number;
  startTime: Date;
  endTime: Date;
  pace: number;
  elapsedTime: number;
  movingTime: number;
  polyline: string;
  locations: LatLng[];
  bounds: Bounds;
}

export interface Bounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private routes = {
    activities: '/activities',
    upload: '/upload'
  }

  constructor(private httpClient: HttpClient) { }

  getAllRuns(pageSize: number = 20, pageNumber: number = 1): Observable<GetAllResponse> {
    const url = environment.baseUrl + this.routes.activities;

    let params = new HttpParams()
      .set("pageSize", pageSize.toString())
      .set("pageNumber", pageNumber.toString());

    return this
      .httpClient
      .get<GetAllResponse>(url, { params: params });
  }

  getRun(id: string): Observable<Activity> {
    const url = environment.baseUrl + this.routes.activities + '/' + id;

    return this
      .httpClient
      .get<Activity>(url);
  }

  createActivity(file: File): Observable<any> {
    const url = environment.baseUrl + this.routes.upload;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post(url, formData);
  }
}
