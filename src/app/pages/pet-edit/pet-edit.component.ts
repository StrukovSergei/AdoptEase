import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
    selector: 'pet-edit',
    templateUrl: './pet-edit.component.html',
    styleUrls: ['./pet-edit.component.scss']
})
export class PetEditComponent implements OnInit {
    private petService = inject(PetService)
    private route = inject(ActivatedRoute)
    private router = inject(Router)

    // pet: Partial<Pet> = this.petService.getEmptyPet()
    pet = this.petService.getEmptyPet() as Pet
    ngOnInit(): void {

        this.route.data
            .pipe(
                map(data => data['pet']),
                filter(pet => !!pet)
            )
            .subscribe(pet => this.pet = pet)
        // this.route.params
        //     .pipe(
        //         map(params => params['id']),
        //         filter(id => !!id),
        //         switchMap(id => this.petService.getById(id))
        //     )
        //     .subscribe(pet => this.pet = pet)
    }


    onSavePet() {
        this.petService.save(this.pet)
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: err => console.log('err:', err)
            })
    }

    onHandleBirthDate(date: string) {
        this.pet.birthDate = new Date(date).getTime()
    }
}
