import { Product } from "../types";

const useProductAPI = () => {
  /**
   * @returns {Promise<Product[]>} all products from the server
   */
  const getProducts = () =>
    fetch("/products").then((response) => response.json());

  const deleteProduct = (productId) =>
    fetch(`/products/${productId}`, { method: "DELETE" });

  const createProduct = (bodyObject) =>
    fetch("/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    }).then((response) => response.json());

  const updateProductCollection = (productId, collectionName, bodyObject) =>
    fetch(`/products/${productId}/${collectionName}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    });

  return {
    getProducts,
    createProduct,
    deleteProduct,
    updateProductCollection,
  };
};

export default useProductAPI;
