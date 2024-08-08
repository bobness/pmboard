import { Persona } from "../types";

/**
 * A hook to modify product personas
 * @param {number} productId The ID of the current product.
 * @returns {object} A collection of API functions.
 * @example
 * const { addPersona, updatePersona, deletePersona } = usePersonasAPI();
 */
const usePersonasAPI = (productId) => {
  /**
   * Add a persona to the server
   * @param {Persona} persona The persona object to add.
   * @returns {Promise<Response>} The POST fetch promise.
   */
  const addPersona = (persona) =>
    fetch(`/products/${productId}/personas`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // TODO: credentials
      body: JSON.stringify(persona),
    });

  const updatePersona = (persona, personaIndex) =>
    fetch(`/products/${productId}/personas/${personaIndex}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(persona),
    });

  /**
   * Delete a persona from the server via ID
   * @param {number} personaIndex The index of the persona in its collection.
   * @returns {Promise<Response>} The DELETE fetch request promise.
   */
  const deletePersona = (personaIndex) =>
    fetch(`/products/${productId}/personas/${personaIndex}`, {
      method: "DELETE",
      // TODO: credentials/headers
    });

  const addEvidenceFile = (personaIndex, file) =>
    fetch(`/products/${productId}/personas/${personaIndex}/evidence`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(file),
    });

  // const addTrendToEvidence = (personaIndex, evidenceIndex, trend) =>
  //   fetch(`/products/${productId}/personas/${personaIndex}/evidence/${evidenceIndex}/trends`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(trend),
  //   });

  const updateTrend = (personaIndex, evidenceIndex, trendIndex, trend) =>
    fetch(
      `/products/${productId}/personas/${personaIndex}/evidence/${evidenceIndex}/trends/${trendIndex}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trend),
      }
    );

  return {
    addPersona,
    updatePersona,
    deletePersona,
    addEvidenceFile,
    updateTrend,
  };
};

export default usePersonasAPI;
