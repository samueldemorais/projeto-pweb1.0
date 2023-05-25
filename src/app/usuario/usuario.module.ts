import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListagemUsuariosComponent } from "./listagem-usuarios/listagem-usuarios.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatBadgeModule } from "@angular/material/badge";
import { FlexModule } from "@angular/flex-layout";
import { RouterLink } from "@angular/router";
import { CadastrarUsuarioComponent } from "./cadastrar-usuario/cadastrar-usuario.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [ListagemUsuariosComponent, CadastrarUsuarioComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    FlexModule,
    RouterLink,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  exports: [ListagemUsuariosComponent, CadastrarUsuarioComponent],
})
export class UsuarioModule {}
