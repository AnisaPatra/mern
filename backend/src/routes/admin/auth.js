const express = require('express');
const { signup, signin, signout} = require('../../controller/admin/auth');
const { validateAdminSignupRequest, validateAdminSigninRequest, isRequestValidated } = require('../../validators/auth');
const router = express.Router();
const { requireSignin } = require('../../common-middleware');


router.post('/admin/signup', validateAdminSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateAdminSigninRequest, isRequestValidated, signin);
router.post('/admin/signout', signout );
module.exports = router;