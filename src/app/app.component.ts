import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidation } from './classes/custom-validation';
import { Note } from './interfaces/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  frmNotes!: FormGroup; frmEdit!: FormGroup;
  editMdl = false; viewMdl = false;oldTitle!: string; oldNote!: string; 
  viewTitle!: string; viewNote!: string; chosen!: number;
  notes: Note[] = JSON.parse(localStorage.getItem('notes')!) || [];
  deleted: Note[] = JSON.parse(localStorage.getItem('deleted')!) || [];
  tab = localStorage.getItem("tab") || "notes";
  constructor(private fbuild: FormBuilder){}
  ngOnInit():void{
    this.frmNotes = this.fbuild.group({
      title: ['', [Validators.required, CustomValidation.spaceValidation]],
      note: ['',[Validators.required, CustomValidation.spaceValidation]]
    })
  }
  switchTab(t:string){this.tab = t;localStorage.setItem('tab',this.tab);}
  addNote(){
    const {title,note} = this.frmNotes.value;
    let data: Note = {title:title,note:note};this.notes.push(data);
    localStorage.setItem('notes',JSON.stringify(this.notes));
    this.frmNotes.reset({title:"",note:""})
  }
  editNote(){
    const {newTitle,newNote} = this.frmEdit.value;
    this.notes[this.chosen].title = newTitle;
    this.notes[this.chosen].note = newNote;
    localStorage.setItem('notes',JSON.stringify(this.notes));
    this.frmEdit.reset({newTitle: "",newNote: "",});this.closeEditModal();
  }
  deleteNote(i:number){
    this.deleted.push(this.notes[i]);this.notes.splice(i,1);
    localStorage.setItem('notes',JSON.stringify(this.notes));
    localStorage.setItem('deleted',JSON.stringify(this.deleted));
  }
  openEditModal(i:number){
    this.editMdl = true;
    this.frmEdit = this.fbuild.group({
      newTitle: ["",[Validators.required, CustomValidation.spaceValidation]],
      newNote: ["",[Validators.required, CustomValidation.spaceValidation]]
    })
    this.oldTitle = this.notes[i].title;
    this.oldNote = this.notes[i].note;this.chosen = i;
  }
  openViewModal(i:number){this.viewMdl= true;this.viewTitle = this.notes[i].title;this.viewNote = this.notes[i].note;}
  closeEditModal = () => this.editMdl = false;
  closeViewModal = () => this.viewMdl = false;
  deleteForever(i:number){
    const sure = confirm("Are you sure to delete this note forever?");
    if(sure){this.deleted.splice(i,1);localStorage.setItem('deleted',JSON.stringify(this.deleted));}
  }
}