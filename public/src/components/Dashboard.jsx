import React, { useEffect, useState } from "react";
import { Product } from "../types";
import ResearchWidget from "./ResearchWidget";
import useProductAPI from "../hooks/useProductAPI";
import useOAuthAPI from "../hooks/useOAuthAPI";

/**
 * The container of all widgets
 * @returns {React.JSX.Element} The rendered dashboard.
 * @example
 *  <Dashboard>
 *    <Widget>
 *    <Widget>
 *    ...
 *  </Dashboard>
 */
const Dashboard = () => {
  const CURRENT_PRODUCT_ID_SESSION_KEY = "currentProductId";
  /**
   * @type {[Product[] | undefined, React.Dispatch<Product[]>]}
   */
  const [products, setProducts] = useState();

  const currentProjectIdFromStorage = sessionStorage.getItem(
    CURRENT_PRODUCT_ID_SESSION_KEY
  );
  /**
   * @type {[string, React.Dispatch<string>]}
   */
  const [currentProductId, setCurrentProductId] = useState(
    currentProjectIdFromStorage
  );
  /**
   * @type {[Product | undefined, React.Dispatch<Product>]}
   */
  const [currentProduct, setCurrentProduct] = useState();

  const { getAccessToken } = useOAuthAPI();

  if (
    !sessionStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token") === "undefined"
  ) {
    getAccessToken();
  }

  // TODO: eventually when there is a lot of data, save just the IDs, not all products
  useEffect(() => {
    if (!products) {
      getProducts().then((products) => {
        setProducts(products);
      });
    }
  }, [products]);

  useEffect(() => {
    if (currentProductId && products) {
      const product = products.find(
        (product) => product._id === currentProductId
      );
      setCurrentProduct(product);
    }
  }, [currentProductId, products]);

  const { getProducts, createProduct, deleteProduct } = useProductAPI();

  const handleSetCurrentProduct = (productId) => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      sessionStorage.setItem(CURRENT_PRODUCT_ID_SESSION_KEY, productId);
      setCurrentProduct(product);
      setCurrentProductId(product._id);
    }
  };

  return (
    <>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand">PMBoard</a>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  Products <span className="caret"></span>
                </a>
                <ul className="dropdown-menu" role="menu">
                  {products &&
                    products.map((product) => (
                      <li key={`Product #${product._id}`}>
                        <a onClick={() => handleSetCurrentProduct(product._id)}>
                          {product.name}
                        </a>
                      </li>
                    ))}
                  <li className="divider"></li>
                  <li>
                    <a
                      onClick={async () => {
                        const name = prompt("Give the new product a name:");
                        if (name) {
                          const newProduct = await createProduct({ name });
                          setProducts([...products, newProduct]);
                          setCurrentProductId(newProduct._id);
                        }
                      }}
                    >
                      <span className="glyphicon glyphicon-plus"></span> New
                      Product
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <p className="navbar-text">
              Current Product: <strong>{currentProduct?.name}</strong>
            </p>
            <p className="navbar-text">
              <a
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  if (confirm("Are you sure?")) {
                    await deleteProduct(currentProduct._id);
                    setProducts(
                      products.filter(
                        (product) => product._id !== currentProduct._id
                      )
                    );
                    setCurrentProduct(undefined);
                  }
                }}
              >
                <span className="remove-evidence glyphicon glyphicon-remove" />{" "}
                Delete Product
              </a>
            </p>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a>
                  <span className="glyphicon glyphicon-share"></span> Share
                </a>
              </li>
              <li className="dropdown">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  My Account <span className="caret"></span>
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li>
                    <a>Profile</a>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {!currentProduct && <span>Select a product from the menu.</span>}
      {currentProduct && <ResearchWidget productId={currentProduct._id} />}
    </>
  );
};

export default Dashboard;
