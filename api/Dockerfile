# --- Build Stage ---
# Use a Maven-ready image to build the application .jar file
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml AND the source code together first
COPY . .

# Package the application into a single executable .jar
RUN mvn package -DskipTests

# --- Run Stage ---
# Use a minimal, more secure Java runtime image for the final container
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy the built .jar file from the 'builder' stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# The command to run the application when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]