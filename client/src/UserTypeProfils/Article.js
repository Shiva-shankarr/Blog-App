import { useLocation } from "react-router-dom"; // Importing useLocation hook from react-router-dom
import { Fragment, useEffect, useState } from "react"; // Importing necessary modules from React
import { axiosWithToken } from '.././axiosWithToken'; // Importing axiosWithToken instance for authorized requests
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux for accessing Redux store
import { useForm } from "react-hook-form"; // Importing useForm hook from react-hook-form for form handling

import axios from "axios"; // Importing axios for making HTTP requests

import { MdDelete } from "react-icons/md"; // Importing MdDelete icon from react-icons/md
import { FcCalendar } from "react-icons/fc"; // Importing FcCalendar icon from react-icons/fc

import { FcComments } from "react-icons/fc"; // Importing FcComments icon from react-icons/fc
import { FcPortraitMode } from "react-icons/fc"; // Importing FcPortraitMode icon from react-icons/fc

import { BiCommentAdd } from "react-icons/bi"; // Importing BiCommentAdd icon from react-icons/bi
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom
import { MdRestore } from "react-icons/md"; // Importing MdRestore icon from react-icons/md

import { FcClock } from "react-icons/fc"; // Importing FcClock icon from react-icons/fc
import { CiEdit } from "react-icons/ci"; // Importing CiEdit icon from react-icons/ci



