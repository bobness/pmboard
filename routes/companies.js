const express = require("express");
const router = express.Router();

const {
  addItem,
  updateItem,
  deleteItem,
} = require("./collectionItemFunctions");

const {
  getEvidenceExpressFunc,
  addEvidenceExpressFunc,
  trackEvidenceIndexExpressFunc,
  deleteEvidenceExpressFunc,
  getTrendsExpressFunc,
  addTrendExpressFunc,
  changeTrendExpressFunc,
  deleteTrendExpressFunc,
} = require("./evidenceFunctions");

router.get("/", async (req, res, next) => {
  /*
  const err = checkUserAccess(req, 1);
  if (err) return next(err);
*/
  const companies = await req.client
    .query({
      text: "select * from companies where product_id = $1::integer",
      values: [req.product_id],
    })
    .then((result) => result.rows);
  // await Promise.all(
  //   companies.map(async (company) => {
  //     company.evidence = await req.client
  //       .query({
  //         text: "select * from evidence where story_id = $1::integer",
  //         values: [company.id],
  //       })
  //       .then((result) => result.rows);
  //   })
  // );
  req.client.release();
  // DEBUG until they get evidence
  companies.forEach((company) => (company.evidence = []));
  // TODO: get and assign trends, too
  return res.json(companies);
});

router.post("/", addItem("companies"));

router.param("company_id", function (req, res, next) {
  req.company_id = req.params.company_id;
  return next();
});

router.put("/:company_id", updateItem("companies", "company_id"));

router.delete("/:company_id", deleteItem("companies", "company_id"));

// evidence & trends from evidenceFunctions.js

router.get(
  "/:company_id/evidence",
  getEvidenceExpressFunc("companies", "company_id")
);

router.post(
  "/:company_id/evidence",
  addEvidenceExpressFunc("companies", "company_id")
);

router.param(
  "evidence_ix",
  trackEvidenceIndexExpressFunc("companies", "company_id")
);

router.delete(
  "/:company_id/evidence/:evidence_ix",
  deleteEvidenceExpressFunc("companies", "company_id")
);

router.get(
  "/:company_id/evidence/:evidence_ix/trends",
  getTrendsExpressFunc("companies", "company_id")
);

router.post(
  "/:company_id/evidence/:evidence_ix/trends",
  addTrendExpressFunc("companies", "company_id")
);

router.put(
  "/:company_id/evidence/:evidence_ix/trends/:trend_ix",
  changeTrendExpressFunc("companies", "company_id")
);

router.delete(
  "/:company_id/evidence/:evidence_ix/trends/:trend_ix",
  deleteTrendExpressFunc("companies", "company_id")
);

module.exports = router;
