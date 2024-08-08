import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Sortable, Plugins } from "@shopify/draggable";

import { EvidenceFile, EvidenceTrend, WidgetDataItem } from "../types";
import Modal from "./Modal";
import WidgetItemRow from "./WidgetItemRow";

/**
 * The HTML component for all PMBoard widgets to document and visualize information
 * @param {object} props The component props
 * @param {WidgetDataItem[] | undefined} props.data The data to show in the widget.
 * @param {string} props.type The type of the data rows.
 * @param {string} props.title The title to show at the top of the widget.
 * @param {(item: WidgetDataItem) => void} props.addItemFunc The function to call when a new item is added.
 * @param {(item: WidgetDataItem, itemIndex: number) => void} props.updateItemFunc The function to call when an item is updated.
 * @param {(itemIndex: number) => void} props.deleteItemFunc The function to call when a new item is deleted.
 * @param {string} props.itemModalId The ID of the item modal passed in `children`.
 * @param {(object) => void} props.updateCollectionFunc The function to call when the order of items is changed.
 * @param {(personaIndex: number, evidenceIndex: number, trendIndex: number, trend: EvidenceTrend) => Promise<Response>} props.updateTrendFunc The function to call to update an item::evidence::trend.
 * @param {string} props.summaryTitle The title of the summary tab on the modal.
 * @param {(itemIndex: number, file: EvidenceFile) => Promise<Response>} props.addItemEvidenceFunc The function to call when an evidence file is added.
 * @returns {React.JSX.Element} The rendered widget.
 * @example
 * <Widget data={*} type={*} title="*" addItemFunc={*} deleteItemFunc={*} itemModalId="*" />
 */
