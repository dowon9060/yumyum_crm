#!/bin/bash

echo "Stopping any running server..."
pkill -9 java

echo "Cleaning Maven cache..."
rm -rf target/
mvn clean

echo "Building project..."
mvn install -DskipTests

echo "Starting server..."
java -jar target/yumyum-crm-admin-1.0-SNAPSHOT.jar --spring.profiles.active=dev