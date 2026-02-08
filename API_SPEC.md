
```markdown
# LiveAlone API 명세서

## 기본 정보
- **Base URL:** `http://localhost:8080`
- **Content-Type:** `application/json`

---

## 1. 회원 (User) & 인증 (Auth)

### 1-1. 회원가입
새로운 사용자를 등록합니다. (비밀번호는 DB에 암호화되어 저장)

- **URL:** `/api/users/join`
- **Method:** `POST`
- **Auth:** 불필요 (Public)

#### **📩 Request Body**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "nickname": "자취왕",
  "university": "서울대학교"
}

```

#### **✅ Response (200 OK)**

* **Body:** (String)

```text
회원가입 성공! 생성된 ID: 1

```

#### **❌ Response (500 Internal Server Error)**

* **Body:**

```json
{
  "message": "이미 존재하는 이메일입니다."
}

```

---

### 1-2. 로그인

이메일과 비밀번호로 인증하고, JWT Access Token을 발급받는다.

* **URL:** `/api/users/login`
* **Method:** `POST`
* **Auth:** 불필요 (Public)

#### **📩 Request Body**

```json
{
  "email": "user@example.com",
  "password": "password123"
}

```

#### **✅ Response (200 OK)**

* **Body:** (String - JWT Token)

```text
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwidXNlcklkIjoxLCJyb2xlIjoiVVNFUiIsImlhdCI6MT...

```

---

### 1-3. 토큰 테스트 (인증 확인용)

발급받은 토큰이 유효한지 테스트한다.

* **URL:** `/api/users/test`
* **Method:** `GET`
* **Auth:** **필수 (Bearer Token)**

#### ** Header**

| Key | Value | 설명 |
| --- | --- | --- |
| `Authorization` | `Bearer {Access_Token}` | `Bearer` 뒤에 공백 한 칸 필수 |

#### ** Response (200 OK)**

* **Body:**

```text
토큰 인증 성공! 당신은 유령회원이 아닙니다!

```

#### **❌ Response (403 Forbidden)**

* **Cause:** 토큰이 없거나, 만료되었거나, 위조됨.
* **Body:** (없음 또는 403 에러 페이지)
