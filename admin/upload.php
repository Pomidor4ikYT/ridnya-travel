<?php
// admin/upload.php
header('Content-Type: application/json');

$uploadDir = '../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$uploadedFiles = [];

if (!empty($_FILES['photos']['name'][0])) {
    foreach ($_FILES['photos']['tmp_name'] as $index => $tmpName) {
        $fileName = basename($_FILES['photos']['name'][$index]);
        $fileType = mime_content_type($tmpName);
        if (!in_array($fileType, $allowedTypes)) {
            continue;
        }
        $ext = pathinfo($fileName, PATHINFO_EXTENSION);
        $newName = uniqid() . '.' . $ext;
        $targetPath = $uploadDir . $newName;
        if (move_uploaded_file($tmpName, $targetPath)) {
            $uploadedFiles[] = '/uploads/' . $newName;
        }
    }
}

echo json_encode(['success' => true, 'files' => $uploadedFiles]);