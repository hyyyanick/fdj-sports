import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  search(leagueId: string) {
    return this.http.get(`${this.baseUrl}/api/team/${leagueId}`);
  }
}