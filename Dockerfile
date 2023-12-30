FROM alpine:latest
RUN apk add -v build-base
RUN apk add -v go 
RUN apk add -v ca-certificates
RUN apk add --no-cache \
    unzip \
    openssh
COPY ./pb /pb
WORKDIR /pb
RUN go mod init pocketbase && go mod tidy
RUN CGO_ENABLED=0 go build
EXPOSE 8080
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8080"]
