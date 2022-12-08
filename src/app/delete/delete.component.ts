import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() item:string | undefined;  //parent child relation.(item is variable)
  // @Input()-To hold the data from the parent.(dashboard)
  // Item - property binding- dashboard.html---[item]="acno".
  constructor() { }


  @Output() onCancel=new EventEmitter();  //user defined event is (oncancel)---child to parent
  @Output() onDelete=new EventEmitter();  //used to delete
  
  ngOnInit(): void {
  }
  
  cancel(){
   this.onCancel.emit(); //used to emit
  }

   //for delete
  delete(){
    this.onDelete.emit(this.item); //used to emit
  }
}
