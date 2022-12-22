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
    // Este campo no viene en la respuesta de la peticion
    // por eso se le coloca el signo. el dato se calculara del
    // lado del frontend
    taxes?: number;
}


// La funcion Omit es propia de javascript y lo que hace es extender el modelo 
// Producto pero omitiendo solo las propiedades que no necesito. en este caso id y category
// y agregando nuevas propiedades
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
    categoryId: number;
}


// Partial lo que hace es colocar el signo ? a todos los atributos
// y lo que hacemos es extender de CreateProductDTO
export interface UpdateProductDTO extends Partial<CreateProductDTO> { }