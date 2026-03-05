import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "sans-serif" }}>
            {/* 히어로 배너 섹션 */}
            <div style={{ backgroundColor: "#ff9f43", color: "white", padding: "50px 30px", borderRadius: "15px", textAlign: "center", marginBottom: "40px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <h1 style={{ fontSize: "2.5rem", margin: "0 0 15px 0" }}>자취생을 위한 완벽한 공간</h1>
                <p style={{ fontSize: "1.2rem", margin: 0, opacity: 0.9 }}>
                    자취 요리부터 방 꾸미기, 생활 꿀팁까지! 혼자서도 잘 사는 법을 공유해보세요.
                </p>
                <Link to="/board">
                    <button style={{ marginTop: "25px", padding: "12px 25px", fontSize: "1rem", fontWeight: "bold", color: "#ff9f43", backgroundColor: "white", border: "none", borderRadius: "25px", cursor: "pointer", transition: "0.2s" }}>
                        커뮤니티 입장하기
                    </button>
                </Link>
            </div>

            {/* 주요 카테고리 섹션 */}
            <h2 style={{ color: "#333", borderBottom: "2px solid #f0f0f0", paddingBottom: "10px", marginBottom: "20px" }}>오늘의 인기 테마</h2>
            <div style={{ display: "flex", gap: "20px", justifyContent: "space-between", flexWrap: "wrap" }}>

                {/* 카드 1 */}
                <div style={{ flex: "1", minWidth: "250px", padding: "20px", border: "1px solid #e0e0e0", borderRadius: "10px", backgroundColor: "#fff" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#2e86de" }}>자취생 레시피</h3>
                    <p style={{ color: "#666", fontSize: "0.95rem" }}>배달 음식은 이제 그만! 전자레인지 하나로 끝내는 초간단 5분 컷 요리법을 공유합니다.</p>
                </div>

                {/* 카드 2 */}
                <div style={{ flex: "1", minWidth: "250px", padding: "20px", border: "1px solid #e0e0e0", borderRadius: "10px", backgroundColor: "#fff" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#10ac84" }}>생활 꿀팁</h3>
                    <p style={{ color: "#666", fontSize: "0.95rem" }}>벌레 퇴치법, 세탁기 청소, 보일러 아끼는 법 등 자취 9단들의 피와 땀이 섞인 노하우!</p>
                </div>

                {/* 카드 3 */}
                <div style={{ flex: "1", minWidth: "250px", padding: "20px", border: "1px solid #e0e0e0", borderRadius: "10px", backgroundColor: "#fff" }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#ee5253" }}>랜선 집들이</h3>
                    <p style={{ color: "#666", fontSize: "0.95rem" }}>원룸도 호텔처럼! 인테리어 자랑 대회.</p>
                </div>

            </div>
        </div>
    );
}