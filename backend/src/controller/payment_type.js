const PaymentOptions = require("../models/payment_type");

exports.addPaymentOptions = (req, res) => {
  const{name,picture} =req.body
  const pay = {
    name: req.body.name,
    picture : "/public/" + req.file.filename
  }

  const cat = new PaymentOptions(pay);
  cat.save((error, payment) => {
    if (error) return res.status(400).json({ error });
    if (payment) {
      return res.status(201).json({ payment });
    }
  });
};

exports.getPaymentOptions = (req, res) => {
  PaymentOptions.find()
  .then(payment_type => res.json(payment_type))
  .catch(err => res.status(400).json('Error' + err))
};

exports.getPaymentOptionById = (req, res) => {
  PaymentOptions.findById(req.params.id)
  .then(payment_type => res.json(payment_type))
  .catch(err => res.status(400).json('Error' + err))
};

exports.payment_typeUpdate = async (req, res) => {
  try{
    const {name, pic} = req.body;
    const payment_type={
      name: req.body.name}
    if (req.file) {
      payment_type.pic = "/public/" + req.file.filename;
    }
    const updatedPaymentOptions = await PaymentOptions.findByIdAndUpdate((req.params.id), payment_type, {
      new: true,
    });
    return res.status(201).json({ updatedPaymentOptions });
  }
  catch (err) {
    res.status(404).json('Error' + err)
}
}

exports.deletePaymentOptions = (req, res) => {
  PaymentOptions.findByIdAndDelete(req.params.id)
      .then(() => res.json('PaymentOptions deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
}
