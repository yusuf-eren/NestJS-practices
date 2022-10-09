import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("AuthService", () => {
    // we declared service type of AuthService because
    // because first test is gonna throw an error
    // if we don't set type
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;
    // This function runs before all tests
    beforeEach(async () => {
        const users: User[] = [];

        // Create a fake copy of the users service
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(
                    (user) => user.email === email,
                );
                return Promise.resolve(filteredUsers);
            },

            create: (email: string, password: string) => {
                const user = {
                    id: Math.floor(Math.random() * 999999),
                    email,
                    password,
                } as User;
                users.push(user);
                return Promise.resolve(user);
            },
        };
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it("can create an instance of auth service", async () => {
        expect(service).toBeDefined();
    });

    it("creates a new user with a salted and hashed password", async () => {
        const user = await service.signup("erenyusuf170@gmail.com", "testTost");
        expect(user.password).not.toEqual("asdsdasd");
        const [salt, hash] = user.password.split(".");
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it("creates an error if user signs up with email that is in use", async () => {
        fakeUsersService.find = () =>
            Promise.resolve([{ id: 1, email: "a", password: "1" } as User]);
        await expect(
            service.signup("asdflkj@asdlfkj.com", "passdflkj"),
        ).rejects.toThrow(BadRequestException);
    });

    it("throws if signin is called with an unused email", async () => {
        await expect(
            service.signin("asdflkj@asdlfkj.com", "allah1"),
        ).rejects.toThrow(NotFoundException);
    });

    it("throws if an invalid password is provided", async () => {
        fakeUsersService.find = () =>
            Promise.resolve([
                { email: "asdf@asdf.com", password: "laskdjf" } as User,
            ]);
        await expect(
            service.signin("laskdjf@alskdfj.com", "passowrd"),
        ).rejects.toThrow(BadRequestException);
    });

    it("returns a user if correct password is provided", async () => {
        await service.signup("asdf@asdas.com", "mypassword");
        const user = await service.signin("asdf@asdas.com", "mypassword");
        expect(user).toBeDefined();
    });
});
