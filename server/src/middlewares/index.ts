import express, { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";
import { getUsersBySessionToken } from "../db/users";

export const isOwner = async (inRequest: Request, inResponse: Response, inNext: NextFunction) => {
  try{
    const { id } = inRequest.params;
    const currentUserId = get(inRequest, 'identity._id') as unknown as string;  //Fazemos isto porque temos a certeza que vai ser do tipo string 
                                                                                // e depois precisamos de fazer a comparação com o id para verificar 
                                                                                // se é o mesmo id. Assim a função delete so consegue dar delete se 
                                                                                // ele estiver authenticated e for dono da conta
    if(!currentUserId){return inResponse.sendStatus(403)}
    if(currentUserId.toString() != id){
      return inResponse.sendStatus(403)
    }
  
    inNext();
  }catch(error){
    console.log(error);
    return inResponse.sendStatus(400);
  }
}

export const isAuthenticated = async(inRequest: Request, inResponse: Response, inNext: NextFunction) => {
  try{
    const sessionToken = inRequest.cookies['OCTAVIAN-REST-API'];
    if(!sessionToken){return inResponse.sendStatus(403)}

    const existingUser = await getUsersBySessionToken(sessionToken);
    if(!existingUser){return inResponse.sendStatus(403)}

    merge(inRequest, { identity: existingUser });

    return inNext();
  }catch(error){
    console.log(error);
    return inResponse.sendStatus(400);
  }
}