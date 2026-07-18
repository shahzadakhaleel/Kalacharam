import json
import os
import re

import boto3
from botocore.exceptions import ClientError

ses = boto3.client("ses")

EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def response(status_code: int, body: dict):
    return {
        "statusCode": status_code,
        "headers": {
            "content-type": "application/json",
        },
        "body": json.dumps(body),
    }


def lambda_handler(event, _context):
    method = (event or {}).get("requestContext", {}).get("http", {}).get("method", "POST")
    if method == "OPTIONS":
        return response(200, {"ok": True})

    raw_body = (event or {}).get("body") or "{}"
    try:
      payload = json.loads(raw_body)
    except json.JSONDecodeError:
      return response(400, {"error": "Invalid JSON payload"})

    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip()
    phone = (payload.get("phone") or "").strip()
    event_type = (payload.get("eventType") or "").strip()
    message = (payload.get("message") or "").strip()

    if not name or not email or not phone or not event_type or not message:
        return response(400, {"error": "All fields are required"})

    if not EMAIL_REGEX.match(email):
        return response(400, {"error": "Invalid email address"})

    from_email = os.environ.get("FROM_EMAIL", "")
    to_email = os.environ.get("TO_EMAIL", "")

    if not from_email or not to_email:
        return response(500, {"error": "Email service not configured"})

    subject = f"New website inquiry: {event_type}"
    text_body = (
        f"New contact form submission\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Phone: {phone}\n"
        f"Event Type: {event_type}\n\n"
        f"Message:\n{message}\n"
    )

    html_body = (
        "<h2>New Contact Form Submission</h2>"
        f"<p><strong>Name:</strong> {name}</p>"
        f"<p><strong>Email:</strong> {email}</p>"
        f"<p><strong>Phone:</strong> {phone}</p>"
        f"<p><strong>Event Type:</strong> {event_type}</p>"
        f"<p><strong>Message:</strong><br>{message}</p>"
    )

    try:
        ses.send_email(
            Source=from_email,
            Destination={"ToAddresses": [to_email]},
            ReplyToAddresses=[email],
            Message={
                "Subject": {"Data": subject, "Charset": "UTF-8"},
                "Body": {
                    "Text": {"Data": text_body, "Charset": "UTF-8"},
                    "Html": {"Data": html_body, "Charset": "UTF-8"},
                },
            },
        )
    except ClientError as err:
        error_code = err.response.get("Error", {}).get("Code", "ClientError")
        if error_code == "MessageRejected":
            return response(
                502,
                {
                    "error": "SES rejected the email because the sender or recipient is not verified, or the account is still in sandbox mode.",
                    "details": str(err),
                    "errorCode": error_code,
                },
            )

        return response(500, {"error": "Failed to send email", "details": str(err), "errorCode": error_code})

    return response(200, {"ok": True, "message": "Email sent successfully"})
