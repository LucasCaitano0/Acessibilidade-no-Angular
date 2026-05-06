import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Livro } from '../../models/interfaces';
import { AutoriaPipe } from '../../pipes/autoria.pipe';
import { ModalComponent } from '../../pages/modal/modal.component';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [CommonModule, AutoriaPipe, ModalComponent],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {

  @Input() livro!: Livro;
  modalAberto: boolean = false;

  constructor() {}

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
