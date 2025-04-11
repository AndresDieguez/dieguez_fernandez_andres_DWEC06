import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  featuredProducts: Product[] = []; // Array para los productos destacados

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    // Obtenemos 4 productos como destacados
    this.productService.getProducts(8, 11).subscribe({
      next: (response) => {
        this.featuredProducts = response.products;
      },
      error: (err) => {
        console.error('Error al cargar productos destacados:', err); // Manejo de errores
      }
    });
  }
}

