import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!email || !password || !nickname) {
            alert("모든 칸을 채워주세요!");
            return;
        }

        try {
            // 백엔드의 회원가입 API로 데이터 전송!
            await axios.post(`${import.meta.env.VITE_API_URL}/api/users/join`, {
                email: email,
                password: password,
                nickname: nickname
            });

            alert("🎉 회원가입 성공! 이제 로그인해주세요.");
            navigate("/"); // 완료되면 메인(로그인) 화면으로 튕겨줌

        } catch (error) {
            console.error(error);
            alert("회원가입 실패.. (이미 있는 이메일이거나 서버 에러)");
        }
    };

    return (
        <div style={{ padding: "50px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h2>커뮤니티 가입하기</h2>
            <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>

                <input
                    type="email"
                    placeholder="이메일 (예: test@test.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                <input
                    type="text"
                    placeholder="닉네임 (예: 미래전략본부실장)"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                <button type="submit" style={{ padding: "12px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
                    가입하기
                </button>

                <button type="button" onClick={() => navigate("/")} style={{ padding: "12px", background: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>
                    취소
                </button>

            </form>
        </div>
    );
}

export default Signup;