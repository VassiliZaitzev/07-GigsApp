import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';

@NgModule({
  imports:[
    CommonModule
  ],
  exports:[
    HomePageComponent
  ],
  declarations:[
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent
  ]
})
export class GifsModule{

}
