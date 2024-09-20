import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./home/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./navigation/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./residence/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('./radio/tab4.module').then( m => m.Tab4PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'ai',
    loadChildren: () => import('./ai/ai.module').then( m => m.AIPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'settingss',
    loadChildren: () => import('./settingss/settingss.module').then( m => m.SettingssPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'timetable',
    loadChildren: () => import('./timetable/timetable.module').then( m => m.TimetablePageModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
  },
  {
    path: 'transport',
    loadChildren: () => import('./transport/transport.module').then( m => m.TransportPageModule)
  },
  {
    path: 'sports',
    loadChildren: () => import('./sports/sports.module').then( m => m.SportsPageModule)
  },
  {
    path: 'faculties',
    loadChildren: () => import('./faculties/faculties.module').then( m => m.FacultiesPageModule)
  },
  {
    path: 'departments',
    loadChildren: () => import('./departments/departments.module').then( m => m.DepartmentsPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'rads-lodge-res',
    loadChildren: () => import('./rads-lodge-res/rads-lodge-res.module').then( m => m.RadsLodgeResPageModule)
  },
  {
    path: 'engineering',
    loadChildren: () => import('./engineering/engineering.module').then( m => m.EngineeringPageModule)
  },
  {
    path: 'management',
    loadChildren: () => import('./management/management.module').then( m => m.ManagementPageModule)
  },
  {
    path: 'natural',
    loadChildren: () => import('./natural/natural.module').then( m => m.NaturalPageModule)
  },
  {
    path: 'chemical-engineering',
    loadChildren: () => import('./chemical-engineering/chemical-engineering.module').then( m => m.ChemicalEngineeringPageModule)
  },
  {
    path: 'civil-engineering',
    loadChildren: () => import('./civil-engineering/civil-engineering.module').then( m => m.CivilEngineeringPageModule)
  },
  {
    path: 'electrical-engineering',
    loadChildren: () => import('./electrical-engineering/electrical-engineering.module').then( m => m.ElectricalEngineeringPageModule)
  },
  {
    path: 'mechanical-engineering',
    loadChildren: () => import('./mechanical-engineering/mechanical-engineering.module').then( m => m.MechanicalEngineeringPageModule)
  },
  {
    path: 'building',
    loadChildren: () => import('./building/building.module').then( m => m.BuildingPageModule)
  },
  {
    path: 'src',
    loadChildren: () => import('./src/src.module').then( m => m.SrcPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login-or-guest',
    loadChildren: () => import('./login-or-guest/login-or-guest.module').then( m => m.LoginOrGuestPageModule)
  },
  {
    path: 'voice-my-concern',
    loadChildren: () => import('./voice-my-concern/voice-my-concern.module').then( m => m.VoiceMyConcernPageModule)
  },
  {
    path: 'src-admin',
    loadChildren: () => import('./src-admin/src-admin.module').then( m => m.SrcAdminPageModule)
  },
  {
    path: 'transport-admnin',
    loadChildren: () => import('./transport-admnin/transport-admnin.module').then( m => m.TransportAdmninPageModule)
  },
  {
    path: 'sport-admin',
    loadChildren: () => import('./sport-admin/sport-admin.module').then( m => m.SportAdminPageModule)
  },
  {
    path: 'src-profile',
    loadChildren: () => import('./src-profile/src-profile.module').then( m => m.SrcProfilePageModule)
  },
  {
    path: 'transport-profile',
    loadChildren: () => import('./transport-profile/transport-profile.module').then( m => m.TransportProfilePageModule)
  },
  {
    path: 'sport-profile',
    loadChildren: () => import('./sport-profile/sport-profile.module').then( m => m.SportProfilePageModule)
  },
  {
    path: 'src-create-post',
    loadChildren: () => import('./src-create-post/src-create-post.module').then( m => m.SrcCreatePostPageModule)
  },
  {
    path: 'transport-create-post',
    loadChildren: () => import('./transport-create-post/transport-create-post.module').then( m => m.TransportCreatePostPageModule)
  },
  {
    path: 'sport-create-posts',
    loadChildren: () => import('./sport-create-posts/sport-create-posts.module').then( m => m.SportCreatePostsPageModule)
  },
  {
    path: 'src-manage-posts',
    loadChildren: () => import('./src-manage-posts/src-manage-posts.module').then( m => m.SrcManagePostsPageModule)
  },
  {
    path: 'transport-manage-posts',
    loadChildren: () => import('./transport-manage-posts/transport-manage-posts.module').then( m => m.TransportManagePostsPageModule)
  },
  {
    path: 'sports-manage-posts',
    loadChildren: () => import('./sports-manage-posts/sports-manage-posts.module').then( m => m.SportsManagePostsPageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'inbox-notifications',
    loadChildren: () => import('./inbox-notifications/inbox-notifications.module').then( m => m.InboxNotificationsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'comments-modal',
    loadChildren: () => import('./comments-modal/comments-modal.module').then( m => m.CommentsModalPageModule)
  },
  {
    path: 'custom-table',
    loadChildren: () => import('./custom-table/custom-table.module').then( m => m.CustomTablePageModule)
  },
  {
    path: 'concern-modal',
    loadChildren: () => import('./concern-modal/concern-modal.module').then( m => m.ConcernModalPageModule)
  },  {
    path: 'student-messages-modal',
    loadChildren: () => import('./student-messages-modal/student-messages-modal.module').then( m => m.StudentMessagesModalPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
