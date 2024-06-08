import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AddNewArticle() {
    // Initialize form state using react-hook-form
    const { register, handleSubmit } = useForm();

    // Retrieve current user information from Redux store
    const { currentUser } = useSelector(state => state.userAuthoruserAuthorLoginReducer);

    // Initialize state for error message
    const [err, setErr] = useState("");

    // Initialize navigation hook for redirecting after article creation
    const navigate = useNavigate();

    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // Create an instance of Axios with authorization header
    const axiosWithToken = axios.create({
        headers: { Authorization: `Bearer ${token}` }
    });

    // Function to handle form submission and create a new article
    const onSubmit = async (article) => {
        try {
            // Set date of creation and modification for the article
            article.dateOfCreation = new Date();
            article.dateOfModification = new Date();
            article.articleId = Date.now();
            article.username = currentUser.username;
            article.comments = [];
            article.status = true;

            // Make POST request to create a new article
            const res = await axiosWithToken.post("http://localhost:4000/author-api/article", article);

            // Check if article creation was successful
            if (res.data.message === 'New article created') {
                // Redirect to the author's articles page
                navigate(`/author/articles-by-author/${currentUser.username}`);
            } else {
                // Set error message if article creation failed
                setErr(res.data.message);
            }
        } catch (error) {
            // Set error message if an error occurred during the request
            setErr(error.message);
        }
    };

    return (
        <div className='container'>
        <div className='row justify-content-center mt-5'>
            <div className='col-lg-8 col-md-8 col-sm-10'>
                <div className='card shadow' style={{ color: "#818A75", background: "#447879" }}>
                    <div className='card-title text-center border-bottom'>
                        <h2 className='p-3 fw-bold fs-2'>Write an Article</h2>
                    </div>
                    <div className='card-body'>
                        <form className='mb-4' onSubmit={handleSubmit(onSubmit)}>
                            <div className='m-4'>
                                <label className='form-label fw-bold text-dark' htmlFor='title'>Title :</label>
                                <input type='text' className='form-control' id='title' {...register("title")} />
                            </div>
                            <div className='mb-4'>
                                <label className='form-label fw-bold text-dark' htmlFor='category'>Select a Category :</label>
                                <select {...register("category")} id='category' className='form-select'>
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
                            <div className='mb-4'>
                                <label className='form-label fw-bold text-dark' htmlFor='content'>Content :</label>
                                <textarea {...register("content")} className='form-control' id="content" rows='15'></textarea>
                            </div>
                            <div className='text-end'>
                                <button type='submit' className='btn btn-info'>Post</button>
                            </div>
                        </form>
                        {/* Render error message if there's an error */}
                        {err && <p className="text-danger">{err}</p>}
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default AddNewArticle;
