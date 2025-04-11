export class Product {
    constructor(
      public id: number,
      public title: string,
      public description: string,
      public price: number,
      public category: string,
      public brand: string, // Marca del producto
      public images: string[] // Array de imágenes
    ) {}
  }