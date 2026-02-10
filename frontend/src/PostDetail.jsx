import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // URL 파라미터 가져오기, 이동하기
import axios from "axios";

function PostDetail() {
    const { id } = useParams(); // URL에서 '1' 같은 숫자를 꺼내오기
    const navigate = useNavigate(); // 페이지 이동 도와주는 함수
    const [post, setPost] = useState(null);

    // 화면 켜지면 백엔드에서 글 가져오기
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                alert("글을 불러오지 못했습니다.");
                navigate("/"); // 에러 나면 목록으로 쫓아냄
            }
        };
        fetchPost();
    }, [id]);

    // 삭제 버튼 눌렀을 때
    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return; // 확인 창

        try {
            const token = localStorage.getItem("token"); // 저장된 토큰 꺼내기
            await axios.delete(`http://localhost:8080/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("삭제되었습니다!");
            navigate("/"); // 삭제 후 목록으로 이동
        } catch (error) {
            alert("삭제 실패! (작성자만 삭제할 수 있어요)");
        }
    };

    if (!post) return <div>로딩 중...</div>;

    return (
        <div style={{ padding: "50px", maxWidth: "600px", margin: "0 auto" }}>
            <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>⬅ 목록으로</button>

            <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
                <h1>{post.title}</h1>
                <div style={{ color: "#888", marginBottom: "20px", fontSize: "14px" }}>
                    <span>작성자: {post.writer}</span> | <span>{post.createdDate}</span>
                </div>
                <hr style={{ opacity: 0.3 }} />
                <p style={{ minHeight: "200px", fontSize: "18px", lineHeight: "1.6" }}>
                    {post.content}
                </p>

                <div style={{ textAlign: "right" }}>
                    <button
                        onClick={handleDelete}
                        style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
                    >
                        삭제하기 🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;