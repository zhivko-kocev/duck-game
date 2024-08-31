FROM openjdk:21

WORKDIR /app

COPY . .

RUN chmod +x ./mvnw

RUN ./mvnw package

RUN cp target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]

