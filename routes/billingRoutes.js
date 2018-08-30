const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
//middlewares放在第2個參數 可以放無數個middlewares
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 email credits',
      source: req.body.id
    });
    //付款成功 增加credits
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
