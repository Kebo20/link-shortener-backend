import { UserEntity } from "../entity/user.entity";
import { PersonEntity } from "../entity/person.entity";


export interface UserRepositoryI {

    register(userEntity: UserEntity): Promise<UserEntity>;
    findEmailOrUsername({ userName, email }: { userName: string, email: string }): Promise<number>;
    update({ userEntity, personEntity }: { userEntity: UserEntity, personEntity: PersonEntity }): Promise<UserEntity>;
    delete(idUser: string): Promise<UserEntity>;
    list(): Promise<UserEntity[]>;

}