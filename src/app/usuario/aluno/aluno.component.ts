import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IAluno } from "src/app/shared/interfaces/IAluno";
import { UsuarioService } from "src/app/shared/services/usuario.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-aluno",
  templateUrl: "./aluno.component.html",
  styleUrls: ["./aluno.component.css"],
})
export class AlunoComponent implements OnInit {
  usuarioAluno: IAluno;
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
    this.usuarioAluno = {} as IAluno;
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get("id");
    if (idParaEdicao) {
      // editando
      this.usuarioService.pesquisarPorId(+idParaEdicao).subscribe((usuario) => {
        this.usuarioAluno = usuario;
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
    if (this.estahCadastrando && this.usuarioAluno) {
      this.usuarioAluno.nomeCompleto = this.usuarioAluno.nomeCompleto?.trim();
      this.usuarioService.inserirAluno(this.usuarioAluno).subscribe((aluno) => {
        //this.usuarios.push(usuario);
        this.roteador.navigate([""]);
      });
    }
    //this.nomeBotaoManutencao = 'Cadastrar';
    //this.roteador.navigate(['listagemusuarios']);
  }

  atualizar() {
    if (this.usuarioAluno) {
      this.usuarioService
        .atualizarAluno(this.usuarioAluno)
        .subscribe((aluno) => {
          this.roteador.navigate([""]);
        });
    }
  }
}
