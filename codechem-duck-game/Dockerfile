# Use the official OpenJDK image as a parent image
FROM openjdk:21

# Set the working directory in the container
WORKDIR /app

# Copy everything from the project directory to the container
COPY . .

# Give execution permissions to the Maven wrapper
RUN chmod +x ./mvnw

# Run Maven to package the application
RUN ./mvnw package

# Copy the jar file from the target directory to the app directory
RUN cp target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "app.jar"]

