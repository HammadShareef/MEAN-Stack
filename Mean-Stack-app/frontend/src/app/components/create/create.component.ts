import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IssueServiceService} from '../../issue-service.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  CreateGroup: FormGroup;

  constructor(private issueServiceService: IssueServiceService, private fb: FormBuilder, private router: Router) {

    this.CreateGroup = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: ''

    });
   }

   addIssue(title, responsible, description, severity) {
     this.issueServiceService.addIssue(title, responsible, description, severity).subscribe(() => {
       this.router.navigate(['/list']);
     });

   }

  ngOnInit() {
  }

}
