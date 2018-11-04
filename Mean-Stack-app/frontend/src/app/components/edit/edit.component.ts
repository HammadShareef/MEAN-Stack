import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Issue} from '../../issue.model';

import {IssueServiceService} from '../../issue-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private issueServiceService: IssueServiceService, private router: Router, private route: ActivatedRoute,
     private snackBar: MatSnackBar, private fb: FormBuilder) {
       this.createForm();
      }

     createForm() {
      this.updateForm = this.fb.group({
        title: ['', Validators.required],
        responsible: '',
        description: '',
        severity: '',
        status: ''

      });
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    this.issueServiceService.getIssueById(this.id).subscribe(res => {
      this.issue = res;
      this.updateForm.get('title').setValue(this.issue.title);
      this.updateForm.get('responsible').setValue(this.issue.responsible);
      this.updateForm.get('description').setValue(this.issue.description);
      this.updateForm.get('severity').setValue(this.issue.severity);
      this.updateForm.get('action').setValue(this.issue.action);

    });

    });
  }

  updateIssue(title, responsible, description, severity, status) {
    this.issueServiceService.updateIssue(this.id, title, responsible, description, severity, status).subscribe(() => {
      this.snackBar.open('Data Updated Successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
