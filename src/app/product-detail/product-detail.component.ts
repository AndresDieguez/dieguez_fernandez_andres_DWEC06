import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  // non-null assertion operator (!): Indica que la propiedad se inicializará más tarde
  // Si no TypeScript dará error porque te exige que inicialices las propiedades sí o sí en una clase
  product!: Product; // Producto seleccionado

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    // Obtener ID del producto de la URL y cargar el producto correspondiente
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    this.productService.getProductById(id).subscribe(
      (data) => (this.product = data), // Cargar el producto
      (error) => console.error('Error al cargar producto', error) // Manejo de errores
    );
  }
}