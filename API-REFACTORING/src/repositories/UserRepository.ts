import { hash } from 'bcrypt';
import { prisma } from '../database';
import { IUserCreate } from '../interfaces/IUserCreate';
import { User } from '@prisma/client';

class UserRepository implements IUserCreate {
    public async create(name: string,email: string,password: string): Promise<User> {
        try {

            const userExists = await prisma.user.findFirst({
                where: { email },
            });

            if (userExists) {
                throw new Error('Erro: usuário já existe');
            }

            const salt = 10
            const HashedPassword = await hash(password, salt);

            const user = prisma.user.create({
                data: {
                    name,
                    email,
                    password: HashedPassword
                }
            });

            return user;
        } catch (error) {
            console.error(error);
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }
}

export { UserRepository };
