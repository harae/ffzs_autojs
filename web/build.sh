#!/usr/bin/env bash

# 应用于一键部署脚本 @deep

set -ex

if [ -z "$1" ]; then
    echo "请输入镜像TAG(第一个参数)"
    exit 0
fi

export IMAGE=video_brush_web:$1
echo "$IMAGE"
echo " ===========  下载依赖   =============== "
#yarn install

echo " ===========  构建应用   =============== "
yarn run build

# echo " ===========  构建镜像   ==============="
docker rmi -f $IMAGE
docker build -f ./Dockerfile -t $IMAGE .

docker save -o video_brush_web.tar $IMAGE
