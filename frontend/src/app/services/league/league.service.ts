import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private baseUrl = 'http://localhost:5000/api/league';

  constructor(private http: HttpClient) {}

  getLeague(query: string) {
    return this.http.get(`${this.baseUrl}?q=${query}`);
  }

  getLeagueWithTeams(leagueName: string) {
    return this.http.get(`${this.baseUrl}/leagueName/${leagueName}`);
  }
}
