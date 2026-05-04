$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$shootDir = Join-Path $repoRoot "20260419-Saby Kitchen Bakery Product Shoot"
$manifestPath = Join-Path $repoRoot "scripts\photo_manifest.json"

$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json

$loaves = @($manifest | Where-Object { $_.product_type -eq 'loaf_cake' }) | Sort-Object new_name
$existingTeaTime = @($manifest | Where-Object { $_.product_type -eq 'tea_time_cake' })
$others = @($manifest | Where-Object { $_.product_type -ne 'loaf_cake' -and $_.product_type -ne 'tea_time_cake' })

$startIndex = $existingTeaTime.Count + 1
Write-Host ("Reclassifying {0} loaves starting at tea_time_cake_{1:D2}" -f $loaves.Count, $startIndex)

$counter = $startIndex
foreach ($entry in $loaves) {
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

$updated = $others + $existingTeaTime + $loaves | Sort-Object product_type, new_name
$updated | ConvertTo-Json -Depth 4 | Set-Content -Path $manifestPath -Encoding utf8

Write-Host ("Done. Manifest now has {0} entries." -f $updated.Count)
