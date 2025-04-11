import { Injectable } from '@angular/core'; // Importa Injectable para crear un servicio
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Importa HttpClient para hacer peticiones HTTP
import { Observable, throwError } from 'rxjs';  // Importa Observable para manejar las respuestas asíncronas
import { catchError, tap } from 'rxjs/operators'; // Importa operadores para manejar errores y realizar acciones secundarias
import { Product } from '../models/product.model'; // importa el modelo de producto

@Injectable({
  providedIn: 'root', // Proporciona el servicio en toda la aplicación
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {} // Constructor que inyecta HttpClient para hacer peticiones HTTP

  // Obtener los productos, pero con paginación por defecto 
  // El método getProducts recibe dos parámetros: limit (número de productos por página) y skip (número de productos a omitir). 
  // Estos parámetros se pasan en la URL de la solicitud.
  // La respuesta de la API ahora devuelve un objeto que contiene la lista de productos y el número total de productos.
  getProducts(limit: number = 0, skip: number = 0): Observable<{ products: Product[]; total: number }> {
    return this.http.get<{ products: Product[]; total: number }>(`${this.apiUrl}?limit=${limit}&skip=${skip}`).pipe(catchError(this.handleError));
  }

  // Obtener un producto por ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Obtener productos por categoría
  getProductsByCategory(category: string): Observable<Product[]> {  
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`).pipe(catchError(this.handleError));
  }
  
  // Obtener todas las categorías, nombre y slug
  getCategories(): Observable<{ slug: string; name: string }[]> {
    return this.http.get<{ slug: string; name: string }[]>('https://dummyjson.com/products/categories').pipe(catchError(this.handleError));
  }

  // Obtener lista de categorías
  getCategoriesList(): Observable<{ name: string }> {
    return this.http.get<{ name: string }>('https://dummyjson.com/products/category-list').pipe(catchError(this.handleError));
  }

  // Obtener productos por marca
  getProductsByBrand(brand: string): Observable<Product[]> {  
    return this.http.get<Product[]>(`${this.apiUrl}/brand/${brand}`).pipe(catchError(this.handleError));
  } 

  // Buscar productos por nombre
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?q=${query}`).pipe(catchError(this.handleError));
  } 

  // Crear un nuevo producto (POST)
  addProduct(product: Product): Observable<Product> {   
    return this.http.post<Product>(`${this.apiUrl}/add`, product).pipe(
      catchError(this.handleError),
      tap((newProduct) => {
        console.log('Respuesta de la API al crear un nuevo producto:', newProduct);
      })
    );
  }

   // Actualizar un producto (PUT)
   updateProduct(id: number, product: any): Observable<any> {
     return this.http.put<any>(`${this.apiUrl}/${id}`, product).pipe(
       catchError(this.handleError),
       tap(() => {
         console.log('Procediendo a Actualizar producto...');
       })
     );
   }

  // Eliminar un producto (DELETE)
  deleteProduct(id: number): Observable<void> {    
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError),
      tap(() => {
        console.log('Procediendo a al eliminar un producto el producto con ID:', id);
      })
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la API:', error);
    return throwError(() => new Error('Error en la conexión con la API. Inténtalo más tarde.'));
  }
}
