  import {
    Entity,
    Column,
    PrimaryColumn,
    BeforeInsert,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { Length, IsEmail, IsOptional, IsPhoneNumber } from "class-validator";
  import bcrypt from "bcrypt";
  import { v4 as uuid } from "uuid";
  import { Exclude } from "class-transformer";
  
  @Entity("usuarios")
  export class Usuario {
    @Exclude()
    @PrimaryColumn("uuid", { name: "id_usuario" })
    idUsuario: string;
  
    @Column({ name: "nome_de_usuario", length: 100 })
    @Length(3, 100, {
      message: "O nome de usuário deve ter pelo menos 3 caracteres.",
    })
    nomeDeUsuario: string;
  
    @Length(8, 256, { message: "A senha deve ter pelo menos 8 caracteres." })
    @Exclude()
    @Column({ length: 256 })
    senha: string;
  
    @IsEmail(undefined, { message: "Deve ser um endereço de e-mail válido" })
    @Index({ unique: true })
    @Length(1, 100, { message: "E-mail está vazio" })
    @Column({ unique: true, length: 100 })
    email: string;
  
    @Column({ name: "nivel_acesso", nullable: false, length: 50 })
    nivelAcesso: string;
  
    @Column({ name: "nome_completo", nullable: true, length: 200 })
    @Length(3, 200, {
      message: "O nome completo deve ter pelo menos 3 caracteres",
    })
    @IsOptional()
    nomeCompleto: string;
  
    @Column({ name: "perfil_imagem", nullable: true, length: 300 })
    @IsOptional()
    perfilImagem: string;
  
    @CreateDateColumn({ name: "data_criacao" })
    dataCriacao: Date;
  
    @UpdateDateColumn({ name: "data_atualizacao" })
    atualizacaoData: Date;
  
    @Column({ name: "curriculo_lattes", nullable: true })
    @IsOptional()
    curriculoLattes: string;
  
    @Column({ nullable: true, length: 15 })
    @IsOptional()
    @IsPhoneNumber(undefined,{message: "Deve ser um telefone válido, por exemplo: (código do país + código da área + número)."})
    telefone: string;
  
    @Column({ nullable: true })
    @IsOptional()
    ocupacao: string;
  
    @Column({ name: "termos_de_uso", nullable: false, default: true }) //mudei para fins de teste
    termosDeUso: boolean;
  
    @Column({ nullable: true })
    @IsOptional()
    descricao: string;
  
    @Column({ name: "data_desativacao", nullable: true })
    @IsOptional()
    dataDesativacao: Date;
  
    @Column({ name: "status_ativacao", nullable: true, default: true })
    statusAtivacao: boolean;
  
    @Column({ name: "email_verificado", nullable: true, default: true }) //mudei para teste
    emailVerificado: boolean;
  
    @Column({ name: "ultimo_login", nullable: true })
    ultimoLogin: Date;
  
    @Column({ name: "ip_ultimo_login", nullable: true, length: 45 })
    ipUltimoLogin: string;
  
    @Column({ name: "pais", length: 100 })
    pais: string;
  
    @Column({ name: "estado", nullable: true, length: 100 })
    estado: string;
  
    @Column({ name: "cidade", nullable: true, length: 100 })
    cidade: string;
  
    @Column({ name: "matricula", type: "int", nullable:true })
    matricula: number;
  
    @Column({ name: "instituicao", length: 256, default:"Não afiliado." })
    instituicao: string;
  
    @BeforeInsert()
    async hashPassword() {
      this.senha = await bcrypt.hash(this.senha, 10);
    }
  
    setPassword(senha: string): void {
      this.senha = bcrypt.hashSync(senha, 10);
    }
  
    checkPassword(senha: string): boolean {
      return bcrypt.compareSync(senha, this.senha);
    }
  
    toJSON() {
      return Object.assign({}, this, {
        senha: undefined,
      });
    }
  
    constructor(partial: Partial<Usuario>) {
      Object.assign(this, partial);
      if (!this.idUsuario) {
        this.idUsuario = uuid();
      }
      if (!this.nivelAcesso) {
        this.nivelAcesso = "basico";
      }
    }
  }
  