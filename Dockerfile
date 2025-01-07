﻿# BUILD STAGE
FROM eclipse-temurin:21-jdk-alpine AS build
ENV HOME=/usr/app
RUN mkdir -p $HOME
WORKDIR $HOME
ADD . $HOME
RUN sed -i 's/\r$//' mvnw
RUN --mount=type=cache,target=/root/.m2 \
    ./mvnw -f $HOME/pom.xml clean package -DskipTests

# PACKAGE
FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=/usr/app/target/*.jar
COPY --from=build $JAR_FILE /app/runner.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/runner.jar"]