import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';

@Component({
    selector: 'pet-preview',
    templateUrl: './pet-preview.component.html',
    styleUrls: ['./pet-preview.component.scss']
})
export class PetPreviewComponent {
    @Input() pet!: Pet
    @Output() remove = new EventEmitter<string>()

}
