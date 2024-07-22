import { UserEntity } from "../entity/user.entity";
import { PersonEntity } from "../entity/person.entity";
import { UserPersonList } from "../entity/userPerson.entity";


export interface UserRepositoryI {

    register(userEntity: UserEntity): Promise<UserEntity>;
    findEmailOrUsername({ userName, email }: { userName: string, email: string }): Promise<UserEntity | null>;
    findById(id: string): Promise<UserPersonList | null>;
    update(userEntity: UserEntity): Promise<number>;
    delete({ idUser, deletedBy }: { idUser: string, deletedBy: string }): Promise<number>;
    list(): Promise<UserPersonList[]>;

}