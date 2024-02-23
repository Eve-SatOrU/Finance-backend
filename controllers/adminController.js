const bcrypt = require('bcrypt');
const Expert = require('../models/expert');
const { Op } = require('sequelize');

Expert.beforeCreate(async (expert) => {
    const salt = await bcrypt.genSalt();
    expert.expertPassword = await bcrypt.hash(expert.expertPassword, salt);
  });
// get

function validateStrongPassword(password) {
    if (password.length < 8) {
      return false;
    }
    const letterRegex = /[a-zA-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*]/;
    if (!letterRegex.test(password) || !numberRegex.test(password) || !specialCharRegex.test(password)) {
      return false;
    }
    return true;
  }
exports.getAdminRegisterExpert = (req, res, next) => {
    res.json({ message: 'Render Register Expert form' });
    };
exports.postAdminRegisterExpert = async (req, res, next) => {
  const { expertName, expertPassword, expertEmail, expertImage, expertExperience, expertWorkingAt } = req.body;

  if (!validateStrongPassword(expertPassword)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long and must contain a combination of letters, numbers, and special characters."
    });
  }

  try {
    const existingExpert = await Expert.findOne({
      where: {
        [Op.or]: [
          { expertName },
          { expertEmail }
        ]
      }
    });

    if (existingExpert) {
      return res.status(400).json({ error: 'Expert username or email is already taken.' });
    }

    const hashedPassword = await bcrypt.hash(expertPassword, 10);

    const expert = await Expert.create({
      expertName,
      expertPassword: hashedPassword,
      expertEmail,
      expertImage,
      expertExperience,
      expertWorkingAt,
    });

    res.status(201).json({ message: 'Expert registered successfully', expert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// login
exports.getExpertLogin = (req, res, next) => {
    res.json({ message: 'Render Expert Login form' });
  };
  exports.postExpertLogin = async (req, res, next) => {
      const { expertName, expertPassword } = req.body;
      
      try {
          const expert = await Expert.findOne({
          where: {
              expertName,
          },
          });
      
          if (!expert) {
          return res.status(404).json({ error: 'Expert not found' });
          }
      
          const isPasswordValid = await bcrypt.compare(expertPassword, expert.expertPassword);
      
          if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
          }
          req.session.expert = expert;
          req.session.ExpertId = user.id;
      
          res.status(200).json({ message: 'Expert logged in successfully', expert });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
      };