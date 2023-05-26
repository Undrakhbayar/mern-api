const Mail = require("../models/Mail");
const User = require("../models/User");
const Counter = require("../models/Counter");

// @desc Get all mails
// @route GET /mails
// @access Private
const getAllMails = async (req, res) => {
  // Get all mails from MongoDB
  const mails = await Mail.find({ delYn: "N" }).sort({ createdAt: -1 }).lean();

  // If no mails
  if (!mails?.length) {
    return res.status(400).json({ message: "No mails found" });
  }

  // Add username to each mail before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const mailsWithUser = await Promise.all(
    mails.map(async (mail) => {
      const user = await User.findById(mail.user).lean().exec();
      return { ...mail, regusername: user.username };
    })
  );

  res.json(mailsWithUser);
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

// @desc Create new mail
// @route POST /mails
// @access Private
const createNewMail = async (req, res) => {
  let payload, duplicate;

  if (Object.hasOwn(req.body, "data")) {
    payload = req.body.data;
    for (let i = 0; i < payload.length; i++) {
      const mailId = payload[i].mailId;
      const blNo = payload[i].blNo;
      console.log(mailId, blNo);
      duplicate = await Mail.findOne({
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
    /*     duplicate = await Mail.findOne({
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

  /*   duplicate = await Mail.findOne({
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
  const mail = Mail.insertMany(payload)
    .then((result) => {
      console.log("Successfully saved default items to DB");
      result.forEach((package, index) => {
        console.log(`User ${index + 1} _id:`, package._id);
        insertedId = package._id.toString();
        console.log("1=>" + insertedId);
      });
      return res.status(201).json({ message: "New mail created", createdId: insertedId });
    })
    .catch(function (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    });
};

// @desc Update a mail
// @route PATCH /mails
// @access Private
const updateMail = async (req, res) => {
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

  // Confirm mail exists to update
  const mail = await Mail.findById(id).exec();

  if (!mail) {
    return res.status(400).json({ message: "Mail not found" });
  }

  // Check for duplicate title
  /*   const duplicate = await Mail.findOne({
    $and: [{ mailId, blNo }],
  })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original mail
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate mail title" });
  } */
  //if (prgsStatusCd) {
  mail.prgsStatusCd = prgsStatusCd;
  (mail.houseSeq = houseSeq),
    (mail.mailId = mailId),
    (mail.mailBagNumber = mailBagNumber),
    (mail.blNo = blNo),
    (mail.reportType = reportType),
    (mail.riskType = riskType),
    (mail.netWgt = netWgt),
    (mail.wgt = wgt),
    //wgtUnit,
    (mail.qty = qty),
    (mail.qtyUnit = qtyUnit),
    (mail.dangGoodsCode = dangGoodsCode),
    (mail.transFare = transFare),
    (mail.transFareCurr = transFareCurr),
    (mail.transportType = transportType),
    (mail.isDiplomat = isDiplomat),
    (mail.goodsNm = goodsNm),
    (mail.shipperCntryCd = shipperCntryCd),
    (mail.shipperCntryNm = shipperCntryNm),
    (mail.shipperNatinality = shipperNatinality),
    (mail.shipperNm = shipperNm),
    (mail.shipperReg = shipperReg),
    (mail.shipperAddr = shipperAddr),
    (mail.shipperTel = shipperTel),
    (mail.consigneeCntryCd = consigneeCntryCd),
    (mail.consigneeCntryNm = consigneeCntryNm),
    (mail.consigneeNatinality = consigneeNatinality),
    (mail.consigneeNm = consigneeNm),
    (mail.consigneeReg = consigneeReg),
    (mail.consigneeAddr = consigneeAddr),
    (mail.consigneeTel = consigneeTel),
    (mail.mailDate = mailDate);
  //}

  const updatedMail = await mail.save();

  res.json(`'${updatedMail.houseSeq}' updated`);
};

// @desc Delete a mail
// @route DELETE /mails
// @access Private
const deleteMail = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Mail ID required" });
  }

  let reply = "";
  const result = await Mail.updateMany({ _id: { $in: id } }, { $set: { delYn: "Y" } })
    .then((result) => {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });
  reply = `Packages with ID ${id} deleted`;
  res.json(reply);
};

const sendMail = async (req, res) => {
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
  getAllMails,
  createNewMail,
  updateMail,
  deleteMail,
  sendMail,
};
