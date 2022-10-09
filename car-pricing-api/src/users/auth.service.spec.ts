import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

describe("AuthService", () => {
    // we declared service type of AuthService because
    // because first test is gonna throw an error
    // if we don't set type
    let service: AuthService;

    // This function runs before all tests
    beforeEach(async () => {
        // Create a fake copy of the users service
        const fakeUsersService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) =>
                // -as User- means "threat this like User"
                Promise.resolve({ id: 1, email, password } as User),
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
});
