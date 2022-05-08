import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../shared/models/Image';
import { Comment } from '../../../shared/models/Comment';
import { GalleryService } from '../../../shared/services/gallery.service';
import { CommentService } from '../../../shared/services/comment.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';
import { Appointment } from 'src/app/shared/models/Appointment';
import { appointmentService } from 'src/app/shared/services/appointmentService';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {

  @Input() imageInput?: Image;
  loadedImage?: string;
  user?: User;
  appointment?: any = ["teszt","teszt2"];
  newdate: Array<Appointment> = [];

  commentsForm = this.createForm({
    id: '',
    username: '',
    comment: '',
    date: 0,
    imageId: this.imageInput?.id
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private galleryService: GalleryService,
    private appointmentService: appointmentService,
    private userService: UserService    ) { }

  ngOnChanges(): void {
    if (this.imageInput?.id) {
      this.commentsForm.get('imageId')?.setValue(this.imageInput.id);
      this.galleryService.loadImage(this.imageInput.photo_url).subscribe(data => {
        this.loadedImage = data;
      });
      this.appointmentService.getOpenDates(this.imageInput.id).subscribe(appointment => {this.appointment = appointment;});
      this.appointmentService.getDates(this.imageInput.id).subscribe(appointments =>{this.newdate = appointments})
    }
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.name.firstname + " " + this.user?.name.lastname);
    }, error => {
      console.error(error);
    });
    
  }
  createForm(model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required]);
    return formGroup;
  }

  addComment() {
    if (this.commentsForm.valid) {
      if (this.imageInput?.id) {
        this.appointmentService.bookanAppointment(this.commentsForm.get("comment")?.value,this.imageInput?.id).then(_ => {
          this.router.navigateByUrl('/gallery/successful/' + this.commentsForm.get('username')?.value);
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

}
