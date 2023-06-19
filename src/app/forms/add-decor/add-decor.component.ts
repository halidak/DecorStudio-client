import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DecorService, SaveDecor } from 'src/app/services/decor.service';

@Component({
  selector: 'app-add-decor',
  templateUrl: './add-decor.component.html',
  styleUrls: ['./add-decor.component.css']
})
export class AddDecorComponent implements OnInit {
  
  id: number = 0;
  constructor(private router: Router, private DecoreService: DecorService, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.rout.paramMap.subscribe(params => {
      this.id = +(params.get('id') ?? 0);
    })
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })

  get Name(){
    return this.form.get('name');
  }
  
  get Price(){
    return this.form.get('price');
  }

  get Amount(){
    return this.form.get('amount');
  }

  get Type(){
    return this.form.get('type');
  }

  get Description(){
    return this.form.get('description');
  }

  get Image(){
    return this.form.get('image');
  }

  async addDecor() {
    const imageInput = document.getElementById('imageInput') as HTMLInputElement;
    const image2 = imageInput.files?.item(0);
    
    if (image2) {
      const reader = new FileReader();
      
      const base64Image = await new Promise<string>((resolve) => {
        reader.addEventListener('load', () => {
          resolve(reader.result as string);
        });
        
        reader.readAsDataURL(image2);
      });
      
      console.log(base64Image);
  
      var decor: SaveDecor = {
        name: this.Name?.value ?? '',
        price: +(this.Price?.value ?? 0),
        amount: +(this.Amount?.value ?? 0),
        type: this.Type?.value ?? '',
        description: this.Description?.value ?? '',
        image: base64Image ?? ''
      }
  
      console.log(decor);
  
      this.DecoreService.addDecor(decor, this.id).subscribe(data => {
        console.log(data);
        this.router.navigate([`/warehouse/${this.id}`]);
      });
    }
  }
  

}
