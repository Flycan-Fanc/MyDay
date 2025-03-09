import { createRouter, createWebHistory } from 'vue-router'

import Today from '../pages/Today.vue'
import OneWeek from '../pages/OneWeek.vue'
import Diary from '../pages/Diary.vue'
import Inspiration from '../pages/Inspiration.vue'
import TagBasedContentView from "../pages/TagBasedContentView.vue";
import ErrorPage from "../pages/ErrorPage.vue";

const routes = [
  {
    path:'/',
    redirect:'/today'
  },
  {
    name:'Today',
    path:'/today',
    component: Today,
  },
  {
    name:'OneWeek',
    path:'/oneWeek',
    component: OneWeek,
  },
  {
    name:'Diary',
    path:'/diary',
    component: Diary,
    children:[
      {
        name:'DiaryView',
        path:'diaryView',
        component: () => import('../pages/DiaryView.vue'),
      },
      {
        name:'DiaryEditor',
        path:'diaryEditor',
        component: () => import('../pages/DiaryEditor.vue'),
      },
    ]
  },
  {
    name:'Inspiration',
    path:'/inspiration',
    component: Inspiration,
    children:[
      {
        name:'InsView',
        path:'insView',
        component: () => import('../pages/InsView.vue'),
      },
      {
        name:'InsEditor',
        path:'insEditor',
        component: () => import('../pages/InsEditor.vue'),
      },
    ],
  },
  {
    name:'TagAbout',
    path:'/tagAbout',
    component: TagBasedContentView,
  },
  {
    name:'Error',
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }
]

const router = createRouter({
  // history: createWebHistory(),
  history:createWebHistory(),
  routes,
})

export default router;
