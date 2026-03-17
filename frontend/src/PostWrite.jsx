import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function PostWrite() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const savedToken = localStorage.getItem('accessToken');

        // 🌟 전송할 데이터 객체 생성 (이름을 정확히 정의!)
        const postData = {
            title: title, // 만약 상태 변수명이 다르면 그 이름으로 고치세요!
            content: content
        };

        fetch(`${API_URL}/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${savedToken}`
            },
            body: JSON.stringify(postData), // 🌟 정의된 postData를 전송!
        })
            .then(response => {
                if (response.ok) {
                    alert("게시글 등록 성공! 드디어 해내셨습니다!");
                    navigate('/board');
                } else {
                    alert("등록 실패 (상태코드: " + response.status + ")");
                }
            })
            .catch(error => console.error("에러 발생:", error));
    };

    return (
        <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <h2 style={{ borderBottom: "2px solid #333", paddingBottom: "15px", color: "#333" }}>꿀팁 작성하기</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                <input
                    type="text" placeholder="제목을 입력해주세요" value={title}
                    onChange={(e) => setTitle(e.target.value)} required
                    style={{ padding: "15px", fontSize: "1.1rem", border: "1px solid #ccc", borderRadius: "8px" }}
                />
                <textarea
                    placeholder="내용을 자유롭게 적어주세요!" value={content}
                    onChange={(e) => setContent(e.target.value)} required
                    style={{ padding: "15px", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "8px", minHeight: "300px", resize: "vertical" }}
                />
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    <button type="button" onClick={() => navigate('/board')} style={{ padding: "12px 25px", backgroundColor: "#f1f3f5", color: "#495057", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>취소</button>
                    <button type="submit" style={{ padding: "12px 25px", backgroundColor: "#ff9f43", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>등록하기</button>
                </div>
            </form>
        </div>
    );
}