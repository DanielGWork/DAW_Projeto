import { Request, Response } from "express";
import { creatUser, getUserByMail } from "../db/users";
import { authentication, random } from "../helpers";

export const login = async (inRequest: Request, inResponse: Response): Promise<Response> => {
  try{
    const {email, password} = inRequest.body;

    if(!email || !password){return inResponse.sendStatus(400)}

    const user = await getUserByMail(email).select('+authentication.salt +authentication.password');
    if(!user){return inResponse.sendStatus(400)}

    const expectedHash = authentication(user.authentication?.salt as string, password); //temos a certeza que salt será uma string daí o as string

    if(user.authentication?.password != expectedHash){return inResponse.sendStatus(400)}

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());
    await user .save();

    inResponse.cookie('OCTAVIAN-REST-API', user.authentication.sessionToken, {domain: 'localhost', path: '/'});
    
    return inResponse.status(200).end();
  }catch(error){
    console.log(error);
    return inResponse.sendStatus(400);
  }
}

export const register = async (inRequest: Request, inResponse: Response): Promise<Response> => {
  try{
    const {email, password, username} = inRequest.body;
    if(!email || !password || !username){return inResponse.sendStatus(400)}

    const existingUser = await getUserByMail(email);
    if(existingUser){return inResponse.sendStatus(400)}

    const salt = random();
    const user = await creatUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    
    return inResponse.status(200).json(user).end();
  }catch(error){
    console.log(error);
    return inResponse.sendStatus(400);
  }
}