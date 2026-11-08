# Environment Configuration Checklist: Acorn Legal Platform

> [!IMPORTANT]
> Never store, print or commit secrets or `.env` values in code or repository files. This checklist tracks variable NAMES, required scopes, and rotation cycles only.

## 1. Application Core & Next.js Runtime
- `NODE_ENV`: Runtime environment (`development`, `staging`, `production`)
- `PORT`: Port binding for web application (default: `3000`)
- `NEXT_PUBLIC_APP_URL`: Public canonical base URL (`https://acornlegal.in`)
- `NEXT_PUBLIC_API_URL`: Backend API base URL
- `APP_SECRET_KEY`: Cryptographic secret for session token signing (HS256/RS256)

## 2. Database & Cache Services
- `MONGODB_URI`: Primary MongoDB replica set connection URI
- `REDIS_URL`: In-memory Redis store for rate-limiting, session caches, and Socket.io adapter

## 3. Storage & Evidence Vault (Object Storage)
- `S3_ENDPOINT`: Private object storage endpoint (MinIO / AWS S3 Mumbai `ap-south-1`)
- `S3_BUCKET_EVIDENCE`: Encrypted POSH evidence bucket (SSE-KMS)
- `S3_ACCESS_KEY_ID`: IAM service account access key ID
- `S3_SECRET_ACCESS_KEY`: IAM service account secret access key

## 4. Payment Gateway (Razorpay India)
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Razorpay public key ID (`rzp_test_...` in staging, `rzp_live_...` in production)
- `RAZORPAY_KEY_SECRET`: Razorpay server verification secret
- `RAZORPAY_WEBHOOK_SECRET`: Webhook payload HMAC-SHA256 signature secret

## 5. Transactional Communication & Notifications
- `SMTP_HOST`: Secure SMTP relay host
- `SMTP_PORT`: Port 587 (STARTTLS) or 465 (SSL)
- `SMTP_USER`: Authenticated outbound mail username
- `SMTP_PASSWORD`: Authenticated outbound mail password
- `EMAIL_FROM`: Official communications address (`contact@acornlegal.in` / `posh-desk@acornlegal.in`)

## 6. Observability & Security Monitoring
- `LOG_LEVEL`: Log verbosity with PII scrubbing active (`info` / `warn` / `error`)
- `RATE_LIMIT_MAX`: Sliding window max requests per IP (default: 100 req / 15 min)

