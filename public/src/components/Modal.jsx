import React, { useCallback, useContext, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

import { EvidenceRecord, EvidenceTrend, WidgetDataItem } from "../types";

import { getOccurenceNumber, sortString } from "../../../util";

import { AllTagsContext } from "../contexts/AllTagsContext";
import { EvidencePaneContext } from "../contexts/EvidencePaneContext";
import { SummaryPaneContext } from "../contexts/SummaryPaneContext";

import {
  classNameToIndex,
  indexToClassName,
} from "./panes/EmpathyMapPaneFunctions";

/**
 * The React component to show the base dialog.
 * @param {object} props The component properties.
 * @param {string} props.productId The ID of the current product.
 * @param {WidgetDataItem} props.item The item to show in the modal.
 * @param {string} props.dialogId The ID to give the dialog.
 * @param {(itemId: number, evidenceRecord: EvidenceRecord) => Promise<Response>} props.addEvidenceFunc The function to call to add an evidence record.
 * @param {(itemId: number, evidenceId: number) => Promise<Response>} props.removeEvidenceFunc The function to call to remove an evidence record.
 * @param {string} props.summaryTitle The title of the summary tab.
 * @param {(item: WidgetDataItem) => Promise<Response>} props.updateItemFunc The function to call to update an entire item.
 * @param {(itemId: number, evidenceRecordId: number, trendId: number) => Promise<Response>} props.deleteTrendFunc The function to call to delete a trend.
 * @param {(itemId: number, evidenceRecordId: number, trend: EvidenceTrend) => Promise<Response>} props.addTrendFunc The function to call to add a new trend.
 * @param {(itemId: number, evidenceRecordId: number, trend: EvidenceTrend) => Promise<Response>} props.updateTrendFunc The function to call to update a trend.
 * @returns {React.JSX.Element} The rendered modal.
 * @example
 *  <Modal item={*} dialogId="*" updateItemFunc={*} updateTrendFunc={*} summaryTitle="*" addItemEvidenceFunc={*} />
 */
const Modal = ({
  item,
  dialogId,
  productId,
  addEvidenceFunc,
  removeEvidenceFunc,
  summaryTitle,
  updateItemFunc,
  deleteTrendFunc,
  addTrendFunc,
  updateTrendFunc,
}) => {
  /**
   * Convert the per-record evidence data into a flat tag array.
   * @param {EvidenceRecord} evidence The evidence records on a widget item.
   * @example getFlatTagsWithCountFromEvience(item.evidence) ~ ["a", "b", "c", etc.]
   * @returns {ReactTags.Tag[]} A flat array of tags.
   */
  const getFlatTagsWithCountsFromEvidence = (evidence) => {
    /**
     * @type {ReactTags.Tag[]}
     */
    const newAllTags = [];
    /**
     * @type {{[key: string]: {count: number, className: string}}}
     */
    const trendCountMap = {};
    evidence.forEach((record) => {
      /**
       * @type {EvidenceTrend[]}
       */
      const recordTrends = JSON.parse(JSON.stringify(record.trends ?? [])); // to avoid referencing the same trend objects
      recordTrends.forEach((trend) => {
        if (!trendCountMap[trend.name]) {
          trendCountMap[trend.name] = {
            count: 0,
            className: trend.type,
          };
        }
        trendCountMap[trend.name].count += 1;
      });
    });
    Object.keys(trendCountMap).forEach((trendName) => {
      const trendInfoObject = trendCountMap[trendName];
      newAllTags.push({
        id: trendName,
        text: `${trendName} (${trendInfoObject.count})`,
        className: trendInfoObject.className,
      });
    });
    return newAllTags
      .sort(sortString)
      .sort((a, b) => getOccurenceNumber(b.text) - getOccurenceNumber(a.text));
  };

  /**
   * @type {[ReactTags.Tag[] | undefined, React.Dispatch<ReactTags.Tag[] | undefined>]}
   */
  const [allTags, setAllTags] = useState(
    getFlatTagsWithCountsFromEvidence(item.evidence)
  );

  const findTrendInEvidence = useCallback(
    (tagId) => {
      let foundTrend;
      const evidence = item.evidence.find((ev) => {
        if (!foundTrend) {
          const trend = ev.trends.find((t) => t.name === tagId);
          if (trend) {
            foundTrend = trend;
            return true;
          }
        }
        return false;
      });
      return {
        evidenceId: evidence.id,
        trend: foundTrend,
      };
    },
    [item.evidence]
  );

  const EvidencePaneComponent = useContext(EvidencePaneContext);
  const SummaryPaneComponent = useContext(SummaryPaneContext);

  return (
    <>
      <dialog id={dialogId} style={{ width: "90%", height: "90%" }}>
        <div>
          <div>
            <div>
              <div className="modal-header">
                <h4 className="modal-title">{item.name}</h4>
              </div>
              <div className="modal-body">
                <div role="tabpanel">
                  <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="nav-item">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#modalEvidence"
                        aria-controls="evidence"
                        role="tab"
                        type="button"
                      >
                        Evidence
                      </a>
                    </li>
                    <li role="presentation" className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#modalSummary"
                        aria-controls="summary"
                        role="tab"
                        type="button"
                      >
                        {summaryTitle}
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    {/* TODO: look into Redux instead of/in addition to contexts for data */}
                    <AllTagsContext.Provider value={allTags}>
                      <div
                        role="tabpanel"
                        className="tab-pane"
                        id="modalSummary"
                      >
                        {!allTags ||
                          (allTags.length === 0 && (
                            <span>
                              There is no evidence. Start by adding a file!
                            </span>
                          ))}
                        {allTags && allTags.length > 0 && (
                          <SummaryPaneComponent
                            handleTagClick={(tagIndex, reactTags) => {
                              const tag = reactTags[tagIndex];
                              const currentClassIndex = tag.className
                                ? classNameToIndex[tag.className]
                                : -1;
                              const newClassName =
                                indexToClassName[
                                  (currentClassIndex + 1) %
                                    indexToClassName.length
                                ];
                              tag.className = newClassName;
                              setAllTags([...allTags]); // to refresh their className displays
                              const { evidenceId, trend } = findTrendInEvidence(
                                tag.id
                              );
                              trend.type = newClassName;
                              updateTrendFunc(item.id, evidenceId, trend);
                            }}
                            // TODO: come up with a better data schema for journeys
                            summaryChanged={(summary) => {
                              item.summary = summary;
                              updateItemFunc(item);
                            }}
                            data={item.summary}
                          />
                        )}
                      </div>
                      <div
                        role="tabpanel"
                        className="tab-pane active"
                        id="modalEvidence"
                      >
                        <EvidencePaneComponent
                          productId={productId}
                          evidence={item.evidence}
                          containerModalId={dialogId}
                          addFileFunc={(file) => addEvidenceFunc(item.id, file)}
                          removeFileFunc={(fileId) =>
                            removeEvidenceFunc(item.id, fileId)
                          }
                          allTagsUpdated={(tags) => setAllTags(tags)}
                          deleteTrendFunc={(evidenceId, trendId) =>
                            deleteTrendFunc(item.id, evidenceId, trendId)
                          }
                          addTrendFunc={(evidenceId, trend) =>
                            addTrendFunc(item.id, evidenceId, trend)
                          }
                          updateTrendNameFunc={(evidenceId, trend) =>
                            updateTrendFunc(item.id, evidenceId, trend)
                          }
                        />
                      </div>
                    </AllTagsContext.Provider>
                  </div>
                </div>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
