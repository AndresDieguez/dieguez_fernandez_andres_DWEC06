import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes necesarios
import { HomeComponent } from './home/home.component';
import { TiendaComponent } from './tienda/tienda.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

// Definir las rutas de la aplicación
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'product/:id', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
