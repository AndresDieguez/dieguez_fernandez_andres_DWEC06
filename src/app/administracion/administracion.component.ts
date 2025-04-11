import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';  // Asegúrate de importar el servicio
import { Product } from '../models/product.model';  // Importar el modelo de producto

@Component({
  selector: 'app-administracion',
  standalone: false,
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
})
export class AdministracionComponent implements OnInit {
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;

  // Propiedades para el manejo de productos
  products: Product[] = [];
  selectedProduct: Product | null = null;

  // Para el formulario de crear o editar producto
  newProduct: Product = new Product(0, '', '', 0, '', '', []);

  constructor(private productService: ProductService) {}

  ngOnInit() {
      if (typeof window !== 'undefined' && localStorage) {
        this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        console.log('Estado de autenticación al cargar la página:', this.isAuthenticated ? 'Autenticado' : 'No autenticado');
      } else {
        console.warn('⚠ localStorage no está disponible en este entorno.');
      }
    

    // Cargar productos al inicio
    this.loadProducts();
  }

  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      console.log('Usuario autenticado');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    this.username = '';
    this.password = '';
    console.log('Usuario desconectado');
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.products;
        console.log('Productos cargados:', this.products);
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  addProduct(productForm: any) {
    if (productForm.valid) {
      this.productService.addProduct(this.newProduct).subscribe(
        (newProduct) => {
          this.products.push(newProduct);
          console.log('Producto creado con éxito:', newProduct);
          this.newProduct = new Product(0, '', '', 0, '', '', []);
          productForm.resetForm();
        },
        (error) => {
          console.error('Error al crear el producto:', error);
        }
      );
    }
  }

  // Editar un producto
  editProduct(product: Product) {
    this.selectedProduct = { ...product };  // Cargar los datos del producto en el formulario
    this.newProduct = { ...product };  // También cargamos los datos en el objeto newProduct
  }

   // Actualizar un producto
   updateProduct(productForm: any) {
     if (productForm.valid && this.selectedProduct) {
       
        this.productService.updateProduct(this.selectedProduct.id, this.newProduct.title).subscribe(
          (respuesta) => {
          console.log('Se va actualizar el siguiente producto:', respuesta); 
          if (this.newProduct) {
            console.log(`Producto con id nº: ${this.newProduct.id} actualizado con éxito con los siguientes datos:`);
            console.log('titulo: '+this.newProduct.title);
            console.log('descripcion: '+this.newProduct.description);
            console.log('precio: '+this.newProduct.price);
            console.log('categoria: '+this.newProduct.category);
            console.log('marca: '+this.newProduct.brand);
            console.log('imagenes: '+this.newProduct.images);
           }
          // Actualizar el producto en la lista local
            const index = this.products.findIndex((product) => product.id === this.selectedProduct?.id);
            if (index !== -1) {
              this.products[index] = this.newProduct;
            }
  
            // Limpiar el formulario y los errores, y volver al estado de "Añadir producto"
            this.selectedProduct = null; // Limpiar el producto seleccionado
            this.newProduct = new Product(0, '', '', 0, '', '', []); // Reiniciar el formulario
            productForm.resetForm(); // Limpiar el formulario
                    
         },
         ((error) => {
         console.error('Error al actualizar el producto:', error);
         })
        );
     }
   }

  // Eliminar un producto
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (respueta) => {
        this.products = this.products.filter((product) => product.id !== id);
        console.log('Producto eliminado con éxito', respueta);
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }
}

