import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  recipeListChanged = new EventEmitter<void>();
  openSidenav = new EventEmitter<boolean>();
}