function Article() {
   
   const {state}=useLocation();

   let {currentUser}=useSelector(
    (state)=>state.userAuthoruserAuthorLoginReducer
   );

   let {register,handleSubmit}=useForm();

   let [comment,setComment]=useState('');

   let navigate=useNavigate();

   let [articleEditStatus,setArticleEditStatus]=useState(false);

   let [currentArticle,setCurrentArticle]=useState(state);


   const deleteArticle=async()=>{
    let art={...currentArticle};
    delete art._id;
    let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,art)
    if(res.data.message==="article deleted"){
      setCurrentArticle({...currentArticle,status:res.data.payload})
    }
   }


   const restoreArticle=async()=>{
     let art={...currentArticle};
     delete art._id;
     let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,art)
     if(res.data.message==='article restored')
     {
      setCurrentArticle({...currentArticle,status:res.data.payload})
     }
     
   }

   const writeComment=async(commentObj)=>{

   commentObj.username=currentUser.username;
   let res=await axiosWithToken.post(
    `http://localhost:4000/user-api/comment/${state.articleId}`,commentObj
   )
   if(res.data.message==="Comment posted...")
   {
    setComment(res.data.message);
   }
}


   //enable edit state
  const enableEditState = () => {
    setArticleEditStatus(true);
  };


  //disable edit state
  const saveModifiedArticle = async (editedArticle) => {
    let modifiedArticle = { ...state, ...editedArticle };
    //change date of modification
    modifiedArticle.dateOfModification = new Date();
    //remove _id
    delete modifiedArticle._id;

    //make http put req to save modified article in db
    let res = await axiosWithToken.put(
      "http://localhost:4000/author-api/article",
      modifiedArticle
    );
    if (res.data.message === "Articel modified....") {
      setArticleEditStatus(false);
      navigate(`/author/article/${modifiedArticle.articleId}`, {
        state: res.data.article,
      });
    }
  };



   function ISOtoUTC(iso)
   {
    let date=new Date(iso).getUTCDate();
    let day=new Date(iso).getUTCDay();
    let year=new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
   }



  
    return (
        <div className=" w-75 mx-auto mt-2">
          {articleEditStatus === false ? ( // Render article details if not in edit mode
            <> {/* Using Fragment to group multiple elements */}
              <div className="d-flex justify-content-between">
                <div> {/* Display article title and creation/modification dates */}
                  <p className="display-3 fw-bold me-4">{state.title}</p> {/* Article title */}
                  <span className="py-3">
                    <small className=" text-secondary me-4">
                      <FcCalendar className="fs-4" />
                      Created on: {ISOtoUTC(state.dateOfCreation)} {/* Creation date */}
                    </small>
                    <small className=" text-secondary">
                      <FcClock className="fs-4" />
                      Modified on: {ISOtoUTC(state.dateOfModification)} {/* Modification date */}
                    </small>
                  </span>
                </div>


                <div> {/* Render edit and delete/restore buttons for author */}
                  {currentUser.userType === "author" && (
                    <>
                      <button
                        className="me-2 btn btn-warning "
                        onClick={enableEditState} // Click handler for enabling edit state
                      >
                        <CiEdit className="fs-2" />
                      </button>
                      {currentArticle.status === true ? ( // Render delete or restore button based on article status
                        <button
                          className="me-2 btn btn-danger"
                          onClick={deleteArticle} // Click handler for deleting article
                        >
                          <MdDelete className="fs-2" />
                        </button>
                      ) : (
                        <button
                          className="me-2 btn btn-info"
                          onClick={restoreArticle} // Click handler for restoring article
                        >
                          <MdRestore className="fs-2" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <p className="lead mt-3" style={{ whiteSpace: "pre-line" }}>
                {state.content} {/* Display article content */}
              </p>


              <div> {/* Display existing comments and form for adding new comments */}
                <div className="comments my-4">
                  {state.comments.length === 0 ? ( // Display message if no comments exist
                    <p className="fs-4 fw-bold">No comments till now...</p>
                  ) : (
                    state.comments.map((commentObj, ind) => { // Map through comments and display each
                      return (
                        <div key={ind} className="bg-light  p-3">
                          <p
                            className="fs-4"
                            style={{ color: "dodgerblue", textTransform: "capitalize" }}
                          >
                            <FcPortraitMode className="fs-2 me-2" />
                            {commentObj.username} {/* Display commenter's username */}
                          </p>
                          <p
                            style={{ fontFamily: "fantasy", color: "lightseagreen" }}
                            className="ps-4"
                          >
                            <FcComments className="me-2" />
                            {commentObj.comment} {/* Display comment */}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
                <h1>{comment}</h1> {/* Display comment confirmation message */}


                {/* Form for users to write a comment */}
                {currentUser.userType === "user" && (
                  <form onSubmit={handleSubmit(writeComment)}>
                    <input
                      type="text"
                      {...register("comment")}
                      className="form-control mb-4 "
                      placeholder="Write comment here...."
                    />
                    <button type="submit" className="btn btn-success">
                      Add a Comment <BiCommentAdd className="fs-3" />
                    </button>
                  </form>
                )}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit(saveModifiedArticle)}> {/* Render edit form if in edit mode */}
              <div className="mb-4">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  {...register("title")}
                  defaultValue={state.title} 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="form-label">
                  Select a category
                </label>
                <select
                  {...register("category")}
                  id="category"
                  className="form-select"
                  defaultValue={state.category}
                >
                   <option value='' defaultValue>Select</option> 
                                    <option value='Technology'>Technology</option>
                                    <option value='Health & Wellness'>Health & Wellness</option>
                                    <option value='Food & Cooking'>Food & Cooking</option>
                                    <option value='Lifestyle'>Lifestyle</option>
                                    <option value='Business & Entrepreneurship'>Business & Entrepreneurship</option>
                                    <option value='Arts & Culture'>Arts & Culture</option>
                                    <option value='Sports & Fitness'>Sports & Fitness</option>
                                    <option value='Parenting'>Parenting</option>
                                    <option value='About Shiva'>About Shiva</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  {...register("content")}
                  className="form-control"
                  id="content"
                  rows="10"
                  defaultValue={state.content} 
                ></textarea>
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-success">
                  Save {/* Save button for submitting edited article */}
                </button>
              </div>
            </form>
          )}
        </div>
      );
      
}

export default Article;
