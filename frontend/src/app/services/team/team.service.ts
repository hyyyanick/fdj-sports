import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '@interfaces/team.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseUrl = 'http://localhost:5000/api/team';
  private readonly _subject: BehaviorSubject<Team[]> = new BehaviorSubject<
    Team[]
  >([]);

  public teams$ = this._subject.asObservable();

  constructor(private http: HttpClient) {}

  getTeams(): void {
    this._subject.getValue();
  }

  setTeams(teams: Team[]): void {
    this._subject.next(teams);
  }

  getTeamWithPlayers(teamId: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teamId/${teamId}`);
  }
}
