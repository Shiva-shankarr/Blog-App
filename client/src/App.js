import {Navigate, Outlet, RouterProvider,createBrowserRouter} from 'react-router-dom'
import RootLayout from './RootLayout';
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'
import AdminProfile from './UserTypeProfils/Admin/AdminProfile';                                                               
import UserProfile from './UserTypeProfils/UserProfile';
import AuthorProfile from './UserTypeProfils/AuthorProfile';
import AddnewArcticle from './UserTypeProfils/AddnewArcticle';

//import Articles_list from './UserTypeProfils/Articles_list';

//import ArticleByAuthor from './UserTypeProfils/ArticleByAuthor';

//import Article from './UserTypeProfils/Article';

import ErrorPage from './components/ErrorPage';
import { Suspense, lazy } from 'react';

const Article=lazy(()=>import('./UserTypeProfils/Article'))
const Articles_list=lazy(()=>import('./UserTypeProfils/Articles_list'))
const ArticleByAuthor=lazy(()=>import('./UserTypeProfils/ArticleByAuthor') )



function App() {
  let router=createBrowserRouter(
    [
      {
        path:'',
        element:<RootLayout/>,
        errorElement:<ErrorPage/>,
        children:[
          {
            path:'',
            element:<Home/>
          },
          {
             path:'/admin',
             element:<AdminProfile/>
          },
          {
            path:'/signup',
            element:<Signup/>
          },
          {
            path:'/signin',
            element:<Signin/>
          },
    
          {
            path:'/user',
            element:<UserProfile/>,
            children:[
              {
                path:"articles",
                element:<Suspense fallback='Loading....'><Articles_list/></Suspense>
              },
              {
                path:'article/:articleId',
                element:<Suspense fallback='Loading....'><Article/></Suspense>
              }
            ]
          },
          {
            path:'/author',
            element:<AuthorProfile/>,
           children:[
                 {
                   path:'new-Article',
                   element:<AddnewArcticle/>
                 },
                 {
                   path:'articles-by-author/:author',
                   element:<Suspense fallback='Loading....'><ArticleByAuthor/></Suspense>
                },
                {
                   path:'article/:articleId',
                   element:<Suspense fallback='Loading....'><Article/></Suspense>
                },
                {
                  path:'',
                  element:<Navigate to='articles-by-author/:author'/>
                }
          ]
          },
        ]
      },
     
    ]
  )


  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App; 