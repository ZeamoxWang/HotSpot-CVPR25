
document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".compare-container");
  
    containers.forEach(container => {
        const ci_slider = container.querySelector(".ci-slider");
        const leftImage = container.querySelector(".image-left");
        const updateSlider = (clientX) => {
            const rect = container.getBoundingClientRect();
            const offsetX = clientX - rect.left;
            const clampedX = Math.max(0, Math.min(offsetX, rect.width));
            ci_slider.style.left = clampedX + "px";
            leftImage.style.clipPath = `inset(0 ${rect.width - clampedX}px 0 0)`;
        };
  
        //for PC
        container.addEventListener("mousemove", (e) => {
            updateSlider(e.clientX);
        });

        // for mobilde
        container.addEventListener("touchmove", (e) => {
            if (e.touches.length > 0) {
            updateSlider(e.touches[0].clientX);
            }
        });

        // for initial tap
        container.addEventListener("touchstart", (e) => {
            if (e.touches.length > 0) {
            updateSlider(e.touches[0].clientX);
            }
        });
    });
  });