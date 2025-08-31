import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function insertUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
      },
    });

    console.log("User created:", user);
  } catch (err) {
    console.error("Error creating new user");
    throw err;
  }
}

interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function updateUser(
  email: string,
  { firstName, lastName }: UpdateParams
) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    console.log("User updated successfully:", updatedUser);
  } catch (err) {
    console.error("Error updating given user.", err);
    throw err;
  }
}

async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) console.log("User found: ", user);
    else console.log("User not found.");
  } catch (err) {
    console.error("Error fetching user.", err);
    throw err;
  }
}

async function deleteUser(email: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        email: email,
      },
    });
  } catch (err) {
    console.error("Error while deleting user.", err);
    throw err;
  }
}

interface TodoItem {
  title: string;
  description: string;
  completed: boolean;
  user_id: number;
}

async function addTodo(todo: TodoItem) {
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        user_id: todo.user_id,
      },
      select: {
        id: true,
      },
    });

    console.log("Todo created!");
  } catch (err) {
    console.error("Error while adding ToDo!");
    throw err;
  }
}

// insertUser("pavan.ks.bhat@gmail.com", "54321", "Pavan", "Bhat").catch(
//   console.error
// );
// updateUser("pvn@gmail.com", { firstName: "Pavan", lastName: "Bhat" }).catch(
//   console.error
// );
// getUser("pvn.ks@gmail.com").catch(console.error);
// deleteUser("pvn.ks@gmail.com").catch(console.error);
ith
addTodo({
  title: "Learn Java",
  description: "Complete Bro Code's Java Tutorial",
  completed: false,
  user_id: 3,
}).catch(console.error);
