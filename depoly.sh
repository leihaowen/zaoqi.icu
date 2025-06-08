#!/bin/bash

set -e

# 进入脚本所在目录
cd "$(dirname "$0")"

echo "拉取最新代码..."
git pull

echo "使用 docker compose 构建并启动服务..."
docker compose up -d --build

echo "部署完成，访问 http://服务器IP"