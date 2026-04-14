Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = "Stop"

$in = 'e:\Manutec\public\assets\logo\logo.png'
$out = 'e:\Manutec\public\assets\logo\logo-clean.png'

$src = [System.Drawing.Bitmap]::new($in)
$w = $src.Width
$h = $src.Height

$bg = New-Object 'bool[,]' $w, $h
$q = New-Object 'System.Collections.Generic.Queue[System.Drawing.Point]'

function Is-Bg([System.Drawing.Color]$c) {
  $sat = $c.GetSaturation()
  $bri = $c.GetBrightness()
  $rg = [math]::Abs([int]$c.R - [int]$c.G)
  $gb = [math]::Abs([int]$c.G - [int]$c.B)
  $rb = [math]::Abs([int]$c.R - [int]$c.B)
  return ($sat -lt 0.18 -and $bri -gt 0.42 -and $rg -lt 28 -and $gb -lt 28 -and $rb -lt 28)
}

for ($x = 0; $x -lt $w; $x++) {
  $cTop = $src.GetPixel($x, 0)
  if ((Is-Bg $cTop)) {
    $bg[$x, 0] = $true
    $q.Enqueue([System.Drawing.Point]::new($x, 0))
  }

  $cBottom = $src.GetPixel($x, $h - 1)
  if ((Is-Bg $cBottom) -and -not $bg[$x, ($h - 1)]) {
    $bg[$x, ($h - 1)] = $true
    $q.Enqueue([System.Drawing.Point]::new($x, ($h - 1)))
  }
}

for ($y = 0; $y -lt $h; $y++) {
  $cLeft = $src.GetPixel(0, $y)
  if ((Is-Bg $cLeft) -and -not $bg[0, $y]) {
    $bg[0, $y] = $true
    $q.Enqueue([System.Drawing.Point]::new(0, $y))
  }

  $cRight = $src.GetPixel($w - 1, $y)
  if ((Is-Bg $cRight) -and -not $bg[($w - 1), $y]) {
    $bg[($w - 1), $y] = $true
    $q.Enqueue([System.Drawing.Point]::new(($w - 1), $y))
  }
}

$dirs = @(
  [System.Drawing.Point]::new(1, 0),
  [System.Drawing.Point]::new(-1, 0),
  [System.Drawing.Point]::new(0, 1),
  [System.Drawing.Point]::new(0, -1)
)

while ($q.Count -gt 0) {
  $p = $q.Dequeue()
  foreach ($d in $dirs) {
    $nx = $p.X + $d.X
    $ny = $p.Y + $d.Y
    if ($nx -ge 0 -and $ny -ge 0 -and $nx -lt $w -and $ny -lt $h -and -not $bg[$nx, $ny]) {
      $c = $src.GetPixel($nx, $ny)
      if ((Is-Bg $c)) {
        $bg[$nx, $ny] = $true
        $q.Enqueue([System.Drawing.Point]::new($nx, $ny))
      }
    }
  }
}

$minX = $w
$minY = $h
$maxX = -1
$maxY = -1

for ($y = 0; $y -lt $h; $y++) {
  for ($x = 0; $x -lt $w; $x++) {
    if (-not $bg[$x, $y]) {
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

if ($maxX -lt 0 -or $maxY -lt 0) {
  throw 'Falha ao identificar a marca na imagem.'
}

$pad = 12
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($w - $cropX, ($maxX - $minX + 1) + ($pad * 2))
$cropH = [Math]::Min($h - $cropY, ($maxY - $minY + 1) + ($pad * 2))

$dst = [System.Drawing.Bitmap]::new($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
  for ($x = 0; $x -lt $cropW; $x++) {
    $sx = $cropX + $x
    $sy = $cropY + $y
    $c = $src.GetPixel($sx, $sy)

    if ($bg[$sx, $sy]) {
      $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $c.R, $c.G, $c.B))
    }
    else {
      $dst.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
    }
  }
}

$dst.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output ('Logo limpa gerada: ' + $cropW + 'x' + $cropH)

$dst.Dispose()
$src.Dispose()
