export interface UserInterface {
    id: string;
    nome: string;
    email: string;
    senha: string;
    token: string;
    socketId: string | undefined;
}