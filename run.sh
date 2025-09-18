#!/bin/bash

# 이전 서버 프로세스 종료
echo "이전 서버 프로세스 종료 중..."
pkill -f yumyum-crm-admin || true

# Maven 클린 및 빌드
echo "프로젝트 빌드 중..."
mvn clean install -DskipTests

# 서버 시작
echo "서버 시작 중..."
nohup java -jar target/yumyum-crm-admin-1.0-SNAPSHOT.jar --spring.profiles.active=dev > server.log 2>&1 &

# 서버 시작 확인
echo "서버 시작 확인 중..."
sleep 5
if pgrep -f yumyum-crm-admin > /dev/null
then
    echo "서버가 성공적으로 시작되었습니다."
    echo "로그 확인: tail -f server.log"
    echo "서버 접속: http://localhost:8080"
else
    echo "서버 시작 실패. 로그를 확인해주세요."
    tail -n 20 server.log
fi
