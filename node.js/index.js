//node.js
//JS를 써서 DB에 연결해 서버로 요청을 보내는 기능 구현
//웹서버가 아님
//서버에서 JS가 동작하도록 도와주는 런타임 플렛폼
//npm 를 이용해 라이브러리 설치
//방대한 오픈소스 생태계를 구축
//리엑트 , 익스프레스, 코아 등  모두 npm에 등록

/*특징3개 
1.JS로 백엔드 서버 로직 개발가능
2.구글에서 개발한 js엔진을 쓰기 때문에 속도가 빠름(인터프린터 방식)
3.논 블로킹 방식 node.js의 모든 API는 비동적으로 작동하며 호출 후 다른 API를 바로 불러올 수 있다
*/ 


//node.js에서 모듈을 가져오는 방법 
//require(경로나 이름)
const http=require("http");

//http객체 안의 createServer함수를 사용해 서버를 만듦
const server = http.createServer((req,res) => {
    //req 요청값
    req.statusCode=200;
    //100번대: 정보응답
    //200번대: 성공응답
    //300번대: 리다이렉션 메시지 , 요청한 url이 변경됬을때
    //400번대: 클라이언트상의 오류 클라이언트에 오류가 있을 때
    //500번대: 서버 오류 응답 , 서버에 오류가 있을 때

    res.write('123');
    res.end('456');
});

const PORT = 3000;
//listen 함수로 서버를 연다
server.listen(PORT,()=>{
    console.log('port : ', PORT);
});


//node.js 코딩을 해볼 수 있는 곳 
//코드 샌드박스, glitch 등

//glitch 장점
//https 검증 되있는 웹 서버를 테스트로 사용해 볼 수 있다.
//node프로젝트 생성 버튼을 누르고
//server.js에 서버 로직을 작성한 후 바로 
//preview 버튼을 눌러서 위에 버튼은 바로 그 창에서 화면을 볼 수 있고
//테스트용 링크가 필요하면 preview 버튼 눌렀을때 preview in a new window 버튼을 누르면
//클라이언트 요청을 보내볼 웹서버 주소로 접속이 된다.


//node.js 버전관리
//nvm(node vode manager)

//nvm ls   nvm에 설치된 버전 확인