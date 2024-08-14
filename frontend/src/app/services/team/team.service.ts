import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '@interfaces/team.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseUrl = 'http://localhost:5000/api/team';
  private readonly _subject: BehaviorSubject<Team[] | null> =
    new BehaviorSubject<Team[] | null>(null);

  public teams$ = this._subject.asObservable();

  constructor(private http: HttpClient) {}

  getTeams(): void {
    this._subject.getValue();
  }

  setTeams(teams: Team[] | null): void {
    this._subject.next(teams);
  }

  getTeamWithPlayers(
    teamId: string,
    limit: number,
    page: number
  ): Observable<Team> {
    return this.http.get<Team>(
      `${this.baseUrl}/teamId/${teamId}?limit=${limit}&&page=${page}`
    );
  }
}
