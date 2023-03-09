const Packagee = require("../models/Packagee");
const User = require("../models/User");

// @desc Get all packagees
// @route GET /packagees
// @access Private
const getAllPackagees = async (req, res) => {
  // Get all packagees from MongoDB
  const packagees = await Packagee.find({ delYn: "N" }).sort({ createdAt: -1 }).lean();

  // If no packagees
  if (!packagees?.length) {
    return res.status(400).json({ message: "No packagees found" });
  }

  // Add username to each packagee before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const packageesWithUser = await Promise.all(
    packagees.map(async (packagee) => {
      const user = await User.findById(packagee.user).lean().exec();
      return { ...packagee, regusername: user.username };
    })
  );

  res.json(packageesWithUser);
};

// @desc Create new packagee
// @route POST /packagees
// @access Private
const createNewPackagee = async (req, res) => {
  console.log(req.body);

  let payload, duplicate;

  if (Object.hasOwn(req.body, "data")) {
    payload = req.body.data;
    for (let i = 0; i < payload.length; i++) {
      const mailId = payload[i].mailId;
      const blNo = payload[i].blNo;
      console.log(mailId,blNo)
      duplicate = await Packagee.findOne({
        $and: [{ mailId, blNo }],
      })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();
    }
  } else {
    payload = req.body;
    const {mailId, blNo} = req.body;
    duplicate = await Packagee.findOne({
      $and: [{ mailId, blNo }],
    })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();
  }

  // Confirm data
  /*   if (!user) {
    console.log(user);
    return res.status(400).json({ message: "All fields are required" });
  } */

  // Check for duplicate title

  if (duplicate) {
    console.log("duplicate");
    return res.status(409).json({ message: "№ болон илгээмжийн дугаар давхцсан байна!" });
  }
  // Create and store the new user
  const packagee = Packagee.insertMany(payload);

  if (packagee) {
    // Created
    console.log("created");
    return res.status(201).json({ message: "New packagee created" });
  } else {
    return res.status(400).json({ message: "Invalid packagee data received" });
  }
};

// @desc Update a packagee
// @route PATCH /packagees
// @access Private
const updatePackagee = async (req, res) => {
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
    price1,
    price1Curr,
    price2,
    price2Curr,
    price3,
    price3Curr,
    price4,
    price4Curr,
    price5,
    price5Curr,
    transportType,
    isDiplomat,
    hsCode,
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
    compName,
    compRegister,
    compAddr,
    compTel,
    mailDate,
    ecommerceType,
    ecommerceLink,
  } = req.body;

  // Confirm data
  /*   if (!id || !prgsStatusCd !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  } */

  // Confirm packagee exists to update
  const packagee = await Packagee.findById(id).exec();

  if (!packagee) {
    return res.status(400).json({ message: "Packagee not found" });
  }

  // Check for duplicate title
  /*   const duplicate = await Packagee.findOne({
    $and: [{ mailId, blNo }],
  })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original packagee
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate packagee title" });
  } */
  //if (prgsStatusCd) {
  packagee.prgsStatusCd = prgsStatusCd;
  (packagee.houseSeq = houseSeq),
    (packagee.mailId = mailId),
    (packagee.mailBagNumber = mailBagNumber),
    (packagee.blNo = blNo),
    (packagee.reportType = reportType),
    (packagee.riskType = riskType),
    (packagee.netWgt = netWgt),
    (packagee.wgt = wgt),
    //wgtUnit,
    (packagee.qty = qty),
    (packagee.qtyUnit = qtyUnit),
    (packagee.dangGoodsCode = dangGoodsCode),
    (packagee.transFare = transFare),
    (packagee.transFareCurr = transFareCurr),
    (packagee.price1 = price1),
    (packagee.price1Curr = price1Curr),
    (packagee.price2 = price2),
    (packagee.price2Curr = price2Curr),
    (packagee.price3 = price3),
    (packagee.price3Curr = price3Curr),
    (packagee.price4 = price4),
    (packagee.price4Curr = price4Curr),
    (packagee.price5 = price5),
    (packagee.price5Curr = price5Curr),
    (packagee.transportType = transportType),
    (packagee.isDiplomat = isDiplomat),
    (packagee.hsCode = hsCode),
    (packagee.goodsNm = goodsNm),
    (packagee.shipperCntryCd = shipperCntryCd),
    (packagee.shipperCntryNm = shipperCntryNm),
    (packagee.shipperNatinality = shipperNatinality),
    (packagee.shipperNm = shipperNm),
    (packagee.shipperReg = shipperReg),
    (packagee.shipperAddr = shipperAddr),
    (packagee.shipperTel = shipperTel),
    (packagee.consigneeCntryCd = consigneeCntryCd),
    (packagee.consigneeCntryNm = consigneeCntryNm),
    (packagee.consigneeNatinality = consigneeNatinality),
    (packagee.consigneeNm = consigneeNm),
    (packagee.consigneeReg = consigneeReg),
    (packagee.consigneeAddr = consigneeAddr),
    (packagee.consigneeTel = consigneeTel),
    (packagee.compName = compName),
    (packagee.compRegister = compRegister),
    (packagee.compAddr = compAddr),
    (packagee.compTel = compTel),
    (packagee.mailDate = mailDate),
    (packagee.ecommerceType = ecommerceType),
    (packagee.ecommerceLink = ecommerceLink);
  //}

  const updatedPackagee = await packagee.save();

  res.json(`'${updatedPackagee.houseSeq}' updated`);
};

// @desc Delete a packagee
// @route DELETE /packagees
// @access Private
const deletePackagee = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Packagee ID required" });
  }

  // Confirm packagee exists to delete
  let reply = "";
  for (let i = 0; i < id.length; i++) {
    const packagee = await Packagee.findById(id[i]).exec();

    if (!packagee) {
      return res.status(400).json({ message: "Packagee not found" });
    }
    console.log(id[i]);
    const result = await packagee.deleteOne();
    //packagee.delYn = "Y";
    //}

    //const result = await packagee.save();
    reply = `Package '${result.mailId}' with ID ${result._id} deleted`;
  }

  res.json(reply);
};

const sendPackagee = async (req, res) => {
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
  getAllPackagees,
  createNewPackagee,
  updatePackagee,
  deletePackagee,
  sendPackagee,
};
