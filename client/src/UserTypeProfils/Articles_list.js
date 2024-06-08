import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation, useNavigate,Outlet } from 'react-router-dom'
import { axiosWithToken } from '../axiosWithToken';


function Articles_list()
{
   const [articlesList,setArticleLists]=useState([]);

   let navigate=useNavigate();

   const getArticle=async()=>{
    try{
         let res=await axiosWithToken.get(`http://localhost:4000/user-api/articles`)

         console.log(res);

         setArticleLists(res.data.payload);
    }
    catch(err)
    {
      console.log("Error in fetching articles..",err)
    }
   }
  

   const readArticleById=(articleObj)=>{
     navigate(`/user/article/${articleObj.articleId}`,{state:articleObj});
   }
  
   useEffect(()=>{
     getArticle();
   },[]);




  return (
    <div>
      {/* Rendering articles */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {
          articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                {/* Article title */}
                <h5 className="card-title">{article.title}</h5>
                {/* Displaying a snippet of article content */}
                <p className="card-text">{article.content.substring(0, 80) + '....'}</p>
                {/* Button to read more */}
                <button className="custom-btn btn-4" onClick={() => readArticleById(article)}>
                  <span>Read More</span>
                </button>
              </div>
              {/* Displaying the last update date */}
              <div className="card-footer">
                <small className="text-body-secondary">Last updated on {article.dateOfModification}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Rendering nested routes */}
      <Outlet />
    </div>
  );
}


export default Articles_list
