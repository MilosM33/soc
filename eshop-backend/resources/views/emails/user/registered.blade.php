<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Welcome Email</title>
    </head>
    <body>
        <h1>Welcome to our website!</h1>
        <p>Dear {{ $user->name }},</p>

        <p>
            Thank you for registering with our website. To complete your
            registration, please click the following link to verify your email
            address:
        </p>

        <p><a href="http://everydayessentials.tech/my-account/verify/{{$user->verification_token}}">Verify Email Address</a></p>

        <p>Thank you for using our website!</p>

        <p>Best regards,</p>
        <p>The Team</p>
    </body>
</html>
