import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { storageService } from './async-storage.service';
import { FilterBy, Pet } from '../models/pet.model';
const ENTITY = 'pets'

@Injectable({
    providedIn: 'root'
})
export class PetService {
    constructor(private http: HttpClient) {
        const pets = JSON.parse(localStorage.getItem(ENTITY) || 'null');
        if (!pets || pets.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._createPets()))
        }
    }


    private _pets$ = new BehaviorSubject<Pet[]>([]);
    public pets$ = this._pets$.asObservable()


    private _filterBy$ = new BehaviorSubject<FilterBy>({ term: '' });
    public filterBy$ = this._filterBy$.asObservable()


    public query() {
        return from(storageService.query(ENTITY))
            .pipe(
                tap(pets => {
                    const filterBy = this._filterBy$.value
                    pets = pets.filter(pet => pet.name.toLowerCase().includes(filterBy.term.toLowerCase()))
                    this._pets$.next(pets)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }


    public shouldAdoptPet() {
        return this.http.get<{ answer: string }>('https://yesno.wtf/api')
            .pipe(
                map(res => res.answer),
                retry(1),
                catchError((err: HttpErrorResponse) => {
                    console.log('err:', err)
                    return throwError(() => err)
                })
            )
    }

    public getEmptyPet() {
        return { name: '', age: 0, birthDate: Date.now() }
    }

    public remove(petId: string) {
        return from(storageService.remove(ENTITY, petId))
            .pipe(
                tap(() => {
                    const pets = this._pets$.value
                    const petIdx = pets.findIndex(pet => pet._id === petId)
                    pets.splice(petIdx, 1)
                    this._pets$.next([...pets]);
                    return petId
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public getById(petId: string): Observable<Pet> {
        return from(storageService.get(ENTITY, petId))
            .pipe(
                retry(1),
                catchError(this._handleError)
            )
    }

    public save(pet: Pet) {
        return pet._id ? this._edit(pet) : this._add(pet)
    }

    public setFilterBy(filterBy: FilterBy) {
        this._filterBy$.next(filterBy)
        this.query().subscribe()
    }

    private _add(pet: Pet) {
        return from(storageService.post(ENTITY, pet))
            .pipe(
                tap(newPet => {
                    const pets = this._pets$.value
                    pets.push(newPet)
                    this._pets$.next([...pets])
                    return newPet
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _edit(pet: Pet) {
        return from(storageService.put(ENTITY, pet))
            .pipe(
                tap(updatedPet => {
                    const pets = this._pets$.value
                    const petIdx = pets.findIndex(_pet => _pet._id === pet._id)
                    pets.splice(petIdx, 1, updatedPet)
                    this._pets$.next([...pets])
                    return updatedPet
                }),
                retry(1),
                catchError(this._handleError)
            )
    }


    private _createPets() {
        const pets: Pet[] = [
            { _id: 'p123', name: 'Penrose', age: 2, birthDate: new Date('2020-11-12').getTime() },
            { _id: 'p124', name: 'Bobo', age: 6, birthDate: new Date('2021-8-30').getTime() },
            { _id: 'p125', name: 'Gertrude', age: 1, birthDate: new Date('2021-11-1').getTime() },
            { _id: 'p126', name: 'Popovich', age: 62, birthDate: new Date('1950-3-30').getTime() },
        ];
        return pets
    }

    private _handleError(err: HttpErrorResponse) {
        console.log('err:', err)
        return throwError(() => err)
    }

    private _makeId(length = 5) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
