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
        const title = item.getAttribute('data-title') || '';
        const content = item.getAttribute('data-content') || '';

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
        //
      } else if (currentFloor >= 49.999999 && currentFloor < 49.9999999) {
        currentFloor = Math.round((currentFloor + 0.0000009) * 10000000) / 10000000;
        if (currentFloor > 49.9999999) currentFloor = 49.9999999;
      } else if (currentFloor >= 49.9999999 && currentFloor < 49.99999999) {
        currentFloor = Math.round((currentFloor + 0.00000009) * 100000000) / 100000000;
        if (currentFloor > 49.99999999) currentFloor = 49.99999999;
      } else if (currentFloor >= 49.99999999 && currentFloor < 49.999999999) {
        currentFloor = Math.round((currentFloor + 0.000000009) * 1000000000) / 1000000000;
        if (currentFloor > 49.999999999) currentFloor = 49.999999999;
      } else if (currentFloor >= 49.999999999 && currentFloor < 49.9999999999) {
        currentFloor = Math.round((currentFloor + 0.0000000009) * 10000000000) / 10000000000;
        if (currentFloor > 49.9999999999) currentFloor = 49.9999999999;
        //
      } else if (currentFloor >= 49.9999999999 && currentFloor < 49.99999999999) {
        currentFloor = Math.round((currentFloor + 0.00000000009) * 100000000000) / 100000000000;
        if (currentFloor > 49.99999999999) currentFloor = 49.99999999999;
      } else if (currentFloor >= 49.99999999999 && currentFloor < 49.999999999999) {
        currentFloor = Math.round((currentFloor + 0.000000000009) * 1000000000000) / 1000000000000;
        if (currentFloor > 49.999999999999) currentFloor = 49.99999999999;
      } else if (currentFloor >= 49.999999999999 && currentFloor < 49.9999999999999) {
        currentFloor = Math.round((currentFloor + 0.000000000009) * 10000000000000) / 10000000000000;
        if (currentFloor > 49.9999999999999) currentFloor = 49.9999999999999;
      } else if (currentFloor >= 49.9999999999999 && currentFloor < 49.99999999999999) {
        currentFloor = Math.round((currentFloor + 0.0000000000009) * 100000000000000) / 100000000000000;
        if (currentFloor > 49.99999999999999) currentFloor = 49.99999999999999;


      } else if (currentFloor >= 49.9999999999999999 && currentFloor < 50) {
        currentFloor = 50;
      }
    } else if (delta === -1) {
      // 向下
      if (currentFloor === 50) {
        currentFloor = 49.99999999999999;
     
      } else if (currentFloor > 49.99999999999999) {
        currentFloor = 49.9999999999999;
      } else if (currentFloor > 49.9999999999999) {
        currentFloor = 49.999999999999;
      } else if (currentFloor > 49.999999999999) {
        currentFloor = 49.99999999999;
      } else if (currentFloor > 49.99999999999) {
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
        
        // 创建图片容器 - 使用相对定位，基于popup-content
        const imgWrapper = document.createElement('div');
        imgWrapper.id = 'fifty-img-wrapper';
        imgWrapper.style.position = 'absolute';
        imgWrapper.style.top = '0';
        imgWrapper.style.left = '0';
        imgWrapper.style.width = '100%';
        imgWrapper.style.height = '100%';
        imgWrapper.style.zIndex = '100';
        imgWrapper.style.display = 'flex';
        imgWrapper.style.alignItems = 'center';
        imgWrapper.style.justifyContent = 'center';
        
        // 创建图片容器 - 相对定位，包含图片和关闭按钮
        const imgContainer = document.createElement('div');
        imgContainer.style.position = 'relative';
        imgContainer.style.display = 'inline-block';
        imgContainer.style.maxWidth = '78%';
        imgContainer.style.maxHeight = '90%';
        
        // 创建文字元素
        const textElement = document.createElement('div');
        textElement.innerHTML = 'やった〜！🎉<br>50階の景色、ついに見えたね！';
        textElement.style.position = 'absolute';
        textElement.style.top = '50px';
        textElement.style.left = '50%';
        textElement.style.transform = 'translateX(-50%)';
        textElement.style.color = '#333';
        textElement.style.fontSize = '16px';
        textElement.style.fontWeight = 'bold';
        textElement.style.textAlign = 'center';
        textElement.style.whiteSpace = 'nowrap';
        textElement.style.zIndex = '102';
        textElement.style.opacity = '0';
        textElement.style.transition = 'opacity 0.8s ease-in-out';
        
        // 创建图片
        const img = document.createElement('img');
        img.src = 'img/50kai.png';
        img.id = 'fifty-img';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.display = 'block';
        img.style.objectFit = 'contain';

        // 创建关闭按钮 - 相对于图片容器定位
        const closeBtn = document.createElement('button');
        closeBtn.innerText = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '15px';
        closeBtn.style.right = '15px';
        closeBtn.style.background = 'rgba(0,0,0,0.7)';
        closeBtn.style.color = '#fff';
        closeBtn.style.border = 'none';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.width = '30px';
        closeBtn.style.height = '30px';
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.display = 'flex';
        closeBtn.style.alignItems = 'center';
        closeBtn.style.justifyContent = 'center';
        closeBtn.style.zIndex = '101';
        closeBtn.onclick = function() {
          imgWrapper.remove();
        };
        
        imgContainer.appendChild(textElement);
        imgContainer.appendChild(img);
        imgContainer.appendChild(closeBtn);
        imgWrapper.appendChild(imgContainer);
        popupContent.appendChild(imgWrapper);
        
        // 触发文字动画
        setTimeout(() => {
          textElement.style.opacity = '1';
        }, 100);
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

// 动态调整休憩スペース点击区域大小的函数
function adjustYasumiClickAreas() {
  const yasumiGameWrapper = document.querySelector('.yasumi-game-wrapper');
  const yasumiBg = document.querySelector('.yasumi-bg');
  const clickAreas = document.querySelectorAll('.yasumi-click-area');
  
  if (!yasumiGameWrapper || !yasumiBg || clickAreas.length === 0) {
    return;
  }
  
  // 获取容器的实际尺寸
  const containerWidth = yasumiGameWrapper.offsetWidth;
  const containerHeight = yasumiGameWrapper.offsetHeight;
  
  // 获取背景图片的实际显示尺寸
  const bgRect = yasumiBg.getBoundingClientRect();
  const bgWidth = bgRect.width;
  const bgHeight = bgRect.height;
  
  // 计算缩放比例（基于背景图片的实际显示尺寸）
  const scaleX = bgWidth / 800; // 假设背景图片原始宽度为800px
  const scaleY = bgHeight / 600; // 假设背景图片原始高度为600px
  const scale = Math.min(scaleX, scaleY); // 使用较小的缩放比例
  
  // 调整每个点击区域的大小
  clickAreas.forEach(area => {
    const baseWidth = 60; // 基础宽度
    const baseHeight = 120; // 基础高度
    
    area.style.width = (baseWidth * scale) + 'px';
    area.style.height = (baseHeight * scale) + 'px';
  });
}

// 监听窗口大小变化
window.addEventListener('resize', adjustYasumiClickAreas);

// 当休憩スペース弹窗打开时调整区域大小
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('slash') && e.target.getAttribute('data-label') === '休憩スペース') {
    // 等待弹窗内容加载完成后调整
    setTimeout(adjustYasumiClickAreas, 100);
  }
});

