import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Image} from "./image.model";
import {environment} from "../../env/env";
import {ImageResponse} from "./imageResponse.model";
import {Accommodation} from "../../layout/accommodations/shared/models/accommodation.model";

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImage(imageId: number | undefined): Observable<Blob> {
    return this.http.get(environment.apiHost + 'images/' + imageId, { responseType: 'blob' });
  }

  create(image: FormData): Observable<ImageResponse> {
    return this.http.post<Image>(environment.apiHost+'images', image);
  }

  addToAccommodation(accommodationId: number, imageId: number ): Observable<Accommodation>{
    return this.http.put(`${environment.apiHost}accommodations/${accommodationId}/add/${imageId}`, {});
  }

  addToAccommodationModification(accommodationModificationId: number, imageId: number ): Observable<Accommodation>{
    return this.http.put(`${environment.apiHost}accommodation-modifications/${accommodationModificationId}/add/${imageId}`, {});
  }

}
