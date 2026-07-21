<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

define('DATA_DIR', '/home/va620235/clubmridnya.org/www/data/');
define('ADMIN_EMAIL', 'ridnyatravel@gmail.com');

$allowedEntities = ['trips', 'blog', 'gear', 'albums', 'reviews', 'faq', 'members',
                    'trip_applications', 'leader_applications', 'team_applications'];

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$action = $input['action'] ?? '';
$entity = $input['entity'] ?? '';
$data = $input['data'] ?? null;
$id = $input['id'] ?? null;
$email = $input['email'] ?? '';

if ($action !== 'get' && $email !== ADMIN_EMAIL) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

if (!in_array($entity, $allowedEntities)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid entity']);
    exit;
}

$filePath = DATA_DIR . $entity . '.json';

function readJsonFile($path) {
    if (!file_exists($path)) return [];
    $content = file_get_contents($path);
    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

function writeJsonFile($path, $data) {
    // Переконатися, що $data – масив
    if (!is_array($data)) $data = [];
    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$response = [];

switch ($action) {
    case 'get':
        $response = readJsonFile($filePath);
        break;
    case 'set':
        if ($data === null) { http_response_code(400); echo json_encode(['error' => 'No data']); exit; }
        if (!is_array($data)) $data = [];
        writeJsonFile($filePath, $data);
        $response = ['success' => true];
        break;
    case 'add':
        if ($data === null) { http_response_code(400); echo json_encode(['error' => 'No data']); exit; }
        $current = readJsonFile($filePath);
        // Якщо це не масив – перетворити
        if (!is_array($current)) $current = [];
        $current[] = $data;
        writeJsonFile($filePath, $current);
        $response = ['success' => true, 'id' => $data['id'] ?? null];
        break;
    case 'delete':
        if ($id === null) { http_response_code(400); echo json_encode(['error' => 'No id']); exit; }
        $current = readJsonFile($filePath);
        if (!is_array($current)) $current = [];
        $new = array_filter($current, function($item) use ($id) { return $item['id'] != $id; });
        writeJsonFile($filePath, array_values($new));
        $response = ['success' => true];
        break;
    case 'update':
        if ($id === null || $data === null) { http_response_code(400); echo json_encode(['error' => 'Missing id or data']); exit; }
        $current = readJsonFile($filePath);
        if (!is_array($current)) $current = [];
        $found = false;
        foreach ($current as &$item) {
            if ($item['id'] == $id) {
                $item = array_merge($item, $data);
                $found = true;
                break;
            }
        }
        if (!$found) { http_response_code(404); echo json_encode(['error' => 'Not found']); exit; }
        writeJsonFile($filePath, $current);
        $response = ['success' => true];
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Unknown action']);
        exit;
}

echo json_encode($response);