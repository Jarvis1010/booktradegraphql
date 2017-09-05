import mongoose from 'mongoose';
const User = mongoose.model('User');
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  console.log('Registering User');
  const { username, name, password, location, email } = req.body;

  User.create(
    {
      username,
      name,
      location,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    },
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
        res.status(201).json(user);
      }
    }
  );
};

export const login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }).exec((err, user) => {
    if (err || user == null) {
      res.status(400).json(err);
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 's3cr3t', {
          expiresIn: 3600,
        });
        res.status(200).json({ success: true, token: token });
      } else {
        res.status(401).json('Unauthorized');
      }
    }
  });
};

export const authenticate = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    jwt.verify(token, 's3cr3t', (error, decoded) => {
      console.log(error, decoded);
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json('no token provided');
  }
};

export const profile = (req, res) => {
  User.findOne({ username: req.user }).exec((err, user) => {
    if (err || user == null) {
      res.status(400).json(err);
    } else {
      var profile = user;
      delete profile.password;
      res.json(profile);
    }
  });
};

export const update = (req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, user) => {
    if (err || user == null) {
      res.status(400).json(err);
    } else {
      const profile = user;
      delete profile.password;
      res.json(profile);
    }
  });
};
