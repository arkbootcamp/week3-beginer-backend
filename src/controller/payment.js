const midtransClient = require("midtrans-client");
const {v4:uuidv4} = require('uuid')

let core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: "SB-Mid-server-j5FTpPYzlMzfGC9fGFVS-FOc",
  clientKey: "SB-Mid-client-83pps6NHQ_X2J40d",
});

const pay = (req, res) => {
    const totalPembayaran = req.body.total
    const bank = req.body.bank
  const parameter = {
    payment_type: "bank_transfer",
    bank_transfer: {
      bank: bank
    },
    transaction_details: {
      order_id: uuidv4(),
      gross_amount: totalPembayaran,
    },
  };
  core.charge(parameter).then((chargeResponse) => {
    // console.log("chargeResponse:");
    console.log(chargeResponse);
    res.json({
        data: chargeResponse
    })
  });
};
const checkStatus = (req, res)=>{
    const idTransaction = req.params.id
    core.transaction.status(idTransaction)
    .then((response)=>{
        // do something to `response` object
        res.json({
            data: response
        })
    });
}
module.exports = {
  pay,
  checkStatus
};
