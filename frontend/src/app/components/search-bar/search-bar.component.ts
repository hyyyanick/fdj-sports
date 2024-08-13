import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { SearchService } from '@services/search/search.service';
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
  private searchService = inject(SearchService);
  private teamService = inject(TeamService);

  constructor() {}

  searchByLeague(event: any): void {
    this.searchService
      .search(this.searchQuery)
      .subscribe((data: any) => (this.options = [data]));
  }

  getTeams(leagueId: string): void {
    this.searchService.search(leagueId).subscribe((data: any) => {
      console.log(data);
    });
  }

  selectOption(option: League): void {
    this.searchQuery = option.name;
    this.options = [];
  }
}
