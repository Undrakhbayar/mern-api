const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const packageeSchema = new mongoose.Schema(
    {
        houseSeq: {
            type: String,
            required: true
        },
        prgsStatusCd: {
            type: String,
            required: false
        },
        mailId: {
            type: String,
            required: true
        },
        mailBagNumber: {
            type: String,
            required: false
        },
        blNo: {
            type: String,
            required: true
        },
        reportType: {
            type: String,
            required: false
        },
        riskType: {
            type: String,
            required: false
        },
        netWgt: {
            type: Number,
            required: true
        },
        wgt: {
            type: Number,
            required: true
        },
        wgtUnit: {
            type: String,
            default: "KG"
        },
        qty: {
            type: Number,
            required: true
        },
        qtyUnit: {
            type: String,
            default: "U"
        },
        dangGoodsCode: {
            type: String,
            required: false
        },
        transFare: {
            type: Number,
            required: true
        },
        transFareCurr: {
            type: String,
            default: "USD"
        },
        price1: {
            type: Number,
            required: true
        },
        priceCurr1: {
            type: String,
            default: "USD"
        },
        price2: {
            type: Number,
            required: false
        },
        priceCurr2: {
            type: String,
            required: false
        },
        price3: {
            type: Number,
            required: false
        },
        priceCurr3: {
            type: String,
            required: false
        },
        price4: {
            type: Number,
            required: false
        },
        priceCurr4: {
            type: String,
            required: false
        },
        price5: {
            type: Number,
            required: false
        },
        priceCurr5: {
            type: String,
            required: false
        },
        transportType: {
            type: String,
            required: false
        },
        isDiplomat: {
            type: String,
            required: false,
            default: "N"
        },
        hsCode: {
            type: String,
            required: false
        },
        goodsNm: {
            type: String,
            required: true
        },
        shipperCntryCd: {
            type: String,
            required: false
        },
        shipperCntryNm: {
            type: String,
            required: false
        },
        shipperNatinality: {
            type: String,
            required: false
        },
        shipperNm: {
            type: String,
            required: true
        },
        shipperReg: {
            type: String,
            required: false
        },
        shipperAddr: {
            type: String,
            required: false
        },
        shipperTel: {
            type: String,
            required: false
        },
        consigneeCntryCd: {
            type: String,
            required: false
        },
        consigneeCntryNm: {
            type: String,
            required: true
        },
        consigneeNatinality: {
            type: String,
            required: false
        },
        consigneeNm: {
            type: String,
            required: true
        },
        consigneeReg: {
            type: String,
            required: true
        },
        consigneeAddr: {
            type: String,
            required: false
        },
        consigneeTel: {
            type: String,
            required: true
        },
        compName: {
            type: String,
            required: true
        },
        compRegister: {
            type: String,
            required: true
        },
        compAddr: {
            type: String,
            required: true
        },
        compTel: {
            type: String,
            required: true
        },
        regDate: {
            type: Date,
            required: false
        },
        mailDate: {
            type: Date,
            required: false
        },
        ecommerceType: {
            type: String,
            required: false
        },
        ecommerceLink: {
            type: String,
            required: false
        },
        user: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

packageeSchema.plugin(AutoIncrement, {
    inc_field: 'package',
    id: 'packageNums',
    start_seq: 1
})

module.exports = mongoose.model('Packagee', packageeSchema)