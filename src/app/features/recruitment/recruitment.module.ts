import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruitmentComponent } from './recruitment.component';
import { ShareModule } from 'src/app/share/share.module';
import { RecruitmentFormComponent } from './recruitment-form/recruitment-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '**', component: RecruitmentComponent }, // Default route for the module
];

@NgModule({
  declarations: [RecruitmentComponent, RecruitmentFormComponent],
  imports: [CommonModule, ShareModule, RouterModule.forChild(routes)],
})
export class RecruitmentModule {}
