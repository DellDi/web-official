const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
  let height = headerEl.getBoundingClientRect().height;
  // console.log(window.pageYOffset);
  // console.log(headerEl.getBoundingClientRect());
  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");

// glide的生命周期
glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEl[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "linear",
    delay: anime.stagger(400, { start: 300 }), // 轮流元素添加，300后执行
    translateY: [anime.stagger([40, 10]), 0] // 针对了三个元素
  });
});
// 切换时 透明度还原为之前 继续来一次 动画
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach(el => {
    el.style.opcity = 0;
  });
});

glide.mount();

// 图片筛选
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  itemSelector: ".case-item"
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e => {
  let { target } = e;
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    document.querySelectorAll(".filter-btn.active").forEach(btn => {
      btn.classList.remove("active");
      target.classList.add("active");

      isotope.arrange({
        filter: filterOption
      });
    });
  }
});

// 通用配置项
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom"
};

// 背景视觉差
const dataSectionEl = document.querySelector(".data-section");
// 淡出动画 与 num跳动
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: el => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo"
    });

    // 初始化时差背景
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect()
      .bottom / 5}px)`;
  }
});

window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;

  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom /
      5}px)`;
  }
});

// 平滑定位滚动

const scroll = new SmoothScroll(
  'nav a[href*="#"] , .scrollToTop a[href*="#"]',
  {
    header: "header",
    offset: 80
  }
); // 选择所有锚点

document.addEventListener("scroll", () => {
  // 关闭header折叠
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});

const headerItems = document.querySelectorAll('nav a[href*="#"]');

headerItems.forEach(headerItem => {
  headerItem.addEventListener("click", () => {
    if (headerEl.classList.contains("open")) {
      headerEl.classList.remove("open");
    }
  });
});

const exploreBtnEl = document.querySelectorAll(".explore-btn");
exploreBtnEl.forEach(el => {
  el.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});

// 获取折叠按钮的实例
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});
