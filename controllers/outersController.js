const Outer = require("../models/Outer");
const User = require("../models/User");
const Counter = require("../models/Counter");

// @desc Get all outers
// @route GET /outers
// @access Private
const getAllOuters = async (req, res) => {
  // Get all outers from MongoDB
  const outers = await Outer.find({ delYn: "N" }).sort({ createdAt: -1 }).lean();

  // If no outers
  if (!outers?.length) {
    return res.status(400).json({ message: "No outers found" });
  }

  // Add username to each outer before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const outersWithUser = await Promise.all(
    outers.map(async (outer) => {
      const user = await User.findById(outer.user).lean().exec();
      return { ...outer, regusername: user.username };
    })
  );

  res.json(outersWithUser);
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

// @desc Create new outer
// @route POST /outers
// @access Private
const createNewOuter = async (req, res) => {
  let payload, duplicate;

  if (Object.hasOwn(req.body, "data")) {
    payload = req.body.data;
    for (let i = 0; i < payload.length; i++) {
      const mailId = payload[i].mailId;
      const blNo = payload[i].blNo;
      console.log(mailId, blNo);
      duplicate = await Outer.findOne({
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
    /*     duplicate = await Outer.findOne({
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

  /*   duplicate = await Outer.findOne({
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
  const outer = Outer.insertMany(payload)
    .then((result) => {
      console.log("Successfully saved default items to DB");
      result.forEach((package, index) => {
        console.log(`User ${index + 1} _id:`, package._id);
        insertedId = package._id.toString();
        console.log("1=>" + insertedId);
      });
      return res.status(201).json({ message: "New outer created", createdId: insertedId });
    })
    .catch(function (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    });
};

// @desc Update a outer
// @route PATCH /outers
// @access Private
const updateOuter = async (req, res) => {
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

  // Confirm outer exists to update
  const outer = await Outer.findById(id).exec();

  if (!outer) {
    return res.status(400).json({ message: "Outer not found" });
  }

  // Check for duplicate title
  /*   const duplicate = await Outer.findOne({
    $and: [{ mailId, blNo }],
  })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original outer
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate outer title" });
  } */
  //if (prgsStatusCd) {
  outer.prgsStatusCd = prgsStatusCd;
  (outer.houseSeq = houseSeq),
    (outer.mailId = mailId),
    (outer.mailBagNumber = mailBagNumber),
    (outer.blNo = blNo),
    (outer.reportType = reportType),
    (outer.riskType = riskType),
    (outer.netWgt = netWgt),
    (outer.wgt = wgt),
    //wgtUnit,
    (outer.qty = qty),
    (outer.qtyUnit = qtyUnit),
    (outer.dangGoodsCode = dangGoodsCode),
    (outer.transFare = transFare),
    (outer.transFareCurr = transFareCurr),
    (outer.transportType = transportType),
    (outer.isDiplomat = isDiplomat),
    (outer.goodsNm = goodsNm),
    (outer.shipperCntryCd = shipperCntryCd),
    (outer.shipperCntryNm = shipperCntryNm),
    (outer.shipperNatinality = shipperNatinality),
    (outer.shipperNm = shipperNm),
    (outer.shipperReg = shipperReg),
    (outer.shipperAddr = shipperAddr),
    (outer.shipperTel = shipperTel),
    (outer.consigneeCntryCd = consigneeCntryCd),
    (outer.consigneeCntryNm = consigneeCntryNm),
    (outer.consigneeNatinality = consigneeNatinality),
    (outer.consigneeNm = consigneeNm),
    (outer.consigneeReg = consigneeReg),
    (outer.consigneeAddr = consigneeAddr),
    (outer.consigneeTel = consigneeTel),
    (outer.mailDate = mailDate);
  //}

  const updatedOuter = await outer.save();

  res.json(`'${updatedOuter.houseSeq}' updated`);
};

// @desc Delete a outer
// @route DELETE /outers
// @access Private
const deleteOuter = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Outer ID required" });
  }

  let reply = "";
  const result = await Outer.updateMany({ _id: { $in: id } }, { $set: { delYn: "Y" } })
    .then((result) => {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });
  reply = `Packages with ID ${id} deleted`;
  res.json(reply);
};

const sendOuter = async (req, res) => {
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
  getAllOuters,
  createNewOuter,
  updateOuter,
  deleteOuter,
  sendOuter,
};
