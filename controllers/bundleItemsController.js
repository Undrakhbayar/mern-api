const BundleItem = require("../models/BundleItem");
const User = require("../models/User");
const Counter = require("../models/Counter");

// @desc Get all bundleItems
// @route GET /bundleItems
// @access Private
const getAllBundleItems = async (req, res) => {
  // Get all bundleItems from MongoDB
  const bundleItems = await BundleItem.find({ delYn: "N" }).sort({ createdAt: -1 }).lean();

  // If no bundleItems
  if (!bundleItems?.length) {
    return res.status(400).json({ message: "No bundleItems found" });
  }

  // Add username to each bundleItem before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const bundleItemsWithUser = await Promise.all(
    bundleItems.map(async (bundleItem) => {
      const user = await User.findById(bundleItem.user).lean().exec();
      return { ...bundleItem, regusername: user.username };
    })
  );

  res.json(bundleItemsWithUser);
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

// @desc Create new bundleItem
// @route POST /bundleItems
// @access Private
const createNewBundleItem = async (req, res) => {
  let payload, duplicate;

  if (Object.hasOwn(req.body, "data")) {
    payload = req.body.data;
    for (let i = 0; i < payload.length; i++) {
      const mailId = payload[i].mailId;
      const blNo = payload[i].blNo;
      console.log(mailId, blNo);
      duplicate = await BundleItem.findOne({
        $and: [{ mailId, blNo }],
      })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();
    }
  } else {
    payload = req.body;
    const { mailId, blNo } = req.body;
    /*    const doc = await Counter.findOneAndUpdate({ type: "houseSeq", blNo: blNo }, { $inc: { sequence_value: 1 } }, {
      new: true,
    });
    payload.houseSeq = zeroPad(doc.sequence_value, 3)
    console.log(doc.sequence_value); */
    /*     duplicate = await BundleItem.findOne({
      $and: [{ mailId, blNo }],
    })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec(); */
  }
  // Check for duplicate title

  const year = new Date().getFullYear().toString().slice(-2);
  const doc = await Counter.findOneAndUpdate(
    { type: "compReg", value: payload.compRegister, time: year },
    { $inc: { sequence_value: 1 } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );
  console.log(doc);
  payload.mailId = doc.value + doc.time + zeroPad(doc.sequence_value, 6);

  /*   duplicate = await BundleItem.findOne({
    $and: [{ mailId, blNo }],
  })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec(); */
  console.log(payload);
  if (duplicate) {
    console.log("duplicate");
    return res.status(409).json({ message: "№ болон илгээмжийн дугаар давхцсан байна!" });
  }
  // Create and store the new user
  let insertedId = "";
  const bundleItem = BundleItem.insertMany(payload)
    .then((result) => {
      console.log("Successfully saved default items to DB");
      result.forEach((package, index) => {
        console.log(`User ${index + 1} _id:`, package._id);
        insertedId = package._id.toString();
        console.log("1=>" + insertedId);
      });
      return res.status(201).json({ message: "New bundleItem created", createdId: insertedId });
    })
    .catch(function (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    });
};

// @desc Update a bundleItem
// @route PATCH /bundleItems
// @access Private
const updateBundleItem = async (req, res) => {
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

  // Confirm bundleItem exists to update
  const bundleItem = await BundleItem.findById(id).exec();

  if (!bundleItem) {
    return res.status(400).json({ message: "BundleItem not found" });
  }

  // Check for duplicate title
  /*   const duplicate = await BundleItem.findOne({
    $and: [{ mailId, blNo }],
  })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original bundleItem
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate bundleItem title" });
  } */
  //if (prgsStatusCd) {
  bundleItem.prgsStatusCd = prgsStatusCd;
  (bundleItem.houseSeq = houseSeq),
    (bundleItem.mailId = mailId),
    (bundleItem.mailBagNumber = mailBagNumber),
    (bundleItem.blNo = blNo),
    (bundleItem.reportType = reportType),
    (bundleItem.riskType = riskType),
    (bundleItem.netWgt = netWgt),
    (bundleItem.wgt = wgt),
    //wgtUnit,
    (bundleItem.qty = qty),
    (bundleItem.qtyUnit = qtyUnit),
    (bundleItem.dangGoodsCode = dangGoodsCode),
    (bundleItem.transFare = transFare),
    (bundleItem.transFareCurr = transFareCurr),
    (bundleItem.transportType = transportType),
    (bundleItem.isDiplomat = isDiplomat),
    (bundleItem.goodsNm = goodsNm),
    (bundleItem.shipperCntryCd = shipperCntryCd),
    (bundleItem.shipperCntryNm = shipperCntryNm),
    (bundleItem.shipperNatinality = shipperNatinality),
    (bundleItem.shipperNm = shipperNm),
    (bundleItem.shipperReg = shipperReg),
    (bundleItem.shipperAddr = shipperAddr),
    (bundleItem.shipperTel = shipperTel),
    (bundleItem.consigneeCntryCd = consigneeCntryCd),
    (bundleItem.consigneeCntryNm = consigneeCntryNm),
    (bundleItem.consigneeNatinality = consigneeNatinality),
    (bundleItem.consigneeNm = consigneeNm),
    (bundleItem.consigneeReg = consigneeReg),
    (bundleItem.consigneeAddr = consigneeAddr),
    (bundleItem.consigneeTel = consigneeTel),
    (bundleItem.mailDate = mailDate);
  //}

  const updatedBundleItem = await bundleItem.save();

  res.json(`'${updatedBundleItem.houseSeq}' updated`);
};

// @desc Delete a bundleItem
// @route DELETE /bundleItems
// @access Private
const deleteBundleItem = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "BundleItem ID required" });
  }

  let reply = "";
  const result = await BundleItem.updateMany({ _id: { $in: id } }, { $set: { delYn: "Y" } })
    .then((result) => {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });
  reply = `Packages with ID ${id} deleted`;
  res.json(reply);
};

const sendBundleItem = async (req, res) => {
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
  getAllBundleItems,
  createNewBundleItem,
  updateBundleItem,
  deleteBundleItem,
  sendBundleItem,
};
