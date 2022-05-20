import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  userForm: FormGroup;
  configData: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      data: this.fb.array([])
    });
    this.http.get("/assets/config.json").subscribe(config => {
      this.configData = config;
      this.buildForm();
    });
  }

  get fcontrols() {
    return this.userForm.controls.data as FormArray;
  }

  get fgControls() {
    return this.fcontrols.controls as Array<any>;
  }

  get dataKeys() {
    return Object.keys(this.configData);
  }

  buildForm() {
    let fg = new FormGroup({});
    this.dataKeys.forEach(key => {
      fg.addControl(key, new FormControl(""));
    });
    this.fcontrols.controls.push(fg);
  }

  submit() {
    alert('User Created..')
  }
}
