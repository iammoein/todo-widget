import { computed, reactive } from "vue";

const THERSHOLD = 60;

export const useSwipe = (threshold = THERSHOLD) => {
  const swipeObj = reactive({
    startX: 0,
    x: 0,
    isSwiping: false,
  });

  const handlePointerDown = (el) => {
    swipeObj.isSwiping = true;
    swipeObj.startX = el.clientX - swipeObj.x;
    el.target.setPointerCapture(el.pointerId);
  };

  const handlePointerMove = (el) => {
    if (!swipeObj.isSwiping) return;

    const delta = el.clientX - swipeObj.startX;
    swipeObj.x = Math.min(Math.max(delta, 0), threshold);
  };

  const handlePointerUp = () => {
    swipeObj.isSwiping = false;

    if (swipeObj.x > 0 && swipeObj.x < threshold) {
      swipeObj.x = 0;
    }
  };

  const ratio = computed(() => swipeObj.x / threshold);

  return {
    swipeObj,
    ratio,
    THERSHOLD,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
