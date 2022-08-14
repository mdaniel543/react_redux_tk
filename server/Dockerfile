FROM golang:1.18 AS build

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o /server

FROM debian:latest

WORKDIR /

COPY --from=build /server /usr/local/bin/server

EXPOSE 8080

ENTRYPOINT [ "/usr/local/bin/server" ]