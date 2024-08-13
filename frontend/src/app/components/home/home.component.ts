import { Component } from '@angular/core';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { TeamsListComponent } from '@components/teams-list/teams-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [SearchBarComponent, TeamsListComponent],
  standalone: true,
})
export class HomeComponent {}
