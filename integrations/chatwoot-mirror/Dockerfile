FROM python:3.12-slim
WORKDIR /app
RUN pip install --no-cache-dir psycopg2-binary==2.9.10 requests==2.32.3
COPY mirror.py .
CMD ["python", "mirror.py"]
