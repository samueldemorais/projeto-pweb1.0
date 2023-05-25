import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IHorario } from "src/app/shared/interfaces/IHorario";
import { IUsuario } from "src/app/shared/interfaces/IUsuario";
import { UsuarioService } from "src/app/shared/services/usuario.service";

@Component({
  selector: "app-cadastrar-horario",
  templateUrl: "./cadastrar-horario.component.html",
  styleUrls: ["./cadastrar-horario.component.css"],
})
export class CadastrarHorarioComponent {
  horario: IHorario;
  usuarios: IUsuario[] = [];
  usuario: IUsuario;

  constructor(
    private usuarioService: UsuarioService,
    private roteador: Router
  ) {
    this.horario = {} as IHorario;
    this.usuarios = [] as IUsuario[];
    this.usuario = {} as IUsuario;
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe((usuariosRetornados) => {
      this.usuarios = usuariosRetornados;
    });
  }

  print() {
    const userSelected = this.usuarios.filter((usuario) => {
      return usuario.id === this.usuario.id;
    })[0];
    if (this.horario) {
      const valorExistente = userSelected.horarios?.some(
        (horario: IHorario) => {
          return (
            horario.data === this.horario.data &&
            horario.horario === this.horario.horario
          );
        }
      );
      if (!valorExistente) userSelected.horarios?.push(this.horario);
    }
    this.usuarioService.atualizar(userSelected).subscribe((usuario) => {
      this.roteador.navigate(["listagemusuarios"]);
    });
  }
}
