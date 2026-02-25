$(document).ready(() => {
    // Mobile menu toggle
    $('#hamburger-menu').click(() => {
        $('#hamburger-menu').toggleClass('active')
        $('#nav-menu').toggleClass('active')
    })

    // Handle dropdown menus for mobile
    $('.dropdown-btn').click(function(e) {
        if (window.innerWidth <= 850) {
            e.preventDefault();
            $(this).parent('.dropdown').toggleClass('active');
            
            // Close other dropdowns when opening one
            $('.dropdown').not($(this).parent()).removeClass('active');
        }
    });

    // Close dropdowns when clicking outside (mobile)
    $(document).click(function(e) {
        if (window.innerWidth <= 850) {
            if (!$(e.target).closest('.dropdown').length) {
                $('.dropdown').removeClass('active');
            }
        }
    });

    // Hero carousel
    $('#hero-carousel').owlCarousel({
        items: 1,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1000,
        nav: true,
        navText: ['<i class="bx bx-chevron-left"></i>', '<i class="bx bx-chevron-right"></i>'],
        responsive: {
            0: {
                nav: false
            },
            768: {
                nav: true
            }
        }
    });

    // Top movies carousel
    $('#top-movies-slide').owlCarousel({
        items: 2,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        margin: 15,
        nav: true,
        navText: ['<i class="bx bx-chevron-left"></i>', '<i class="bx bx-chevron-right"></i>'],
        responsive: {
            500: {
                items: 3
            },
            1280: {
                items: 4
            },
            1600: {
                items: 6
            }
        }
    });

    // Latest movies and series carousels
    $('.movies-slide').owlCarousel({
        items: 2,
        dots: false,
        nav: true,
        navText: ['<i class="bx bx-chevron-left"></i>', '<i class="bx bx-chevron-right"></i>'],
        margin: 15,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            500: {
                items: 2
            },
            768: {
                items: 3
            },
            1024: {
                items: 4
            },
            1280: {
                items: 5
            },
            1600: {
                items: 6
            }
        }
    });

    // Add smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Add scroll effect for navigation
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.nav-wrapper').addClass('scrolled');
        } else {
            $('.nav-wrapper').removeClass('scrolled');
        }
    });

    // Close mobile menu when clicking on a link
    $('.nav-menu a').click(function() {
        if (window.innerWidth <= 850) {
            $('#hamburger-menu').removeClass('active');
            $('#nav-menu').removeClass('active');
        }
    });

    // Handle window resize for dropdowns
    $(window).resize(function() {
        if (window.innerWidth > 850) {
            $('.dropdown').removeClass('active');
        }
    });

    // Add loading animation for movie items
    $('.movie-item img').on('load', function() {
        $(this).parent().addClass('loaded');
    });

    // Add hover effects for movie items
    $('.movie-item').hover(
        function() {
            $(this).find('.movie-item-content').addClass('show');
        },
        function() {
            $(this).find('.movie-item-content').removeClass('show');
        }
    );

    // DOWNLOAD FUNCTIONALITY
    let selectedMovie = '';
    let selectedQuality = '';
    let selectedSize = '';
    let downloadInterval;

    // Handle download button clicks
    $(document).on('click', '.download-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Download button clicked'); // Debug log
        
        selectedMovie = $(this).data('movie') || 'movie';
        const movieTitle = $(this).closest('.hero-slide-item, .movie-item').find('.item-content-title, .movie-item-title').text() || 'Movie';
        
        console.log('Movie:', selectedMovie, 'Title:', movieTitle); // Debug log
        
        $('#downloadMovieTitle').text(`Download "${movieTitle}"`);
        $('#downloadModal').fadeIn().css('display', 'flex');
        $('body').css('overflow', 'hidden');
    });

    // Handle quality selection
    $(document).on('click', '.download-option', function() {
        console.log('Quality option clicked'); // Debug log
        
        $('.download-option').removeClass('selected').css({
            'border-color': 'rgba(255, 255, 255, 0.1)',
            'background': 'rgba(255, 255, 255, 0.05)'
        });
        
        $(this).addClass('selected').css({
            'border-color': 'var(--main-color)',
            'background': 'rgba(31, 131, 237, 0.2)'
        });
        
        selectedQuality = $(this).data('quality');
        selectedSize = $(this).data('size');
        $('#startDownload').prop('disabled', false);
        
        console.log('Selected:', selectedQuality, selectedSize); // Debug log
    });

    // Start download
    $(document).on('click', '#startDownload', function() {
        console.log('Start download clicked'); // Debug log
        
        if (!selectedQuality) {
            console.log('No quality selected'); // Debug log
            return;
        }
        
        const movieTitle = $('#downloadMovieTitle').text().replace('Download "', '').replace('"', '');
        const fileName = `${movieTitle.replace(/\s+/g, '_')}_${selectedQuality}.mp4`;
        
        $('#downloadOptions').hide();
        $('#downloadProgress').show();
        $('#downloadFileName').text(fileName);
        $('#startDownload').hide();
        $('#cancelDownload').text('Cancel Download');
        
        startDownloadSimulation(fileName);
    });

    // Download simulation function
    function startDownloadSimulation(fileName) {
        console.log('Starting download simulation for:', fileName); // Debug log
        
        let progress = 0;
        let speed = Math.random() * 5 + 2; // Random speed between 2-7 MB/s
        const totalSize = parseFloat(selectedSize.replace('GB', '').replace('MB', '')) * (selectedSize.includes('GB') ? 1000 : 1);
        
        downloadInterval = setInterval(() => {
            progress += Math.random() * 3 + 1;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(downloadInterval);
                downloadComplete(fileName);
            }
            
            // Update progress
            $('#progressBarFill').css('width', progress + '%');
            $('#downloadPercent').text(Math.round(progress) + '%');
            
            // Update speed and ETA
            const currentSpeed = (Math.random() * 2 + speed - 1).toFixed(1);
            $('#downloadSpeed').text(currentSpeed + ' MB/s');
            
            const remainingTime = ((100 - progress) / 100) * (totalSize / parseFloat(currentSpeed));
            const minutes = Math.floor(remainingTime / 60);
            const seconds = Math.floor(remainingTime % 60);
            $('#downloadETA').text(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }, 500);
    }

    // Download complete
    function downloadComplete(fileName) {
        console.log('Download complete:', fileName); // Debug log
        
        $('#downloadProgress').html(`
            <div style="text-align: center; padding: 1rem;">
                <i class="bx bx-check-circle" style="font-size: 3rem; color: #28a745; margin-bottom: 1rem;"></i>
                <h4 style="color: #28a745; margin-bottom: 0.5rem;">Download Complete!</h4>
                <p style="color: #a0a0a0;">${fileName} has been downloaded successfully.</p>
            </div>
        `);
        
        $('#cancelDownload').text('Close').off('click').on('click', closeDownloadModal);
        
        // Auto close after 3 seconds
        setTimeout(() => {
            closeDownloadModal();
        }, 3000);
        
        // Create actual download link (demo)
        createDownloadLink(fileName);
    }

    // Create actual download link (demo)
    function createDownloadLink(fileName) {
        const content = `This is a demo download for: ${fileName}\n\nIn a real application, this would be the actual movie file.\n\nMovie: ${selectedMovie}\nQuality: ${selectedQuality}\nSize: ${selectedSize}\n\nTo implement real downloads:\n1. Store video files on your server\n2. Create secure download endpoints\n3. Handle user authentication\n4. Implement download resume functionality`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName.replace('.mp4', '_download_info.txt');
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    // Cancel download
    $(document).on('click', '#cancelDownload', function() {
        console.log('Cancel download clicked'); // Debug log
        if (downloadInterval) {
            clearInterval(downloadInterval);
        }
        closeDownloadModal();
    });

    // Close modal
    $(document).on('click', '#modalClose', function() {
        console.log('Modal close clicked'); // Debug log
        if (downloadInterval) {
            clearInterval(downloadInterval);
        }
        closeDownloadModal();
    });

    // Close modal when clicking outside
    $(document).on('click', '#downloadModal', function(e) {
        if (e.target === this) {
            console.log('Modal background clicked'); // Debug log
            if (downloadInterval) {
                clearInterval(downloadInterval);
            }
            closeDownloadModal();
        }
    });

    // Close download modal function
    function closeDownloadModal() {
        console.log('Closing modal'); // Debug log
        $('#downloadModal').fadeOut();
        $('body').css('overflow', 'auto');
        
        // Reset modal state
        setTimeout(() => {
            $('#downloadOptions').show();
            $('#downloadProgress').hide();
            $('#startDownload').show().prop('disabled', true);
            $('#cancelDownload').text('Cancel');
            $('.download-option').removeClass('selected').css({
                'border-color': 'rgba(255, 255, 255, 0.1)',
                'background': 'rgba(255, 255, 255, 0.05)'
            });
            $('#progressBarFill').css('width', '0%');
            selectedQuality = '';
            selectedSize = '';
        }, 300);
    }

    // Keyboard shortcuts
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#downloadModal').is(':visible')) {
            closeDownloadModal();
        }
    });
});

