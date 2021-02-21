import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDrawerMode} from '@angular/material/sidenav';
import {EventService} from 'src/app/components/services/events/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'cook-it';
  opened = true;
  mode: MatDrawerMode = 'over';

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.openSidenav.subscribe(next => this.opened = next);
  }

}
