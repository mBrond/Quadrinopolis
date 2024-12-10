import user from "@/models/user";  // Importando o modelo 'user'
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";

const options = NextAuth({
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            async authorize(credentials) {
                await connect(); // Conectar ao banco de dados

                try {
                    // Procurando o usuário no banco de dados
                    const userRecord = await user.findOne({
                        name: credentials.name, // Ou qualquer campo para identificar o usuário
                    });

                    // Verifique se o usuário foi encontrado
                    if (!userRecord) {
                        throw new Error("Usuário não encontrado!");
                    }

                    // Comparando a senha
                    const validPassword = await bcrypt.compare(
                        credentials.password,
                        userRecord.password
                    );

                    if (validPassword) {
                        return userRecord; // Retorna o usuário validado
                    } else {
                        throw new Error("Credenciais erradas!");
                    }
                } catch (error) {
                    // Retorna o erro com a mensagem
                    throw new Error(error.message || "Erro ao tentar autenticar.");
                }
            }
        }),
    ],
});

export { options as GET, options as POST }; // A exportação correta
