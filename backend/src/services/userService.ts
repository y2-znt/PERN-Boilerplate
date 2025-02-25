import prisma from "../config/prismaClient";

export const fetchAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword
    );
  } catch (error) {
    throw new Error(`Failed to fetch users: ${(error as Error).message}`);
  }
};

export const fetchUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Failed to fetch user: ${(error as Error).message}`);
  }
};

export const addUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Failed to create user: ${(error as Error).message}`);
  }
};

export const editUser = async (
  id: string,
  {
    username,
    email,
    avatarUrl,
  }: { username?: string; email?: string; avatarUrl?: string }
) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        avatarUrl,
      },
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(`Failed to update user: ${(error as Error).message}`);
  }
};

export const removeUser = async (id: string) => {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    throw new Error(`Failed to delete user: ${(error as Error).message}`);
  }
};
