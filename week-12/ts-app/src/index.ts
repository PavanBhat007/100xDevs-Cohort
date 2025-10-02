interface User {
  readonly id: number;
  name: string;
  age: number;
  email: string;
  readonly password: string;
}

type UpdateProps = Pick<User, "name" | "age" | "email">;
type UpdatePropsOptional = Partial<UpdateProps>;

function updateUser(data: UpdatePropsOptional) {
  // ...
}

const user: Readonly<User> = {
  id: 1,
  name: "pavan",
  age: 22,
  email: "pavan@gmail.com",
  password: "12345",
};

interface UserRecord {
  name: string;
  email: string;
}

// interface Users {
//   [key: string]: UserRecord
// }

type Users = Record<string, UserRecord>;
// const users: Users = {
//   "id1": {
//     name: "Pavan",
//     email: "pavan@gmail.com"
//   },
//   "id2": {
//     name: "Navap",
//     email: "navap@gmail.com"
//   }
// }

// const users = {}
// users["id1"] = {name: "Pavan", email: "pavan@gmail.com"}
// users["id2"] = {name: "Navap", email: "navap@gmail.com"}

// const user1 = users["id1"]

const users = new Map();
users.set("id1", { name: "Pavan", email: "pavan@gmail.com" });
users.set("id2", { name: "Navap", email: "navap@gmail.com" });

const user1 = users.get("id1");
users.delete("id2");
