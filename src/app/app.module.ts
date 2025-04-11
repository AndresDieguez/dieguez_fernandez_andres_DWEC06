import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

// Importar módulos necesarios
import { HttpClientModule } from '@angular/common/http';  // Para las solicitudes HTTP
import { FormsModule } from '@angular/forms'; // Para formularios reactivos y plantillas
import { AppRoutingModule } from './app-routing.module'; // Para la navegación entre componentes

// Importar componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TiendaComponent } from './tienda/tienda.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TiendaComponent,
    AdministracionComponent,
    ProductDetailComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, // Módulo principal de Angular
    AppRoutingModule, // Para la navegación entre componentes
    HttpClientModule,  // Para las solicitudes HTTP
    FormsModule // Para formularios reactivos y plantillas
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
