import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();  
    res.json({ users })
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);    
    user
        ? res.json({ user })
        : res.status(404).json({
            msg: `There is no user with the id ${id}`
        });

}

export const postUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        
        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });
        
        if (existEmail) {
            return res.status(400).json({
                msg: 'There is already a user with the email ' + body.email
            })
        }
        //new User(body);        
        const user = await User.create(body);
        //await user.save();
        res.json( user );
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg: `Talk to admin`
        });
    }
}

export const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {        
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(400).json({
                msg: 'There is no user with the id ' + body.id
            })
        }
        
        await user.update(body);
        res.json( user );
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            msg: `Talk to admin`
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);    
    (!user)
        ? res.status(404).json({
            msg: `There is no user with the id ${id}`
        })
        : await user.update({state: false});
        // : await user.destroy();
    res.json({user});
}
