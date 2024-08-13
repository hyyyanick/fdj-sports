import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { LeagueService } from '@services/league/league.service';
import { TeamService } from '@services/team/team.service';
import { League } from '@interfaces/leangue.interface';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [IonSearchbar, IonList, IonItem, IonLabel, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  options: League[] = [];
  searchQuery: string = '';
  private leagueService = inject(LeagueService);
  private teamService = inject(TeamService);

  constructor() {}

  searchByLeague(event: any): void {
    this.leagueService
      .getLeague(this.searchQuery)
      .subscribe((data: any) => (this.options = [data]));
  }

  getTeams(leagueName: string): void {
    this.leagueService.getLeagueWithTeams(leagueName).subscribe((data: any) => {
      this.teamService.setTeams(data.teams);
    });
  }

  selectOption(option: League): void {
    this.searchQuery = option.name;
    this.options = [];
    this.getTeams(option.name);
  }
}
