import { useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.webp";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg"; 
import img6 from "../assets/img6.jpg"; 
import img7 from "../assets/img7.jpg"; 
import img8 from "../assets/img8.jpg"; 

export default function BlogCard({ blog, onDelete, onEdit }) {
  const [likes, setLikes] = useState(blog.likes || 0);
  const [comments, setComments] = useState(blog.comments || []);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([...comments, commentText]);
    setCommentText("");
  };

  return (
    <div className="blog-card">
      <div className="blog-image-wrapper">
        <img
          src={blog.image ? blog.image : placeholderImg}
          alt={blog.title}
          className="blog-image"
        />
      </div>

      <h3>{blog.title}</h3>
      <p>{blog.content}</p>

      
      <div className="card-buttons" style={{ marginBottom: "0.5rem" }}>
        <button className="btn edit" onClick={() => onEdit(blog)}>
          Edit
        </button>
        <button className="btn delete" onClick={() => onDelete(blog.id)}>
          Delete
        </button>
        <button className="btn primary" onClick={handleLike}>
          👍 Like ({likes})
        </button>
      </div>

      
      <form onSubmit={handleAddComment} style={{ marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Add a comment..."
          className="input"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit" className="btn secondary" style={{ marginTop: "0.3rem" }}>
          Comment
        </button>
      </form>

    
      {comments.length > 0 && (
        <div className="comments">
          <h4 style={{ marginBottom: "0.3rem" }}>Comments:</h4>
          <ul style={{ listStyle: "disc", paddingLeft: "1.2rem" }}>
            {comments.map((cmt, idx) => (
              <li key={idx} style={{ marginBottom: "0.2rem" }}>
                {cmt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
