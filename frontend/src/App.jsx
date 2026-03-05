import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Board from './Board';
import PostWrite from './PostWrite';
import Login from './Login.jsx';
import Join from './Join';
import PostDetail from "./PostDetail.jsx";

// import PostEdit from './PostEdit';
// import NotFound from './NotFound';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token); // 토큰이 있으면 true로 설정
    }, []);

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken");
            setIsLoggedIn(false); // 상태 변경
            alert("로그아웃 되었습니다.");
            window.location.href = "/";
        }
    };

    return (
        <BrowserRouter>
            {/* 상단 네비게이션 바 */}
            <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 40px", backgroundColor: "#ffffff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 100 }}>
                <Link to="/" style={{ textDecoration: "none", color: "#ff9f43", fontSize: "1.5rem", fontWeight: "900" }}>
                    자취생 커뮤니티
                </Link>
                <div style={{ display: "flex", gap: "20px", fontWeight: "bold" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "#333" }}>홈</Link>
                    <Link to="/board" style={{ textDecoration: "none", color: "#333" }}>커뮤니티</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/write" style={{ color: "#333" }}>글쓰기</Link>
                            <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: "16px" }}>
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: "#333" }}>로그인</Link>
                            <Link to="/join" style={{ color: "#333" }}>회원가입</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* 메인 화면 (페이지 전환 영역) */}
            <div style={{ minHeight: "80vh", backgroundColor: "#fafafa" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {<Route path="/board" element={<Board />} />}
                    <Route path="/write" element={<PostWrite />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    {/* <Route path="/edit/:id" element={<PostEdit />} /> */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </div>


            {/* 하단 푸터 */}
            <footer style={{ padding: "30px", backgroundColor: "#2d3436", color: "#b2bec3", textAlign: "center", fontSize: "0.85rem", lineHeight: "1.6" }}>
                <p style={{ margin: 0 }}> 1인 가구 정보 공유 커뮤니티</p>
                <p style={{ margin: 0 }}>깃허브: github.com/dovob213/LiveAlone</p>
                <p style={{ marginTop: "10px", color: "#636e72" }}>© 2026 Community. All rights reserved.</p>
            </footer>
        </BrowserRouter>
    );
}