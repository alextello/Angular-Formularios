import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  
  forma: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
    this.cargarDataAFormulario();
  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }
  
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get departamentoNoValido() {
    return this.forma.get('direccion.departamento').invalid && this.forma.get('direccion.departamento').touched;
  }
  get municipioNoValido() {
    return this.forma.get('direccion.municipio').invalid && this.forma.get('direccion.municipio').touched;
  }


  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre  : ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', Validators.required],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion  : this.formBuilder.group({
        departamento: ['', Validators.required],
        municipio: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([])
    });
  }

  cargarDataAFormulario() {
    // this.forma.setValue({
    this.forma.reset({
      direccion: {
       departamento: 'Quetzaltenango',
       municipio: 'Quetzaltenango'
      }
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.formBuilder.control('', Validators.required));
  }

  borrarPasatiemo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach( control => {
        if (control instanceof FormGroup || control instanceof FormArray) {
          Object.values(control.controls).forEach( controls => controls.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
      return;
    }

    // POSTEO DE INFORMACIÓN
    this.forma.reset({
      nombre: 'Sin nombre'
    });
  }
}
