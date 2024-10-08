import {
  EvidenceAPIProps,
  EvidenceRecord,
  EvidenceTrend,
  WidgetDataItem,
} from "../types";

/**
 * A React hook to access API calls related to widget item evidence.
 * @type {EvidenceAPIProps}
 * @example const { updateEvidence } = useEvidenceAPI(productId, collectionName);
 */
const useEvidenceAPI = (productId, collectionName) => {
  /**
   * A function to update all evidence of a widget item.
   * @param {number} itemId The ID of the item to update.
   * @param {WidgetDataItem[]} evidence The entire evidence array to send to the server.
   * @returns {Promise<Response>} The fetch promise.
   * @example <Component onClick={() => updateEvidence(...)} />
   */
  const updateEvidence = (itemId, evidence) => {
    evidence.updated_date = new Date();
    return fetch(
      `/products/${productId}/${collectionName}/${itemId}/evidence`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evidence),
      }
    );
  };

  /**
   * Add an evidence record to the server.
   * @param {number} itemId The ID of the collection item.
   * @param {EvidenceRecord} evidenceRecord The the evidence record to be added.
   * @returns {Promise<Response>} The fetch promise.
   * @example <Component onClick={() => addEvidenceRecord()} />
   */
  const addEvidenceRecord = (itemId, evidenceRecord) =>
    fetch(`/products/${productId}/${collectionName}/${itemId}/evidence`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evidenceRecord),
    });

  /**
   * Delete an evidence record on the server.
   * @param {number} itemId The ID of the collection item.
   * @param {number} evidenceId The ID of the evidence record to be deleted.
   * @returns {Promise<Response>} The fetch promise.
   * @example <Component onClick={() => removeEvidenceRecord()} />
   */
  const removeEvidenceRecord = (itemId, evidenceId) =>
    fetch(
      `/products/${productId}/${collectionName}/${itemId}/evidence/${evidenceId}`,
      {
        method: "DELETE",
      }
    );

  // TODO: separate trend functions into a new `useTrendsAPI.js`

  /**
   * Delete a trend by its ID.
   * @param {number} itemId The ID of the item containing evidence containing the trend.
   * @param {number} evidenceId The ID of the evidence containing the trend.
   * @param {number} trendId The ID of the trend being deleted.
   * @returns {Promise<Response>} The fetch promise.
   * @example <Component onClick={() => deleteTrend(..)} />
   */
  const deleteTrend = (itemId, evidenceId, trendId) =>
    fetch(
      `/products/${productId}/${collectionName}/${itemId}/evidence/${evidenceId}/trends/${trendId}`,
      {
        method: "DELETE",
      }
    );

  /**
   * Create a new trend on the server.
   * @param {number} itemId The ID of the item containing evidence containing the trend.
   * @param {number} evidenceId The ID of the evidence containing the trend.
   * @param {EvidenceTrend} trend The trend to add to the server.
   * @returns {Promise<Response>} The fetch promise.
   * @example <ReactTags handleAddition={() => addTrend()} />
   */
  const addTrend = (itemId, evidenceId, trend) =>
    fetch(
      `/products/${productId}/${collectionName}/${itemId}/evidence/${evidenceId}/trends`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trend),
      }
    ).then((response) => response.json());

  /**
   * Replace the name or type of a trend.
   * @param {number} itemId The ID of the item containing evidence containing the trend.
   * @param {number} evidenceId The ID of the evidence containing the trend.
   * @param {EvidenceTrend} trend The trend to update on the server.
   * @returns {Promise<Response>} The fetch promise.
   * @example <ReactTags handleTagClick={() => updateTrend()} />
   */
  const updateTrend = (itemId, evidenceId, trend) =>
    fetch(
      `/products/${productId}/${collectionName}/${itemId}/evidence/${evidenceId}/trends/${trend.id}`,
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
    updateEvidence,
    addEvidenceRecord,
    removeEvidenceRecord,
    deleteTrend,
    addTrend,
    updateTrend,
  };
};

export default useEvidenceAPI;
