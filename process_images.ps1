$images = @(
    @{ Url = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"; Output = "hero-bg.webp"; LocalSource = "photo-1486406146926-c627a92ad1ab.avif" },
    @{ Url = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"; Output = "about-team.webp"; LocalSource = "" },
    @{ Url = "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"; Output = "portfolio-2.webp"; LocalSource = "" },
    @{ Url = "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"; Output = "portfolio-3.webp"; LocalSource = "" },
    @{ Url = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"; Output = "portfolio-4.webp"; LocalSource = "" },
    @{ Url = "https://randomuser.me/api/portraits/men/32.jpg"; Output = "client-1.webp"; LocalSource = "" },
    @{ Url = "https://randomuser.me/api/portraits/women/44.jpg"; Output = "client-2.webp"; LocalSource = "" },
    @{ Url = "https://randomuser.me/api/portraits/men/67.jpg"; Output = "client-3.webp"; LocalSource = "" },
    @{ Url = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"; Output = "blog-1.webp"; LocalSource = "" },
    @{ Url = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"; Output = "blog-2.webp"; LocalSource = "" },
    @{ Url = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"; Output = "blog-3.webp"; LocalSource = "" }
)

# Convert abt.avif
if (Test-Path "abt.avif") {
    Write-Host "Converting abt.avif..."
    npx -y sharp-cli -i "abt.avif" -o "abt.webp"
}

foreach ($img in $images) {
    $output = $img.Output
    $url = $img.Url
    $localSource = $img.LocalSource

    if (Test-Path $output) {
        Write-Host "File $output already exists. Skipping."
        continue
    }

    if ($localSource -ne "" -and (Test-Path $localSource)) {
        Write-Host "Converting local source $localSource to $output..."
        npx -y sharp-cli -i $localSource -o $output
    } else {
        Write-Host "Downloading $url..."
        $tempFile = [System.IO.Path]::GetTempFileName() + ".jpg"
        
        try {
            Invoke-WebRequest -Uri $url -OutFile $tempFile
            Write-Host "Converting downloaded file to $output..."
            # Using absolute path for temp file to avoid issues
            npx -y sharp-cli -i $tempFile -o $output
        } catch {
            Write-Error "Failed to process $url $_"
        } finally {
            if (Test-Path $tempFile) { Remove-Item $tempFile }
        }
    }
}
