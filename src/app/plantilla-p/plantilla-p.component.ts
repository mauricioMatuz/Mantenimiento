import { Component, OnInit } from '@angular/core';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { UsersService } from "../users/users.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-plantilla-p',
  templateUrl: './plantilla-p.component.html',
  styleUrls: ['./plantilla-p.component.css'],
})
export class PlantillaPComponent implements OnInit {
  public   contactForm: FormGroup
  articulos=null;
  createForm(){
    return new FormGroup({
      entradita: new FormControl('',(Validators.required)),
      tipop: new FormControl('',(Validators.required)),
      salidae: new FormControl('',(Validators.required)),
      descripcion: new FormControl('',(Validators.required)),
      herramientas: new FormControl('',(Validators.required))
    });
  }
  art={
    id:null,
    entrada:null,
    tipop:null,
    salidae:null,
    descripcion:null,
    herramientas:null
  }
  constructor(protected dashService: UsersService) { 
    this.contactForm = this.createForm();
  }
  ngOnInit() {
    this.recuperarTodos();
  }
  recuperarTodos() {
    this.dashService.recuperarTodosPla().subscribe(result => this.articulos = result);
  }
  onResetForm(){
    this.contactForm.reset();
  }
  alta() {
    console.log(this.art.entrada+' Entrada')
    console.log(this.art.descripcion+' DES')
    console.log(this.art.tipop+' tipo')
    console.log(this.art.salidae+' salida')
    console.log(this.contactForm.valid+" valid xd")
    if(this.contactForm.valid){
      this.dashService.Registro(this.art).subscribe(datos => {
        if (datos['resultado']=='OK') {
          alert(datos['mensaje']);
          this.recuperarTodos();
        }
        window.location.replace("http://localhost:4200/Datosp")
      });
      this.onResetForm();
      console.log('sis')
    }else{
      console.log('non')
    }
  }
  hayRegistros() {
    return true;
  } 
  get entrada(){ return this.contactForm.get('entradita');}
  get salidae(){ return this.contactForm.get('salidae');}
  get descripcion(){ return this.contactForm.get('descripcion');}
  get herramientas(){ return this.contactForm.get('herramientas');}
  get tipop(){ return this.contactForm.get('tipop');}
}
