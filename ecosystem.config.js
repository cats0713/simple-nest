module.exports = {
  apps: [
    {
      name: 'nest-app',            // PM2에서 표시될 앱 이름
      script: 'dist/main.js',      // 실행할 파일
      watch: true,
      ignore_watch: ['node_modules', 'logs', 'dist'],
      instances: 1,                // 클러스터 모드 쓰려면 0 또는 원하는 숫자
      env: {
        NODE_ENV: 'production',
        PORT: 4000
      }
    }
  ]
};