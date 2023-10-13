import { usersService } from "../services/users.service.js"
import jwt from 'jsonwebtoken'; 
import { generateToken, compareData } from "../utils.js";

const secretKey = "KEYJWT"

class JwtController {
    async jwtLogin (req,res) {
        const { username, password } = req.body;

        try {
            if (!username || !password) {
              return res.status(400).json({ message: "Some data is missing" });
            }
            const userDB = await usersService.findUser(username);
            if (!userDB) {
              return res.status(400).json({ message: "Signup first" });
            }
            const isPasswordValid = await compareData(password, userDB.password);
            if (!isPasswordValid) {
              return res.status(401).json({ message: "Username or password not valid please try again" });
            }
            //const token = generateToken(userDB);
            //console.log('token',token);
             // Generate a JWT token with the username in the payload
             const tokenPayload = {
              first_name: userDB.first_name,
              last_name:  userDB.last_name,
              username: userDB.username,
              email: userDB.email,
    
              // You can include other data in the payload if needed
          };
          const token = jwt.sign(tokenPayload, secretKey);
    
          // Log the token for debugging purposes
          console.log('JWT Token:', token);
          
            res.redirect('/api/views/products')
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
}

export const jwtController = new JwtController()