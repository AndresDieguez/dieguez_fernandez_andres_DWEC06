import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-tienda',
  standalone: false,
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';

  page: number = 1; // Página actual
  totalProducts: number = 0; // Total de productos
  totalFilteredProducts: number = 0; // Total de productos filtrados
  productsPerPage: number = 28; // Productos por página

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  // Obtener productos con paginación
  loadProducts(): void {
    const skip = (this.page - 1) * this.productsPerPage;
    
    // Si hay filtro por categoría, obtenemos los productos filtrados
    if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(
        (response: any) => {
          this.filteredProducts = response.products;
          this.totalFilteredProducts = response.total; // Total filtrado
          this.totalProducts = this.totalFilteredProducts; // Actualizamos total de productos
          this.updatePagination();
        },
        (error) => console.error('Error al obtener los productos por categoría', error)
      );
    } else {
      this.productService.getProducts(this.productsPerPage, skip).subscribe(
        (response: any) => {
          this.products = response.products;
          this.filteredProducts = this.products;
          this.totalProducts = response.total; // Total de todos los productos
          this.updatePagination();
        },
        (error) => console.error('Error al obtener los productos', error)
      );
    }
  }

  
  // Obtener categorías desde la API con la funcion getCategoriesList() y cargarlas en el array categories[]
  loadCategories(): void {
    this.productService.getCategoriesList().subscribe(
      (categoriasDevueltas: any) => {
        this.categories = categoriasDevueltas // cargamos el array categories[] con la respuesta de la API
      },
      (error) => console.error('Error al obtener las categorías', error)
    );
  }

  // Filtrar productos por categoría
  filterByCategory(): void {
    this.page = 1; // Restablecer a la primera página al cambiar categoría
    this.loadProducts(); // Recargar productos con el nuevo filtro
  }

  // Buscar productos por nombre
  searchProducts(): void {
    if (this.searchQuery.trim()) {
      this.productService.searchProducts(this.searchQuery).subscribe(
        (response: any) => {
          this.filteredProducts = response.products;
          this.totalFilteredProducts = response.total; // Total filtrado por búsqueda
          this.totalProducts = this.totalFilteredProducts;
          this.updatePagination();
        },
        (error) => console.error('Error en la búsqueda', error)
      );
    } else {
      this.filteredProducts = this.products;
      this.totalProducts = this.products.length;
      this.updatePagination();
    }
  }

  // Cambiar de página
  changePage(page: number): void {
    this.page = page;
    this.loadProducts();
  }

  // Calcular el total de páginas
  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.productsPerPage);
  }

  // Actualizar la paginación después de aplicar un filtro
  updatePagination(): void {
    if (this.totalFilteredProducts && this.selectedCategory) {
      // Si hay filtrado, actualizar la paginación con los productos filtrados
      this.totalProducts = this.totalFilteredProducts;
    }
  }
}
