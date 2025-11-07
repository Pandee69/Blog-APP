import { useState, useEffect } from "react";
import BlogCard from "./Components/BlogCard";
import BlogForm from "./Components/BlogForm";
import "./index.css";

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) setBlogs(JSON.parse(stored));

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const addBlog = (blog) => {
    if (editingBlog) {
      setBlogs(
        blogs.map((b) =>
          b.id === editingBlog.id ? { ...blog, id: editingBlog.id } : b
        )
      );
      setEditingBlog(null);
    } else {
      setBlogs([...blogs, { ...blog, id: Date.now() }]);
    }
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  const editBlog = (blog) => {
    setEditingBlog(blog);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📝 My Blog App</h1>
        <p>Share your thoughts and stories with style</p>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <main className="main-container">
        <BlogForm
          addBlog={addBlog}
          editingBlog={editingBlog}
          cancelEdit={() => setEditingBlog(null)}
        />

        {blogs.length === 0 ? (
          <p className="empty">No blog posts yet. Start writing something amazing!</p>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onDelete={deleteBlog}
                onEdit={editBlog}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


