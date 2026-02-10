import { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom'

function Home() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [posts, setPosts] = useState([])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/login", { email, password });
            const receivedToken = response.data;

            console.log("============ 토큰은 요기에 ============");
            console.log(receivedToken);
            console.log("==================================");

            localStorage.setItem("token", receivedToken);
            setToken(receivedToken);
        } catch (error) {
            alert("로그인 실패!");
        }
    }

    // 목록 불러오기
    useEffect(() => {
        if (token) {
            axios.get("http://localhost:8080/api/posts", {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => setPosts(res.data))
                .catch(() => setToken(null));
        }
    }, [token]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>🏠 자취생 커뮤니티</h1>
            {!token ? (
                <form onSubmit={handleLogin}>
                    <input placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit">로그인</button>
                </form>
            ) : (
                <div>
                    <button onClick={() => { localStorage.removeItem("token"); setToken(null); }}>로그아웃</button>
                    <h2>📋 글 목록</h2>
                    {posts.map(post => (
                        <div key={post.id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "10px" }}>
                            <Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link>
                            <p>{post.writer}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`http://localhost:8080/api/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setPost(res.data))
            .catch((err) => {
                console.error(err);
                alert("글을 불러오지 못했습니다. (로그인이 풀렸거나, 서버 에러)");
                navigate("/");
            });
    }, [id]);

    const handleDelete = async () => {
        if(!window.confirm("진짜 삭제할까요?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            alert("삭제 성공!");
            navigate("/");
        } catch(e) {
            alert("삭제 실패! (본인 글만 삭제 가능)");
        }
    }

    if (!post) return <div>로딩중...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate("/")}>⬅ 뒤로가기</button>

            <div style={{border: "1px solid #ccc", padding: "20px", marginTop: "20px"}}>
                <h1>{post.title}</h1>
                <p style={{color: "gray"}}>작성자: {post.writer} | 작성일: {post.createdDate}</p>
                <hr />
                <p style={{minHeight: "100px"}}>{post.content}</p>

                <button onClick={handleDelete} style={{background: "red", color: "white", border:"none", padding:"10px"}}>
                    삭제하기 🗑️
                </button>
            </div>
        </div>
    )
}

// 3. 메인 앱
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
    )
}

export default App