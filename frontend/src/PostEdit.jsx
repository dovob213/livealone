import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function PostEdit() {
    const { id } = useParams(); // URL에서 게시글 번호 가져오기
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://3.27.105.201:8080/api/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
            })
            .catch(() => {
                alert("글 정보를 불러오지 못했습니다.");
                navigate("/");
            });
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert("제목과 내용을 모두 입력해주세요!");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.put(`http://3.27.105.201:8080/api/posts/${id}`,
                { title: title, content: content },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("수정 완료! ✨");
            navigate(`/posts/${id}`);

        } catch (error) {
            console.error(error);
            alert("수정 실패.. (본인 글만 수정할 수 있습니다!)");
        }
    };

    return (
        <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>📝 글 수정하기</h2>
            <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ padding: "10px", fontSize: "16px" }}
                />

                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ padding: "10px", height: "200px", fontSize: "16px" }}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" style={{ flex: 1, padding: "10px", background: "#ffc107", color: "black", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                        수정 완료
                    </button>
                    <button type="button" onClick={() => navigate(-1)} style={{ flex: 1, padding: "10px", background: "#6c757d", color: "white", border: "none", cursor: "pointer" }}>
                        취소
                    </button>
                </div>

            </form>
        </div>
    );
}

export default PostEdit;