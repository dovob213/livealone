import { useState, useEffect } from 'react'; // useState, useEffect 추가!
import { Link, useNavigate } from 'react-router-dom';

export default function Board() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            })
            .catch(error => {
                console.error("데이터를 불러오는데 실패했습니다:", error);
            });
    }, []);

    return (
        <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #333", paddingBottom: "15px", marginBottom: "20px" }}>
                <h2 style={{ margin: 0, color: "#333" }}>자취생 커뮤니티</h2>
                <Link to="/write">
                    <button style={{ padding: "10px 20px", backgroundColor: "#ff9f43", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
                        글쓰기
                    </button>
                </Link>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                <thead>
                <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #dee2e6" }}>
                    <th style={{ padding: "15px", width: "10%" }}>번호</th>
                    <th style={{ padding: "15px", width: "50%" }}>제목</th>
                    <th style={{ padding: "15px", width: "15%" }}>작성자</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td style={{ padding: "15px", color: "#666" }}>{post.id}</td>
                        <td style={{ padding: "15px", textAlign: "left" }}>
                            <Link to={`/post/${post.id}`} style={{ textDecoration: "none", color: "#2e86de", fontWeight: "500" }}>
                                {post.title}
                            </Link>
                        </td>
                        {/* DB 테이블(Entity)에 맞춰서 author나 content 등을 알맞게 적어주세요 */}
                        <td style={{ padding: "15px", color: "#666" }}>익명</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}