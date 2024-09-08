/* eslint-disable jsdoc/no-undefined-types */
/**
 * @typedef Product
 * @property {string} name The name of the product
 */

/**
 * @typedef EvidenceTrend
 * @property {string} name The name of the trend.
 * @property {string} type The type of the trend.
 */

/**
 * @typedef EvidenceRecord
 * @property {string} name The name of the evidence record.
 * @property {string} created_date The date it was created.
 * @property {string} modified_date The date it was last modified.
 * @property {EvidenceTrend[]} trends The trends found in the evidence.
 */

/**
 * @typedef EvidenceFile
 * @property {string} name The name of the file.
 * @property {string} url The url of the file.
 * @property {any} icon The icon of the file.
 * @property {string} created_date The date it was created.
 * @property {string} modified_date The date it was last modified.
 * @property {EvidenceTrend[]} trends The trends found in the file.
 */

/**
 * @typedef GoogleFile
 * @property {string} title The title of the file.
 * @property {string} alternateLink The url of the file.
 * @property {string} iconLink The icon of the file.
 */

/**
 * @typedef WidgetDataItem
 * @property {string} name The name of the item
 * @property {EvidenceRecord[]} evidence The objects that act as evidence
 */

/**
 * @typedef Persona
 * @property {string} name The name of the persona
 * @property {EvidenceFile[]} evidence The files that act as evidence
 */

/**
 * @typedef personaAsEvidence
 * @property {string} name The name of the persona
 */

/**
 * @typedef Company
 * @property {string} name The name of the company
 * @property {EvidenceFile[]} evidence The files that act as evidence
 */

/**
 * @typedef Story
 * @property {string} name The name of the user story
 * @property {EvidenceFile[]} evidence The files that act as evidence
 */

/**
 * @typedef Task
 * @property {string} name The name of task
 * @property {EvidenceFile[]} evidence The files that act as evidence
 */

/**
 * @typedef EvidenceAPIProps
 * @property {(itemId: number, evidence: EvidenceRecord[]) => Promise<Response>} updateEvidence The function to call to update a widget item's evidence.
 * @property {(itemId: number, evidenceRecord: EvidenceRecord) => Promise<Response>} add The function to call to add an evidence record.
 * @property {(itemId: number, evidenceId: number) => Promise<Response>} removeEvidenceRecord The function to call to remove an evidence record.
 * @property {(itemId: number, evidenceId: number, trends: EvidenceTrend[]) => Promise<Response>} updateTrends The function to call to update an evidence object's trends.
 * @property {(evidenceRecordId: number, trendId: number) => Promise<Response>} deleteTrendFunc The function to call to delete a single trend.
 */

/**
 * @typedef BaseCollectionAPI
 * @property {(item: WidgetDataItem) => Promise<Response>} addItem The function to call to add a widget item to the server.
 * @property {(item: WidgetDataItem, index: number) => Promise<Response>} updateItem The function to call to update a widget item on the server.
 * @property {(index: number) => Promise<Response>} deleteItem The function to call to delete a widget item from the server.
 */

/**
 * @typedef {BaseCollectionAPI & EvidenceAPIProps} CollectionAPI
 */

/**
 * @typedef OAuthAPIFunctions
 * @property {() => Promise<string | null | undefined>} getAccessToken Obtain a Google OAuth access token from storage or their server.
 * @property {(access_token: string) => Promise<GoogleFile[]>} getGoogleDriveFiles A function to call to get a list of Google Drive files.
 */

/**
 * @typedef ProductAPIFunctions
 * @property {() => Promise<Response>} getProducts A function to get all products from the server.
 * @property {(bodyObject: any) => Promise<Response>} createProduct A function to create a new product on the server.
 * @property {(productId: number) => Promise<Response>} deleteProduct A function to delete a product from the server
 * @property {(collection: WidgetDataItem[]) => Promise<Response>} updateProductCollection A function to update an entire collection (personas, stories, companies, tasks, etc).
 */

/**
 * @typedef EvidencePaneProps
 * @property {string} productId The ID of the currnent product.
 * @property {EvidenceRecord[]} evidence The evidence to show in the pane.
 * @property {string} containerModalId The ID of the containing modal dialog.
 * @property {(evidence: EvidenceRecord[]) => Promise<Response>} updateEvidenceOnServer The function to call when the evidence collection changes.
 * @property {(file: EvidenceFile) => Promise<Response>} addFileFunc The function to call to add an evidence file.
 * @property {(fileId: number) => Promise<Response>} removeFileFunc The function to call to remove an evidence file.
 * @property {(tags: ReactTags.Tag[]) => void} allTagsUpdated The function to call when tags are updated in the evidence pane.
 * @property {(fileId: number, trendId: number) => Promise<Response>} deleteTrendFunc The function to call to delete a trend from the server.
 * @property {(fileId: number, trend: EvidenceTrend) => Promise<Response>} addTrendFunc The function to call to add a trend to the server.
 * @property {(fileId: number, trend: EvidenceTrend) => Promise<Response>} updateTrendNameFunc The function to call to update a trend's name or type on the server.
 */

/**
 * @typedef SummaryPaneProps
 * @param {(tagIndex: number, reactTags: ReactTags.Tag[]) => void} handleTagClick The ReactTags function to call when a tag is clicked.
 * @param {boolean} allowDrag Whether or not to allow drag-n-drop.
 * @param {(tag: ReactTags.Tag, currPos: number, newPos: number) => void} handleDrag A callback to handle drag-n-drop.
 * @param {(className: string, onRemove: React.Component<any>) => React.JSX.Element} removeComponent A component (e.g., X button) to remove a tag.
 * @param {(index: number, event: React.MouseEvent) => void} handleDelete The function to call when deleting a tag.
 * @param {(evidenceId: number, trend: EvidenceTrend) => Promise<Response>} updateTrendFunc The function to call to update a trend on the server.
 * @param {object} props.summary The summary data to show on load.
 */

/**
 * @typedef {{[key: string]: ReactTags.Tag[]}} TagsPerEvidenceRecord
 */
