import { createRouter, createWebHistory } from 'vue-router'

import Today from '../pages/Today.vue'
import OneWeek from '../pages/OneWeek.vue'
import Diary from '../pages/Diary.vue'
import DiaryView from '../pages/DiaryView.vue'
import DiaryEditor from '../pages/DiaryEditor.vue'
import Inspiration from '../pages/Inspiration.vue'
import InsView from '../pages/InsView.vue'
import InsEditor from '../pages/InsEditor.vue'
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
  },
  {
    name:'DiaryView',
    path:'/diaryView/:diaryId',
    component: DiaryView
  },
  {
    name:'DiaryEditor',
    path:'/diaryEditor/:diaryId',
    component: DiaryEditor
  },
  {
    name:'Inspiration',
    path:'/inspiration',
    component: Inspiration,
  },
  {
    name:'InsView',
    path:'/insView',
    component: InsView,
  },
  {
    name:'InsEditor',
    path:'/insEditor',
    component: InsEditor,
  },
  {
    name:'TagAbout',
    path:'/tagAbout/:tagId/:tagName/:color',
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
