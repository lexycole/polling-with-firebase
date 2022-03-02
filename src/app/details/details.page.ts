import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EventResponse, EmergencyEvent, Acknowledgement } from '../interfaces';
import { Network } from '@ngx-pwa/offline';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.css'],
})
export class DetailsPage implements OnInit {
  eventId: number;
  eventResponse: EventResponse;
  event: EmergencyEvent;
  acknowledgements: Acknowledgement[] = [];
  newNote = '';
  online$ = this.network.onlineChanges;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private nav: NavController,
    protected network: Network) {
  }

  async ngOnInit() {
    this.eventId = +this.route.snapshot.params['eventId'];
    this.eventResponse = await this.eventService.getById(this.eventId).toPromise();
    this.event = this.eventResponse.event;
    console.log(this.event);
    this.acknowledgements = await this.eventService.getAcknowledgements(this.eventResponse).toPromise();
  }
}
