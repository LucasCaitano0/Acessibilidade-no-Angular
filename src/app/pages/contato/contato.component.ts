import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  contatoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.contatoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      cpfCnpj:['', [Validators.required, this.validarCpfCnpj]],
      motivoContato: [''],
      melhorFormaContato: ['email'],
      mensagem: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.contatoForm.valid) {
      this.contatoForm.reset();
    }
  }

  cancelar() {
    this.contatoForm.reset();
    this.router.navigateByUrl('/');
  }

  formatarCpfCnpj(event: Event){
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não for dígito

    if(valor.length <=11) {
      // máscar de  CPF
      valor = valor
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    } else{
      // máscara de CNPJ
      valor = valor
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1.$2');
      }

      input.value = valor;
      this.contatoForm.get('cpfCnpj')?.setValue(valor, { emitEvent: false});

  }

  validarCpfCnpj(control: AbstractControl){
    const valor = control.value?.replace(/\D/g, '');
    if (!valor) return null;
    const valido = valor.length === 11 || valor.length === 14;
    return valido ? null : { cpfCnpjInvalido: true };
  }

}


