import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUsuarios1706292600178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          {
            name: "id_usuario",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "senha",
            type: "varchar",
            length: "256",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "100",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "nome_de_usuario",
            type: "varchar",
            isUnique: true,
            isNullable: false,
            length: "100",
          },
          {
            name: "nivel_acesso",
            type: "varchar",
            isNullable: false,
            length: '50',
          },
          {
            name: "nome_completo",
            type: "varchar",
            length: "200",
            isNullable: true,
          },
          {
            name: "data_criacao",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "data_atualizacao",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "data_desativacao",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "descricao",
            type: "text",
            isNullable: true,
          },
          {
            name: "perfil_imagem",
            type: "varchar",
            length: "300",
            isNullable: true,
          },

          {
            name: "curriculo_lattes",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "telefone",
            type: "varchar",
            length: "15",
            isNullable: true,
          },
          {
            name: "ocupacao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "termos_de_uso",
            type: "boolean",
            isNullable: false,
          },
          {
            name: "status_ativacao",
            type: "boolean",
            isNullable: true,
          },
          {
            name: "pais",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "estado",
            type: "varchar",
            length: "100",
            isNullable: true, // Nullable para usuários não brasileiros
          },
          {
            name: "cidade",
            type: "varchar",
            length: "100",
            isNullable: true, // Nullable para usuários não brasileiros
          },
          {
            name: "matricula",
            type: "int",
            isNullable: true,
          },
          {
            name: "email_verificado",
            type: "boolean",
            default: false, // Inicialmente, todos os e-mails não estão verificados
          },
          {
            name: "ultimo_login",
            type: "timestamp",
            isNullable: true, // Inicialmente nulo até que o usuário faça o primeiro login
          },
          {
            name: "ip_ultimo_login",
            type: "varchar",
            length: "45", // Comprimento suficiente para armazenar endereços IPv4 e IPv6
            isNullable: true, // Inicialmente nulo até que o usuário faça o primeiro login
          },
          {
            name: 'instituicao',
            type: "varchar",
            length: "256",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createIndex(
      "usuarios",
      new TableIndex({
        name: "IDX_EMAIL",
        columnNames: ["email"],
      })
    );

    await queryRunner.createIndex(
      "usuarios",
      new TableIndex({
        name: "IDX_NOME_DE_USUARIO",
        columnNames: ["nome_de_usuario"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("usuarios", "IDX_EMAIL");
    await queryRunner.dropIndex("usuarios", "IDX_NOME_DE_USUARIO");
    await queryRunner.dropTable("usuarios",);
  }
}