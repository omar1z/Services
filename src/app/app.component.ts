import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames =['omar','youssef'];

  ngOnInit(): void {
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          'email': new FormControl(null, [Validators.required,Validators.email]),}),
        
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });
  }
  onSubmit() {
    console.log(this.signupForm)
  }
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  forbiddenNames(control: FormControl): {[s: string]: boolean}{
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'NameIsForbidden': true};
    }
    return null;
  }
}
