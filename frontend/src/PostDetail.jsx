import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("1. useEffect 시작! ID:", id);

        axios.get(`http://localhost:8080/api/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setPost(res.data))
            .catch(() => navigate("/"));

        console.log("2. 댓글 요청 보냄!");

        axios.get(`http://localhost:8080/api/comments/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                console.log("3. 성공! 데이터 받음:", res.data);
                setComments(res.data);
            })
            .catch(err => {
                console.error("3. 실패! 에러 발생:", err);
            });

    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            alert("삭제되었습니다!");
            navigate("/");
        } catch (error) {
            alert("본인 글만 삭제할 수 있습니다.");
        }
    };

    if (!post) return <div>로딩 중...</div>;

    return (
        <div style={{ padding: "50px", maxWidth: "600px", margin: "0 auto" }}>
            <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>⬅ 목록으로</button>

            {/* 게시글 영역 */}
            <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
                <h1>{post.title}</h1>
                <div style={{ color: "#888", marginBottom: "20px", fontSize: "14px" }}>
                    <span>작성자: {post.writer}</span> | <span>{post.createdDate}</span>
                </div>
                <hr style={{ opacity: 0.3 }} />
                <p style={{ minHeight: "150px", fontSize: "18px", lineHeight: "1.6" }}>
                    {post.content}
                </p>
                <div style={{ textAlign: "right" }}>
                    <button onClick={handleDelete} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>
                        삭제하기 🗑️
                    </button>
                </div>
            </div>

            {/* ★ 댓글 영역 (새로 추가) */}
            <div style={{ marginTop: "30px" }}>
                <h3>💬 댓글 ({comments.length}개)</h3>

                {comments.length === 0 ? (
                    <p style={{ color: "gray" }}>아직 댓글이 없습니다.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} style={{ background: "#000000", padding: "15px", borderRadius: "8px", marginBottom: "10px", border: "1px solid #eee" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                <strong style={{ fontSize: "14px" }}>{comment.writer}</strong>
                                <span style={{ fontSize: "12px", color: "gray" }}>{comment.createdDate}</span>
                            </div>
                            <p style={{ margin: 0 }}>{comment.content}</p>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default PostDetail;