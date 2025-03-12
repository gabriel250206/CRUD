import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { TaskService, Task } from '../task.service'; 
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, CommonModule, NgFor,FormsModule],
  standalone: true,
})
export class HomePage implements OnInit {
  tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
    console.log(this.tasks$);
  }
  

  addItem(name: string, day: string): void {
    if (name.trim() && day.trim()) {
      const newTask: Task = { 
        name: name.trim(),
        day: day.trim(),
        completed: false
      };

      this.taskService.addTask(newTask)
        .then(() => console.log('Tarea agregada correctamente'))
        .catch(error => console.error('Error al agregar tarea:', error));
    } else {
      console.error('El nombre y el día no pueden estar vacíos');
    }
  }
  deleteItem(id: string): void {
    this.taskService.deleteTask(id).then(() => {
      console.log('Tarea eliminada correctamente');
    }).catch(error => {
      console.error('Error al eliminar tarea:', error);
    });
  }
  editTask(id: string, name: string, day: string): void {
    this.taskService.updateTask(id, { name, day }).then(() => {
      console.log('Tarea actualizada correctamente');
    }).catch(error => {
      console.error('Error al actualizar tarea:', error);
    });
  }
  toggleCompleted(id: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Asegura que es un HTMLInputElement
    const completed = inputElement.checked;
  
    this.taskService.updateTask(id, { completed }).then(() => {
      console.log('Estado de tarea actualizado');
    }).catch(error => {
      console.error('Error al actualizar estado:', error);
    });
  }
}
