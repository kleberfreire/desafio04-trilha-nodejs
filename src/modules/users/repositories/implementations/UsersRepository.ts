import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    const isExistUserByEmail = this.findByEmail(email);
    if (isExistUserByEmail) {
      throw new Error("Mensagem do erro");
    }
    Object.assign(user, {
      name,
      email,
    });
    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const userFindById = this.users.find((user) => user.id === id);
    return userFindById;
  }

  findByEmail(email: string): User | undefined {
    const userFindBYEmail = this.users.find((user) => user.email === email);
    return userFindBYEmail;
  }

  turnAdmin(receivedUser: User): User {
    const user = receivedUser;
    user.admin = true;
    user.updated_at = new Date();
    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
