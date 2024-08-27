# Use the official OpenJDK image as a parent image
FROM openjdk:21

# Set the working directory in the container
WORKDIR /app

# Copy the jar file from the build
COPY target/codechem-duck-game-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "app.jar"]
