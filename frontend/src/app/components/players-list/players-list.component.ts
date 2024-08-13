import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '@interfaces/player.interface';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonText,
  IonNote,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { TeamService } from '@services/team/team.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonText,
    IonNote,
    DatePipe,
  ],
  standalone: true,
})
export class PlayersListComponent implements OnInit {
  players: Player[] = [];
  teamName: string = '';
  private teamService = inject(TeamService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const teamId = params.get('id') as string;
      this.teamService.getTeamWithPlayers(teamId).subscribe((data: any) => {
        this.teamName = data.name;
        this.players = data.players;
      });
    });
  }
}
