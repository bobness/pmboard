/*
function checkUserAccess(req, req_level) {
  var userid = JSON.parse(req.cookies.userid);
  if (!(userid in req.product.permLookup) || req.product.permLookup[userid] < req_level) {
    var err = new Error("Unauthorized");
    err.status = 403;
    return err;
  }
}
*/

// TODO: missing JSDoc + no tool complaints

export const addItem = (collectionName) => async (req, res, next) => {
  /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

  const { product_id, body: newObject } = req;

  try {
    const insertedObject = await req.pool.query({
      text: `insert into ${collectionName} (name, product_id) values ($1::text, $2::integer) returning *`,
      values: [newObject.name, product_id],
    });
    return res.json(insertedObject);
  } catch (err) {
    return next(err);
  }
};

export const updateItem =
  (collectionName, idName) => async (req, res, next) => {
    /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

    const { [idName]: id, body } = req;

    const setClause = Object.keys(body)
      .map((objectKey) => `${key} = ${body[objectKey]}`)
      .join(" and ");

    try {
      await req.pool.query({
        text: `update ${collectionName} set ${setClause} where id = $1::integer`,
        values: [id],
      });
      return res.json({
        success: true,
      });
    } catch (err) {
      return next(err);
    }
  };

export const deleteItem =
  (collectionName, idName) => async (req, res, next) => {
    /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

    const { [idName]: id } = req;

    try {
      await req.pool.query({
        text: `delete from ${collectionName} where id = $1::integer`,
        values: [id],
      });
      return res.json({
        success: true,
      });
    } catch (err) {
      return next(err);
    }
  };

// module.exports = { addItem, updateItem, deleteItem };
