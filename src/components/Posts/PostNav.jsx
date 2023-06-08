import React from 'react'
import { Link } from 'react-router-dom';

const PostNav = () => {
    return (
        <div className='py-5'>
            <ul className="nav nav-tabs justify-content-end border border-bottom-2">
                <li class="nav-item">
                    <Link className="nav-link " to="/" >
                        Home
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/blog" >
                        Blog
                    </Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/blog/create-post" >
                        Create Post
                    </Link>
                </li>

            </ul>
        </div>
    )
}

export default PostNav;