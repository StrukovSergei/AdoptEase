import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private petService: PetService) { }

    title = 'pets-inclass';

    ngOnInit(): void {
        this.petService.query()
            .pipe(take(1))
            .subscribe({
                error: err => console.log('err:', err),
            })
    }

}
