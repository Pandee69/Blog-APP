
import { useState, useEffect } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.webp";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg"; 
import img7 from "../assets/img7.jpg"; 
import img8 from "../assets/img8.jpg"; 

export default function BlogForm({ addBlog, editingBlog, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title);
      setContent(editingBlog.content);
      setImage(editingBlog.image || "");
    } else {
      setTitle("");
      setContent("");
      setImage("");
    }
  }, [editingBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addBlog({ title, content, image });
    setTitle("");
    setContent("");
    setImage("");
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h2>{editingBlog ? "Edit Blog Post" : "Create a New Blog Post"}</h2>

      <input
        type="text"
        placeholder="Title"
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your content here..."
        className="textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="image-gallery">
        <p style={{ marginBottom: "0.5rem", fontWeight: "500", color: "#555" }}>
          Selected picture:
        </p>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Blog ${idx + 1}`}
            className={`thumbnail ${image === img ? "selected" : ""}`}
            onClick={() => setImage(img)}
          />
        ))}
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn primary">
          {editingBlog ? "Update Post" : "Add Post"}
        </button>
        {editingBlog && (
          <button type="button" onClick={cancelEdit} className="btn secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
