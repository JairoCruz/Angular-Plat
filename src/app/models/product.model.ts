export interface Category {
    id: string;
    name: string;
}


export interface Product {
    id: string;
    title: string;
    price: number;
    images: string[];
    description: string;
    category: Category;
}


// La funcion Omit es propia de javascript y lo que hace es extender el modelo 
// Producto pero omitiendo solo las propiedades que no necesito. en este caso id y category
// y agregando nuevas propiedades
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
    categoryId: number;
}