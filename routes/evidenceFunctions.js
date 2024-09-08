import { formatSQLValue } from "../util.js";

// TODO: missing JSDoc + no tool complaints

export const getEvidenceExpressFunc =
  (itemCollectionName, itemIndexKey) => (req, res, next) => {
    const { product, [itemIndexKey]: ix } = req;

    return res.json(product[itemCollectionName][ix].evidence);
  };

export const addEvidenceExpressFunc = (itemIdKey) => async (req, res, next) => {
  const { [itemIdKey]: id, body: record } = req;

  const fields = Object.keys(record);

  await req.pool.query({
    text: `insert into evidence 
          (${fields.join(", ")}, ${itemIdKey}) 
          values (${fields.map((field) =>
            formatSQLValue(record[field])
          )}, $1::integer)`,
    values: [id],
  });

  return res.json({
    success: true,
  });
};

export const trackEvidenceIdExpressFunc = () => (req, res, next) => {
  const { evidence_id } = req.params;

  req.evidence_id = evidence_id;

  next();
};

export const deleteEvidenceExpressFunc = () => async (req, res, next) => {
  await req.pool.query({
    text: "delete from evidence where id = $1::integer",
    values: [req.evidence_id],
  });
  return res.json({ success: true });
};

// *** trends functions ***

// export const getTrendsExpressFunc =
//   (itemCollectionName, itemIndexKey) => (req, res, next) => {
//     const { product, [itemIndexKey]: itemIndex } = req;
//     return res.json(
//       product[itemCollectionName][itemIndex].evidence[req.evidence_ix].trends
//     );
//   };

export const addTrendExpressFunc = () => async (req, res, next) => {
  const evId = req.evidence_id;
  const trend = req.body;

  const newTrend = await req.pool
    .query({
      text: "insert into trends (name, type, evidence_id) values ($1::text, $2::text, $3::integer) returning *",
      values: [trend.name, trend.type, evId],
    })
    .then((result) => result.rows[0]);

  return res.json(newTrend);
};

export const updateTrendExpressFunc = () => async (req, res, next) => {
  const trendId = req.params.trend_id;
  const trend = req.body;

  if (trendId && trendId == parseInt(trendId)) {
    await req.pool.query({
      text: "update trends set name = $1::text, type = $2::text where id = $3::integer",
      values: [trend.name, trend.type, trendId],
    });
    return res.json({
      success: true,
    });
  } else {
    const err = new Error("Invalid request: no trend_id");
    err.status = 400;
    next(err);
  }
};

export const deleteTrendExpressFunc = () => async (req, res, next) => {
  const trendId = req.params.trend_id;

  if (trendId) {
    await req.pool.query({
      text: "delete from trends where id = $1::integer",
      values: [trendId],
    });

    return res.json({
      success: true,
    });
  } else {
    const err = new Error("Invalid request: no trend_id");
    err.status = 400;
    next(err);
  }
};
