document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling cho navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Tính toán vị trí cuộn, trừ đi chiều cao header nếu header là sticky
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('main section, #banner'); // Bao gồm cả banner
    const headerHeight = document.querySelector('header').offsetHeight;

    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + headerHeight + 50 < sections[index].offsetTop) {} // Thêm 50px offset
        
        navLinks.forEach((link) => link.classList.remove('active'));
        // Kiểm tra xem có section nào được active không, và link tương ứng có tồn tại không
        if (index >= 0 && navLinks[index]) { // index có thể là 0 cho banner
             // Tìm link tương ứng với section hiện tại (href="#sectionId")
            const activeSectionId = sections[index].getAttribute('id');
            const activeLink = document.querySelector(`header nav ul li a[href="#${activeSectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else if (window.scrollY < sections[0].offsetTop - headerHeight - 50 && navLinks[0]) {
             // Nếu cuộn lên trên cùng (trước section đầu tiên), không active link nào hoặc active link "Trang chủ" nếu có
             // Mặc định, link đầu tiên là "Trang Chủ" và trỏ đến #banner
            if (navLinks[0].getAttribute('href') === "#banner") {
                navLinks[0].classList.add('active');
            }
        }
    }

    // Gọi lần đầu để active link nếu trang tải ở một section nào đó
    changeLinkState();
    window.addEventListener('scroll', changeLinkState);

    // Khởi tạo Lightbox (nếu bạn đã thêm thư viện)
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
          'resizeDuration': 200,
          'wrapAround': true,
          'fadeDuration': 300,
          'imageFadeDuration': 300
        });
    }

    console.log("Website THCS Thị Trấn 2 (Demo) đã sẵn sàng!");
    alert("Chào mừng bạn đến với bản demo website Trường THCS Thị Trấn 2");
});
