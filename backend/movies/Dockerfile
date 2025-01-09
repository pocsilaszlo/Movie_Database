# Használj egy JDK-t, például az Eclipse Temurin JDK-t
FROM eclipse-temurin:21-jdk-alpine

# Munkakönyvtár beállítása
WORKDIR /app

# Másold az összes fájlt a konténerbe
COPY . .

# Maven build
RUN ./mvnw clean package

# A végső jar fájl futtatása
CMD ["java", "-Dserver.port=$PORT", "-jar", "target/movies-0.0.1-SNAPSHOT.jar"]