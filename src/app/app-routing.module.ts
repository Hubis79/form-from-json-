import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recruitment', pathMatch: 'full' },
  {
    path: 'recruitment',
    loadChildren: () =>
      import('./features/recruitment/recruitment.module').then(
        (m) => m.RecruitmentModule
      ),
  },
  { path: '**', redirectTo: '/recruitment' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
