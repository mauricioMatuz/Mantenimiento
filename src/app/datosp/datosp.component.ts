import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users/users.service";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormControl, FormGroup, Validators } from '@angular/forms';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-datosp',
  templateUrl: './datosp.component.html',
  styleUrls: ['./datosp.component.css']
})
export class DatospComponent implements OnInit {
  public   contactForm: FormGroup
  articulos:any;

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
    herramientas: null
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

  baja(codigo) {
    this.dashService.bajaPla(codigo).subscribe(datos => {
      if (datos['resultado']=='OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
      }
    });
  }

  modificacion() {
    if(this.contactForm.valid){
      console.log(this.art.descripcion);
      this.dashService.modificacionPla(this.art).subscribe(datos => {
        if (datos['resultado']=='OK') {
          alert(datos['mensaje']);
          this.recuperarTodos();
        }
      });   
    }else{
      console.log("NON")
    }
  }
  
  seleccionar(codigo) {
    this.dashService.seleccionarPla(codigo).subscribe(result => this.art = result[0]);
  }

  generatePdf() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Dato de la tabla.pdf');
    });
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
