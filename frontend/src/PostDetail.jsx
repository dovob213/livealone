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

    // API 기본 주소 (환경변수가 설정 안 되어 있을 경우를 대비해 직접 입력하거나 유지)
    //const API_BASE_URL = "http://localhost:8080";
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // 🌟 지갑 이름은 우리가 정한 'accessToken'입니다.
        const token = localStorage.getItem("accessToken");

        // 1. 게시글 상세 정보 가져오기
        axios.get(`${API_BASE_URL}/api/posts/${id}`, {
            headers: { Authorization: token ? `Bearer ${token}` : "" }
        })
            .then(res => {
                console.log("불러온 게시글 데이터:", res.data);
                setPost(res.data);
            })
            .catch((err) => {
                console.error("게시글 로딩 에러:", err);
                alert("글을 불러오지 못했습니다. 목록으로 돌아갑니다.");
                navigate("/board");
            });

        // 2. 댓글 목록 가져오기 (백엔드에 댓글 API가 있다면 실행)
        fetchComments();
    }, [id]);

    const fetchComments = () => {
        const token = localStorage.getItem("accessToken");
        axios.get(`${API_BASE_URL}/api/comments/${id}`, {
            headers: { Authorization: token ? `Bearer ${token}` : "" }
        })
            .then(res => setComments(res.data))
            .catch(err => console.log("댓글 로딩 실패:", err));
    }

    const submitComment = async () => {
        if (!commentContent) {
            alert("댓글 내용을 입력해주세요!");
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");
            await axios.post(`${API_BASE_URL}/api/comments/${id}`,
                { content: commentContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("댓글 등록 완료!");
            setCommentContent("");
            fetchComments(); // 댓글 목록 새로고침

        } catch (error) {
            console.error(error);
            alert("댓글 작성 실패.. (로그인 상태를 확인하세요!)");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`${API_BASE_URL}/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("삭제되었습니다!");
            navigate("/board");
        } catch (error) {
            console.error(error);
            alert("본인 글만 삭제할 수 있습니다.");
        }
    };

    if (!post) return <div style={{ padding: "50px", textAlign: "center" }}>로딩 중...</div>;

    return (
        <div style={{ padding: "50px", maxWidth: "600px", margin: "0 auto" }}>
            <button onClick={() => navigate("/board")} style={{ marginBottom: "20px", cursor: "pointer" }}>⬅ 목록으로</button>

            {/* 게시글 본문 구역 */}
            <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", backgroundColor: "#fff", color: "#333" }}>
                <h1>{post.title}</h1>
                <div style={{ color: "#888", marginBottom: "20px", fontSize: "14px" }}>
                    {/* 🌟 백엔드 필드명에 따라 post.nickname 또는 post.writer로 수정 필요 */}
                    <span>작성자: {post.nickname || post.writer}</span> | <span>{post.createdDate}</span>
                </div>
                <hr style={{ opacity: 0.3 }} />
                <p style={{ minHeight: "150px", fontSize: "18px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                    {post.content}
                </p>

                <div style={{ textAlign: "right", marginTop: "10px" }}>
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

            {/* 댓글 입력 구역 */}
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

            {/* 댓글 목록 구역 */}
            <div style={{ marginTop: "30px" }}>
                <h3 style={{ color: "#fff" }}>💬 댓글 ({comments ? comments.length : 0}개)</h3>

                {(!comments || comments.length === 0) ? (
                    <p style={{ color: "gray" }}>아직 댓글이 없습니다.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px", marginBottom: "10px", border: "1px solid #eee", color: "#333" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                <strong style={{ fontSize: "14px" }}>{comment.nickname || comment.writer}</strong>
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