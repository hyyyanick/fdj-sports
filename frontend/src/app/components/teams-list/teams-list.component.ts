import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Team } from '@interfaces/team.interface';
import {
  IonCol,
  IonGrid,
  IonImg,
  IonRouterLink,
  IonRow,
  NavController,
} from '@ionic/angular/standalone';
import { TeamService } from '@services/team/team.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
  imports: [IonGrid, IonRow, IonCol, IonImg, AsyncPipe, IonRouterLink],
  standalone: true,
})
export class TeamsListComponent {
  teams$: Observable<Team[]>;
  private teamService = inject(TeamService);

  constructor(private navCtl: NavController) {
    this.teams$ = this.teamService.teams$;
  }

  goToTeamDetail(teamId: string): void {
    this.navCtl.navigateForward(['/team-detail', teamId]);
  }
}
