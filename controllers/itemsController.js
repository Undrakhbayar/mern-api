const Item = require("../models/Item");
const User = require("../models/User");
const Packagee = require("../models/Packagee");
const Counter = require("../models/Counter");

// @desc Get all items
// @route GET /items
// @access Private
const getAllItems = async (req, res) => {
  // Get all items from MongoDB
  const packageId = req.query.id;
  console.log("packageid",packageId);
  const items = await Item.find({ delYn: "N", packageeId: packageId }).sort({ createdAt: -1 }).lean()
  // If no items
  if (!items?.length) {
    return res.status(400).json({ message: "No items found" });
  }
  // Add username to each item before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
/*   const itemsWithPackageId = await Promise.all(
    items.map(async (item) => {
      console.log(item.packageeId);
      const package = await Packagee.findById(item.packageeId).lean().exec();
      return { ...item };
    })
  ); */

  res.json(items);
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

// @desc Create new item
// @route POST /items
// @access Private
const createNewItem = async (req, res) => {
  let payload, duplicate;

  console.log(payload);
  if (Object.hasOwn(req.body, "data")) {
    payload = req.body.data;
    for (let i = 0; i < payload.length; i++) {
      const mailId = payload[i].mailId;
      const blNo = payload[i].blNo;
      console.log(mailId, blNo);
    }
  } else {
    payload = req.body;
/*     const { mailId, blNo } = req.body;
    const doc = await Counter.findOneAndUpdate({ type: "houseSeq", blNo: blNo }, { $inc: { sequence_value: 1 } }, {
      new: true,
    });
    payload.houseSeq = zeroPad(doc.sequence_value, 3) */
/*     console.log(doc.sequence_value);

  // Confirm data
  /*   if (!user) {
    console.log(user);
    return res.status(400).json({ message: "All fields are required" });
  */
  } 

  // Check for duplicate title
  const item = Item.insertMany(payload);

  if (item) {
    // Created
    console.log("created");
    return res.status(201).json({ message: "New item created" });
  } else {
    return res.status(400).json({ message: "Invalid item data received" });
  }
};

// @desc Update a item
// @route PATCH /items
// @access Private
const updateItem = async (req, res) => {
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

  // Confirm item exists to update
  const item = await Item.findById(id).exec();

  if (!item) {
    return res.status(400).json({ message: "Item not found" });
  }

  // Check for duplicate title
  /*   const duplicate = await Item.findOne({
    $and: [{ mailId, blNo }],
  })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original item
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate item title" });
  } */
  //if (prgsStatusCd) {
  item.prgsStatusCd = prgsStatusCd;
  (item.houseSeq = houseSeq),
    (item.mailId = mailId),
    (item.mailBagNumber = mailBagNumber),
    (item.blNo = blNo),
    (item.reportType = reportType),
    (item.riskType = riskType),
    (item.netWgt = netWgt),
    (item.wgt = wgt),
    //wgtUnit,
    (item.qty = qty),
    (item.qtyUnit = qtyUnit),
    (item.dangGoodsCode = dangGoodsCode),
    (item.transFare = transFare),
    (item.transFareCurr = transFareCurr),
    (item.price1 = price1),
    (item.price1Curr = price1Curr),
    (item.price2 = price2),
    (item.price2Curr = price2Curr),
    (item.price3 = price3),
    (item.price3Curr = price3Curr),
    (item.price4 = price4),
    (item.price4Curr = price4Curr),
    (item.price5 = price5),
    (item.price5Curr = price5Curr),
    (item.transportType = transportType),
    (item.isDiplomat = isDiplomat),
    (item.hsCode = hsCode),
    (item.goodsNm = goodsNm),
    (item.shipperCntryCd = shipperCntryCd),
    (item.shipperCntryNm = shipperCntryNm),
    (item.shipperNatinality = shipperNatinality),
    (item.shipperNm = shipperNm),
    (item.shipperReg = shipperReg),
    (item.shipperAddr = shipperAddr),
    (item.shipperTel = shipperTel),
    (item.consigneeCntryCd = consigneeCntryCd),
    (item.consigneeCntryNm = consigneeCntryNm),
    (item.consigneeNatinality = consigneeNatinality),
    (item.consigneeNm = consigneeNm),
    (item.consigneeReg = consigneeReg),
    (item.consigneeAddr = consigneeAddr),
    (item.consigneeTel = consigneeTel),
    (item.compName = compName),
    (item.compRegister = compRegister),
    (item.compAddr = compAddr),
    (item.compTel = compTel),
    (item.mailDate = mailDate),
    (item.ecommerceType = ecommerceType),
    (item.ecommerceLink = ecommerceLink);
  //}

  const updatedItem = await item.save();

  res.json(`'${updatedItem.houseSeq}' updated`);
};

// @desc Delete a item
// @route DELETE /items
// @access Private
const deleteItem = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Item ID required" });
  }

  // Confirm item exists to delete
  let reply = "";
  for (let i = 0; i < id.length; i++) {
    const item = await Item.findById(id[i]).exec();

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }
    console.log(id[i]);
    const result = await item.deleteOne();
    //item.delYn = "Y";
    //}

    //const result = await item.save();
    reply = `Package '${result.mailId}' with ID ${result._id} deleted`;
  }

  res.json(reply);
};

const sendItem = async (req, res) => {
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
  getAllItems,
  createNewItem,
  updateItem,
  deleteItem,
  sendItem,
};
