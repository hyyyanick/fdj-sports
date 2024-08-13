import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http.get(`${this.baseUrl}/api/search?q=${query}`);
  }
}
