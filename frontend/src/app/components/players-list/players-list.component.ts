import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
  IonToast,
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { TeamService } from '@services/team/team.service';
import { Subscription } from 'rxjs';

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
    IonToast,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
  standalone: true,
})
export class PlayersListComponent implements OnInit, OnDestroy {
  players: Player[] = [];
  teamName: string = '';
  isErrorToastOpen: boolean = false;
  teamId: string = '';
  currentPage: number = 1;
  subscription: Subscription = new Subscription();
  private teamService = inject(TeamService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.teamId = params.get('id') as string;
      this.loadPlayers(null, this.teamId, this.currentPage);
    });
  }

  setOpen(isOpen: boolean): void {
    this.isErrorToastOpen = isOpen;
  }

  onIonInfinite(ev: any): void {
    this.loadPlayers(ev, this.teamId, this.currentPage);
  }

  loadPlayers(
    event: any,
    teamId: string,
    page: number,
    limit: number = 10
  ): void {
    this.subscription = this.teamService
      .getTeamWithPlayers(teamId, limit, page)
      .subscribe({
        next: (data: any) => {
          this.teamName = data.name;
          if (data.players.length === 0) {
            if (event)
              (event as InfiniteScrollCustomEvent).target.disabled = true;
          } else {
            this.currentPage++;
            this.players.push(...data.players);
            if (event) {
              (event as InfiniteScrollCustomEvent).target.complete();
            }
          }
        },
        error: (error) => {
          if (error.status === 500) {
            this.isErrorToastOpen = true;
            this.players = [];
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
