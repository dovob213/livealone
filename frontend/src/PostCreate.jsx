import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostCreate() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // 새로고침 막기

        if (!title || !content) {
            alert("제목과 내용을 모두 입력해주세요!");
            return;
        }

        try {
            const token = localStorage.getItem("token"); // 토큰 꺼내기

            // 백엔드로 글쓰기 요청
            await axios.post("http://3.27.105.201:8080/api/posts",
                {
                    title: title,
                    content: content
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            alert("글 작성 완료! 🎉");
            navigate("/"); // 성공하면 홈(목록)으로 이동

        } catch (error) {
            console.error(error);
            alert("글 작성 실패.. (로그인은 하셨나요?)");
        }
    };

    return (
        <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>✏️ 글쓰기</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                {/* 제목 입력 */}
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ padding: "10px", fontSize: "16px" }}
                />

                {/* 내용 입력 */}
                <textarea
                    placeholder="내용을 자유롭게 적어보세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ padding: "10px", height: "200px", fontSize: "16px" }}
                />

                {/* 버튼들 */}
                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" style={{ flex: 1, padding: "10px", background: "#007BFF", color: "white", border: "none", cursor: "pointer" }}>
                        등록하기
                    </button>
                    <button type="button" onClick={() => navigate("/")} style={{ flex: 1, padding: "10px", background: "#6c757d", color: "white", border: "none", cursor: "pointer" }}>
                        취소
                    </button>
                </div>

            </form>
        </div>
    );
}

export default PostCreate;