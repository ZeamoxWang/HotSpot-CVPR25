
document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".compare-container");
  
    containers.forEach(container => {
      const ci_slider = container.querySelector(".ci-slider");
      const leftImage = container.querySelector(".image-left");
  
      container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const clampedX = Math.max(0, Math.min(offsetX, rect.width));
        ci_slider.style.left = clampedX + "px";
        leftImage.style.clipPath = `inset(0 ${rect.width - clampedX}px 0 0)`;
      });
    });
  });