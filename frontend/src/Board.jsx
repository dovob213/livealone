import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function Board() {
    const navigate = useNavigate();

    // 🌟 상태 관리: 게시글 목록, 검색 조건, 검색어
    const [posts, setPosts] = useState([]);
    const [searchType, setSearchType] = useState('title'); // 기본값: 제목 검색
    const [keyword, setKeyword] = useState('');

    // 처음 화면 켜질 때 전체 게시글 불러오기
    useEffect(() => {
        fetch(`${API_URL}/api/posts`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error("데이터를 불러오는데 실패했습니다:", error));
    }, []);

    // 🌟 검색 버튼을 눌렀을 때 실행되는 함수
    const handleSearch = () => {
        if (!keyword.trim()) {
            alert("검색어를 입력해주세요!");
            return;
        }

        // 검색 API는 토큰이 필요하므로 지갑에서 꺼내줍니다
        const token = localStorage.getItem('accessToken');

        fetch(`${API_URL}/api/posts/search?type=${searchType}&keyword=${keyword}`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        })
            .then(response => {
                if (!response.ok) throw new Error("검색 실패");
                return response.json();
            })
            .then(data => {
                setPosts(data); // 백엔드가 준 검색 결과로 게시글 목록을 갈아끼움!
            })
            .catch(error => {
                console.error("검색 중 에러 발생:", error);
                alert("검색 결과를 불러오지 못했습니다.");
            });
    };

    // 🌟 엔터키를 쳐도 검색되도록 하는 센스!
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #333", paddingBottom: "15px", marginBottom: "20px" }}>
                <h2 style={{ margin: 0, color: "#333" }}>자취생 커뮤니티</h2>
                <Link to="/write">
                    <button style={{ padding: "10px 20px", backgroundColor: "#ff9f43", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
                        글쓰기
                    </button>
                </Link>
            </div>

            {/* 🌟 새로 추가된 검색창 UI 구역 */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" }}>
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                >
                    <option value="title">제목</option>
                    <option value="titleContent">제목+내용</option>
                    <option value="writer">작성자</option>
                </select>

                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ width: "300px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />

                <button
                    onClick={handleSearch}
                    style={{ padding: "10px 20px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    검색
                </button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                <thead>
                <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #dee2e6" }}>
                    <th style={{ padding: "15px", width: "10%" }}>번호</th>
                    <th style={{ padding: "15px", width: "50%" }}>제목</th>
                    <th style={{ padding: "15px", width: "15%" }}>작성자</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                        <td style={{ padding: "15px", color: "#666" }}>{post.id}</td>
                        <td style={{ padding: "15px", textAlign: "left" }}>
                            <Link to={`/post/${post.id}`} style={{ textDecoration: "none", color: "#2e86de", fontWeight: "500" }}>
                                {post.title}
                            </Link>
                        </td>
                        {/* 백엔드 필드명에 맞춰서 post.nickname 또는 post.writer로 수정 필요 */}
                        <td style={{ padding: "15px", color: "#666" }}>{post.nickname || post.writer || "익명"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}