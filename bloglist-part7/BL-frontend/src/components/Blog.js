import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { Button, BlogContainer } from '../styled/styled'

const Blog = ({ blog, handleBlogLike }) => {
  const [viewAll, setViewAll] = useState(false)
  const [removed, setRemoved] = useState('')

  const blogStyle = {
    display: removed,
  }

  // If blog.likes is undefined set it to zero for the component
  const blogLikes = blog.likes ? blog.likes : 0

  const likeBlog = async () => {
    const blogObject = {
      user: blog.user.id,
      likes: blogLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    // Pass the updated blog to the prop function
    await handleBlogLike(blog.id, blogObject)
    // Rerender blog component with like change
  }

  const deleteBlog = async () => {
    const windowText = `Remove blog ${blog.title} by ${blog.author}?`

    if (window.confirm(windowText)) {
      await blogService.deleteBlog(blog.id)
      setRemoved('none')
    }
  }

  const displayToggle = { display: viewAll ? '' : 'none' }

  const toggleAll = () => {
    setViewAll(!viewAll)
  }

  return (
    <BlogContainer>
      <div style={blogStyle}>
        <div className="blog">
          <p id="info-title-author">
            {blog.title} - {blog.author}
          </p>
          <Button onClick={toggleAll}>view</Button>
          <div style={displayToggle} className="extraInfo">
            <p id="info-url">{blog.url}</p>
            <p id="info-likes">likes {blogLikes}</p>
            <Button id="like-button" onClick={likeBlog}>
              like
            </Button>
            <p id="info-user-name">{blog.user.name}</p>
            <Button id="remove-button" onClick={deleteBlog}>
              remove
            </Button>
          </div>
        </div>
      </div>
    </BlogContainer>
  )
}

Blog.propTypes = {
  handleBlogLike: PropTypes.func.isRequired,
}

export default Blog
