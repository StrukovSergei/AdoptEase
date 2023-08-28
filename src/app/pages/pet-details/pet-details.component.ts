import { Location } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, catchError, lastValueFrom, map, switchMap } from 'rxjs';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
    selector: 'pet-details',
    templateUrl: './pet-details.component.html',
    styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent implements OnInit, OnDestroy {

    constructor(
        // DI
        private petService: PetService,
        private route: ActivatedRoute,
        // private router: Router
    ) { }
    // DI
    private router = inject(Router)
    private location = inject(Location)

    subscription!: Subscription

    ans = ''
    pet$!: Observable<Pet>
    pet!: Pet

    ngOnInit() {
        this.pet$ = this.route.data.pipe(map(data => data['pet']))

        // this.pet$ = this.route.params.pipe(
        //     switchMap((params) => this.petService.getById(params['id']))
        // )

        // Ok Solution...
        // this.route.params.subscribe(async params => {
        //     this.pet = await lastValueFrom(this.petService.getById(params['id']))
        // })


        // VERY BAD, never subscribe inside a subscribe!
        // this.route.params.subscribe(params => {
        //     this.petService.getById(params['id']).subscribe(pet=>this.pet = pet)
        // })

    }

    onShouldAdoptPet() {
        this.petService.shouldAdoptPet().subscribe(ans => {
            this.ans = ans
            setTimeout(() => {
                this.ans = ''
            }, 1500);
        })
    }

    onBack() {
        this.router.navigateByUrl('/')
        // this.router.navigate(['/'])
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe()
    }


}
