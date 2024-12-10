import user from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";

export async function POST(req) {
    try {
        const { name, password } = await req.json();
        
        // Conectar ao banco de dados
        await connect();

        // Verificar se o nome de usuário já existe
        const nameExists = await user.findOne({ name });

        if (nameExists) {
            return NextResponse.json({
                message: "Já existe um usuário com esse nome",
                status: 409,
            });
        }

        // Gerar a senha com bcrypt
        const hashedPassword = await bcrypt.hash(password, 5);

        // Criar o novo usuário
        const newUser = new user({
            name,
            password: hashedPassword,
        });

        // Salvar o novo usuário no banco de dados
        await newUser.save();

        return NextResponse.json({
            message: "Usuário criado com sucesso",
            status: 201,
        });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return NextResponse.json({
            message: "Erro ao cadastrar usuário",
            status: 500,
        });
    }
}
