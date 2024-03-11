import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/Authslice';
import appwriteService from '../Appwrite/config';
import { Container, PostCard } from '../components';
import AllPosts from '../Pages/AllPost'
function Home() {
    const [posts, setPosts] = useState([]);
    const isAuthenticated = useSelector(state => state.auth.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            appwriteService.getPost()
                .then((response) => {
                    if (response && response.documents) {
                        setPosts(response.documents);
                    } else {
                        console.error('No posts found');
                    }
                })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching posts:', error);
                });
        }
    }, [isAuthenticated,AllPosts]);

    const handleLogin = async (data) => {
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login({ userData }));
                }
            }
        } catch (error) {
            // Handle error
            console.error('Login error:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                First login then read
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    } else {
        return (
         <>
     
   <AllPosts />
         </>
       
        );
    }
}

export default Home;
