import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';

@Component({
  selector: 'pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent {

    @Input() pets: Pet[] | null = null
    @Output() remove = new EventEmitter<string>()



}
