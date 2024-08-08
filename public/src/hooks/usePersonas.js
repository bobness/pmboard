import React from "react";
import { useEffect, useState } from "react";
import { Persona } from "../types";

/**
 * A hook to download product personas
 * @param {number} productId The ID of the current product.
 * @returns {Persona[] | undefined} An array of personas.
 * @example
 * const personas = usePersonas();
 */
const usePersonas = (productId) => {
  /**
   * @type {[Persona[] | undefined, React.Dispatch<Persona>]}
   */
  const [personas, setPersonas] = useState();

  useEffect(() => {
    fetch(`/products/${productId}/personas`)
      .then((response) => response.json())
      .then((value) => setPersonas(value));
  }, [productId]);

  return personas;
};

export default usePersonas;
