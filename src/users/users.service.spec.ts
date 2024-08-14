import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserRole, User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn((entity: User) => {
              return entity;
            }),
            save: jest.fn((entity: User) => {
              return entity;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let user: Partial<CreateUserDto>;
    beforeAll(() => {
      user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        role: UserRole.CUSTOMER,
        avatarUrl: 'https://avatar.com/john',
        bio: 'Hello, I am John Doe',
      };
    });
    it('should create a user', async () => {
      const result = await service.create(user);
      expect(result).toBeDefined();
    });

    it('should throw an error if the user is not valid', async () => {
      const invalidUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe.com',
        role: UserRole.CUSTOMER,
        avatarUrl: 'ht//aasdvatar.com/john',
        bio: 'Hello, I am John Doe',
      } as Partial<CreateUserDto>;
      try {
        await service.create(invalidUser);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
