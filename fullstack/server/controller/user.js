import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import User from "../model/user.js";
import { __dirname, transporter } from "../utils/index.js"

import * as dotenv from 'dotenv'
dotenv.config()



export const signup = async (req, res) => {
  const { name, number, email, password } = req.body;
  const enteredPassword = password
  try {
    const salt = bcrypt.genSaltSync(10);

    const userData = await User.findOne({ email: email });
    if (userData) {
      return res.status(401).json({ message: "user alreay exist" })
    }
    const encryptedPassword = bcrypt.hashSync(enteredPassword, salt)

    const newUser = new User({ email: email, password: encryptedPassword, name: name, number: number });
    const savedUser = await newUser.save();
    const data = {
      firstName: savedUser.name.split(" ")[0],
    };
    // 
    const relativeDirPath = path.join(__dirname, '..', 'Email_Template');
    const emailTemplatePath = path.join(relativeDirPath, 'welcomeEmail.html');
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
    const replacedHTML = emailTemplate.replace(/{{(.*?)}}/g, (match, key) => {
      return data[key.trim()] || '';
    });

    const options = {
      to: savedUser.email,
      from: "janasomnath173@gmail.com",
      subject: "welcome Email",
      html: replacedHTML,
    }
    await transporter.sendMail(options)

    const token = jwt.sign({ email: savedUser.email, id: savedUser.id }, process.env.JWT_SECRETE, { expiresIn: "7d" });
    const { password, ...userDetails } = savedUser._doc
    return res.status(201).json({ user: userDetails, token: token, message: "user added sucessfuly" })

  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "something went wrong" })
  }
}




export const login = async (req, res) => {

  const { email, password } = req.body
  const enteredPassword = password
  try {
    const UserData = await User.findOne({ email: email });
    if (!UserData) {
      return res.status(403).send({ message: "No user exist" });
    }

    const comparePassword = bcrypt.compareSync(enteredPassword, UserData.password);
    if (!comparePassword) {
      return res.status(401).send({ message: "invalid credentials" });
    }
    const data = {
      firstName: UserData.name.split(" ")[0],
      paymentLink: "http://localhost:5173/payment",
    };
    // 
    const relativeDirPath = path.join(__dirname, '..', 'Email_Template');
    const emailTemplatePath = path.join(relativeDirPath, 'paymentEmail.html');
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
    const replacedHTML = emailTemplate.replace(/{{(.*?)}}/g, (match, key) => {
      return data[key.trim()] || '';
    });
    const options = {
      to: email,
      from: "janasomnath173@gmail.com",
      subject: "Payment Link",
      html: replacedHTML,
    }
    await transporter.sendMail(options);

    const token = jwt.sign({ email: UserData.email, id: UserData.id }, process.env.JWT_SECRETE, { expiresIn: "7d" })

    const { password, ...userDetails } = UserData._doc
    return res.status(200).json({ user: userDetails, token: token })

  } catch (error) {
    return res.status(509).send({ message: "something went wrong" });
  }

}



