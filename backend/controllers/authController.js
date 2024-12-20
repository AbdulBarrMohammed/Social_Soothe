const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

/**
     * Adds new user to database
     * @param request, response, next
     * @return none
     */
async function signUpPost(req, res, next) {

    //Grabs new users email, password and gender entered
    const { email, password, gender } = req.body
    try {
        // Hashes the password with bcrypt
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
          if (err) {
            // Handles hashing error
            return next(err);
          }

          // Stores hashedPassword in DB
          try {

              //Sets new user with original data first
              const coins = 0;
              const currColor = 'blue'
              const currFont = 'Roboto'
              const currSound = 'none' //IN THE FUTURE GIVE THEM A SOUND ROUTE FIRST
              const currBackgroundImg = 'none' //REMOVE THIS IN THE FUTURE

              //Inserts new user information in the database
              const signUp = await db.insertNewUser(email, hashedPassword, gender, coins, currColor, currFont, currSound, currBackgroundImg);

              //Setting user token
              const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr' })
              res.json({ email, token })

          } catch (dbError) {
            return next(dbError);
          }
        });
      } catch (err) {
        // Handle other errors
        return next(err);
      }
}

/**
     * Checks if user exists in database to allow user to log in
     * @param request, response
     * @return none
     */

async function logInPost(req, res) {
  const { email, password } = req.body;
  try {

    //Get user by email
    const user = await db.getUser(email)

    //Check if user is found first
    if (!user) return res.json({ detail: 'User does not exist', email: email, user: user})

    //Check and compare inputted password to hasedpassword
    const success = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr' })
    if (success) {
      res.json({ 'email' : user.email, token})
    }
    else {
      res.json({ detail: "Login failed" })
    }
  } catch(err) {
    res.status(500).json({ message: 'Error authenticating user' });
  }

}


/**
     * Gets authenticated user information
     * @param request, response
     * @return none
     */
async function getUserInfo(req, res) {
    try {
      const email  = req.params.email
      const user = await db.getUser(email);
      res.json(user)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user information' });
    }

}


/**
     * Update count of user leaf count
     * @param request, response
     * @return none
     */
async function updateCoin(req, res) {
  try {
    const { coins, email } = req.body
    const updatedCoins = await db.updateCoin(coins, email);
    res.json(updatedCoins)
  } catch (err) {
      res.status(500).json({ message: 'Error updating leaf count' });
  }

}



/**
     * Updates the current background sound for an authenticated user
     * @param request, response
     * @return none
     */
async function updateSound(req, res) {
  try {
    const { sound, email } = req.body
    const updatedSound = await db.updateSound(sound, email);
    res.json(updatedSound)
  } catch (err) {
      res.status(500).json({ message: 'Error fetching sound' });
  }

}


/**
     * Updates the current background color for an authenticated user
     * @param request, response
     * @return none
     */
async function updateColor(req, res) {
  try {
    const { color, email } = req.body
    const updatedColor = await db.updateColor(color, email);
    res.json(updatedColor)
  } catch (err) {
      res.status(500).json({ message: 'Error fetching color' });
  }

}

async function deleteUser(req, res) {
  try {
      const id  = req.params.id
      await db.deleteUserAccount(id);
      res.json("Succesfully deleted user")
  } catch (err) {
      console.log("error....", err)
      res.status(500).json({ message: 'Error deleting user' });
  }
}

module.exports = {
  signUpPost,
  logInPost,
  getUserInfo,
  updateCoin,
  updateSound,
  updateColor,
  deleteUser


}
