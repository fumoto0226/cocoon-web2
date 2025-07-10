/********************************************
 *            标题鼠标互动效果               *
 *          适用于所有主要页面               *
 ********************************************/

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有标题元素
  const title = document.querySelector('.title');
  const title2 = document.querySelector('.title2');
  const title3 = document.querySelector('.title3');
  
  // 获取所有字符 span 元素
  const titleSpans = title ? title.querySelectorAll('span') : [];
  const title2Spans = title2 ? title2.querySelectorAll('span') : [];
  const title3Spans = title3 ? title3.querySelectorAll('span') : [];

  // 使用 requestAnimationFrame 优化性能
  let animationId = null;

  // 处理鼠标移动事件的函数
  function handleMouseMove(e, container, spans) {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    animationId = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();
      const radius = 100; // 影响半径 px

      spans.forEach(span => {
        const spanRect = span.getBoundingClientRect();
        const spanCenterX = spanRect.left + spanRect.width / 2;
        const spanCenterY = spanRect.top + spanRect.height / 2;

        const dx = e.clientX - spanCenterX;
        const dy = e.clientY - spanCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          // 距离越近 scale 越大（最大 1.5，最小 1.0）
          const scale = 1 + (1 - dist / radius) * 0.5;
          // 距离越近透明度越低（中心50%透明度）
          const opacity = 0.5 + (dist / radius) * 0.5;
          span.style.transform = `scale(${scale})`;
          span.style.opacity = opacity;
        } else {
          span.style.transform = 'scale(1)';
          span.style.opacity = '1';
        }
      });
    });
  }

  // 处理鼠标离开事件的函数
  function handleMouseLeave(spans) {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    spans.forEach(span => {
      span.style.transform = 'scale(1)';
      span.style.opacity = '1';
    });
  }

  // 为 title 添加事件监听（如果存在）
  if (title && titleSpans.length > 0) {
    title.addEventListener('mousemove', (e) => handleMouseMove(e, title, titleSpans));
    title.addEventListener('mouseleave', () => handleMouseLeave(titleSpans));
  }

  // 为 title2 添加事件监听（如果存在）
  if (title2 && title2Spans.length > 0) {
    title2.addEventListener('mousemove', (e) => handleMouseMove(e, title2, title2Spans));
    title2.addEventListener('mouseleave', () => handleMouseLeave(title2Spans));
  }

  // 为 title3 添加事件监听（如果存在）
  if (title3 && title3Spans.length > 0) {
    title3.addEventListener('mousemove', (e) => handleMouseMove(e, title3, title3Spans));
    title3.addEventListener('mouseleave', () => handleMouseLeave(title3Spans));
  }
}); 