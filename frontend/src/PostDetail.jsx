import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // 상태 변수들
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        // 게시글
        axios.get(`http://localhost:8080/api/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setPost(res.data))
            .catch(() => {
                alert("글을 불러오지 못했습니다.");
                navigate("/");
            });

        // 댓글
        fetchComments();
    }, [id]);

    const fetchComments = () => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:8080/api/comments/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setComments(res.data))
            .catch(err => console.log(err));
    }

    const submitComment = async () => {
        if (!commentContent) {
            alert("댓글 내용을 입력해주세요!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post(`http://localhost:8080/api/comments/${id}`,
                { content: commentContent }, // 백엔드 DTO랑 이름(content) 맞춰야 함
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("댓글 등록 완료!");
            setCommentContent("");
            fetchComments();

        } catch (error) {
            console.error(error);
            alert("댓글 작성 실패.. (로그인 했나요?)");
        }
    };

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

            {}
            <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
                <h1>{post.title}</h1>
                <div style={{ color: "#888", marginBottom: "20px", fontSize: "14px" }}>
                    <span>작성자: {post.writer}</span> | <span>{post.createdDate}</span>
                </div>
                <hr style={{ opacity: 0.3 }} />
                <p style={{ minHeight: "150px", fontSize: "18px", lineHeight: "1.6" }}>
                    {post.content}
                </p>
                <div style={{ textAlign: "right", marginTop: "10px" }}>
                    {/* ★★★ 새로 추가된 수정 버튼 ★★★ */}
                    <button
                        onClick={() => navigate(`/edit/${id}`)}
                        style={{ backgroundColor: "#ffc107", color: "black", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}
                    >
                        수정하기 ✏️
                    </button>

                    <button
                        onClick={handleDelete}
                        style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
                    >
                        삭제하기 🗑️
                    </button>
                </div>
            </div>

            {}
            <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                    <input
                        type="text"
                        placeholder="댓글을 남겨보세요..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                    <button
                        onClick={submitComment}
                        style={{ padding: "10px 20px", background: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    >
                        등록
                    </button>
                </div>
            </div>

            {}
            <div style={{ marginTop: "30px" }}>
                <h3>💬 댓글 ({comments ? comments.length : 0}개)</h3>

                {(!comments || comments.length === 0) ? (
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