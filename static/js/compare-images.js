document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".compare-container.triple-compare");
  
    containers.forEach(container => {
      const sliderLeft = container.querySelector(".ci-slider-left");
      const sliderRight = container.querySelector(".ci-slider-right");
      const imgLeft   = container.querySelector(".image-left");
      const imgCenter = container.querySelector(".image-center");
      const imgRight  = container.querySelector(".image-right");

      let s1 = sliderLeft.offsetLeft;
      let s2 = sliderRight.offsetLeft;
      let activeSlider = null;
  
      function updateClipPaths() {
        const rect = container.getBoundingClientRect();
        const containerWidth = rect.width;
  
        if (s1 > s2) [s1, s2] = [s2, s1];
        imgLeft.style.clipPath = `inset(0 ${containerWidth - s1}px 0 0)`;
        imgCenter.style.clipPath = `inset(0 ${containerWidth - s2}px 0 ${s1}px)`;
        imgRight.style.clipPath = `inset(0 0 0 ${s2}px)`;
  
        sliderLeft.style.left  = s1 + "px";
        sliderRight.style.left = s2 + "px";

        const labelCenter = container.querySelector(".label-center");
        const labelLeft = container.querySelector(".label-left");
        const labelRight = container.querySelector(".label-right");

        if (labelCenter) {
            const mid = (s1 + s2) / 2;
            labelCenter.style.left = `${mid}px`;
            labelCenter.style.transform = `translateX(-50%)`;  // 中心揃え
        }
        if (labelLeft) {
            const midLeft = s1 / 2;
            labelLeft.style.left = `${midLeft}px`;
            labelLeft.style.transform = `translateX(-50%)`;
        }
        
        if (labelRight) {
            const midRight = (s2 + containerWidth) / 2;
            labelRight.style.left = `${midRight}px`;
            labelRight.style.transform = `translateX(-50%)`;
        }
      }
  
      updateClipPaths();
      sliderLeft.addEventListener("mousedown", () => { activeSlider = "left"; });
      sliderRight.addEventListener("mousedown", () => { activeSlider = "right"; });
      sliderLeft.addEventListener("touchstart", () => { activeSlider = "left"; });
      sliderRight.addEventListener("touchstart", () => { activeSlider = "right"; });
  
      const minXRatio = 0.10;  
      const maxXRatio = 0.85;
      function onMove(clientX) {
        const rect = container.getBoundingClientRect();
        const containerWidth = rect.width;
        const offsetX = clientX - rect.left;

        const minX = containerWidth * minXRatio;
        const maxX = containerWidth * maxXRatio;

        const clampedX = Math.max(minX, Math.min(offsetX, maxX));
      
        if (activeSlider === "left") {
          s1 = clampedX;
        } else if (activeSlider === "right") {
          s2 = clampedX;
        }
      
        updateClipPaths();
      }
  
      const onMouseMove = (e) => {
        if (activeSlider) {
          onMove(e.clientX);
        }
      };
      const onTouchMove = (e) => {
        if (activeSlider && e.touches.length > 0) {
          onMove(e.touches[0].clientX);
        }
      };
      const stopDragging = () => { activeSlider = null; };
  
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("mouseup", stopDragging);
      document.addEventListener("touchend", stopDragging);
    });
  });
