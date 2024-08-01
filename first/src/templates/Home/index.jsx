import './style.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button/Button';


export class Home extends Component{
  
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPages: 2
  };

  async componentDidMount(){
    const { page, postsPerPages } = this.state;
    const postAndPhotos = await loadPosts();
    this.setState({ 
      posts : postAndPhotos.slice(page, postsPerPages),
      allPosts: postAndPhotos 
    });
  }

  componentDidUpdate(){

  }

  componentWillUnmount(){
  
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPages,
      allPosts,
      posts
    } = this.state;
    
    const nextPage = page + postsPerPages;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPages);

    posts.push(...nextPosts);

    this.setState({posts, page : nextPage});

  }

  render(){
    const { posts, page, postsPerPages, allPosts } = this.state;
    const noMorePost = page + postsPerPages >= allPosts.length;
    return (
      <section className='container'>
        <input type="search" /><br/><br/>
        <Posts posts={posts}/>
        <div className="button-container">
          <Button
            text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePost}
          />
        </div>
      </section>
    );
  }
}


export default Home;
