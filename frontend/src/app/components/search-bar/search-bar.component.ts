import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonToast,
} from '@ionic/angular/standalone';
import { LeagueService } from '@services/league/league.service';
import { TeamService } from '@services/team/team.service';
import { League } from '@interfaces/leangue.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [IonSearchbar, IonList, IonItem, IonLabel, IonToast, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnDestroy {
  options: League[] = [];
  searchQuery: string = '';
  isToastOpen: boolean = false;
  isErrorToastOpen: boolean = false;
  subscriptions: Subscription[] = [];
  private leagueService = inject(LeagueService);
  private teamService = inject(TeamService);

  constructor() {}

  searchByLeague(event: any): void {
    this.subscriptions.push(
      this.leagueService.getLeague(this.searchQuery).subscribe({
        next: (data: any) => {
          this.options = data;
          if (this.options.length == 0) this.isToastOpen = true;
        },
        error: (error) => {
          if (error.status === 500) {
            this.isErrorToastOpen = true;
            this.options = [];
          }
        },
      })
    );
  }

  setOpen(isOpen: boolean): void {
    this.isToastOpen = isOpen;
    this.isErrorToastOpen = isOpen;
  }

  getTeamsByLeagueName(leagueName: string): void {
    this.subscriptions.push(
      this.leagueService.getLeagueWithTeams(leagueName).subscribe({
        next: (data: any) => {
          this.teamService.setTeams(data.teams);
        },
        error: (error) => {
          if (error.status === 500) {
            this.isErrorToastOpen = true;
            this.options = [];
          }
        },
      })
    );
  }

  selectOption(option: League): void {
    this.searchQuery = option.name;
    this.options = [];
    this.leagueService.setLeagueName(option.name);
    this.getTeamsByLeagueName(option.name);
  }

  clearContent(event: any): void {
    this.searchQuery = '';
    this.options = [];
    this.teamService.setTeams(null);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
