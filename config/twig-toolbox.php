<?php
return [
    'filters' => [],
    'functions' => [
        'checkFiles' => function (string $path): bool {
            if (!file_exists(CRAFT_BASE_PATH . "/web/" . $path)) {
                return false;
            }
            return true;
        },
        "getMP" => function ($childres): string {
            $devices = [];
            if (empty($childres)) {
                return "";
            }
            $classMap = [
                "xSmall" => "-",
                "small" => "-sm-",
                "large" => "-lg-",
                "xLarge" => "-xl-",
            ];
            foreach ($childres as $child) {
                $handle = $child->type->handle ?? "";
                if (!empty($handle) && isset($classMap[$handle])) {
                    $key = $classMap[$handle];
                    $properties = ["mt", "mb", "pt", "pb"];
                    foreach ($properties as $property) {
                        $value = $child->{$property}->value ?? 0;
                        $devices[] = sprintf("%s%s%s", $property, $key, $value);
                    }
                }
            }
            return join(" ", $devices);
        }
    ],
    'globals' => [],
    'tests' => [],
];
