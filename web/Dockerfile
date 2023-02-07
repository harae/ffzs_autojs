FROM nginx:1.18

# alpine 默认没有 bash  sh 运行脚本会有问题
# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && apk add bash
ENV LANG C.UTF-8
ENV LANGUAGE C.UTF-8
ENV LC_ALL C.UTF-8

WORKDIR /usr/share/nginx/html
RUN pwd

COPY dist .

#COPY entrypoint.sh .

#COPY .env .

COPY nginx.default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
RUN pwd

RUN chmod 777 -R .
RUN chown -R nginx:nginx  /usr/share/nginx/html/

EXPOSE 80
#ENTRYPOINT ["/usr/share/nginx/html/entrypoint.sh"]





