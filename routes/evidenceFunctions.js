import { formatSetClauseValue } from "../util.js";

export const getEvidenceExpressFunc =
  (itemCollectionName, itemIndexKey) => (req, res, next) => {
    const { product, [itemIndexKey]: ix } = req;

    return res.json(product[itemCollectionName][ix].evidence);
  };

export const addEvidenceExpressFunc = (itemIdKey) => async (req, res, next) => {
  const { [itemIdKey]: id, body: record } = req;

  const fields = Object.keys(record);

  await req.client.query({
    text: `insert into evidence 
          (${fields.join(", ")}, ${itemIdKey}, created_date, modified_date) 
          values (${fields.map(
            (field) => record[field]
          )}, $1::integer, current_timestamp, current_timestamp)`,
    values: [id],
  });

  req.client.release();
  return res.json({
    success: true,
  });
};

export const updateEvidenceExpressFunc =
  (itemIdKey) => async (req, res, next) => {
    const { [itemIdKey]: itemId, body: records } = req;
    if (!itemId || !records) {
      req.client.release();
      return next("Missing arguments");
    }
    try {
      if (records.length === 0) {
        await req.client.query({
          text: "delete from evidence where story_id = $1::integer",
          values: [itemId],
        });
      } else {
        await Promise.all(
          records.map(async (record) => {
            let evidence;
            if (record.id) {
              evidence = record;
              const setClauseItems = Object.keys(record)
                .filter(
                  (key) =>
                    key !== "id" && key !== "trends" && key !== "story_id"
                )
                .map(
                  (recordKey) =>
                    `${recordKey} = ${formatSetClauseValue(record[recordKey])}`
                );
              if (!Object.keys(record).includes(itemIdKey)) {
                setClauseItems.push(`${itemIdKey} = ${itemId}`);
              }
              const setClause = setClauseItems.join(", ");
              await req.client.query({
                text: `update evidence set ${setClause} where id = $1::integer`,
                values: [record.id],
              });
            } else {
              const fields = Object.keys(record).filter(
                (key) => key !== "trends"
              );
              const query = `insert into evidence
                  (${fields.join(
                    ", "
                  )}, ${itemIdKey}, created_date, modified_date)
                  values (${fields.map((field) =>
                    formatSetClauseValue(record[field])
                  )}, $1::integer, current_timestamp, current_timestamp)
                  returning *`;
              evidence = {
                ...record,
                ...(await req.client
                  .query({
                    text: query,
                    values: [itemId],
                  })
                  .then((result) => result.rows[0])),
              };
            }

            if (evidence.trends) {
              const existingTrends =
                (await req.client
                  .query({
                    text: "select * from trends where evidence_id = $1::integer",
                    values: [evidence.id],
                  })
                  .then((result) => result.rows)) || [];
              await Promise.all(
                evidence.trends.map(async (trend) => {
                  const etrend = existingTrends.find(
                    (t) => t.name === trend.name
                  );
                  if (etrend) {
                    await req.client.query({
                      text: `update trends set type = $1::text where id = $2::integer`,
                      values: [trend.type, etrend.id],
                    });
                  } else {
                    await req.client.query({
                      text: "insert into trends (name, type, evidence_id) values ($1::text, $2::text, $3::integer)",
                      values: [trend.name, trend.type, evidence.id],
                    });
                  }
                })
              );
            }
          })
        );
      }
    } catch (err) {
      req.client.release();
      return next(err);
    }
    req.client.release();
    return res.json({
      success: true,
    });
  };

export const trackEvidenceIndexExpressFunc =
  (itemCollectionName, itemIndexKey) => (req, res, next) => {
    const { evidence_id } = req.params;

    req.evidence_id = evidence_id;

    next();
  };

export const deleteEvidenceExpressFunc =
  (itemCollectionName, itemIndexKey) => async (req, res, next) => {
    const { product, [itemIndexKey]: itemIndex } = req;
    product[itemCollectionName][itemIndex].evidence.splice(req.evidence_ix, 1);

    await prod.save();
  };

// *** trends functions ***

export const getTrendsExpressFunc =
  (itemCollectionName, itemIndexKey) => (req, res, next) => {
    const { product, [itemIndexKey]: itemIndex } = req;
    return res.json(
      product[itemCollectionName][itemIndex].evidence[req.evidence_ix].trends
    );
  };

export const addTrendExpressFunc =
  (itemCollectionName, itemIndexKey) => async (req, res, next) => {
    const { product, [itemIndexKey]: itemIndex } = req;
    var trend = req.body;

    if (
      !(
        "trends" in
        product[itemCollectionName][itemIndex].evidence[req.evidence_ix]
      )
    ) {
      product[itemCollectionName][itemIndex].evidence[req.evidence_ix].trends =
        [];
    }
    product[itemCollectionName][itemIndex].evidence[
      req.evidence_ix
    ].trends.push(trend);

    await prod.save();
    return res.json(trend);
  };

export const changeTrendExpressFunc =
  (itemCollectionName, itemIndexKey) => async (req, res, next) => {
    const { product, [itemIndexKey]: itemIndex } = req;
    var evIx = req.evidence_ix;
    var trendIx = req.params.trend_ix;
    var trend =
      product[itemCollectionName][itemIndex].evidence[evIx].trends[trendIx];

    // execute the PUT changes
    trend.type = req.body.type;

    await prod.save();
    return res.json({
      success: true,
    });
  };

export const deleteTrendExpressFunc = () => async (req, res, next) => {
  var trendId = req.params.trend_id;

  if (trendId) {
    await req.client.query({
      text: "delete from trends where id = $1::integer",
      values: [trendId],
    });

    req.client.release();
    return res.json({
      success: true,
    });
  } else {
    const err = new Error("Invalid request: no trend_id");
    err.status = 400;
    next(err);
  }
};

// module.exports = {
//   getEvidenceExpressFunc,
//   addEvidenceExpressFunc,
//   trackEvidenceIndexExpressFunc,
//   updateEvidenceExpressFunc,
//   deleteEvidenceExpressFunc,
//   getTrendsExpressFunc,
//   addTrendExpressFunc,
//   changeTrendExpressFunc,
//   deleteTrendExpressFunc,
// };
