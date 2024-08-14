import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { Team } from '@interfaces/team.interface';
import {
  InfiniteScrollCustomEvent,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonRouterLink,
  IonRow,
  NavController,
} from '@ionic/angular/standalone';
import { LeagueService } from '@services/league/league.service';
import { TeamService } from '@services/team/team.service';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    AsyncPipe,
    IonRouterLink,
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
  standalone: true,
})
export class TeamsListComponent implements OnDestroy {
  teams$: Observable<Team[] | null>;
  currentPage: number = 2;
  results: Team[] = [];
  leagueName: string = '';
  subscription: Subscription = new Subscription();
  private teamService = inject(TeamService);
  private leagueService = inject(LeagueService);

  constructor(private navCtl: NavController) {
    this.teams$ = this.teamService.teams$;
    this.leagueName = this.leagueService.getLeagueName();
  }

  goToTeamDetail(teamId: string): void {
    this.navCtl.navigateForward(['/team-detail', teamId]);
  }

  onIonInfinite(event: any): void {
    this.loadTeams(event, this.leagueName, this.currentPage);
  }

  loadTeams(
    event: any,
    leagueName: string,
    page: number,
    limit: number = 10
  ): void {
    this.subscription = this.leagueService
      .getLeagueWithTeams(leagueName, page, limit)
      .subscribe({
        next: (data: any) => {
          if (!data || !data.teams.length) {
            if (event)
              (event as InfiniteScrollCustomEvent).target.disabled = true;
          } else {
            this.currentPage++;
            this.results.push(...data.teams);
            this.teamService.setTeams(this.results);
            if (event) {
              (event as InfiniteScrollCustomEvent).target.complete();
            }
          }
        },
        error: (error) => {
          if (error.status === 500) {
            this.teamService.setTeams(null);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
