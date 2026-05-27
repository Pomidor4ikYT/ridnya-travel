<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Location: contacts.html?status=error');
        exit;
    }

    $to = 'your-email@domain.com';
    $subject = 'Нове повідомлення з сайту clubmridnya.org';
    $body = "Ім'я: $name\nEmail: $email\nПовідомлення:\n$message";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-type: text/plain; charset=UTF-8";

    if (mail($to, $subject, $body, $headers)) {
        header('Location: contacts.html?status=success');
    } else {
        header('Location: contacts.html?status=error');
    }
    exit;
} else {
    header('Location: contacts.html');
    exit;
}