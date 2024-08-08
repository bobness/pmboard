var express = require("express");
var router = express.Router();
//var mongoose = require('mongoose');
//var ObjectId = mongoose.Types.ObjectId;

/*
function checkUserAccess(req, req_level) {
  var userid = JSON.parse(req.cookies.userid);
  if (!(userid in req.product.permLookup) || req.product.permLookup[userid] < req_level) {
    var err = new Error("Unauthorized");
    err.status = 401;
    return err;
  }
}
*/

// get user personas
router.get("/", (req, res, next) => {
  /*
  var err = checkUserAccess(req, 1);
  if (err) return next(err);
*/
  return res.json(req.product.personas);
});

// add user persona
router.post("/", async (req, res, next) => {
  /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

  var prod = req.product;
  var newpersona = req.body;

  prod.personas.push(newpersona);
  await prod.save();

  return res.json(prod.personas[prod.personas.length - 1]);
});

router.param("persona_ix", function (req, res, next) {
  // TODO: assert ix is a normal int
  var ix = req.params.persona_ix;
  var prod = req.product;
  if (ix && ix < prod.personas.length) {
    req.personaIx = ix; // need to save just the index because we're saving the entire product document to the db
    return next();
  }
  var err = new Error("No such user type");
  err.status = 404;
  return next(err);
});

router.put("/:persona_ix", async (req, res, next) => {
  /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

  var prod = req.product;
  var ix = req.personaIx;

  prod.personas[ix] = req.body;

  await prod.save();
  return res.json({
    success: true,
  });
});

// delete user persona
router.delete("/:persona_ix", async (req, res, next) => {
  /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

  var prod = req.product;
  //if (req.body.ix) {
  var ix = req.personaIx;
  //var ix = req.body.ix;
  prod.personas.splice(ix, 1);

  try {
    await prod.save();
    return res.json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
  //}

  // TODO: remove this/put in the param thing above
  var err = new Error("Invalid request; index not specified");
  err.status = 400;
  return next(err);
});

// ****** persona evidence *****

// get persona evidence
router.get("/:persona_ix/evidence", function (req, res, next) {
  /*
  var err = checkUserAccess(req, 1);
  if (err) return next(err);
*/
  var prod = req.product;
  var ix = req.personaIx;
  return res.json(prod.personas[ix].evidence);
});

// add persona evidence
router.post("/:persona_ix/evidence", async (req, res, next) => {
  /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

  var prod = req.product;
  var ix = req.personaIx;
  const ev = req.body;

  if (!("evidence" in prod.personas[ix])) {
    prod.personas[ix].evidence = [];
  }
  prod.personas[ix].evidence.push(ev);

  await prod.save();

  return res.json({
    success: true,
  });
});

router.param("ev_ix", function (req, res, next) {
  // TODO: assert ev_ix is a normal int
  var ix = req.params.ev_ix;
  var prod = req.product;
  if (ix && ix < prod.personas[req.personaIx].evidence.length) {
    req.evIx = ix;
    return next();
  }
  var err = new Error("No such evidence file");
  err.status = 404;
  return next(err);
});

// delete persona evidence
router.delete("/:persona_ix/evidence/:ev_ix", function (req, res, next) {
  /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

  var prod = req.product;
  var ix = req.evIx;
  prod.personas[req.personaIx].evidence.splice(ix, 1);

  return prod.save(function (err) {
    if (err || !prod) {
      return res.json({
        success: false,
        error: err,
      });
    } else {
      return res.json({
        success: true,
      });
    }
  });

  var err = new Error("Invalid request; index not specified");
  err.status = 400;
  return next(err);
});

// ***** persona trends ******

// get persona trends
router.get("/:persona_ix/evidence/:ev_ix/trends", function (req, res, next) {
  /*
  var err = checkUserAccess(req, 1);
  if (err) return next(err);
*/
  var prod = req.product;
  var personaIx = req.personaIx;
  var evIx = req.evIx;
  return res.json(prod.personas[personaIx].evidence[evIx].trends);
});

// add persona trends
router.post("/:persona_ix/evidence/:ev_ix/trends", async (req, res, next) => {
  /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

  var prod = req.product;
  var personaIx = req.personaIx;
  var evIx = req.evIx;

  var trend = {
    name: req.body.name,
    type: req.body.type,
  };

  if (!("trends" in prod.personas[personaIx].evidence[evIx])) {
    prod.personas[personaIx].evidence[evIx].trends = [];
  }
  prod.personas[personaIx].evidence[evIx].trends.push(trend);

  await prod.save();
  return res.json(trend);
});

// change persona trends
router.put(
  "/:persona_ix/evidence/:ev_ix/trends/:trend_ix",
  async (req, res, next) => {
    /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

    var prod = req.product;
    var personaIx = req.personaIx;
    var evIx = req.evIx;
    var trendIx = req.params.trend_ix;
    var trend = prod.personas[personaIx].evidence[evIx].trends[trendIx];

    // execute the PUT changes
    trend.type = req.body.type;

    await prod.save();
    return res.json({
      success: true,
    });
  }
);

// delete persona trend
router.delete(
  "/:persona_ix/evidence/:ev_ix/trends/:trend_ix",
  function (req, res, next) {
    /*
  var err = checkUserAccess(req, 2);
  if (err) return next(err);
*/

    var prod = req.product;
    var personaIx = req.personaIx;
    var evIx = req.evIx;
    var trendIx = req.params.trend_ix;
    prod.personas[personaIx].evidence[evIx].trends.splice(trendIx, 1);

    return prod.save(function (err) {
      if (err || !prod) {
        return res.json({
          success: false,
          error: err,
        });
      } else {
        return res.json({
          success: true,
        });
      }
    });
  }
);

module.exports = router;
