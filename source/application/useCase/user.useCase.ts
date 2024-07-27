import { UserEntity } from "../../domain/entity/user.entity";
import { UserRepositoryI } from "../../domain/repository/user.repository";
import { HttpError } from '../../infrastructure/utils/handleError'

export class UserUseCase {
    constructor(private readonly userRepository: UserRepositoryI) { }

    public registerUser = async (data: UserEntity) => {
        // const userValue = new UserValue(data);
        const { userName, email } = data
        const vUserEmail = await this.userRepository.findEmailOrUsername({ userName, email })

        if (vUserEmail) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: 'UserName o email ya registrado.',
            });
        }
        const userCreated = await this.userRepository.register(data);
        return userCreated
    }

    public updateUser = async (data: UserEntity) => {


        const vUserId = await this.userRepository.findById(data.idUser)
        if (!vUserId) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: 'Usuario. Registro no encontrado.',
            });
        }

        const { userName, email, idUser } = data
        const vUserEmail = await this.userRepository.findEmailOrUsername({ userName, email })

        if (vUserEmail && vUserEmail.idUser !== idUser) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: 'UserName o email ya registrado.',
            });
        }


        const userUpdated = await this.userRepository.update(data);
        return userUpdated
    }

    public findEmailOrUsername = async ({ email, userName }: { email: string, userName: string }) => {
        const userFind = await this.userRepository.findEmailOrUsername({ email, userName });
        return userFind
    }

    public findById = async (id: string) => {
        const userFind = await this.userRepository.findById(id);
        return userFind
    }

    public list = async () => {

        const userList = await this.userRepository.list()
        return userList
    }

    public delete = async ({ idUser, deletedBy }: { idUser: string, deletedBy: string }) => {


        const vUserId = await this.userRepository.findById(idUser)
        if (!vUserId) {
            throw new HttpError({
                code: 'BAD_REQUEST',
                message: 'Usuario. Registro no encontrado.',
            });
        }

        const userUpdated = await this.userRepository.delete({ idUser, deletedBy });
        return userUpdated
    }

}