// 休憩スペース小游戏功能
let yasumiPeopleCount = 0;

// 定义每个区域对应的hito图片
const yasumiAreaHitos = {
  '1': ['img/hito/chong02.png'],
  '2': ['img/hito04.png', 'img/hito05.png'], // 区域2对应hito4,5
  '3': ['img/hito/chong01.png'], 
  '4': ['img/hito07.png', 'img/hito08.png'], // 区域4对应hito7,8
  '5': ['img/hito09.png', 'img/hito10.png'], // 区域5对应hito9,10
  '6': ['img/hito11.png', 'img/hito12.png'], // 区域6对应hito11,12
  '7': ['img/hito/chong03.png'],
  '8': ['img/hito/chong03.png'],
  '9': ['img/hito/chong03.png'],
  '10': ['img/hito/chong03.png'],
};

// 为休憩スペース点击区域添加事件监听器
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('yasumi-click-area')) {
    const area = e.target.getAttribute('data-area');
    
    // 检查该区域是否已经有显示的人物
    const existingHito = e.target.querySelector('.yasumi-hito');
    if (existingHito) {
      return; // 如果已经有显示的人物，不重复点击
    }
    
    // 增加人数
    yasumiPeopleCount++;
    const countElement = document.getElementById('yasumiPeopleCount');
    if (countElement) {
      countElement.textContent = yasumiPeopleCount;
    }
    
    // 从对应区域的可选图片中随机选择一个
    const areaHitos = yasumiAreaHitos[area] || [];
    if (areaHitos.length === 0) {
      return; // 如果该区域没有对应的图片，不执行
    }
    const randomImage = areaHitos[Math.floor(Math.random() * areaHitos.length)];
    
    // 创建人物方块
    const hito = document.createElement('img');
    hito.src = randomImage;
    hito.className = 'yasumi-hito';
    hito.style.position = 'absolute';
    hito.style.top = '0';
    hito.style.left = '0';
    // 人物方块会完全填满点击区域，无空隙
    
    // 将人物方块添加到点击区域
    e.target.appendChild(hito);
    
    // 显示人物方块
    setTimeout(() => {
      hito.classList.add('show');
    }, 10);
    
    // 7秒后开始淡出
    setTimeout(() => {
      hito.classList.add('fade-out');
      
      // 淡出动画完成后移除元素并减少人数
      setTimeout(() => {
        hito.remove();
        yasumiPeopleCount--;
        if (countElement) {
          countElement.textContent = yasumiPeopleCount;
        }
      }, 500); // 与CSS过渡时间相同
    }, 7000);
    
    // 添加点击效果
    e.target.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
    setTimeout(() => {
      e.target.style.backgroundColor = 'transparent';
    }, 200);
  }
});