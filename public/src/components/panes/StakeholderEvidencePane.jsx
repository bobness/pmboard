import React, { useCallback, useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

import {
  EvidencePaneProps,
  Persona,
  PersonaAsEvidence,
  TagsPerEvidenceRecord,
} from "../../types";
import {
  getJsonSortedString,
  getOccurenceNumber,
  sortString,
} from "../../../../util";

// import { EvidencePaneContext } from "../../contexts/EvidencePaneContext";

import EmpathyMapPane from "./EmpathyMapPane";
import { AllTagsContext } from "../../contexts/AllTagsContext";
import AddPersonaPane from "./AddPersonaPane";
import useCollectionItems from "../../hooks/useCollectionItems";

/**
 * A React component pane to organize stakeholders used as evidence for something else (e.g., a user story).
 * @param {EvidencePaneProps} props The object containing the props.
 * @returns {React.JSX.Element} The rendered pane.
 * @example <StakeholderEvidencePane productId="" evidence={[...]} containerModalId="" updateEvidenceOnServer={() => {}} allTagsUpdated={() => {}}
 */
const StakeholderEvidencePane = ({
  productId,
  evidence,
  containerModalId,
  allTagsUpdated,
  addFileFunc,
  removeFileFunc,
}) => {
  const ADD_PERSONA_DIALOG_ID = `addPersona: ${containerModalId}`;
  const EMPATHY_MAP_DIALOG_ID = `empathyMap: ${containerModalId}`;

  /**
   * @type {[Persona[] | undefined, React.Dispatch<Persona[]>]}
   */
  const allPersonas = useCollectionItems(productId, "personas");

  /**
   * @type {[PersonaAsEvidence[] | undefined, React.Dispatch<PersonaAsEvidence[]>]}
   */
  const [personasAsEvidence, setPersonasAsEvidence] = useState(evidence);

  /**
   * @type {[TagsPerEvidenceRecord | undefined, React.Dispatch<TagsPerEvidenceRecord | undefined>]}
   */
  const [tagsPerPersona, setTagsPerPersona] = useState();

  /**
   * @type {[HTMLDialogElement | undefined, React.Disptch<HTMLDialogElement | undefined>]}
   */
  const [addPersonaDialog, setAddPersonaDialog] = useState();

  useEffect(() => {
    if (!addPersonaDialog && document.getElementById(ADD_PERSONA_DIALOG_ID)) {
      setAddPersonaDialog(document.getElementById(ADD_PERSONA_DIALOG_ID));
    }
  });

  /**
   * @type {[HTMLDialogElement | undefined, React.Disptch<HTMLDialogElement | undefined>]}
   */
  const [empathyMapDialog, setEmpathyMapDialog] = useState();

  useEffect(() => {
    if (!empathyMapDialog && document.getElementById(EMPATHY_MAP_DIALOG_ID)) {
      setEmpathyMapDialog(document.getElementById(EMPATHY_MAP_DIALOG_ID));
    }
  });

  /**
   * @type {[ReactTags.Tag[] | undefined, React.Dispatch<ReactTags.Tag[] | undefined>]}
   */
  const [allTagsForEmpathyMapDialog, setAllTagsForEmpathyMapDialog] =
    useState();
  /**
   * @type {[ReactTags.Tag[], React.Dispatch<ReactTags.Tag[]>]}
   */
  const [selectedTags, setSelectedTags] = useState([]);

  const [currentPersonaAsEvidence, setCurrentPersonaAsEvidence] = useState();

  const showPersonaTrendModal = useCallback(
    (personaAsEvidence) => {
      if (empathyMapDialog && allPersonas) {
        const fullPersona = allPersonas.find(
          (p) => p.id == personaAsEvidence.persona_id
        );
        const selectedPersonaAllTags = fullPersona.evidence.reduce(
          (reactTags, file) => {
            if (file.trends) {
              file.trends.forEach((trend) => {
                if (!reactTags.find((rt) => rt.id === trend.name)) {
                  reactTags.push({
                    id: trend.name,
                    text: trend.name, // TODO: put (n) here?
                    className: trend.type,
                  });
                }
              });
            }
            return reactTags;
          },
          []
        );
        const existingTrendNames = personaAsEvidence.trends.map(
          (trend) => trend.name
        );
        selectedPersonaAllTags.forEach((tag) => {
          if (existingTrendNames.includes(tag.id)) {
            tag.className += " selected";
          }
        });
        setSelectedTags(
          selectedPersonaAllTags.filter(
            (tag) => tag.className && tag.className.includes("selected")
          )
        );
        setAllTagsForEmpathyMapDialog(selectedPersonaAllTags);
        setCurrentPersonaAsEvidence(personaAsEvidence);
        empathyMapDialog.addEventListener("click", (event) => {
          if (event.target === event.currentTarget) {
            empathyMapDialog.close();
          }
        });
        empathyMapDialog.addEventListener("close", async () => {
          setAllTagsForEmpathyMapDialog(undefined);
        });
        empathyMapDialog.showModal();
      }
    },
    [empathyMapDialog, allPersonas, selectedTags]
  );

  useEffect(() => {
    if (currentPersonaAsEvidence) {
      setTagsPerPersona({
        ...tagsPerPersona,
        [currentPersonaAsEvidence.name]: [...selectedTags],
      });
    }
  }, [currentPersonaAsEvidence, selectedTags]);

  // set tagsPerPersona initially from evidence
  useEffect(() => {
    const initialTags = personasAsEvidence.reduce(
      (trendsMap, personaAsEvidence) => {
        if (!trendsMap[personaAsEvidence.name]) {
          if (personaAsEvidence.trends) {
            trendsMap[personaAsEvidence.name] = personaAsEvidence.trends.map(
              (trend) => ({
                id: trend.name,
                text: trend.name,
                className: trend.type,
              })
            );
          } else {
            trendsMap[personaAsEvidence.name] = [];
          }
        }
        return trendsMap;
      },
      {}
    );
    setTagsPerPersona(initialTags);
  }, []);

  /**
   * A function to open a modal dialog on top of a base modal to add a stakehodler persona as evidence.
   * @example <Component onClick={() => openAddPersonaModal()} />
   */
  const openAddPersonaModal = () => {
    if (addPersonaDialog) {
      addPersonaDialog.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) {
          addPersonaDialog.close();
        }
      });
      addPersonaDialog.showModal();
    }
  };

  const addPersonaAsEvidence = useCallback(
    /**
     * Add a Persona object to personasAsEvidence.
     * @param {Persona} persona The persona to add as evidence.
     * @returns {void}
     * @example <AddPersonaPane personaSelectedCallback={(persona) => addPersonaAsEvidence(persona)} />
     */
    async (persona) => {
      const newPersonaAsEvidence = {
        name: persona.name,
        persona_id: persona.id,
      };
      const newPersonasAsEvidence = [
        ...personasAsEvidence,
        newPersonaAsEvidence,
      ];
      setPersonasAsEvidence(newPersonasAsEvidence);
      await addFileFunc(newPersonaAsEvidence);

      document.getElementById("personaFilter").value = "";
      // addPersonaDialog.close();
    },
    [personasAsEvidence]
  );

  /**
   * A function to remove a persona as evidence from this pane.
   * @param {PersonaAsEvidence} persona The person to remove.
   * @example <Component onClick={() => removePersona(...)} />
   */
  const removePersona = async (persona) => {
    const pae = personasAsEvidence.find((pae) => pae.name === persona.name);
    const newPersonasAsEvidence = personasAsEvidence.filter(
      (p) => p.name !== persona.name
    );
    setPersonasAsEvidence(newPersonasAsEvidence);
    await removeFileFunc(pae.id);
    document.getElementById("personaFilter").value = "";
  };

  const getFlatTagsWithCountsFromTagsPerPersona = useCallback(() => {
    /**
     * @type {ReactTags.Tag[]}
     */
    const newAllTags = [];
    /**
     * @type {{[key: string]: {count: number, className: string}}}
     */
    const tagDataMap = {};
    Object.keys(tagsPerPersona).forEach((personaName) => {
      const fileTags = JSON.parse(JSON.stringify(tagsPerPersona[personaName]));
      fileTags.forEach((tag) => {
        if (!tagDataMap[tag.id]) {
          tagDataMap[tag.id] = {
            count: 0,
            className: tag.className,
          };
        }
        tagDataMap[tag.id].count += 1;
      });
    });
    Object.keys(tagDataMap).forEach((tagId) => {
      const tagData = tagDataMap[tagId];
      newAllTags.push({
        id: tagId,
        text: `${tagId} (${tagData.count})`,
        className: tagData.className,
      });
    });
    return newAllTags
      .sort(sortString)
      .sort((a, b) => getOccurenceNumber(b.text) - getOccurenceNumber(a.text));
  }, [tagsPerPersona]);

  // FIXME: update allTags if there are changes: added tags, edited tags, deleted tags
  // useEffect(() => {
  //   if (tagsPerPersona && personasAsEvidence) {
  //     let thereAreChangesToTrends = false;

  //     Object.keys(tagsPerPersona).forEach((personaName) => {
  //       const evidencePersona = personasAsEvidence.find(
  //         (p) => p.name === personaName
  //       );
  //       const tags = tagsPerPersona[personaName];
  //       if (tags && tags.length > 0) {
  //         const trends = tags.map((tag) => ({
  //           name: tag.id,
  //           type: tag.className,
  //         }));
  //         if (
  //           getJsonSortedString(evidencePersona.trends) !==
  //           getJsonSortedString(trends)
  //         ) {
  //           evidencePersona.trends = trends;
  //           thereAreChangesToTrends = true;
  //         }
  //       }
  //     });
  //     if (thereAreChangesToTrends) {
  //       const flatTags =
  //         getFlatTagsWithCountsFromTagsPerPersona(tagsPerPersona);
  //       allTagsUpdated(flatTags);
  //     }
  //   }
  // }, [tagsPerPersona]);

  return (
    <>
      <h2>
        <a style={{ cursor: "pointer" }} onClick={() => openAddPersonaModal()}>
          Add Persona
        </a>
      </h2>
      <table className="table">
        <tbody>
          {personasAsEvidence.map((personaAsEvidence) => (
            <tr key={`Item evidence: ${personaAsEvidence.name} `}>
              <td>
                <span
                  className="remove-evidence bi bi-trash"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (confirm("Are you sure?")) {
                      removePersona(personaAsEvidence);
                    }
                  }}
                ></span>
              </td>
              <td>
                {personaAsEvidence.created_date &&
                  new Date(personaAsEvidence.created_date).toLocaleDateString()}
              </td>
              <td>
                <a
                  className="pointer"
                  onClick={() => showPersonaTrendModal(personaAsEvidence)}
                >
                  {/* <img src={persona.icon} /> */}
                  {personaAsEvidence.name}
                </a>
              </td>
              <td>
                {tagsPerPersona && tagsPerPersona[personaAsEvidence.name] && (
                  <AllTagsContext.Provider
                    value={tagsPerPersona[personaAsEvidence.name]}
                  >
                    <EmpathyMapPane
                      removeComponent={({ className, onRemove }) => {
                        return (
                          <button onClick={onRemove} className={className}>
                            X
                          </button>
                        );
                      }}
                      handleDelete={(index) => {
                        const thisPersonaTrends =
                          tagsPerPersona[personaAsEvidence.name];
                        thisPersonaTrends.splice(index, 1);
                        setTagsPerPersona({
                          ...tagsPerPersona,
                          [personaAsEvidence.name]:
                            tagsPerPersona[personaAsEvidence.name],
                        });
                      }}
                    />
                  </AllTagsContext.Provider>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dialog
        id={ADD_PERSONA_DIALOG_ID}
        style={{ width: "600px", height: "600px" }}
      >
        <AddPersonaPane
          productId={productId}
          existingPersonaNames={personasAsEvidence.map((pae) => pae.name)}
          personaSelectedCallback={(persona) => addPersonaAsEvidence(persona)}
        />
      </dialog>
      <dialog
        id={EMPATHY_MAP_DIALOG_ID}
        style={{ width: "800px", height: "600px" }}
      >
        <AllTagsContext.Provider value={allTagsForEmpathyMapDialog}>
          <EmpathyMapPane
            handleTagClick={(tagIndex, reactTags) => {
              const tag = reactTags[tagIndex];
              const selectedTagIds = selectedTags.map((t) => t.id);
              if (selectedTagIds.includes(tag.id)) {
                setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
              } else {
                setSelectedTags([...selectedTags, tag]);
              }
            }}
          />
        </AllTagsContext.Provider>
      </dialog>
    </>
  );
};

export default StakeholderEvidencePane;
