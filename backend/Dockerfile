# Use a minimal, stable base image
FROM python:3.9-slim-bookworm

# Metadata (optional but best practice)
LABEL maintainer="Simon Muriithi" \
      version="1.0" \
      description="A secure and optimized Python app with MySQL support"

# Create a non-root user and group
RUN addgroup --system appuser && adduser --system --ingroup appuser appuser

# Set work directory
WORKDIR /app

# Install system dependencies (with security and size in mind)
RUN apt-get update && apt-get install -y --no-install-recommends \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies securely
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set file permissions for the non-root user
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Optional: environment variables
# ENV PYTHONUNBUFFERED=1 \
#     PYTHONDONTWRITEBYTECODE=1

# Health check (requires curl, already installed)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Expose port for the app
EXPOSE 5000

# Run the app
CMD ["python", "run.py"]
