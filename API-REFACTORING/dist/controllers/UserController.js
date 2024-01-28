var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  default: () => UserController_default
});
module.exports = __toCommonJS(UserController_exports);

// src/services/CreateUserService.ts
var CreateUserService = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(name, email, password) {
    const user = await this.userRepository.create(name, email, password);
    return user;
  }
};

// src/repositories/UserRepository.ts
var import_bcrypt = require("bcrypt");

// src/database/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/UserRepository.ts
var UserRepository = class {
  async create(name, email, password) {
    try {
      const userExists = await prisma.user.findFirst({
        where: { email }
      });
      if (userExists) {
        throw new Error("Erro: usu\xE1rio j\xE1 existe");
      }
      const salt = 10;
      const HashedPassword = await (0, import_bcrypt.hash)(password, salt);
      const user = prisma.user.create({
        data: {
          name,
          email,
          password: HashedPassword
        }
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao criar usu\xE1rio: ${error.message}`);
    }
  }
};

// src/controllers/UserController.ts
var UserController_default = {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService(new UserRepository());
    const user = await createUser.execute(name, email, password);
    return res.json({ user });
  }
};
