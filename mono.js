const container = document.querySelector('.slash-container');
    const slashes = container.querySelectorAll('.slash');
    const labelDiv = document.querySelector('.popup-label');
    const background = document.querySelector('.background');
    let activeSlash = null; // 记录当前激活的 slash
    let closingSlash = null; // 记录正在关闭的 slash

    // 模拟鼠标悬浮到相邻的 slash
    function simulateHover(direction) {
      if (!activeSlash) {
        // 如果没有激活的 slash，从第一个或最后一个开始
        const targetIndex = direction > 0 ? 0 : slashes.length - 1;
        openSlash(slashes[targetIndex]);
        return;
      }

      const currentIndex = Array.from(slashes).indexOf(activeSlash);
      let newIndex = currentIndex + direction;

      // 循环处理边界情况
      if (newIndex < 0) {
        newIndex = slashes.length - 1; // 到最左边时，回到最右边
      } else if (newIndex >= slashes.length) {
        newIndex = 0; // 到最右边时，回到最左边
      }

      openSlash(slashes[newIndex]);
    }

    // 关闭当前激活的 slash
    function closeActiveSlash() {
      if (activeSlash) {
        // 如果已经在关闭中，先完成关闭
        if (closingSlash) {
          closingSlash.classList.remove('hovered');
          closingSlash.style.removeProperty('--bg-image');
          closingSlash = null;
        }

        // 开始新的关闭过程
        closingSlash = activeSlash;
        activeSlash.classList.remove('active');
        
        // 等待宽度过渡完成后再完全关闭
        setTimeout(() => {
          if (closingSlash) {
            closingSlash.classList.remove('hovered');
            closingSlash.style.removeProperty('--bg-image');
            closingSlash = null;
          }
        }, 300); // 与 CSS 中的 transition 时间相同

        activeSlash = null;
      }
    }

    // 打开指定的 slash
    function openSlash(slash) {
      // 如果点击的是正在关闭的 slash，先完成关闭
      if (closingSlash === slash) {
        closingSlash.classList.remove('hovered');
        closingSlash.style.removeProperty('--bg-image');
        closingSlash = null;
      }

      // 如果点击的是当前激活的 slash，不做任何操作
      if (activeSlash === slash) {
        return;
      }

      closeActiveSlash(); // 先关闭当前激活的
      activeSlash = slash;
      slash.classList.add('hovered');
      slash.classList.add('active');
      
      // 显示简介方块并展开
      labelDiv.textContent = slash.dataset.label;
      labelDiv.style.display = 'block';
      labelDiv.classList.add('expanded');

      // 设置背景图片
      slash.style.setProperty('--bg-image', `url(${slash.dataset.img})`);
    }

    // 为每个 slash 添加鼠标进入事件
    slashes.forEach(slash => {
      slash.addEventListener('mouseenter', () => {
        openSlash(slash);
      });
    });

    // 为背景添加点击事件，点击背景时关闭当前激活的 slash
    background.addEventListener('click', (e) => {
      // 确保点击的是背景而不是其他元素
      if (e.target === background) {
        closeActiveSlash();
        // 隐藏简介方块
        labelDiv.classList.remove('expanded');
        labelDiv.style.display = 'none';
      }
    });

    // 弹出窗口
    // 获取相关 DOM
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popupTitle');
    const popupBody = document.getElementById('popupBody');

    // 点击每个 slash 元素
    document.querySelectorAll('.slash').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.getAttribute('data-title') || '无标题';
        const content = item.getAttribute('data-content') || '无内容';

        popupTitle.textContent = title;
        popupBody.innerHTML = content; // 可以填 HTML 也可以纯文字

        popup.style.display = 'block';
        document.body.classList.add('modal-open');
    });
    });

    // 关闭按钮事件
    document.querySelector('.popup-close').addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.classList.remove('modal-open');
    });
    
    // 点击遮罩层关闭弹窗
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        popup.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
    });
// 50楼小游戏///////////////
  let currentFloor = 1;

  function changeFloor(delta) {
    currentFloor += delta;
    if (currentFloor < 1) currentFloor = 1;
    if (currentFloor > 50) currentFloor = 50;
    document.getElementById('floorNum').innerText = currentFloor;
  }

  function checkFloor() {
    if (currentFloor === 50) {
      alert("おめでとう！50階に到着しました！");
      // 可替换为展示图片等
    } else {
      alert("残念！ここは " + currentFloor + " 階です！");
    }
  }
// 50楼小游戏结束///////////////