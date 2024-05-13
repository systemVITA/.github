import { Request, Response } from "express";


export const logoutUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path:'/'
      });

      res.clearCookie("cookie"); // Limpar o cookie
      console.log("Logout")
      return res.status(200).json({ success: true }); // Resposta de sucesso
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error interno do servidor" }); // Resposta de erro
    }
  };