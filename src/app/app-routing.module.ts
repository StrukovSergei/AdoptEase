import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetIndexComponent } from './pages/pet-index/pet-index.component';
import { AboutComponent } from './pages/about/about.component';
import { PetDetailsComponent } from './pages/pet-details/pet-details.component';
import { PetEditComponent } from './pages/pet-edit/pet-edit.component';
import { authGuard } from './guards/auth.guard';
import { petResolver } from './resolvers/pet.resolver';

const routes: Routes = [
    {
        path: 'pet/:id',
        component: PetDetailsComponent,
        canActivate: [authGuard],
        resolve: { pet: petResolver }
    },
    { path: 'about', component: AboutComponent },
    {
        path: '', component: PetIndexComponent, children: [
            { path: 'edit', component: PetEditComponent },
            { path: 'edit/:id', component: PetEditComponent, resolve: { pet: petResolver } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
