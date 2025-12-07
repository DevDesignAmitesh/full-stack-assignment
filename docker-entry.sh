#!/bin/sh
# Fail fast if something goes wrong
set -e

echo "Running drizzle generate..."
bun generate:db

echo "Running drizzle migrate..."
bun migrate:db

echo "Starting http backend..."
bun start:be