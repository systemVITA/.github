import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { UserRepository } from '../repositories/UserRepository';

export default {
    async createUser(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const createUser = new CreateUserService(new UserRepository());

        const user = await createUser.execute(name, email, password);

        return res.json({ user });
    }
};


