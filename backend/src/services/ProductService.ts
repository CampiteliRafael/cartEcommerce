import ProductModel from '../models/Product.model';

export async function findAllProductsService() {
  return ProductModel.find().lean();
}

export async function findProductByIdService(id: string) {
  return ProductModel.findById(id).lean();
}