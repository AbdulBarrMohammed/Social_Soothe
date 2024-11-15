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
              console.log(email);
              const signUp = await db.insertNewUser(email, hashedPassword, gender);
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

module.exports = {
  signUpPost,
  logInPost


}
