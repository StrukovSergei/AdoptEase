import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FilterBy } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
    selector: 'pet-filter',
    templateUrl: './pet-filter.component.html',
    styleUrls: ['./pet-filter.component.scss']
})
export class PetFilterComponent implements OnInit, OnDestroy {

    constructor(private petService: PetService) { }

    filterBy!: FilterBy
    filterBySubject$ = new Subject()
    destroySubject$ = new Subject()

    ngOnInit(): void {
        this.petService.filterBy$
            .pipe(takeUntil(this.destroySubject$))
            .subscribe(filterBy => {
                this.filterBy = filterBy
            })

        this.filterBySubject$
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this.destroySubject$)
            )
            .subscribe(x => {
                console.log('x:', x)
                this.petService.setFilterBy(this.filterBy)
            })
    }

    onSetFilterBy(value: string) {
        // this.petService.setFilterBy(this.filterBy)
        this.filterBySubject$.next(value)
    }

    ngOnDestroy(): void {
        this.destroySubject$.next(null)
        this.destroySubject$.unsubscribe()
    }

}
