import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { PetIndexComponent } from './pages/pet-index/pet-index.component';
import { HttpClientModule } from '@angular/common/http';
import { PetListComponent } from './cmps/pet-list/pet-list.component';
import { PetPreviewComponent } from './cmps/pet-preview/pet-preview.component';
import { PetFilterComponent } from './cmps/pet-filter/pet-filter.component';
import { FormsModule } from '@angular/forms';
import { PetDetailsComponent } from './pages/pet-details/pet-details.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AboutComponent } from './pages/about/about.component';
import { PetService } from './services/pet.service';
import { PetEditComponent } from './pages/pet-edit/pet-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        PetIndexComponent,
        PetListComponent,
        PetPreviewComponent,
        PetFilterComponent,
        PetDetailsComponent,
        AppHeaderComponent,
        AboutComponent,
        PetEditComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
