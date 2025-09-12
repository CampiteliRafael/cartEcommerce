import request from "supertest";
import app from "../../app";
import { signJwt } from "../../utils/jwt.utils";
import * as CartService from "../../services/cart.service";
import * as ProductService from "../../services/ProductService";
import mongoose from "mongoose";
import { CartDocument } from "../../models/Cart.model";

const userPayload = {
  userId: "user-123",
  name: "Test User",
  email: "test@example.com",
};

const productPayload = {
  _id: "product-abc",
  name: "Produto Teste",
  price: 100,
  stock: 10,
};

const cartItemInput = {
  productId: "product-abc",
  quantity: 2,
};

describe("Rotas do Carrinho", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe("POST /api/cart/items", () => {
    it("deve retornar 401 Unauthorized se o usuário não estiver logado", async () => {
      const response = await request(app)
        .post("/api/cart/items")
        .send(cartItemInput);
      expect(response.status).toBe(401);
    });

    it("deve retornar 400 Bad Request se os dados do corpo forem inválidos", async () => {
      const token = signJwt(userPayload);
      const response = await request(app)
        .post("/api/cart/items")
        .set("Authorization", `Bearer ${token}`)
        .send({ productId: "product-abc" });

      expect(response.status).toBe(400);
    });

    it("deve retornar 404 Not Found se o produto não existir", async () => {
      const token = signJwt(userPayload);
      jest
        .spyOn(ProductService, "findProductByIdService")
        .mockResolvedValue(null);

      const response = await request(app)
        .post("/api/cart/items")
        .set("Authorization", `Bearer ${token}`)
        .send({ productId: "non-existent-product", quantity: 1 });

      expect(response.status).toBe(404);
    });

    it("deve adicionar um item ao carrinho e retornar 200 com o carrinho atualizado", async () => {
      const token = signJwt(userPayload);
      const mockCart = {
        _id: "cart-xyz",
        user: userPayload.userId,
        items: [{ product: productPayload._id, quantity: 2, price: 100 }],
      };

      jest
        .spyOn(ProductService, "findProductByIdService")
        .mockResolvedValue(productPayload as any);
      const addItemToCartServiceMock = jest
        .spyOn(CartService, "addItemToCartService")
        .mockResolvedValue(mockCart as any);

      const response = await request(app)
        .post("/api/cart/items")
        .set("Authorization", `Bearer ${token}`)
        .send(cartItemInput);

      expect(response.status).toBe(200);
      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].quantity).toBe(2);
      expect(addItemToCartServiceMock).toHaveBeenCalledWith(
        userPayload.userId,
        cartItemInput.productId,
        cartItemInput.quantity
      );
    });
  });

  describe("GET /api/cart", () => {
    it("deve retornar 401 Unauthorized se o usuário não estiver logado", async () => {
      const response = await request(app).get("/api/cart");
      expect(response.status).toBe(401);
    });

    it("deve retornar o carrinho do usuário com os produtos populados", async () => {
      const token = signJwt(userPayload);
      const mockCart = {
        user: userPayload.userId,
        items: [
          {
            product: { _id: "prod-abc", name: "Produto Teste" },
            quantity: 2,
            price: 100,
          },
        ],
      };

      const findUserCartServiceMock = jest
        .spyOn(CartService, "findUserCartService")
        .mockResolvedValue(mockCart as any);

      const response = await request(app)
        .get("/api/cart")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].product.name).toBe("Produto Teste");
      expect(findUserCartServiceMock).toHaveBeenCalledWith(userPayload.userId);
    });

    it("deve retornar um carrinho vazio se o usuário nunca adicionou itens", async () => {
      const token = signJwt(userPayload);
      const findUserCartServiceMock = jest
        .spyOn(CartService, "findUserCartService")
        .mockResolvedValue({ user: userPayload.userId, items: [] });

      const response = await request(app)
        .get("/api/cart")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.items).toBeInstanceOf(Array);
      expect(response.body.items).toHaveLength(0);
    });
  });
  describe("PUT /api/cart/items/:productId", () => {
    const token = signJwt(userPayload);

    it("deve retornar 401 Unauthorized se o usuário não estiver logado", async () => {
      const productId = "product-abc";
      const response = await request(app)
        .put(`/api/cart/items/${productId}`)
        .send({ quantity: 5 });
      expect(response.status).toBe(401);
    });

    it("deve atualizar a quantidade de um item existente e retornar 200 com o carrinho atualizado", async () => {
      const newQuantity = 5;
      const productId = new mongoose.Types.ObjectId().toHexString();

      const mockCart: CartDocument = {
        user: userPayload.userId,
        items: [
          {
            product: productId,
            quantity: newQuantity,
            price: 100,
          },
        ],
        __v: 0,
        $assertPopulated: jest.fn(),
        $set: jest.fn(),
        increment: jest.fn(),
        save: jest.fn(),
        validate: jest.fn(),
      } as any;

      const updateItemQuantityServiceMock = jest
        .spyOn(CartService, "updateItemQuantityService")
        .mockResolvedValue(mockCart as any);

      const response = await request(app)
        .put(`/api/cart/items/${productId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ quantity: newQuantity });

      expect(response.status).toBe(200);
      expect(response.body.items[0].quantity).toBe(newQuantity);
      expect(updateItemQuantityServiceMock).toHaveBeenCalledWith(
        userPayload.userId,
        productId,
        newQuantity
      );
    });

    it("deve retornar 404 Not Found se o item não estiver no carrinho do usuário", async () => {
      const nonExistentProductId = "product-not-in-cart";
      const updateItemQuantityServiceMock = jest
        .spyOn(CartService, "updateItemQuantityService")
        .mockRejectedValue(new Error("Item não encontrado no carrinho."));

      const response = await request(app)
        .put(`/api/cart/items/${nonExistentProductId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ quantity: 3 });

      expect(response.status).toBe(404);
    });
  });
});
