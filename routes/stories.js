import express from "express";
const router = express.Router();

import { addItem, updateItem, deleteItem } from "./collectionItemFunctions.js";

import {
  getEvidenceExpressFunc,
  addEvidenceExpressFunc,
  trackEvidenceIdExpressFunc,
  deleteEvidenceExpressFunc,
  addTrendExpressFunc,
  updateTrendExpressFunc,
  deleteTrendExpressFunc,
} from "./evidenceFunctions.js";
import { formatSQLValue } from "../util.js";

router.get("/", async (req, res, next) => {
  /*
  const err = checkUserAccess(req, 1);
  if (err) return next(err);
*/
  const stories = await req.pool
    .query({
      text: "select * from stories where product_id = $1::integer",
      values: [req.product_id],
    })
    .then((result) => result.rows);
  await Promise.all(
    stories.map(async (story) => {
      story.evidence = await req.pool
        .query({
          text: "select * from evidence where story_id = $1::integer",
          values: [story.id],
        })
        .then((result) => result.rows);
      await Promise.all(
        story.evidence.map(async (personaAsEvidence) => {
          personaAsEvidence.trends = await req.pool
            .query({
              text: "select * from trends where evidence_id = $1::integer",
              values: [personaAsEvidence.id],
            })
            .then((result) => result.rows);
        })
      );
      const journey = await req.pool
        .query({
          text: "select * from journeys where story_id = $1::integer",
          values: [story.id],
        })
        .then((result) => result.rows[0]);
      if (journey) {
        story.summary = {
          id: journey.id,
          steps: await req.pool
            .query({
              text: "select * from journey_steps where journey_id = $1::integer",
              values: [journey.id],
            })
            .then((result) => result.rows),
        };
      }
    })
  );
  return res.json(stories);
});

router.put("/", async (req, res, next) => {
  const stories = req.body;
  await Promise.all(
    stories.map((story) => {
      const setClause = Object.keys(story)
        .filter((key) => key !== "id")
        .map((key) => `${key} = ${formatSQLValue(story[key])}`);
      return req.pool.query({
        text: `update stories set ${setClause} where id = $1::integer`,
        values: [story.id],
      });
    })
  );
  return res.sendStatus(200);
});

router.post("/", addItem("stories"));

router.param("story_id", function (req, res, next) {
  req.story_id = req.params.story_id;
  next();
});

router.put("/:story_id", async (req, res, next) => {
  // await updateItem("stories", "story_id")(req, res, next);
  if (req.body.summary) {
    const story_id = req.story_id;
    const { summary } = req.body;
    let journeyId = summary.id;
    let steps = summary.steps;
    if (!journeyId) {
      journeyId = await req.pool
        .query({
          text: "insert into journeys (story_id) values ($1::integer) returning *",
          values: [story_id],
        })
        .then((result) => result.rows[0].id);
    }
    await Promise.all(
      steps.map((step) => {
        req.pool.query({
          text: `insert into journey_steps (journey_id, tag_id, tag_class_name, tag_text, x, y) 
          values ($1::integer, $2::text, $3::text, $4::text, $5::text, $6::text) 
          on conflict (journey_id, tag_id) do update 
            set tag_class_name = $3::text, x = $5::text, y = $6::text`,
          values: [
            journeyId,
            step.tagId,
            step.tagClassName,
            step.tagText,
            step.x,
            step.y,
          ],
        });
      })
    );
    return res.sendStatus(200);
  }
  return res.sendStatus(400);
});

router.delete("/:story_id", deleteItem("stories", "story_id"));

// evidence & trends from evidenceFunctions.js

router.get(
  "/:story_id/evidence",
  getEvidenceExpressFunc("stories", "story_id")
);

router.post("/:story_id/evidence", addEvidenceExpressFunc("story_id"));

router.param("evidence_id", trackEvidenceIdExpressFunc("stories", "story_id"));

router.delete("/:story_id/evidence/:evidence_id", deleteEvidenceExpressFunc());

router.post(
  "/:story_id/evidence/:evidence_id/trends",
  addTrendExpressFunc("stories", "story_id")
);

router.put(
  "/:story_id/evidence/:evidence_id/trends/:trend_ix",
  updateTrendExpressFunc("stories", "story_id")
);

router.delete(
  "/:story_id/evidence/:evidence_id/trends/:trend_ix",
  deleteTrendExpressFunc("stories", "story_id")
);

// module.exports = router;
export default router;
