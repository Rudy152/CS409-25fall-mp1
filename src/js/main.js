// 主要的JavaScript功能实现

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavbar();
    initSmoothScrolling();
    initCarousel();
    initModal();
    initScrollSpy();
    initNavbarResize();
    
    console.log('TechVision website initialized successfully!');
});

// 导航栏功能
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    // 滚动时的导航栏效果
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // 粘性导航栏效果
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

// 导航栏大小调整功能
function initNavbarResize() {
    const navbar = document.getElementById('navbar');
    const navbarBrand = navbar.querySelector('.navbar-brand h2');
    const navbarLinks = navbar.querySelectorAll('.navbar-link');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = 200; // 最大滚动距离
        const scrollRatio = Math.min(scrollY / maxScroll, 1);
        
        // 计算字体大小
        const brandMinSize = 1.5; // rem
        const brandMaxSize = 1.8; // rem
        const brandCurrentSize = brandMaxSize - (brandMaxSize - brandMinSize) * scrollRatio;
        
        const linkMinSize = 0.9; // rem
        const linkMaxSize = 1.0; // rem
        const linkCurrentSize = linkMaxSize - (linkMaxSize - linkMinSize) * scrollRatio;
        
        // 应用样式
        navbarBrand.style.fontSize = `${brandCurrentSize}rem`;
        navbarLinks.forEach(link => {
            link.style.fontSize = `${linkCurrentSize}rem`;
        });
    });
}

// 平滑滚动功能
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动位置指示器
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // 特殊处理：当滚动到页面底部时，高亮最后一个菜单项
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            currentSection = 'contact';
        }
        
        // 更新导航栏激活状态
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // 显示指定幻灯片
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });
        
        currentSlide = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // 事件监听器
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 自动播放
    setInterval(nextSlide, 5000);
    
    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// 模态窗口功能
function initModal() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    // 打开模态窗口
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // 添加动画延迟
                setTimeout(() => {
                    modal.querySelector('.modal-content').style.transform = 'scale(1)';
                }, 50);
            }
        });
    });
    
    // 关闭模态窗口
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
    }
    
    // 点击关闭按钮
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            closeModal(modal);
        });
    });
    
    // 点击背景关闭
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

// 表单提交处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all required fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully! We will reply to you as soon as possible.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.service-item, .team-member, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 初始化滚动动画
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// 页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 添加页面加载完成的动画效果
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeIn 1s ease forwards';
    }
});

// 响应式导航菜单（移动端）
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    // 创建汉堡菜单按钮
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.display = 'none';
    hamburger.style.cursor = 'pointer';
    hamburger.style.fontSize = '1.5rem';
    hamburger.style.color = '#007bff';
    
    navbar.querySelector('.navbar-container').appendChild(hamburger);
    
    // 移动端显示汉堡菜单
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
            navbarMenu.classList.remove('active');
        }
    }
    
    // 初始检查和窗口大小改变时检查
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // 汉堡菜单点击事件
    hamburger.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navbarMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // 点击菜单项时关闭移动菜单
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            hamburger.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// 初始化移动端菜单
document.addEventListener('DOMContentLoaded', initMobileMenu);
