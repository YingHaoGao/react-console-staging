import { lazy } from 'react'

export default [
  /**
   * 开发环境跳/login_admin重定向到/
   */
  process.env.NODE_ENV === 'development' && {
    path: '/login_admin',
    redirect: '/'
  },
  // {
  //   path: '/',
  //   redirect: '/dashboard'
  // },
  {
    path: '/',
    redirect: '/backlog'
  },
  {
    path: '/backlog',
    component: lazy(() => import('@/routes/Backlog'))
  },
  {
    path: '/projects',
    component: lazy(() => import('@/routes/Projects')),
    routes: [
      {
        path: '/project/:id',
        component: lazy(() => import('@/routes/ProjectInfo'))
      }
    ]
  },
  {
    path: '/budget/:id',
    component: lazy(() => import('@/routes/Budget'))
  },
  {
    path: '/logs',
    component: lazy(() => import('@/routes/Logs'))
  },
  {
    path: '/tasks',
    component: lazy(() => import('@/routes/Tasks')),
    routes: [
      {
        path: '/task/:id',
        component: lazy(() => import('@/routes/TaskInfo'))
      }
    ]
  },
  {
    path: '/apply',
    component: lazy(() => import('@/routes/Apply'))
  },
  {
    path: '/examine',
    component: lazy(() => import('@/routes/Examine'))
  },
  {
    path: '/delivery',
    component: lazy(() => import('@/routes/Delivery'))
  },
  {
    path: '*',
    component: lazy(() => import('@/routes/NotFound'))
  }
].filter(Boolean)
