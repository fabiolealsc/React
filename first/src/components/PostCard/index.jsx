import './style.css';

export const PostCard = ({post}) =>  (
    <div className='post'>
        <img src={post.cover} alt={post.title}></img>
        <div  className='post-content'>
        <h2>{post.title} {post.id}</h2>
        <p>{post.body}</p>
        </div>
    </div> 
);
