import ProductModel, { ProductDocument } from '../models/Product.model';

export async function findAllProductsService() {
  return ProductModel.find().lean();
}

export async function findProductByIdService(id: string): Promise<ProductDocument | null> {
  return ProductModel.findById(id);
}