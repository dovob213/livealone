import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Join() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const handleJoin = (e) => {
        e.preventDefault();

        const joinData = {
            email: email,
            password: password,
            nickname: nickname,
            role: "USER" // 백엔드 User 엔티티에 role이 필수라면 넣어주세요!
        };

        fetch('http://localhost:8080/api/users/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(joinData)
        })
            .then(response => {
                if (response.ok) {
                    alert("회원가입 성공! 이제 로그인해보세요.");
                    navigate('/login');
                } else {
                    alert("회원가입 실패 ㅠㅠ");
                }
            });
    };

    return (
        <div style={{ padding: "50px 20px", maxWidth: "400px", margin: "0 auto" }}>
            <h2>회원가입</h2>
            <form onSubmit={handleJoin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
                <button type="submit" style={{ padding: "10px", backgroundColor: "#ff9f43", color: "white", border: "none", cursor: "pointer" }}>가입하기</button>
            </form>
        </div>
    );
}