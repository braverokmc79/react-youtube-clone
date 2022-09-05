const { createProxyMiddleware } = require('http-proxy-middleware');

//node 서버 포트번호에 맞게 /api 로 시작하는 url 은  포트번호를 5000번으로 변경처리 한다.
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};