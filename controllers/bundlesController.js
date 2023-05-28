const Bundle = require("../models/Bundle");
const BundleItem = require("../models/BundleItem");
const User = require("../models/User");
const Counter = require("../models/Counter");

// @desc Get all bundles
// @route GET /bundles
// @access Private
const getAllBundles = async (req, res) => {
  // Get all bundles from MongoDB
  const bundles = await Bundle.find().sort({ createdAt: -1 }).lean();

  // If no bundles
  if (!bundles?.length) {
    return res.status(400).json({ message: "No bundles found" });
  }

  // Add username to each bundle before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const bundlesWithUser = await Promise.all(
    bundles.map(async (bundle) => {
      const user = await User.findById(bundle.user).lean().exec();
      return { ...bundle, regusername: user.username };
    })
  );

  res.json(bundlesWithUser);
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

// @desc Create new bundle
// @route POST /bundles
// @access Private
const createNewBundle = async (req, res) => {
  let payload, duplicate;
  console.log(req.body);
  const { bundleNo, bundleBranch, bundleWgt, bundleType, bundleDate, innerNo, sumCnt, sumWgt, user } = req.body;
  const bundleItems = req.body.items;

  /*  const year = new Date().getFullYear().toString().slice(-2);
   const doc = await Counter.findOneAndUpdate(
    { type: "compReg", value: payload.compRegister, time: year },
    { $inc: { sequence_value: 1 } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  ); */
  //console.log(doc);
  //payload.mailId = doc.value + doc.time + zeroPad(doc.sequence_value, 6);

  // Create and store the new user
  const bundle = Bundle.insertMany({ bundleNo, bundleBranch, bundleWgt, bundleType, bundleDate, innerNo, sumCnt, sumWgt, user })
    .then((result) => {
      console.log("Successfully saved default items to DB");
      result.forEach((bundle, index) => {
        insertedId = bundle._id.toString();
      });
/*       bundleItems.map((x) => ({
        ...x,
        bundleId: insertedId,
      })); */
      bundleItems.forEach(e => e.bundleId = insertedId);
      console.log(bundleItems);
      const bundleItem = BundleItem.insertMany(bundleItems);
      if (bundleItem) {
        return res.status(201).json({ message: "New bundle and item created" });
      } else {
        return res.status(400).json({ message: "Invalid bundle item data received" });
      }
    })
    .catch(function (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    });
  /*   if (bundle) {
    const bundleItem = BundleItem.insertMany(req.body.items);
    if (bundleItem) {
      return res.status(201).json({ message: "New bundle and item created" });
    } else {
      return res.status(400).json({ message: "Invalid bundle item data received" });
    }
  } else {
    return res.status(400).json({ message: "Invalid bundle data received" });
  } */
};

// @desc Update a bundle
// @route PATCH /bundles
// @access Private
const updateBundle = async (req, res) => {
  console.log(req.body);
  const {
    id,
    user,
    prgsStatusCd,
    houseSeq,
    mailId,
    mailBagNumber,
    blNo,
    reportType,
    riskType,
    netWgt,
    wgt,
    //wgtUnit,
    qty,
    qtyUnit,
    dangGoodsCode,
    transFare,
    transFareCurr,
    transportType,
    isDiplomat,
    goodsNm,
    shipperCntryCd,
    shipperCntryNm,
    shipperNatinality,
    shipperNm,
    shipperReg,
    shipperAddr,
    shipperTel,
    consigneeCntryCd,
    consigneeCntryNm,
    consigneeNatinality,
    consigneeNm,
    consigneeReg,
    consigneeAddr,
    consigneeTel,
    mailDate,
  } = req.body;

  // Confirm data
  /*   if (!id || !prgsStatusCd !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  } */

  // Confirm bundle exists to update
  const bundle = await Bundle.findById(id).exec();

  if (!bundle) {
    return res.status(400).json({ message: "Bundle not found" });
  }

  // Check for duplicate title
  /*   const duplicate = await Bundle.findOne({
    $and: [{ mailId, blNo }],
  })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original bundle
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate bundle title" });
  } */
  //if (prgsStatusCd) {
  bundle.prgsStatusCd = prgsStatusCd;
  (bundle.houseSeq = houseSeq),
    (bundle.mailId = mailId),
    (bundle.mailBagNumber = mailBagNumber),
    (bundle.blNo = blNo),
    (bundle.reportType = reportType),
    (bundle.riskType = riskType),
    (bundle.netWgt = netWgt),
    (bundle.wgt = wgt),
    //wgtUnit,
    (bundle.qty = qty),
    (bundle.qtyUnit = qtyUnit),
    (bundle.dangGoodsCode = dangGoodsCode),
    (bundle.transFare = transFare),
    (bundle.transFareCurr = transFareCurr),
    (bundle.transportType = transportType),
    (bundle.isDiplomat = isDiplomat),
    (bundle.goodsNm = goodsNm),
    (bundle.shipperCntryCd = shipperCntryCd),
    (bundle.shipperCntryNm = shipperCntryNm),
    (bundle.shipperNatinality = shipperNatinality),
    (bundle.shipperNm = shipperNm),
    (bundle.shipperReg = shipperReg),
    (bundle.shipperAddr = shipperAddr),
    (bundle.shipperTel = shipperTel),
    (bundle.consigneeCntryCd = consigneeCntryCd),
    (bundle.consigneeCntryNm = consigneeCntryNm),
    (bundle.consigneeNatinality = consigneeNatinality),
    (bundle.consigneeNm = consigneeNm),
    (bundle.consigneeReg = consigneeReg),
    (bundle.consigneeAddr = consigneeAddr),
    (bundle.consigneeTel = consigneeTel),
    (bundle.mailDate = mailDate);
  //}

  const updatedBundle = await bundle.save();

  res.json(`'${updatedBundle.houseSeq}' updated`);
};

// @desc Delete a bundle
// @route DELETE /bundles
// @access Private
const deleteBundle = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Bundle ID required" });
  }

  let reply = "";
  const result = await Bundle.deleteMany({ _id: { $in: id } })
    .then((result) => {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });
  const resultItem = await BundleItem.deleteMany({ bundleId: { $in: id } });
  console.log(resultItem);
  reply = `Packages with ID ${id} deleted`;
  res.json(reply);
};

const sendBundle = async (req, res) => {
  //const { HOUSE_SEQ } = req.body;
  //let jsonString = JSON.stringify(req.body.arr);
  console.log(req.body.jsonString);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: req.body.jsonString,
  };
  res = await fetch("https://api.gaali.mn/ceps/send/cargo/short", requestOptions)
    //.then((res) => res.json())
    .then((res) => console.log(res));

  //res.json(reply);
};

module.exports = {
  getAllBundles,
  createNewBundle,
  updateBundle,
  deleteBundle,
  sendBundle,
};
