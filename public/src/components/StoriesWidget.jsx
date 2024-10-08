import React from "react";

import { EvidencePaneContext } from "../contexts/EvidencePaneContext";
import StakeholderEvidencePane from "./panes/StakeholderEvidencePane";

import { SummaryPaneContext } from "../contexts/SummaryPaneContext";
import JourneyMapPane from "./panes/JourneyMapPane";

import Widget from "./Widget";

/**
 * A widget to document and visualize user stories.
 * @param {object} props The component properties.
 * @param {number | undefined} props.productId the ID of the current product.
 * @returns {React.JSX.Element} The rendered widget.
 * @example
 *  <StoriesWidget productId={*} />
 */
const StoriesWidget = ({ productId }) => {
  const STORY_MODAL_ID = "storyModal";

  return (
    <EvidencePaneContext.Provider value={StakeholderEvidencePane}>
      <SummaryPaneContext.Provider value={JourneyMapPane}>
        <Widget
          productId={productId}
          collectionName="stories"
          type="Story"
          evidenceColumnLabel="Personas"
          title="What are the planned user stories?"
          mainModalId={STORY_MODAL_ID}
          summaryTitle="Story Journey"
        />
      </SummaryPaneContext.Provider>
    </EvidencePaneContext.Provider>
  );
};

export default StoriesWidget;
