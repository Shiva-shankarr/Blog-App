import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../axiosWithToken';
import { Outlet } from 'react-router-dom';
import '../Css/ArticleByAuthor.css'; // Import CSS file for styling

function ArticleByAuthor() {
  // State to hold the list of articles
  const [articlesList, setArticleList] = useState([]);

  // Get the current user from Redux store
  const { currentUser } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );

  // React Router navigate function
  let navigate = useNavigate();

  // Function to fetch articles by author
  const getArticle = async () => {
    try {
      // Fetch articles from the backend
      const res = await axiosWithToken.get(
        `http://localhost:4000/author-api/article/${currentUser.username}`
      );
      console.log(res);
      // Update articlesList state with fetched articles
      setArticleList(res.data.payload);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };


  const readArticleById=(articleObj)=>{
   navigate(`/author/article/${articleObj.articleId}`,{state:articleObj})
  }


  // useEffect hook to fetch articles when component mounts
  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div className='container px-3 mb-3'>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5 gx-3 mb-3">
        {
          articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100 article-card"> {/* Added custom class for styling */}
              <div className="card-body">
                <h5 className="card-title fw-bold">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "...."}
                </p>
                <button className="custom-btn btn-4 btn-success" onClick={()=>readArticleById(article)}> 
                  <span>Read More</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on {article.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default ArticleByAuthor;
