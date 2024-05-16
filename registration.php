<?php

header('Content-Type: application/json; charset=utf-8'); // Встановлюємо заголовок JSON

$dbc = mysqli_connect('localhost', 'root', '', 'registration');

if (!$dbc) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed: " . mysqli_connect_error()]);
    exit;
}

$user = json_decode(file_get_contents('php://input'), true);

if (!$user) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid JSON input"]);
    exit;
}

$firstName = $user['firstName'];
$lastName = $user['lastName'];
$patronymic = $user['patronymic'];
$phoneNumber = $user['phoneNumber'];
$email = $user['email'];
$taxNumber = $user['taxNumber'];
$password = password_hash($user['password'], PASSWORD_BCRYPT); // Використовуємо хешування для пароля

$query = 'INSERT INTO registration (name, last_name, patronymic, phone_number, email, individual_tax_number, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
$stmt = mysqli_prepare($dbc, $query);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, 'sssssss', $firstName, $lastName, $patronymic, $phoneNumber, $email, $taxNumber, $password);
    mysqli_stmt_execute($stmt);

    if (mysqli_stmt_affected_rows($stmt) > 0) {
        http_response_code(201);
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error registering user"]);
    }

    mysqli_stmt_close($stmt);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Error preparing statement: " . mysqli_error($dbc)]);
}

mysqli_close($dbc);
