import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { RestDataService } from '../../core/restData.service';
import { restIntencityBaseUrl } from '../../app.constants';

@Component({
  selector: 'app-traning-plans',
  templateUrl: './traning-plans.component.html',
  styleUrls: ['./traning-plans.component.css']
})
export class TraningPlansComponent implements OnInit {

  public traningPlans: TraningPlan[] = [];
  
  constructor(private userService: UserService, private router : Router, public dialog: MdDialog, private http : RestDataService) {    
  }

  ngOnInit() {
    this.http.getAll<TraningPlan[]>(restIntencityBaseUrl + `api/TraningPlan`).subscribe(x => this.traningPlans = x, e => this.router.navigate(['error/notFound']));
  }

  getNumberOfDays(traningPlan: TraningPlan){
    return traningPlan.traningDays.length || 0;
  }

  onSelectedListItem(traningPlan: TraningPlan){ 
    this.navigateToTraningPlanAwarePage('/intencity/traningPlan/', traningPlan);
  }

  onUseListItem(traningPlan: TraningPlan){
    this.navigateToTraningPlanAwarePage('/intencity/calendary/', traningPlan);
  }

  // deleteDialogRef: MdDialogRef<TraningPlanDeleteConfirmDialog>;
  onDeleteListItem(traningPlan: TraningPlan){
    // if(!traningPlan){
    //   return;
    // }
    
    // this.deleteDialogRef = this.dialog.open(TraningPlanDeleteConfirmDialog);
    // this.deleteDialogRef.componentInstance.data = traningPlan;
    // this.deleteDialogRef.afterClosed().subscribe(result => {
    //   if(result){
    //     this.traningPlans.remove(<any>traningPlan);
    //   }
    // });
  }

  

  private navigateToTraningPlanAwarePage(url: string, traningPlan: TraningPlan)
  {
    if(!traningPlan){
      return;
    }

    var resourcePath = '/intencity/traningPlan/' + traningPlan.id;
    this.router.navigate([resourcePath]);

  }
}

export interface TraningPlan{
  id: number;
  name: string;
  traningDays: TraningPlanDay[];
}

export interface TraningPlanDay{
  id: number;
  intencityPercentage: number;
  microcyclePercentage: number;
}
