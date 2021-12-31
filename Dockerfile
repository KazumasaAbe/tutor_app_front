FROM node:16.13.1-alpine
# ↑　互換性の関係で変更する可能性あります。

ARG WORKDIR
ARG CONTAINER_PORT
# 追加
ARG API_URL

ENV HOME=/${WORKDIR} \
  LANG=C.UTF-8 \
  TZ=Asia/Tokyo \
  HOST=0.0.0.0 \
  # 追加
  API_URL=${API_URL}

WORKDIR ${HOME}

EXPOSE ${CONTAINER_PORT}
