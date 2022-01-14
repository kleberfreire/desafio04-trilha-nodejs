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
    const userFindEmail = this.users.find((user) => user.email === email);
    return userFindEmail;
  }

  turnAdmin(receivedUser: User): User {
    receivedUser.admin = true;
    receivedUser.updated_at = new Date();
    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
