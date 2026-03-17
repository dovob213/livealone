import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
    const navigate = useNavigate();

    // 1. userId 대신 email로 상태 변경!
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(async (response) => {
                // 🌟 1. 백엔드가 준 날것의 글자를 먼저 읽습니다.
                const rawText = await response.text();
                console.log("백엔드가 준 진짜 데이터:", rawText);

                if (response.ok) {
                    return rawText; // 성공하면 이 텍스트(토큰)를 다음 .then으로 넘김
                } else {
                    throw new Error('로그인 실패: ' + rawText);
                }
            })
            .then(token => {
                // 🌟 2. 여기서 token은 위에서 받은 rawText 그 자체입니다.
                if (token) {
                    localStorage.setItem('accessToken', token);
                    console.log("로컬 스토리지 저장 완료!");
                    alert("로그인 성공! 🎉");
                    //navigate('/board');
                    window.location.href = '/board';
                }
            })
            .catch(error => {
                console.error("로그인 에러 상세:", error);
                alert("로그인 중 에러가 발생했습니다.");
            });
    };

    return (
        <div style={{ padding: "100px 20px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h2>로그인</h2>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "30px" }}>
                <input
                    type="email" placeholder="이메일 (예: test@test.com)" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                    style={{ padding: "15px", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <input
                    type="password" placeholder="비밀번호" value={password}
                    onChange={(e) => setPassword(e.target.value)} required
                    style={{ padding: "15px", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <button type="submit" style={{ padding: "15px", backgroundColor: "#ff9f43", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>
                    로그인
                </button>
            </form>
        </div>
    );
}