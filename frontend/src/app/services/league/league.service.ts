import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private baseUrl = 'http://localhost:5000/api/league';

  constructor(private http: HttpClient) {}

  getLeague(query: string) {
    return this.http.get<any[]>(`${this.baseUrl}?q=${query}`).pipe(
      map((response) => {
        if (!response) {
          return [];
        }
        return [response];
      })
    );
  }

  setLeagueName(leagueName: string) {
    localStorage.setItem('leagueName', leagueName);
  }

  getLeagueName(): string {
    return localStorage.getItem('leagueName') as string;
  }

  getLeagueWithTeams(leagueName: string, page: number = 1, limit: number = 10) {
    return this.http.get(
      `${this.baseUrl}/leagueName/${leagueName}?page=${page}&&limit=${limit}`
    );
  }
}
