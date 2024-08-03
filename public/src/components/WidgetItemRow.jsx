import React from "react";

import { WidgetDataItem } from "../types";

/**
 * @param {Object} props
 * @param {WidgetDataItem | undefined} props.item The item to show in this row
 * @param {(item: WidgetDataItem) => void} props.deleteFunc The function to call when deleting this item
 */
const WidgetItemRow = ({ item, deleteFunc }) => {
  const getEvidenceLabelClass = (item) => {
    switch (item.evidence.length) {
      case item.evidence.length > 0 && item.evidence.length < 10:
        return "label-warning";
      case item.evidence.length >= 10:
        return "label-success";
      default:
        return "label-danger";
    }
  };
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
            setCurrentItem(item);
            setCurrentItemIndex(index);
          }}
        >
          {item.name}
        </a>
      </td>
      <td>
        <span className={`evidence label ${getEvidenceLabelClass(item)}`}>
          {item.evidence.length}
        </span>
      </td>
      <td>
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (confirm("Are you sure?")) {
              deleteFunc(item);
            }
          }}
        >
          <span className="remove-evidence glyphicon glyphicon-remove" /> Delete
        </a>
      </td>
    </tr>
  );
};

export default WidgetItemRow;
