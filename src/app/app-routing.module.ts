import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListagemUsuariosComponent } from "./usuario/listagem-usuarios/listagem-usuarios.component";
import { CadastrarUsuarioComponent } from "./usuario/cadastrar-usuario/cadastrar-usuario.component";
import { CadastrarHorarioComponent } from "./horario/cadastrar-horario/cadastrar-horario.component";
import { CalendarioComponent } from "./home/calendario/calendario.component";
const routes: Routes = [
  {
    path: "usuario/cadastro",
    component: CadastrarUsuarioComponent,
  },
  {
    path: "usuario/editar/:id",
    component: CadastrarUsuarioComponent,
  },
  {
    path: "",
    component: ListagemUsuariosComponent,
  },
  {
    path: "horarios/inserir",
    component: CadastrarHorarioComponent,
  },
  {
    path: "horarios",
    component: CalendarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
