import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

import {IssueServiceService} from '../../issue-service.service';
import {Issue} from '../../issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  displayColumns = ['title', 'responsible', 'severity', 'status', 'action'];

  constructor(private issueServiceService: IssueServiceService, private router: Router) { }

  ngOnInit() {

    // Data Show in JSON  Form

    // this.issueServiceService.getIssues().subscribe((issues) =>{
    //   console.log(issues);
    // });

    this.fetchIssues();



  }
  fetchIssues() {
    this.issueServiceService.getIssues().subscribe((issues: Issue[]) => {
      this.issues = issues;

    });
  }
  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }
  deleteIssue(id) {
    this.issueServiceService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }
}
