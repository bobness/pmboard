import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { Draggable, Droppable } from "@shopify/draggable";

import { SummaryPaneProps } from "../../types";
import { AllTagsContext } from "../../contexts/AllTagsContext";

import {
  formatTrendTypeText,
  indexToClassName,
} from "./EmpathyMapPaneFunctions";
import { getOccurenceNumber } from "../../../../util";

/**
 * A modal pane to show a persona's empathy map.
 * @param {SummaryPaneProps} props The properties for all summary panes.
 * @returns {React.JSX.Element} The renedered pane.
 * @example <EmpathyMapPane handleTagClick={() => {}} allowDragDrop={true | false} handleDrag={() => {}} removeComponent={() => {}} handleDelete={() => {}} />
 */
const EmpathyMapPane = ({
  handleTagClick,
  removeComponent,
  updateTrendsFunc,
}) => {
  const allTagsForThisPersona = useContext(AllTagsContext);
  const [typedTags, setTypedTags] = useState();

  useLayoutEffect(() => {
    if (
      allTagsForThisPersona &&
      allTagsForThisPersona.length > 0 &&
      !typedTags
    ) {
      const typedTags = {};
      [...indexToClassName].forEach((className) => {
        const tags = allTagsForThisPersona.filter(
          (t) => t.className === className
        );
        typedTags[className] = tags;
      });
      typedTags[""] = allTagsForThisPersona.filter((t) => !t.className);
      setTypedTags(typedTags);
    }
  }, [allTagsForThisPersona, typedTags]);

  const [selectedTags, setSelectedTags] = useState([]);

  const [droppable, setDroppable] = useState();
  const CLASSNAME_PREFIX = "type-";
  const changeTagType = (
    tagText,
    sourceDropzoneElement,
    destinationDropzoneElement
  ) => {
    setTimeout(() => {
      const draggedTagElement = Array.from(
        document.querySelectorAll(`.tag-wrapper.readOnly`)
      ).find((el) => el.innerText === tagText);
      const oldClassNameFound = Array.from(
        sourceDropzoneElement.classList
      ).find((classString) => classString.includes(CLASSNAME_PREFIX));
      if (
        oldClassNameFound &&
        oldClassNameFound.substring(CLASSNAME_PREFIX.length)
      ) {
        const oldClassName = oldClassNameFound.substring(
          CLASSNAME_PREFIX.length
        );
        draggedTagElement.classList.remove(oldClassName);
      }
      const newClassNameFound = Array.from(
        destinationDropzoneElement.classList
      ).find((classString) => classString.includes(CLASSNAME_PREFIX));
      if (
        newClassNameFound &&
        newClassNameFound.substring(CLASSNAME_PREFIX.length)
      ) {
        const newClassName = newClassNameFound.substring(
          CLASSNAME_PREFIX.length
        );
        draggedTagElement.classList.add(newClassName);
        updateTrendsFunc([tagText], { className: newClassName });
      } else {
        updateTrendsFunc([tagText], { className: "" });
      }
    }, 50);
  };

  const tagAreaRefs = useRef([]);
  const [tagAreas, setTagAreas] = useState();

  useLayoutEffect(() => {
    if (!tagAreas && tagAreaRefs.current.length > 0) {
      setTagAreas(tagAreaRefs.current);
    }
  });

  useLayoutEffect(() => {
    if (!droppable && tagAreas) {
      const d = new Droppable(tagAreas, {
        draggable: ".tag-wrapper",
        dropzone: ".react-tags-wrapper",
        distance: 0,
        delay: 100,
      });
      /**
       * @type {HTMLElement}
       */
      let currentDragItem;

      d.on("drag:start", (event) => {
        currentDragItem = event.source;
      });

      let currentDropzone;
      d.on("droppable:dropped", (event) => {
        currentDropzone = event.dropzone;
      });
      d.on("drag:stop", (event) => {
        if (currentDragItem && currentDropzone) {
          changeTagType(
            currentDragItem.innerText,
            event.sourceContainer.children[0],
            currentDropzone
          );
          currentDropzone.classList.remove("draggable-dropzone--occupied");
        }
      });

      setDroppable(d);
    }
  }, [droppable, tagAreas]);

  return (
    <div id="body">
      {/* <button
        onClick={() => {
          const dropzones = Array.from(
            document.querySelectorAll("[data-dropzone]")
          ).sort(
            (a, b) => Number(b.dataset.dropzone) - Number(a.dataset.dropzone)
          );
          const steps = dropzones.map((dropzoneDiv) => {
            const tag = JSON.parse(dropzoneDiv.childNodes.item(0).dataset.tag);
            return {
              tagId: tag.id,
              tagClassName: tag.className,
              tagText: tag.text,
              x: dropzoneDiv.style.left,
              y: dropzoneDiv.style.top,
            };
          });
          const newSummary = {
            ...summary,
            steps,
            // connections
          };
          summaryChanged(newSummary);
          setSummary(newSummary);
        }}
        style={{ float: "right" }}
      >
        Save
      </button> */}
      {selectedTags.length > 1 && (
        <button
          onClick={async () => {
            const newId = prompt("Combined tag text: ");
            if (newId) {
              const count = selectedTags.reduce(
                (totalCount, tag) => totalCount + getOccurenceNumber(tag.text),
                0
              );
              const tagChanges = {
                id: newId,
                className: selectedTags[0].className,
              };
              const textsToUpdate = selectedTags.map((t) => t.text);
              await updateTrendsFunc(textsToUpdate, tagChanges);
              setSelectedTags([]);
            }
          }}
          style={{ margin: "0 auto" }}
        >
          Combine
        </button>
      )}
      <table className="table" id="empathyMapTable" style={{ width: "90%" }}>
        <tbody>
          {typedTags &&
            Object.keys(typedTags).map((trendType) => {
              return (
                <tr key={`ReactTags for '${trendType}'`}>
                  <td>
                    <strong>{formatTrendTypeText(trendType)}</strong>
                  </td>
                  <td
                    ref={(ref) => {
                      if (ref && !tagAreaRefs.current.includes(ref)) {
                        tagAreaRefs.current.push(ref);
                      }
                    }}
                  >
                    <ReactTags
                      tags={typedTags[trendType]}
                      classNames={{
                        tag: "readOnly",
                        remove: "removeButton",
                        tags: `tagArea type-${trendType}`,
                      }}
                      removeComponent={
                        removeComponent ||
                        (() => {
                          // because readOnly={true} makes `handleTagClick` do nothing
                          return "";
                        })
                      }
                      handleTagClick={(tagIndex, event) => {
                        const tagWrapper = event.target;
                        const tag = typedTags[trendType][tagIndex];
                        if (tagWrapper.className.includes("selected")) {
                          tagWrapper.classList.remove("selected");
                          setSelectedTags(
                            selectedTags.filter((t) => t !== tag)
                          );
                        } else {
                          tagWrapper.classList.add("selected");
                          setSelectedTags([...selectedTags, tag]);
                        }
                        if (handleTagClick) {
                          handleTagClick(tagIndex, typedTags[trendType]);
                        }
                      }}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EmpathyMapPane;
