import { useState } from 'react'
import axios from 'axios'

function App() {
    // 상태 변수들 (화면 바꾸는 데이터)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState(null) // 토큰 저장소
    const [posts, setPosts] = useState([])   // 게시글 목록 저장소

    // 로그인 함수
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/login", {
                email: email,
                password: password
            });

            // 성공하면 토큰 저장하고 알림
            const receivedToken = response.data;
            setToken(receivedToken);
            alert("로그인 성공! 게시글을 불러옵니다.");

            // 로그인 성공하자마자 바로 게시글 불러오기 실행
            fetchPosts(receivedToken);

        } catch (error) {
            console.error("로그인 에러:", error);
            alert("로그인 실패..;; 아이디/비번을 확인하세요.");
        }
    }

    // 게시글 목록 불러오는 함수 (GET)
    const fetchPosts = async (authToken) => {
        try {
            const response = await axios.get("http://localhost:8080/api/posts", {
                headers: {
                    // ★ 헤더에 토큰을 실어서 보냄
                    Authorization: `Bearer ${authToken}`
                }
            });

            console.log("게시글 목록:", response.data);
            setPosts(response.data); // 받아온 데이터를 상태에 저장 (화면 갱신)

        } catch (error) {
            console.error("게시글 로딩 에러:", error);
            alert("게시글을 불러오는데 실패했습니다.");
        }
    }

    // 화면 그리기
    return (
        <div style={{ padding: "50px", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <h1 style={{ textAlign: "center" }}>🏠 자취생 커뮤니티</h1>

            {/* 토큰이 없으면 로그인 화면을 보여주기 */}
            {!token ? (
                <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                    <h3 style={{ textAlign: "center" }}>로그인 ㄱㄱ</h3>
                    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <input
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: "12px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: "12px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                        <button type="submit" style={{ padding: "12px", fontSize: "16px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                            로그인 & 게시글 보기
                        </button>
                    </form>
                </div>
            ) : (
                /* 토큰이 있으면(로그인 성공하면) 게시글 목록을 보여줌 */
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h2>📋 게시글 목록</h2>
                        <button onClick={() => setToken(null)} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                            로그아웃
                        </button>
                    </div>

                    {/* 게시글 리스트 반복 출력 */}
                    {posts.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#888" }}>게시글이 없습니다. (Talend로 하나 써보세요!)</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} style={{ border: "1px solid #eee", padding: "15px", marginBottom: "10px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                                <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{post.title}</h3>
                                <p style={{ margin: "0 0 10px 0", color: "#666" }}>{post.content}</p>
                                <div style={{ fontSize: "12px", color: "#999", display: "flex", justifyContent: "space-between" }}>
                                    <span>✍️ 작성자: {post.writer}</span>
                                    <span>🕒 {post.createdDate}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default App