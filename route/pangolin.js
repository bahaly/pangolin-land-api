const express = require('express');
const router = express.Router()
const pangolin = require('../models/user');

const pangolinCtrl = require('../controllers/pangolin');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


  //router.post('/stuff',auth, multer, stuffCtrl.createThing );
  router.get('/user', auth, pangolinCtrl.getAllUsers);
  router.get('/user/friend/:id', auth, pangolinCtrl.getUserFriend);
  router.post('/user/friend', auth, pangolinCtrl.addFriend);
  router.get('/user/:id', auth, pangolinCtrl.getOneUser);
  router.put('/user/:id', auth, pangolinCtrl.modifyUserRole);
  router.delete('/user/:id/:friendId', auth, pangolinCtrl.deleteFriend);

  module.exports = router