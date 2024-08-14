import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn((user: Partial<CreateUserDto>) => {
              return user;
            }),
            findAll: jest.fn(() => {
              return [];
            }),
            findOne: jest.fn((id: number) => {
              console.log(typeof id);
              if (id === 1) {
                return {};
              }
              throw new Error('User not found');
            }),
            update: jest.fn((id: number, user: Partial<CreateUserDto>) => {
              if (id === 1) {
                return user;
              }
              throw new Error('User not found');
            }),
            remove: jest.fn((id: number) => {
              console.log(typeof id, id);
              if (id === 1) {
                return { deleted: true };
              }
              throw new Error('User not found');
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
    it('should create a user', () => {
      expect(controller.create(user)).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      expect(controller.findAll()).toBeDefined();
    });
  });

  describe('findOne', () => {
    beforeAll(() => {
      controller.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        role: UserRole.CUSTOMER,
        avatarUrl: 'https://avatar.com/john',
        bio: 'Hello, I am John Doe',
      });
    });
    it('should return a user', () => {
      expect(controller.findOne(1)).toBeDefined();
    });

    it('should throw an error if the user does not exist', () => {
      expect(() => controller.findOne(2)).toThrow();
    });
  });

  describe('update', () => {
    beforeAll(() => {
      controller.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com.br',
        role: UserRole.CUSTOMER,
        avatarUrl: 'https://avatar.com/john',
        bio: 'Hello, I am John Doe',
      });
    });

    it('should update a user', () => {
      expect(
        controller.update(1, {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          role: UserRole.CUSTOMER,
          avatarUrl: 'https://avatar.com/john',
          bio: 'Hello, I am John Doe',
        }),
      ).toBeDefined();
    });

    it('should throw an error if the user does not exist', () => {
      expect(() =>
        controller.update(2, {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          role: UserRole.CUSTOMER,
          avatarUrl: 'https://avatar.com/john',
          bio: 'Hello, I am John Doe',
        }),
      ).toThrow();
    });
  });

  describe('delete', () => {
    beforeAll(() => {
      controller.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        role: UserRole.CUSTOMER,
        avatarUrl: 'https://avatar.com/john',
        bio: 'Hello, I am John Doe',
      });
    });

    it('should delete a user', () => {
      expect(controller.remove(1)).toBeDefined();
    });

    it('should throw an error if the user does not exist', () => {
      expect(() => controller.remove(2)).toThrow();
    });
  });
});
