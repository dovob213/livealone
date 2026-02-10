import { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'


import PostDetail from './PostDetail'  // 상세 페이지 (댓글 기능 있는 파일)
import PostCreate from './PostCreate'  // 글쓰기 페이지


function Home() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [posts, setPosts] = useState([])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/users/login", { email, password });
            localStorage.setItem("token", res.data);
            setToken(res.data);
        } catch (err) { alert("로그인 실패"); }
    }

    useEffect(() => {
        if (token) {
            axios.get("http://localhost:8080/api/posts", {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => setPosts(res.data)).catch(() => setToken(null));
        }
    }, [token]);

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>🏠 자취생 커뮤니티</h1>

            {!token ? (
                <form onSubmit={handleLogin} style={{display:"flex", gap:"5px", justifyContent:"center"}}>
                    <input placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit">로그인</button>
                </form>
            ) : (
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom:"20px" }}>
                        {/* 글쓰기 버튼 */}
                        <Link to="/write">
                            <button style={{ padding: "10px", background: "green", color: "white" }}>✏️ 새 글 쓰기</button>
                        </Link>
                        <button onClick={() => { localStorage.removeItem("token"); setToken(null); }}>로그아웃</button>
                    </div>

                    <h2>📋 글 목록</h2>
                    {posts.map(post => (
                        <div key={post.id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "15px" }}>
                            <Link to={`/posts/${post.id}`}>
                                <h3>{post.title}</h3>
                            </Link>
                            <p>{post.writer}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            {}
            <Route path="/posts/:id" element={<PostDetail />} />

            <Route path="/write" element={<PostCreate />} />
        </Routes>
    )
}

export default App