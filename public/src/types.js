/**
 * @typedef Product
 * @property {string} name The name of the product
 */

/**
 * @typedef WidgetDataItem
 * @property {string} name The name of the item
 * @property {EvidenceFile[]} evidence The documents with evidence
 */

/**
 * @typedef EvidenceTrend
 * @property {string} name The name of the trend.
 * @property {string} type The type of the trend.
 */

/**
 * @typedef EvidenceFile
 * @property {string} name The name of the file.
 * @property {string} url The url of the file.
 * @property {any} icon The icon of the file.
 * @property {string} createdDate The date it was created.
 * @property {string} modifiedDate The date it was last modified.
 * @property {EvidenceTrend[]} trends The trends found in the file.
 */

/**
 * @typedef GoogleFile
 * @property {string} title The title of the file.
 * @property {string} alternateLink The url of the file.
 * @property {string} iconLink The icon of the file.
 */

// TODO: figure out inheritence
/**
 * @typedef Persona
 * @property {string} name The name of the persona
 * @property {EvidenceFile[]} evidence The documents with evidence
 */

// eslint-disable-next-line no-undef
module.exports = {};
