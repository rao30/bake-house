$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$shootDir = Join-Path $repoRoot "20260419-Saby Kitchen Bakery Product Shoot"
$scriptsDir = Join-Path $repoRoot "scripts"

$all = @()
1..4 | ForEach-Object {
    $path = Join-Path $scriptsDir "_photo_batch_$_.json"
    $batch = Get-Content $path -Raw | ConvertFrom-Json
    $all += $batch
}

Write-Host ("Loaded {0} entries from 4 batches" -f $all.Count)

$all = $all | Sort-Object file

$grouped = $all | Group-Object product_type | Sort-Object Name

$manifest = @()
foreach ($g in $grouped) {
    Write-Host ("  {0}: {1}" -f $g.Name, $g.Count)
    $i = 1
    foreach ($entry in $g.Group) {
        $newName = "{0}_{1:D2}.jpg" -f $g.Name, $i
        $oldPath = Join-Path $shootDir $entry.file
        $newPath = Join-Path $shootDir $newName
        if (-not (Test-Path $oldPath)) {
            throw "Source file missing: $oldPath"
        }
        if (Test-Path $newPath) {
            throw "Target already exists: $newPath"
        }
        Rename-Item -Path $oldPath -NewName $newName
        $manifest += [pscustomobject]@{
            new_name      = $newName
            original_name = $entry.file
            product_type  = $entry.product_type
            description   = $entry.description
            confidence    = $entry.confidence
            composition   = $entry.composition
        }
        $i++
    }
}

$manifestPath = Join-Path $scriptsDir "photo_manifest.json"
$manifest | ConvertTo-Json -Depth 4 | Set-Content -Path $manifestPath -Encoding utf8

Write-Host ""
Write-Host ("Renamed {0} files. Manifest: {1}" -f $manifest.Count, $manifestPath)
