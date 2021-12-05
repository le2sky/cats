import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//JWT => json web token
// json 형식을 통해 사용자 정보를 저장하는 방식
// header, payload, signature로 이루어짐

// hedaer => base64 인코딩 토큰의 타입과 알고리즘
// payload => base64 인코딩 데이터 (실제 값)
// signature => hedaer/payload를 조합하고 비밀키로 서명한 후, base64로 인코딩
// JWT Guard -> JWT Strategy -> secret key를 가지고 디코딩

//Auth Guard는 Startegy 를 자동을 실행해준다.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