const Widget = ({
  data,
  type,
  title,
  addItemFunc,
  updateItemFunc,
  deleteItemFunc,
  itemModalId,
  updateCollectionFunc,
  updateTrendFunc,
  summaryTitle,
  addItemEvidenceFunc,
}) => {
  /**
   * @type {[WidgetDataItem[] | undefined, React.Dispatch<any[]>]}
   */
  const [liveData, setLiveData] = useState();

  useEffect(() => {
    if (data) {
      setLiveData(data);
    }
  }, [data]);

  /**
   * @type {[WidgetDataItem | undefined, React.Dispatch<WidgetDataItem>]}
   */
  const [currentItem, setCurrentItem] = useState();

  const [currentItemIndex, setCurrentItemIndex] = useState();

  /**
   * @type {[HTMLDialogElement | undefined, React.Dispatch<HTMLDialogElement | undefined>]}
   */
  const [itemModal, setItemModal] = useState();

  /**
   * @type {[HTMLDialogElement | undefined, React.Dispatch<HTMLDialogElement | undefined>]}
   */
  const [createDialog, setCreateDialog] = useState();

  const showCreateDialog = () => {
    /**
     * @type {HTMLDialogElement}
     */
    const createDialog = document.getElementById("createDialog");
    setCreateDialog(createDialog);
    // TODO: only add once
    createDialog.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        createDialog.close();
      }
    });
    createDialog.showModal();
  };

  useEffect(() => {
    if (currentItem) {
      if (itemModal) {
        // TODO: track if these have been added/removed so they don't get added multiple times
        itemModal.addEventListener("click", (event) => {
          if (event.target === event.currentTarget) {
            itemModal.close();
          }
        });
        itemModal.addEventListener("close", () => {
          setItemModal(undefined);
          setCurrentItem(undefined);
          setCurrentItemIndex(undefined);
        });
        itemModal.showModal();
      } else {
        /**
         * @type {HTMLDialogElement}
         */
        const modal = document.getElementById(itemModalId);
        setItemModal(modal);
      }
    }
  }, [currentItem, itemModal]);

  const draggableContainer = document.getElementById("itemsTbody");
  const draggable = useMemo(() => {
    if (draggableContainer) {
      return new Sortable(draggableContainer, {
        draggable: "tr",
        collidables: "tr",
        distance: 0,
        handle: ".dragHandle",
        plugins: [Plugins.SortAnimation],
        swapAnimation: {
          duration: 200,
          easingFunction: "ease-in-out",
        },
        mirror: {
          constrainDimensions: true,
        },
      });
    }
  }, [draggableContainer]);

  let currentDragIndex = -1;
  const hr = document.getElementsByTagName("hr")[0];
  // let [draggableListenersAdded, setDraggableListenersAdded] = useState(false);
  useEffect(() => {
    if (draggable && liveData) {
      draggable.on("drag:start", (event) => {
        const trElements = Array.from(draggableContainer.childNodes);
        currentDragIndex = trElements.indexOf(event.source);
      });
      draggable.on("drag:move", (event) => {
        hr.style.display = "block";
        hr.style.top = `${event.sensorEvent.clientY - 100}px`;
      });
      draggable.on("drag:stop", (event) => {
        const trElements = Array.from(draggableContainer.childNodes);
        const newIndex = trElements.indexOf(event.source);
        if (newIndex !== currentDragIndex) {
          const newData = [...liveData];
          [newData[newIndex], newData[currentDragIndex]] = [
            newData[currentDragIndex],
            newData[newIndex],
          ];
          updateCollectionFunc([...newData]).then(() => {
            // TODO: refreshing the page works, but I'd prefer not to
            // setLiveData((prevLiveData) => [...newData]); // resets the live data, but renders it the old way (!)
            window.location.reload();
          });
        }

        // done: cleanup
        hr.style.display = "none";
        currentDragIndex = -1;
      });
      // setDraggableListenersAdded(true);
    }
  }, [draggable, liveData]);

  // TODO: (above TODO) vs: this uses old `liveData` after drag reordering
  const deleteItemCallback = useCallback(
    (item) => {
      const itemIndex = liveData.indexOf(item);
      liveData.splice(itemIndex, 1);
      setLiveData([...liveData]);
      deleteItemFunc(itemIndex);
    },
    [liveData]
  );

  const widgetOnClickCallback = useCallback(
    (item) => {
      setCurrentItem(item);
      const index = liveData.indexOf(item);
      setCurrentItemIndex(index);
    },
    [liveData]
  );

  return (
    <>
      <div
        className="panel panel-default widget"
        style={{ position: "relative" }}
      >
        <hr
          style={{
            display: "none",
            position: "relative",
            left: "35px",
            border: "2px solid black",
            zIndex: 1000,
            width: "1000px",
            margin: 0,
          }}
        />
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
        </div>
        <div className="panel-body">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "20px" }}></th>
                <th>{type}</th>
                <th>Evidence</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="itemsTbody">
              {liveData &&
                liveData.map((item, index) => (
                  <WidgetItemRow
                    item={item}
                    key={`WidgetItemRow #${index}`}
                    onDeleteCallback={deleteItemCallback}
                    onClickCallback={widgetOnClickCallback}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <div className="panel-footer">
          <button onClick={showCreateDialog}>
            <span
              className="glyphicon glyphicon-plus"
              aria-hidden="true"
            ></span>{" "}
            Add
          </button>
        </div>
        <dialog id="createDialog">
          <form name="createItemForm">
            <p>
              New name: <input type="text" id="newName" />
            </p>
            <p>
              <button
                type="submit"
                onClick={() => {
                  const newNameField = document.getElementById("newName");
                  const newName = newNameField.value;
                  const newItem = { name: newName, evidence: [] };
                  setLiveData([...liveData, newItem]);
                  addItemFunc(newItem);
                  createDialog.close();
                  setCreateDialog(undefined);
                  newNameField.value = "";
                }}
              >
                Create
              </button>
            </p>
          </form>
        </dialog>
      </div>
      {currentItem && (
        <Modal
          dialogId={itemModalId}
          item={currentItem}
          deleteItemFunc={deleteItemCallback}
          updateItemFunc={(item) => updateItemFunc(item, currentItemIndex)}
          updateTrendFunc={(trendIndex, trend) => {
            currentItem.evidence.forEach((file, fileIndex) => {
              const trendIndex = file.trends
                .map((trend) => trend.name)
                .indexOf(trend.name);
              if (trendIndex > -1) {
                updateTrendFunc(currentItemIndex, fileIndex, trendIndex, trend);
              }
            });
          }}
          summaryTitle={summaryTitle}
          addItemEvidenceFunc={(file) =>
            addItemEvidenceFunc(currentItemIndex, file)
          }
        />
      )}
    </>
  );
};

export default Widget;
