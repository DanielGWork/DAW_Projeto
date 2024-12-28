import express, { Request, Response, NextFunction} from "express";
import { deleteUserById, getUsers } from "../db/users";

export const getAllUsers = async (inRequest: Request, inResponse: Response) => {
  try{
    const user = await getUsers();

    return inResponse.status(200).json(user);
  }catch(error){
    console.log(error);
    return inResponse.sendStatus(400);
  }
}

export const deleteUser = async (inRequest: Request, inResponse: Response) => {
  try{
    const {id} = inRequest.params;
    
    const deletedUser = await deleteUserById(id);

    return inResponse.json(deletedUser);
  }catch(error){
    console.log(error);
    return inResponse.sendStatus(400);
  }
}