$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$shootDir = Join-Path $repoRoot "20260419-Saby Kitchen Bakery Product Shoot"
$manifestPath = Join-Path $repoRoot "scripts\photo_manifest.json"

$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json

$lamingtons = @($manifest | Where-Object { $_.description -match 'lamington' })
$others = @($manifest | Where-Object { $_.description -notmatch 'lamington' })

Write-Host ("Found {0} lamington entries to reclassify" -f $lamingtons.Count)

$lamingtons = $lamingtons | Sort-Object new_name

$counter = 1
foreach ($entry in $lamingtons) {
    $newName = "tea_time_cake_{0:D2}.jpg" -f $counter
    $oldPath = Join-Path $shootDir $entry.new_name
    $newPath = Join-Path $shootDir $newName
    if (-not (Test-Path $oldPath)) { throw "Missing source: $oldPath" }
    if (Test-Path $newPath) { throw "Target exists: $newPath" }
    Rename-Item -Path $oldPath -NewName $newName
    Write-Host ("  {0} -> {1}" -f $entry.new_name, $newName)
    $entry.new_name = $newName
    $entry.product_type = "tea_time_cake"
    $counter++
}

$updated = $others + $lamingtons
$updated = $updated | Sort-Object product_type, new_name
$updated | ConvertTo-Json -Depth 4 | Set-Content -Path $manifestPath -Encoding utf8

Write-Host ("Done. Manifest now has {0} entries." -f $updated.Count)
