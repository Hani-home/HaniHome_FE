// 회원가입 시 전달할 데이터
export interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  nickname: string;
  gender: string;
  region: string;
  profileimg: string;
  agreed: number[];
}

// 소셜 로그인 코드
export interface LoginPayload {
  code: string;
}

export interface LoginResponse {
  newUser: boolean;
}

// 유저 정보 수정
export interface UpdateUserPayload {}
