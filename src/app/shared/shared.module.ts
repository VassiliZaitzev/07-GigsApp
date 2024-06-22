import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent
  ],
  declarations: [
    SidebarComponent
  ]
})
export class SharedModule{}
