import React, { useContext } from "react";
import { WithContext as ReactTags } from "react-tag-input";

import { AllTagsContext } from "../../contexts/AllTagsContext";
import {
  formatTrendTypeText,
  indexToClassName,
} from "./EmpathyMapPaneFunctions";

/**
 * A modal pane to show a persona's empathy map.
 * @param {object} props React component properties.
 * @param {(tagIndex: number, reactTags: ReactTags.Tag[]) => void} props.handleTagClick The ReactTags function to call when a tag is clicked.
 * @returns {React.JSX.Element} The renedered pane.
 */
const EmpathyMapPane = ({ handleTagClick }) => {
  const allTags = useContext(AllTagsContext);

  if (allTags) {
    return (
      <table className="table" id="empathyMapTable" style={{ width: "90%" }}>
        <tbody>
          {[...indexToClassName, ""].map((trendType) => {
            const typedTags = allTags.filter(
              (tag) => tag.className === trendType
            );
            return (
              <tr key={`ReactTags for '${trendType}'`}>
                <td>
                  <strong>{formatTrendTypeText(trendType)}</strong>
                </td>
                <td>
                  <ReactTags
                    tags={typedTags}
                    classNames={{
                      tag: "trendItem readOnly",
                    }}
                    removeComponent={() => {
                      // because readOnly={true} makes `handleTagClick` do nothing
                      return "";
                    }}
                    handleTagClick={(tagIndex) =>
                      handleTagClick(tagIndex, typedTags)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return <></>;
};

export default EmpathyMapPane;
