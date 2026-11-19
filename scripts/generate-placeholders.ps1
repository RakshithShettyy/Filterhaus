Add-Type -AssemblyName System.Drawing

$root = "C:\Users\chidu\Desktop\Filterhaus\10_Website_Software\Website 2"
$public = Join-Path $root "public"
New-Item -ItemType Directory -Force -Path (Join-Path $public "work"), (Join-Path $public "services"), (Join-Path $public "about"), (Join-Path $root "src\app") | Out-Null

function Save-Jpeg($bmp, $path, $quality) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $encoder = [System.Drawing.Imaging.Encoder]::Quality
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter $encoder, ([long]$quality)
  $bmp.Save($path, $codec, $params)
  $params.Dispose()
}

function New-Still($path, $w, $h, $c1, $c2, $label) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $c1, $c2, 32
  $g.FillRectangle($brush, $rect)
  $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(150, 184, 138, 46)), 3
  $g.DrawRectangle($pen, 28, 28, $w - 56, $h - 56)
  $cx = [int]($w * 0.62)
  $cy = [int]($h * 0.42)
  $g.DrawEllipse($pen, $cx - 90, $cy - 90, 180, 180)
  $g.DrawEllipse($pen, $cx - 28, $cy - 28, 56, 56)
  $font = New-Object System.Drawing.Font "Georgia", 22
  $text = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(170, 251, 245, 230))
  $g.DrawString($label, $font, $text, 40, ($h - 90))
  Save-Jpeg $bmp $path 62
  $font.Dispose(); $text.Dispose(); $pen.Dispose(); $brush.Dispose(); $g.Dispose(); $bmp.Dispose()
}

$brown = [System.Drawing.Color]::FromArgb(255, 94, 34, 9)
$gold = [System.Drawing.Color]::FromArgb(255, 184, 138, 46)
$cream = [System.Drawing.Color]::FromArgb(255, 251, 245, 230)
$ink = [System.Drawing.Color]::FromArgb(255, 42, 33, 28)
$deep = [System.Drawing.Color]::FromArgb(255, 48, 22, 10)
$sand = [System.Drawing.Color]::FromArgb(255, 196, 154, 96)
$clay = [System.Drawing.Color]::FromArgb(255, 122, 64, 28)

New-Still (Join-Path $public "hero.jpg") 1600 2000 $deep $gold "Placeholder"
New-Still (Join-Path $public "work\homestay-01.jpg") 1200 1600 $brown $sand "01"
New-Still (Join-Path $public "work\homestay-02.jpg") 1600 1100 $ink $clay "02"
New-Still (Join-Path $public "work\homestay-03.jpg") 1200 1500 $deep $cream "03"
New-Still (Join-Path $public "work\homestay-04.jpg") 1400 1700 $brown $gold "04"
New-Still (Join-Path $public "work\homestay-05.jpg") 1600 1200 $clay $cream "05"
New-Still (Join-Path $public "work\homestay-06.jpg") 1200 1600 $ink $sand "06"
New-Still (Join-Path $public "work\homestay-07.jpg") 1500 1300 $deep $sand "07"
New-Still (Join-Path $public "work\homestay-08.jpg") 1200 1680 $brown $cream "08"
New-Still (Join-Path $public "services\photography.jpg") 900 1200 $brown $cream "Photography"
New-Still (Join-Path $public "services\reels.jpg") 900 1200 $ink $gold "Reels"
New-Still (Join-Path $public "services\brand-films.jpg") 900 1200 $deep $sand "Films"
New-Still (Join-Path $public "about\founder.jpg") 900 1120 $clay $cream "Founder"

# Logo lockup
$logo = New-Object System.Drawing.Bitmap 480, 160
$lg = [System.Drawing.Graphics]::FromImage($logo)
$lg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$lg.Clear([System.Drawing.Color]::FromArgb(255, 253, 254, 236))
$goldPen = New-Object System.Drawing.Pen $gold, 3
$lg.DrawEllipse($goldPen, 28, 28, 104, 104)
$lg.DrawEllipse($goldPen, 58, 58, 44, 44)
$word = New-Object System.Drawing.Font "Georgia", 28
$wordBrush = New-Object System.Drawing.SolidBrush $brown
$lg.DrawString("FilterHaus", $word, $wordBrush, 150, 58)
Save-Jpeg $logo (Join-Path $public "logo.jpg") 80
$word.Dispose(); $wordBrush.Dispose(); $goldPen.Dispose(); $lg.Dispose(); $logo.Dispose()

# Open graph
$og = New-Object System.Drawing.Bitmap 1200, 630
$ogG = [System.Drawing.Graphics]::FromImage($og)
$ogG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ogRect = New-Object System.Drawing.Rectangle 0, 0, 1200, 630
$ogBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $ogRect, $cream, ([System.Drawing.Color]::FromArgb(255, 243, 228, 196)), 20
$ogG.FillRectangle($ogBrush, $ogRect)
$ogPen = New-Object System.Drawing.Pen $gold, 2
$ogG.DrawRectangle($ogPen, 36, 36, 1128, 558)
$ogG.DrawEllipse($ogPen, 80, 210, 160, 160)
$titleFont = New-Object System.Drawing.Font "Georgia", 64
$subFont = New-Object System.Drawing.Font "Georgia", 24
$inkBrush = New-Object System.Drawing.SolidBrush $ink
$ogG.DrawString("FilterHaus", $titleFont, $inkBrush, 290, 220)
$ogG.DrawString("We create visuals. We build perceptions.", $subFont, $inkBrush, 294, 330)
Save-Jpeg $og (Join-Path $public "og.jpg") 75
$titleFont.Dispose(); $subFont.Dispose(); $inkBrush.Dispose(); $ogPen.Dispose(); $ogBrush.Dispose(); $ogG.Dispose(); $og.Dispose()

# Grain
$grain = New-Object System.Drawing.Bitmap 128, 128, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$rand = New-Object System.Random 7
for ($y = 0; $y -lt 128; $y++) {
  for ($x = 0; $x -lt 128; $x++) {
    if ($rand.Next(0, 4) -eq 0) {
      $v = $rand.Next(20, 70)
      $grain.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($rand.Next(30, 90), $v, $v, $v))
    }
  }
}
$grain.Save((Join-Path $public "grain.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$grain.Dispose()

function New-Icon($size, $path) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear($cream)
  $pad = [int]($size * 0.18)
  $pen = New-Object System.Drawing.Pen $brown, ([Math]::Max(2, $size * 0.04))
  $g.DrawEllipse($pen, $pad, $pad, $size - ($pad * 2), $size - ($pad * 2))
  $inner = [int]($size * 0.34)
  $g.DrawEllipse($pen, ($size - $inner) / 2, ($size - $inner) / 2, $inner, $inner)
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $pen.Dispose(); $g.Dispose(); $bmp.Dispose()
}

New-Icon 512 (Join-Path $root "src\app\icon.png")
New-Icon 180 (Join-Path $root "src\app\apple-icon.png")

Write-Output "images-ok"
