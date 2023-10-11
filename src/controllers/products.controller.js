import { productsService } from "../services/products.service.js";

class ProductsController {
  async getProducts(req, res) {
    try {
      const products = await productsService.findAll();
      //const payloadArray = products.info.payload
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async createProduct(req, res) {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return res.status(200).json({ message: "Some data is missing" });
    }
    try {
      const newProduct = await productsService.create(req.body);
      res.status(200).json({ message: "Product created", product: newProduct });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await productsService.findById(id);
      if (!product) {
        res.status(400).json({ message: "Invalid ID" });
      } else {
        res.status(200).json({ message: "Product found", product });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const updatedProductData = req.body;
    try {
      const product = await productsService.update(id, updatedProductData);
      if (!product) {
        res.status(400).json({ message: "Invalid ID" });
      } else {
        res.status(200).json({ message: "Product found", product });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await productsService.deleteOne(id);
      if (!product) {
        res.status(400).json({ message: "Invalid ID" });
      } else {
        res.status(200).json({ message: "Product Deleted", product });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export const productsController = new ProductsController();