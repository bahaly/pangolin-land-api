const bcrypt = require('bcrypt')
const User = require('../models/user')
const Friend = require('../models/friend')
const jwt = require('jsonwebtoken');


  exports.addFriend = (req, res, next) => {
    console.log(req.body);
    User.findOne({_id:req.body.userId}).then(function(record){
        record.friends.push({friendId : req.body.friendId});
        record.save()
        .then(() => res.status(201).json({ message: 'Ami ajouté !'}))
        .catch(error => res.status(400).json({ error }));
    })      
  };

  exports.deleteFriend = (req, res, next) => {
        User.findOne({_id: req.params.id}).then(function(record){
            let tab;
            record.friends.forEach((res) =>{res.friendId == req.params.friendId ? tab = res._id : ''}) ;            
            record.friends.id(tab).remove()
            record.save()
        .then(
            () => {
              res.status(200).json({
                message: 'Deleted!'
              });  
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
    })}

  

  exports.getOneUser = (req, res, next) => {
    User.findOne({
      _id: req.params.id
    }).then(
      (user) => {
        res.status(200).json(user);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.modifyUserRole = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, { role: req.body.role , _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Role modifié !'}))
      .catch(error => { console.log(error); res.status(400).json({ error })});
  };

  exports.getAllUsers = (req, res, next) => {
    User.find().then(
      (user) => {
        res.status(200).json(user);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.getUserFriend = (req, res, next) => {
    User.findOne({_id : req.params.id}).then(
      (user) => {
        const ids = [];
        user.friends.forEach(el => ids.push(el.friendId))
        console.log(ids);
        User.find().where('_id').in(ids).then(
            (data) => res.status(200).json(data)
        )
    }
    ).catch(
      (error) => {
        console.log(error);
        res.status(400).json({
          error: error
        });
      }
    );
  };

exports.deleteUsers = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

