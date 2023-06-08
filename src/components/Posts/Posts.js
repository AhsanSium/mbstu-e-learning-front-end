import Axios from 'axios';
import React, { Component } from 'react';
import ShowPost from './ShowPost/ShowPost';
import img1 from '../../../public/assets/img/blog/blog-1.jpg';
//import ShowUser from '../Users/ShowUsers/ShowUser';
import Spinner from '../../Containers/Spinner/Spinner';
import NavBar from '../NavBar';
import MobileMenu from '../MobileMenu';
import Footer from '../Footer';
import PostNav from './PostNav';

export class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            users: [],
            isloading: false
        }

    }

    componentDidMount() {
        this.setState(pre => ({
            isloading: true
        }))
        Promise.all([
            Axios.get('api/posts'),
            //Axios.get('/profile/profiles')
        ]).then(data => {
            this.setState(pre => ({
                isloading: false
            }))
            this.setState({ ...this.state.posts, posts: data[0].data.posts });
            //this.setState({ ...this.state.users, users: data[1].data.profile });
        })
            .catch(e => {
                this.setState(pre => ({
                    isloading: false
                }))
            })
    }

    render() {
        let isLoading
        if (this.state.isloading) {
            isLoading = <Spinner />
        }
        let fetchedposts
        let allUsers
        if (this.state.posts) {
            fetchedposts = this.state.posts.map((post, index) => (
                <ShowPost key={index} {...post} {...index} />
            ))
        }
        // if (this.state.users) {
        //     allUsers = this.state.users.map((user, index) => (
        //         <ShowUser key={index} {...user} {...index} />
        //     ))
        // }
        return (
            <div>
                <NavBar />
                <div className="container hero py-5">
                    <PostNav />
                    <div className="row">
                        <div className="col-md-8 col-xs-12">
                            <div className="row">
                                {fetchedposts}
                            </div>
                        </div>

                        {/* 
                        <div className="col-md-4 col-xs-12 pl-4">
                            <h3 className="mb-4"> Popular Writers</h3>
                            <hr></hr>
                            {allUsers}
                        </div> 
                        */}
                    </div>
                </div>

                <div className="container loading">
                    {isLoading}
                </div>

                <MobileMenu />

                <Footer />

            </div>
        )
    }
}

export default Posts
