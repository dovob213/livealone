import { useState } from 'react'
import axios from 'axios'

function App() {
    // 사용자가 입력한 이메일과 비번을 저장
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // 로그인 버튼 눌렀을 때 실행
    const handleLogin = async (e) => {
        e.preventDefault(); // 화면 새로고침 방지 (이거 없으면 입력한 거 다 날아감!)

        try {
            // 백엔드(8080)로 로그인 요청
            const response = await axios.post("http://localhost:8080/api/users/login", {
                email: email,
                password: password
            });

            // 성공하면
            console.log("=============== 로그인 성공! ===============");
            console.log("받은 토큰:", response.data); // 여기에 그 긴 토큰이 찍힘!
            console.log("===========================================");
            alert("로그인 성공! F12 눌러서 콘솔창 확인해보세요!");

        } catch (error) {
            console.error("에러 발생:", error);
            alert("로그인 실패.. 아이디/비번이 틀렸거나 서버가 꺼져있어요.");
        }
    }

    // 화면에 그려질 HTML (JSX)
    return (
        <div style={{ padding: "50px", textAlign: "center" }}>
            <h1>🔐 자취생 로그인</h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "0 auto" }}>

                <input
                    type="email"
                    placeholder="이메일 (user@example.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: "10px", fontSize: "16px" }}
                />

                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: "10px", fontSize: "16px" }}
                />

                <button type="submit" style={{ padding: "10px", fontSize: "16px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
                    로그인 하기
                </button>

            </form>
        </div>
    )
}

export default App