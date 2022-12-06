const bcrypt = require('bcrypt')
const User = require('../models/user')
const Friend = require('../models/friend')
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const userData = JSON.parse(req.body.user)
    console.log(userData);
    delete userData._id;
    bcrypt.hash(userData.password, 10)
      .then(hash => {
        const user = new User({
          email: userData.email,
          name: userData.name,
          password: hash,
          role : userData.role,
          specie: userData.specie,
          address: userData.address,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !', data: user }))
          .catch(error => {console.log(error); return res.status(400).json({ error })});
      })
      .catch(error => {console.log(error);return res.status(500).json({ error })});
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


