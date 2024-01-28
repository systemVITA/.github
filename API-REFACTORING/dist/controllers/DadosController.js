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

// src/controllers/DadosController.ts
var DadosController_exports = {};
__export(DadosController_exports, {
  default: () => DadosController_default
});
module.exports = __toCommonJS(DadosController_exports);

// src/database/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/controllers/DadosController.ts
var Dadoscontrollers = {
  async createDados(req, res) {
    try {
      const { data_c, server, dados, status } = req.body;
      const newDados = await prisma.log.create({
        data: {
          data_c,
          server,
          dados,
          status
        }
      });
      return res.json({
        error: false,
        message: "Success: dados criados com sucesso",
        dados: newDados
      });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  },
  async listDados(req, res) {
    try {
      const userId = parseInt(req.params.id, 10);
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        return res.json({
          error: true,
          message: "Erro: usu\xE1rio n\xE3o encontrado"
        });
      }
      const dados = await prisma.log.findMany({
        where: {
          server: userId
        }
      });
      return res.json({
        error: false,
        message: "Success: dados encontrados com sucesso",
        dados
      });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  },
  async updateDados(req, res) {
    try {
      const { id, data_c, server, dados, status } = req.body;
      const updatedDados = await prisma.log.update({
        where: { id },
        data: {
          data_c,
          server,
          dados,
          status
        }
      });
      return res.json({
        error: false,
        message: "Success: dados atualizados com sucesso",
        dados: updatedDados
      });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  },
  async deleteDados(req, res) {
    try {
      const { id } = req.body;
      const dadosExists = await prisma.log.findUnique({ where: { id } });
      if (!dadosExists) {
        return res.json({
          error: true,
          message: "Erro: dados n\xE3o encontrados"
        });
      }
      await prisma.log.delete({ where: { id } });
      return res.json({
        error: false,
        message: "Success: dados exclu\xEDdos com sucesso"
      });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }
};
var DadosController_default = Dadoscontrollers;
