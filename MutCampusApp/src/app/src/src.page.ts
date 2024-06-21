import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-src',
  templateUrl: './src.page.html',
  styleUrls: ['./src.page.scss'],
})
export class SrcPage implements OnInit {
  announcementText: string = '';
  targetAudience: string = '';
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (!this.announcementText.trim() || !this.selectedFile || !this.targetAudience) {
      alert('Please fill all the fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('announcementText', this.announcementText);
    formData.append('targetAudience', this.targetAudience);
    formData.append('image', this.selectedFile);

    this.http.post('http://192.168.101.153:3000/upload', formData).subscribe(
      response => {
        console.log('Post created!', response);
        // Optionally, you can reset the form fields here
        this.resetForm();
      },
      error => {
        console.error('Error creating post:', error);
      }
    );
  }

  resetForm() {
    this.announcementText = '';
    this.targetAudience = '';
    this.selectedFile = null;
  }

  ngOnInit() {}
}
