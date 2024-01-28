var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");

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

// src/services/AuthService.ts
var AuthService = class {
  constructor(userAuthenticate) {
    this.userAuthenticate = userAuthenticate;
  }
  async execute(email, password) {
    const user = await this.userAuthenticate.auth(email, password);
    return user;
  }
};

// src/repositories/AuthRepository.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_bcrypt2 = require("bcrypt");
var AuthRepository = class {
  async auth(email, password) {
    const user = await prisma.user.findFirst({
      where: { email }
    });
    if (!user) {
      throw new Error("Error: usu\xE1rio ou senha incorretos: Email");
    }
    const checkPassword = await (0, import_bcrypt2.compare)(password, user.password);
    if (!checkPassword) {
      throw new Error("Error: usu\xE1rio ou senha incorretos: Senha");
    }
    const token = import_jsonwebtoken.default.sign({ id: user.id }, "secret", {
      expiresIn: "1d"
    });
    delete user?.password;
    const data = { ...user, token };
    return data;
  }
};

// src/controllers/AuthController.ts
var AuthController_default = {
  async authUser(request, response) {
    const { email, password } = request.body;
    const authUser = new AuthService(new AuthRepository());
    const user = await authUser.execute(email, password);
    return response.json({ user });
  }
};

// src/routes/index.ts
var router = (0, import_express.Router)();
router.post("/user/createUser", UserController_default.createUser);
router.post("/user/session", AuthController_default.authUser);
var routes_default = router;
