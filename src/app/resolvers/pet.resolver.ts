import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PetService } from '../services/pet.service';
import { Pet } from '../models/pet.model';
import { delay } from 'rxjs';

export const petResolver: ResolveFn<Pet> = (route, state) => {
    const id = route.params['id']
    return inject(PetService).getById(id).pipe(delay(100))
};
