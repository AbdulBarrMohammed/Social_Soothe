const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const jwt = require('jsonwebtoken')

async function displayUsers(req, res) {
    //const { email }  = req.user;

    try {
        const users = await db.getAllUsers();
        res.json(users); // Sending the users to the frontend
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }


}


async function signUpPost(req, res, next) {
    const { email, password, gender } = req.body
    try {
        // Hash the password with bcrypt
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
          console.log(hashedPassword)
          if (err) {
            // Handle hashing error
            return next(err);
          }

          // Store hashedPassword in DB
          try {
              const coins = 0;
              const currColor = 'blue'
              const currFont = 'Roboto'
              const currSound = 'none'
              const currBackgroundImg = 'none'
              const signUp = await db.insertNewUser(email, hashedPassword, gender, coins, currColor, currFont, currSound, currBackgroundImg);
              const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr' })

              res.json({ email, token })

            console.log('User signed up successfully');

            //res.redirect("library");
          } catch (dbError) {
            return next(dbError);
          }
        });
      } catch (err) {
        // Handle other errors
        return next(err);
      }
}
async function logInPost(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.getUser(email)

    //check if user is found first
    if (!user) return res.json({ detail: 'User does not exist', email: email, user: user})

    // check and compare inputted password to hasedpassword
    const success = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr' })
    if (success) {
      res.json({ 'email' : user.email, token})
    }
    else {
      res.json({ detail: "Login failed" })
    }
  } catch(err) {
    console.error(err)
  }

}



async function getUserInfo(req, res) {
    try {
      const email  = req.params.email
      const user = await db.getUser(email);
      console.log("user info for coins", user)
      res.json(user)
    } catch (err) {
        console.log("error....", err)
        res.status(500).json({ message: 'Error fetching flowers' });
    }

}

async function updateCoin(req, res) {
  try {
    const { coins, email } = req.body
    const updatedCoins = await db.updateCoin(coins, email);
    console.log("updated coins", updatedCoins)
    res.json(updatedCoins)
  } catch (err) {
      console.log("error....", err)
      res.status(500).json({ message: 'Error fetching flowers' });
  }

}


async function updateSound(req, res) {
  try {
    const { sound, email } = req.body
    const updatedSound = await db.updateSound(sound, email);
    console.log("updated sound", updateSound)
    res.json(updatedSound)
  } catch (err) {
      console.log("error....", err)
      res.status(500).json({ message: 'Error fetching sound' });
  }

}


async function updateColor(req, res) {
  try {
    const { color, email } = req.body
    const updatedColor = await db.updateColor(color, email);
    console.log("updated color", updateColor)
    res.json(updatedColor)
  } catch (err) {
      console.log("error....", err)
      res.status(500).json({ message: 'Error fetching color' });
  }

}

module.exports = {
  signUpPost,
  logInPost,
  getUserInfo,
  updateCoin,
  updateSound,
  updateColor


}
