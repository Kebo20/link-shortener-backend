import { UserEntity } from "../../domain/entity/user.entity";
import { UserRepositoryI } from "../../domain/repository/user.repository";
import { UserValue } from "../../domain/value/user.value";

export class UserUseCase {
    constructor(private readonly userRepository: UserRepositoryI) { }

    public registerUser = async (data: UserEntity) => {
        // const userValue = new UserValue(data);
        const userCreated = await this.userRepository.register(data);
        return userCreated
    }

    public findEmailOrUsername = async ({ email, userName }: { email: string, userName: string }) => {
        const userFind = await this.userRepository.findEmailOrUsername({ email, userName });
        return userFind
    }

}