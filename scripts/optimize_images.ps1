Add-Type -AssemblyName System.Drawing

$srcDir = "d:\Data\Project\BlackLens_Website\public\Photos"
$files = Get-ChildItem -Path $srcDir -File | Where-Object { $_.Extension -match '(?i)\.(jpg|jpeg|png)' }

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        
        # Calculate new dimensions (max width 1200, max height 1200 to be safe)
        $maxDim = 1200
        $width = $img.Width
        $height = $img.Height
        
        if ($width -gt $maxDim -or $height -gt $maxDim) {
            if ($width -gt $height) {
                $ratio = $maxDim / $width
                $newWidth = $maxDim
                $newHeight = [int]($height * $ratio)
            } else {
                $ratio = $maxDim / $height
                $newHeight = $maxDim
                $newWidth = [int]($width * $ratio)
            }
        } else {
            $newWidth = $width
            $newHeight = $height
        }
        
        $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $g = [System.Drawing.Graphics]::FromImage($newImg)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
        $g.Dispose()
        $img.Dispose()
        
        # Determine encoder (always save as Jpeg for optimal compression unless we really want PNG)
        # For simplicity, we convert all to Jpeg, but if the original was PNG, we can keep the filename
        # or change it. Let's save as Jpeg even if the extension is .png, or we can rename the file to .jpg.
        $targetPath = $file.FullName
        $ext = $file.Extension.ToLower()
        if ($ext -eq ".png") {
            # Let's save it as Jpeg but rename the file to .jpg
            $targetPath = [System.IO.Path]::ChangeExtension($file.FullName, ".jpg")
            Write-Host "Converting PNG to JPG: $($file.Name) -> $(Split-Path $targetPath -Leaf)"
        }
        
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageDecoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 80)
        
        $tempPath = [System.IO.Path]::GetTempFileName() + ".jpg"
        $newImg.Save($tempPath, $codec, $encoderParams)
        $newImg.Dispose()
        
        # Remove original file
        Remove-Item $file.FullName -Force
        # Move temp file to target
        if (Test-Path $targetPath) {
            Remove-Item $targetPath -Force
        }
        Move-Item $tempPath $targetPath -Force
        
        $newSize = (Get-Item $targetPath).Length / 1KB
        Write-Host "Successfully optimized to $newSize KB"
    } catch {
        Write-Error "Failed to process $($file.Name): $_"
    }
}
