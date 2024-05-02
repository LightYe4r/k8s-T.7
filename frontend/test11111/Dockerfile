# 기본 이미지로 Python 설정
FROM python:3.8-slim

# 작업 디렉토리 설정
WORKDIR /app

# Git 설치
RUN apt-get update && \
    apt-get install -y git

# Git 리포지토리에서 소스 코드 클론
RUN git clone https://github.com/LightYe4r/k8s.T.7/frontend/test11111.git

# 필요한 Python 패키지 설치
RUN pip install --no-cache-dir -r qna-backend/requirements.txt

# 환경변수 설정 (필요한 경우)
ENV ENV MONGO_PORT=27017 \
    MONGO_DB_NAME=team4qna \
    MONGO_COLLECTION_NAME=qna\
    MONGO_IP=172.21.0.1

#포트번호
EXPOSE 8000

# 컨테이너가 시작될 때 실행될 명령어
CMD ["python", "qna-backend/manage.py", "runserver", "0.0.0.0:8000"]
