import React, { useMemo } from "react";

import { EvidenceRecord, WidgetDataItem } from "../types";

const EVIDENCE_MILESTONE = 10;

/**
 * A React component to render a row of a widget item.
 * @param {object} props The component properties.
 * @param {WidgetDataItem | undefined} props.item The item to show in this row
 * @param {(item: WidgetDataItem) => void} props.onDeleteCallback The function to call when deleting this item
 * @param {(item: WidgetDataItem) => void} props.onClickCallback The function to call when the name is clicked
 * @returns {React.JSX.Element} The resulting widget element.
 * @example <WidgetItemRow item={*} onDeleteCallback={() => {}} onClickCallback={() => {}}
 */
const WidgetItemRow = ({ item, onDeleteCallback, onClickCallback }) => {
  /**
   * Returns a classname for a widget item's count badge based on how much evidence it has.
   * @param {WidgetDataItem} item The item containing evidence for this badge class.
   * @returns {string} The resulting classname.
   * @example getEvidenceLabelClass(item.evidence) === "bg-danger"
   */
  const getEvidenceLabelClass = (item) => {
    if (item && item.evidence) {
      switch (item.evidence.length) {
        case item.evidence.length > 0 &&
          item.evidence.length < EVIDENCE_MILESTONE:
          return "bg-warning";
        case item.evidence.length >= EVIDENCE_MILESTONE:
          return "bg-success";
        default:
          return "bg-danger";
      }
    }
    return "";
  };

  // TODO: get trend schema from database once I have multiple
  const trendTypes = ["objective", "goal", "activity", "task", "resource"];

  /**
   * Determines whether or not an evidence record has all trend types on it.
   * @param {EvidenceRecord} record The record to evaluate whether it has all trend types
   * @returns {boolean} whether or not the record has trends of all types
   * @example hasAllTrendTypes() === true | false
   */
  const hasAllTrendTypes = (record) => {
    const typeMap = record.trends.reduce((map, trend) => {
      if (trend.type && !map[trend.type]) {
        map[trend.type] = true;
      }
      return map;
    }, {});
    return trendTypes.filter((tt) => typeMap[tt]).length === trendTypes.length;
  };

  {
    /* TODO: change calculation to be just having 1 trend */
  }
  const numberOfEvidenceCompleted = useMemo(() => {
    if (item && item.evidence) {
      return item.evidence.filter(
        (record) =>
          record.trends && record.trends.length > 0 && hasAllTrendTypes(record)
      ).length;
    } else {
      return 0;
    }
  }, [item, item.evidence]);

  return (
    <tr>
      <td
        className="dragHandle"
        style={{
          cursor: "pointer",
          backgroundColor: "#ccc",
          fontSize: "10px",
        }}
      >
        ||
      </td>
      <td>
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            onClickCallback(item);
          }}
        >
          {item && item.name}
        </a>
      </td>
      <td>
        <span className={`evidence badge ${getEvidenceLabelClass(item)}`}>
          {/* {numberOfEvidenceCompleted}/{item.evidence.length} */}
          {item.evidence.length}
        </span>
      </td>
      <td>
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (confirm("Are you sure?")) {
              onDeleteCallback(item);
            }
          }}
        >
          <span className="remove-evidence bi bi-trash" /> Delete
        </a>
      </td>
    </tr>
  );
};

export default WidgetItemRow;
