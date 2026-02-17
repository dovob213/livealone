import { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'


import PostDetail from './PostDetail'  // 상세 페이지 (댓글 기능 있는 파일)
import PostCreate from './PostCreate'  // 글쓰기 페이지
import Signup from './Signup';
import PostEdit from './PostEdit';
import Intro from './Intro';
import Board from './Board';

function Home() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState(localStorage.getItem("token"))

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password });
            localStorage.setItem("token", res.data);
            setToken(res.data);
        } catch (err) { alert("로그인 실패"); }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}> SDDG </h1>

            {!token ? (
                <div style={{ textAlign: "center" }}>
                    <form onSubmit={handleLogin} style={{display:"flex", gap:"5px", justifyContent:"center", marginBottom: "10px"}}>
                        <input placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
                        <button type="submit">로그인</button>
                    </form>
                    <Link to="/signup" style={{ color: "#007BFF", textDecoration: "underline", fontSize: "14px" }}>
                        아직 계정이 없으신가요? 회원가입하기
                    </Link>
                </div>
            ) : (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <h2>🎉 환영합니다! 사단법인 SDDG의 메인 화면입니다.</h2>
                    <p style={{ color: "gray", marginBottom: "30px" }}>성공적으로 로그인되셨습니다.</p>

                    <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                        {/* 게시판으로 가는 단축 버튼 */}
                        <Link to="/board">
                            <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", background: "#007BFF", color: "white", border: "none", borderRadius: "5px" }}>
                                📋 게시판 구경가기
                            </button>
                        </Link>
                        <button
                            onClick={() => { localStorage.removeItem("token"); setToken(null); }}
                            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", background: "#ff4d4f", color: "white", border: "none", borderRadius: "5px" }}>
                            로그아웃
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

function App() {
    return (
        <div>
            <nav style={{
                display: "flex",
                gap: "20px",
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderBottom: "1px solid #ddd",
                fontWeight: "bold"
            }}>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>🏠 홈</Link>
                <Link to="/intro" style={{ textDecoration: "none", color: "black" }}>👋 소개</Link>
                <Link to="/board" style={{ textDecoration: "none", color: "black" }}>📋 게시판</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/intro" element={<Intro />} />
                <Route path="/board" element={<Board />} />

                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/write" element={<PostCreate />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/edit/:id" element={<PostEdit />} />
            </Routes>
        </div>
    )
}

export default App