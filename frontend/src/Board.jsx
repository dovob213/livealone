import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Board() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token"); // 로그인 상태 확인용

    useEffect(() => {
        if (token) {
            axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => setPosts(res.data)).catch(() => console.log("불러오기 에러"));
        }
    }, [token]);

    if (!token) {
        return (
            <div style={{ padding: "50px", textAlign: "center" }}>
                <h2>🔒 로그인이 필요한 페이지입니다.</h2>
                <Link to="/">
                    <button style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}>홈으로 가서 로그인하기</button>
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom:"20px", borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
                <h2 style={{ margin: 0 }}>📋 자유 게시판</h2>
                <Link to="/write">
                    <button style={{ padding: "10px 15px", background: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                        ✏️ 새 글 쓰기
                    </button>
                </Link>
            </div>

            {posts.length === 0 ? (
                <p style={{ textAlign: "center", color: "gray" }}>등록된 게시글이 없습니다. 첫 글을 작성해 보세요!</p>
            ) : (
                posts.map(post => (
                    <div key={post.id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                        <Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "black" }}>
                            <h3 style={{ margin: "0 0 10px 0" }}>{post.title}</h3>
                        </Link>
                        <p style={{ margin: 0, color: "gray", fontSize: "14px" }}>작성자: {post.writer}</p>
                    </div>
                ))
            )}
        </div>
    );
}