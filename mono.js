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
    // 只允许向上或向下
    if (delta === 1) {
      if (currentFloor < 49) {
        currentFloor += 1;
      } else if (currentFloor >= 49 && currentFloor < 49.9) {
        currentFloor = Math.round((currentFloor + 0.1) * 10) / 10;
        if (currentFloor > 49.9) currentFloor = 49.9;
      } else if (currentFloor >= 49.9 && currentFloor < 49.99) {
        currentFloor = Math.round((currentFloor + 0.01) * 100) / 100;
        if (currentFloor > 49.99) currentFloor = 49.99;
      } else if (currentFloor >= 49.99 && currentFloor < 49.999) {
        currentFloor = Math.round((currentFloor + 0.001) * 1000) / 1000;
        if (currentFloor > 49.999) currentFloor = 49.999;
      } else if (currentFloor >= 49.999 && currentFloor < 49.9999) {
        currentFloor = Math.round((currentFloor + 0.0001) * 10000) / 10000;
        if (currentFloor > 49.9999) currentFloor = 49.9999;
      } else if (currentFloor >= 49.9999 && currentFloor < 49.99999) {
        currentFloor = Math.round((currentFloor + 0.00001) * 100000) / 100000;
        if (currentFloor > 49.99999) currentFloor = 49.99999;
      } else if (currentFloor >= 49.99999 && currentFloor < 49.999999) {
        currentFloor = Math.round((currentFloor + 0.000001) * 1000000) / 1000000;
        if (currentFloor > 49.999999) currentFloor = 49.999999;
      } else if (currentFloor >= 49.999999 && currentFloor < 49.9999999) {
        currentFloor = Math.round((currentFloor + 0.0000001) * 10000000) / 10000000;
        if (currentFloor > 49.9999999) currentFloor = 49.9999999;
      } else if (currentFloor >= 49.9999999 && currentFloor < 49.99999999) {
        currentFloor = Math.round((currentFloor + 0.00000001) * 100000000) / 100000000;
        if (currentFloor > 49.99999999) currentFloor = 49.99999999;
      } else if (currentFloor >= 49.99999999 && currentFloor < 49.999999999) {
        currentFloor = Math.round((currentFloor + 0.000000001) * 1000000000) / 1000000000;
        if (currentFloor > 49.999999999) currentFloor = 49.999999999;
      } else if (currentFloor >= 49.999999999 && currentFloor < 49.9999999999) {
        currentFloor = Math.round((currentFloor + 0.0000000001) * 10000000000) / 10000000000;
        if (currentFloor > 49.9999999999) currentFloor = 49.9999999999;
      } else if (currentFloor >= 49.9999999999 && currentFloor < 50) {
        currentFloor = 50;
      }
    } else if (delta === -1) {
      // 向下
      if (currentFloor === 50) {
        currentFloor = 49.9999999999;
      } else if (currentFloor > 49.9999999999) {
        currentFloor = 49.9999999999;
      } else if (currentFloor > 49.999999999) {
        currentFloor = 49.999999999;
      } else if (currentFloor > 49.99999999) {
        currentFloor = 49.99999999;
      } else if (currentFloor > 49.9999999) {
        currentFloor = 49.9999999;
      } else if (currentFloor > 49.999999) {
        currentFloor = 49.999999;
      } else if (currentFloor > 49.99999) {
        currentFloor = 49.99999;
      } else if (currentFloor > 49.9999) {
        currentFloor = 49.9999;
      } else if (currentFloor > 49.999) {
        currentFloor = 49.999;
      } else if (currentFloor > 49.99) {
        currentFloor = 49.99;
      } else if (currentFloor > 49.9) {
        currentFloor = 49.9;
      } else if (currentFloor > 49) {
        currentFloor = 49;
      } else if (currentFloor > 1) {
        currentFloor -= 1;
      } else {
        currentFloor = 1;
      }
    }
    document.getElementById('floorNum').innerText = currentFloor;
  }

  function checkFloor() {
    if (currentFloor === 50) {
      // 检查是否已存在图片，避免重复添加
      if (!document.getElementById('fifty-img')) {
        const popupContent = document.querySelector('.popup-content');
        // 创建图片容器
        const imgWrapper = document.createElement('div');
        imgWrapper.id = 'fifty-img-wrapper';
        imgWrapper.style.position = 'absolute';
        imgWrapper.style.top = '50%';
        imgWrapper.style.left = '50%';
        imgWrapper.style.transform = 'translate(-50%, -50%)';
        imgWrapper.style.zIndex = '100';
        imgWrapper.style.width = 'auto';
        imgWrapper.style.height = 'auto';
        // 创建图片
        const img = document.createElement('img');
        img.src = 'img/50kai.png';
        img.id = 'fifty-img';
        img.style.maxWidth = '150%';
        img.style.maxHeight = '120vh';
        img.style.display = 'block';
        img.style.top = '50px';
        img.style.left = '150px';

        // 创建关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.innerText = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '-18px';
        closeBtn.style.right = '-18px';
        closeBtn.style.background = 'rgba(0,0,0,0.5)';
        closeBtn.style.color = '#fff';
        closeBtn.style.border = 'none';
        closeBtn.style.fontSize = '24px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.width = '36px';
        closeBtn.style.height = '36px';
        closeBtn.style.borderRadius = '50%';
        closeBtn.onclick = function() {
          imgWrapper.remove();
        };
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(closeBtn);
        popupContent.appendChild(imgWrapper);
      }
    } else {
      alert("残念！ここは " + currentFloor + " 階です！");
    }
  }

  function gotoFifty() {
    currentFloor = 50;
    document.getElementById('floorNum').innerText = currentFloor;
  }

  // 保证关闭popup时图片也消失
  const popupCloseBtn = document.querySelector('.popup-close');
  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', () => {
      const imgWrapper = document.getElementById('fifty-img-wrapper');
      if (imgWrapper) imgWrapper.remove();
    });
  }
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      const imgWrapper = document.getElementById('fifty-img-wrapper');
      if (imgWrapper) imgWrapper.remove();
    }
  });
// 50楼小游戏结束///////////////