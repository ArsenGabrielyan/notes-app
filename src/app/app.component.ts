import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidation } from './classes/custom-validation';
import { INote } from './interfaces/note';
import { NotesService } from './services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  frmNotes!: FormGroup; 
  frmEdit!: FormGroup;
  canEdit = false; 
  viewMdl = false;
  viewTitle!: string; 
  viewNote!: string; 
  chosen!: number;
  notes: INote[] = JSON.parse(localStorage.getItem('notes')!) || [];
  deleted: INote[] = JSON.parse(localStorage.getItem('deleted')!) || [];
  tab = localStorage.getItem("tab") || "notes";

  constructor(private fbuild: FormBuilder, private noteService: NotesService){}
  ngOnInit():void{
    this.frmNotes = this.fbuild.group({
      title: ['', [Validators.required, CustomValidation.spaceValidation]],
      note: ['',[Validators.required, CustomValidation.spaceValidation]]
    })
  }

  switchTab(t:string){
    this.tab = t;
    localStorage.setItem('tab',this.tab);
  }
  addNote(){
    this.noteService.add(this.notes, this.frmNotes);
  }
  editNote(){
    this.noteService.edit(this.frmNotes, this.notes, this.chosen);
    this.canEdit = false;
  }
  deleteNote(i:number){
    this.noteService.delete(this.deleted,this.notes,i);
  }
  openEdit(i:number){
    this.canEdit = true;
    this.frmNotes.setValue({
      title: this.notes[i].title,
      note: this.notes[i].note
    });
    this.chosen = i;
  }
  openViewModal(i:number){
    this.viewMdl= true;
    this.viewTitle = this.notes[i].title;
    this.viewNote = this.notes[i].note;
  }
  closeViewModal(){
    this.viewMdl = false;
  }
  deleteForever(i:number){
    const sure = confirm("Are you sure to delete this note forever?");
    if(sure){
      this.deleted.splice(i,1);
      localStorage.setItem('deleted',JSON.stringify(this.deleted));
    }
  }
}