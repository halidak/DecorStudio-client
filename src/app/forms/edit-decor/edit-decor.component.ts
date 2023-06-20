import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { customValidator } from '../add-warehouse-dialog/size.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { DecorService, SaveDecor } from 'src/app/services/decor.service';

@Component({
  selector: 'app-edit-decor',
  templateUrl: './edit-decor.component.html',
  styleUrls: ['./edit-decor.component.css']
})
export class EditDecorComponent {

  id: number = 0;
  decor: any = [];
  imageData: string = "";
  error: boolean = false;
  constructor(private router: Router, private DecoreService: DecorService, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.rout.paramMap.subscribe(params => {
      this.id = +(params.get('id') ?? 0);
      this.DecoreService.getDecor(this.id).subscribe(data => {
        this.decor = data;
        this.form.patchValue({
          name: this.decor.name,
          price: this.decor.price,
          type: this.decor.type,
          description: this.decor.description,
        })
      })
    })
  }
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('')
  })

  get Name(){
    return this.form.get('name');
  }
  
  get Price(){
    return this.form.get('price');
  }

  get Type(){
    return this.form.get('type');
  }

  get Description(){
    return this.form.get('description');
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageData = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }


  updateDecor(){
    if (this.imageData) {
      const formData = new FormData();
      formData.append('image', this.imageData);
      const d: SaveDecor = {
        name: this.Name?.value ?? '',
        price: +(this.Price?.value ?? 0),
        amount: 0,
        type: this.Type?.value ?? '',
        description: this.Description?.value ?? '',
        image: this.imageData
      }
      this.DecoreService.updateDecor(d, this.id).subscribe(data => {
        this.router.navigate([`/decor/${this.id}`]);
      }, error => {
          console.log(error);
          this.error = true;
        })
        } 
        else{
          const d: SaveDecor = {
            name: this.Name?.value ?? '',
            price: +(this.Price?.value ?? 0),
            amount: 0,
            type: this.Type?.value ?? '',
            description: this.Description?.value ?? '',
            image: this.decor.image
          }
          this.DecoreService.updateDecor(d, this.id).subscribe(data => {
            this.router.navigate([`/decor/${this.id}`]);
          }, error => {
              console.log(error);
              this.error = true;
            })
  }
}
}
