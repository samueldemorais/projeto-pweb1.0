import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IUsuario } from "src/app/shared/interfaces/IUsuario";
import { UsuarioService } from "src/app/shared/services/usuario.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-cadastrar-usuario",
  templateUrl: "./cadastrar-usuario.component.html",
  styleUrls: ["./cadastrar-usuario.component.css"],
})
export class CadastrarUsuarioComponent implements OnInit {
  usuarioDeManutencao: IUsuario;
  estahCadastrando = true;
  nomeBotaoManutencao = "SALVAR";
  IdUsuarioEditar: any = "";
  maxDate: Date = new Date();
  formCadastro: FormGroup = {} as FormGroup;

  constructor(
    private rotaAtual: ActivatedRoute,
    private roteador: Router,
    private usuarioService: UsuarioService
  ) {
    this.usuarioDeManutencao = {} as IUsuario;
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get("id");
    if (idParaEdicao) {
      // editando
      this.usuarioService.pesquisarPorId(+idParaEdicao).subscribe((usuario) => {
        this.usuarioDeManutencao = usuario;
      });
      this.IdUsuarioEditar = idParaEdicao;
      this.estahCadastrando = false;
    }
  }

  ngOnInit() {
    this.formCadastro = new FormGroup({
      nomeCompleto: new FormControl("", [
        Validators.required,
        Validators.maxLength(60),
        Validators.minLength(3),
      ]),
      dataNascimento: new FormControl("", [Validators.required]),
      cpf: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}$"),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"),
      ]),
    });
  }

  manter(): void {
    if (this.estahCadastrando && this.usuarioDeManutencao) {
      this.usuarioDeManutencao.nomeCompleto =
        this.usuarioDeManutencao.nomeCompleto?.trim();
      let userExist = null;

      this.usuarioService
        .pesquisarPorCpf(this.usuarioDeManutencao.cpf)
        .subscribe((usuario) => {
          if (!usuario) {
            this.usuarioService
              .inserir(this.usuarioDeManutencao)
              .subscribe((usuario) => {
                //this.usuarios.push(usuario);
                this.roteador.navigate([""]);
              });
          } else {
            alert("CPF já cadastrado");
          }
        });
    }
    //this.nomeBotaoManutencao = 'Cadastrar';
    //this.roteador.navigate(['listagemusuarios']);
  }

  atualizar() {
    if (this.usuarioDeManutencao) {
      this.usuarioService
        .atualizar(this.usuarioDeManutencao)
        .subscribe((usuario) => {
          this.roteador.navigate([""]);
        });
    }
  }
}
