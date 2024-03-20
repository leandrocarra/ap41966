# EXPOR APLICAÇÃO NO NGINX
#FROM nginx:latest
#COPY ./dist/neoenergia-web /usr/share/nginx/html
#COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf


#FROM nginx:latest
ARG nexus
FROM $nexus/nginx:latest
WORKDIR /usr/share/nginx/html
RUN chmod -R 770  /etc/nginx/
COPY ./dist/neoenergia-web /usr/share/nginx/html
#COPY ./dist/neoenergia-web/src/index.html /usr/share/nginx/html/index.html


# Configure NGINX


RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx \
    && rm /etc/nginx/conf.d/default.conf \
    && sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

#USER 1001
EXPOSE 8080

#CMD ["nginx", "-g", "daemon off;"]
