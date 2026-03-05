// import { Link } from 'react-router-dom';
//
// export default function Intro() {
//     return (
//         <div style={{ padding: "60px 20px", maxWidth: "900px", margin: "0 auto", fontFamily: "'Noto Sans KR', sans-serif", color: "#333" }}>
//
//             <div style={{ textAlign: "center", marginBottom: "80px" }}>
//                 <h1 style={{ fontSize: "3rem", fontWeight: "900", color: "#2c3e50", letterSpacing: "-1px" }}>
//                     회원 여러분의 방문을 <br/>진심으로 환영합니다.
//                 </h1>
//                 <p style={{ fontSize: "1.3rem", color: "#7f8c8d", marginTop: "20px" }}>
//                     <span style={{ color: "#007BFF", fontWeight: "bold" }}>사단법인 SDDG</span>는 끊임없는 혁신과 도전으로,<br/>
//                     새로운 패러다임을 제시합니다.
//                 </p>
//             </div>
//
//             <div style={{ display: "flex", alignItems: "center", backgroundColor: "#f1f3f5", padding: "40px", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", marginBottom: "60px" }}>
//                 <div style={{ flex: "0 0 40%", marginRight: "40px" }}>
//                     <img
//                         src={captain}
//                         alt="회장"
//                         style={{ width: "100%", height: "450px", objectFit: "cover", borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
//                     />
//                 </div>
//                 {/* 텍스트 영역 (오른쪽) */}
//                 <div style={{ flex: 1 }}>
//                     <h3 style={{ fontSize: "2rem", marginBottom: "10px", color: "#2c3e50" }}>회장</h3>
//                     <p style={{ fontSize: "1.1rem", color: "#007BFF", fontWeight: "bold", marginBottom: "30px" }}>(재임기간: 2025.12 ~ )</p>
//                     <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "#555" }}>
//                         "<br/><br/>
//                         .<br/><br/>
//                         "
//                     </p>
//                 </div>
//             </div>
//
//             <div style={{ position: "relative", padding: "60px 40px", borderRadius: "20px", overflow: "hidden", marginBottom: "60px", color: "white", textAlign: "center" }}>
//                 <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
//                     <img src={SDDGs} alt="SDDG" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4)" }} />
//                 </div>
//
//                 <h2 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>2030 글로벌 비전</h2>
//                 <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "50px" }}>"Make Buyeo Great Again"</p>
//
//                 <div style={{ display: "flex", justifyContent: "space-around", gap: "30px" }}>
//                     <div style={{ flex: 1, padding: "20px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px", backdropFilter: "blur(5px)" }}>
//                         <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>핵심 역량</h3>
//                         <p>메타에 능동적으로 대응하는<br/>피파 실력</p>
//                     </div>
//                     <div style={{ flex: 1, padding: "20px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px", backdropFilter: "blur(5px)" }}>
//                         <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>연혁</h3>
//                         <p>2025.12 - 설립<br/>26.01.01 - 제1차 정기회의<br/>26.02.01 - 비상대책위원회 소집</p>
//                     </div>
//                 </div>
//             </div>
//
//             <div style={{ textAlign: "center", padding: "50px", backgroundColor: "#e9ecef", borderRadius: "20px" }}>
//                 <h2 style={{ color: "#2c3e50", marginBottom: "20px", fontSize: "2rem" }}>환영합니다</h2>
//                 <p style={{ marginBottom: "30px", color: "#7f8c8d" }}>SDDG</p>
//                 <Link to="/Board">
//                     <button style={{ padding: "15px 40px", fontSize: "1.2rem", fontWeight: "bold", color: "white", backgroundColor: "#007BFF", border: "none", borderRadius: "50px", cursor: "pointer", transition: "0.3s", boxShadow: "0 5px 15px rgba(0,123,255,0.3)" }}>
//                         입장하기
//                     </button>
//                 </Link>
//             </div>
//
//         </div>
//     );
// }