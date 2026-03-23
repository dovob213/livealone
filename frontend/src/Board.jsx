import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function Board() {
    const navigate = useNavigate();

    // 🌟 상태 관리
    const [posts, setPosts] = useState([]);
    const [searchType, setSearchType] = useState('title');
    const [keyword, setKeyword] = useState(''); // 기존 keyword로 통일!

    const [suggestions, setSuggestions] = useState([]); // 자동완성 결과 리스트
    const [showSuggestions, setShowSuggestions] = useState(false); // 자동완성 창 표시 여부

    // 🌟 검색어가 바뀔 때마다 실행되는 마법 (디바운스 적용)
    useEffect(() => {
        if (!keyword.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                // axios 대신 기존에 쓰시던 fetch로 통일하고, API_URL을 적용했습니다!
                const response = await fetch(`${API_URL}/api/posts/autocomplete?keyword=${keyword}`);
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                    setShowSuggestions(true);
                }
            } catch (error) {
                console.error("자동완성 에러:", error);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [keyword]); // searchKeyword 대신 keyword 사용

    // 처음 화면 켜질 때 전체 게시글 불러오기
    useEffect(() => {
        fetch(`${API_URL}/api/posts`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error("데이터를 불러오는데 실패했습니다:", error));
    }, []);

    // 검색 버튼을 눌렀을 때 실행되는 함수
    const handleSearch = () => {
        if (!keyword.trim()) {
            alert("검색어를 입력해주세요!");
            return;
        }

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
                setPosts(data);
                setShowSuggestions(false); // 🌟 검색을 누르면 자동완성 창은 닫아줍니다!
            })
            .catch(error => {
                console.error("검색 중 에러 발생:", error);
                alert("검색 결과를 불러오지 못했습니다.");
            });
    };

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

            {/* 🌟 중복을 제거하고 하나로 합친 깔끔한 검색창 구역 */}
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

                <div style={{ position: "relative", display: "inline-block" }}>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => {
                            if (suggestions.length > 0) setShowSuggestions(true);
                        }}
                        style={{ width: "300px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />

                    {/* 🌟 자동완성 드롭다운 창 */}
                    {showSuggestions && suggestions.length > 0 && (
                        <ul style={{
                            position: "absolute",
                            top: "100%", // input 바로 아래
                            left: "0",
                            width: "320px", // input 창 너비(300px + padding)와 맞춤
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            listStyle: "none",
                            padding: "0",
                            margin: "0",
                            zIndex: 1000,
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                            borderRadius: "0 0 5px 5px"
                        }}>
                            {suggestions.map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                        padding: "10px",
                                        borderBottom: index === suggestions.length - 1 ? "none" : "1px solid #eee", // 마지막 줄은 선 제거
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        textAlign: "left"
                                    }}
                                    onMouseDown={() => {
                                        setKeyword(item);
                                        setShowSuggestions(false);
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = "#f8f9fa"}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button
                    onClick={handleSearch}
                    style={{ padding: "10px 20px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    검색
                </button>
            </div>

            {/* 🌟 게시글 목록 테이블 */}
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                <thead>
                <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #dee2e6" }}>
                    <th style={{ padding: "15px", width: "10%" , color: "#333"}}>번호</th>
                    <th style={{ padding: "15px", width: "50%" , color: "#333"}}>제목</th>
                    <th style={{ padding: "15px", width: "15%" , color: "#333"}}>작성자</th>
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
                        <td style={{ padding: "15px", color: "#666" }}>{post.nickname || post.writer || "익명"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}