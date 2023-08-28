import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
    selector: 'pet-index',
    templateUrl: './pet-index.component.html',
    styleUrls: ['./pet-index.component.scss']
})
export class PetIndexComponent implements OnInit, OnDestroy {

    constructor(private petService: PetService) { }
    subscription!: Subscription
    // pets: Pet[] | null = null
    pets$!: Observable<Pet[]>

    ngOnInit(): void {
        this.pets$ = this.petService.pets$
        // this.subscription = this.petService.pets$.subscribe(pets => {
        //     this.pets = pets
        // })
    }

    onRemovePet(petId: string) {
        this.petService.remove(petId).subscribe({
            error: err => console.log('err:', err)
        })
    }

 

    ngOnDestroy(): void {
        // this.subscription.unsubscribe()
    }

}
