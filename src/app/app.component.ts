import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Note } from './note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  notesForm!: FormGroup;
  notes: Note[] = JSON.parse(localStorage.getItem('notes')!) || [];

  constructor(private fbuild: FormBuilder){}
  ngOnInit():void{this.notesForm = this.fbuild.group({title: [''],note: ['']})}
  addNote(){
    const {title,note} = this.notesForm.value;
    let data: Note = {title: title,note:note}
    this.notes.push(data);
    localStorage.setItem('notes',JSON.stringify(this.notes));
    this.notesForm.reset({title: "",note:""})
  }
}