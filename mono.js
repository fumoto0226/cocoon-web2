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
        const label = item.getAttribute('data-label') || '';

        popupTitle.textContent = title;
        popupBody.innerHTML = content; // 可以填 HTML 也可以纯文字

        // 根据标签决定使用哪种样式
        if (label === '建物外観/歴史' || label === '教室') {
            popupBody.className = 'popup-body2';
        } else {
            popupBody.className = 'popup-body';
        }

        popup.style.display = 'block';
        document.body.classList.add('modal-open');
        
        // 如果是公共设施，初始化Quiz游戏
        if (label === '公共施設') {
            setTimeout(() => {
                initQuizGame();
            }, 100);
        }
        // 如果是周辺，动态加载slash-popup.js并初始化slash游戏
        if (label === '周辺') {
            setTimeout(() => {
                if (!window.slashPopupLoaded) {
                    const script = document.createElement('script');
                    script.src = 'slash-popup.js';
                    script.onload = () => {
                        window.slashPopupLoaded = true;
                        if (typeof window.renderSlashGame === 'function') window.renderSlashGame();
                    };
                    document.body.appendChild(script);
                } else {
                    if (typeof window.renderSlashGame === 'function') window.renderSlashGame();
                }
            }, 100);
        }
    });
    });

    // 关闭按钮事件
    document.querySelector('.popup-close').addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.classList.remove('modal-open');
    // 重置样式类
    popupBody.className = 'popup-body';
    });
    
    // 点击遮罩层关闭弹窗
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        popup.style.display = 'none';
        document.body.classList.remove('modal-open');
        // 重置样式类
        popupBody.className = 'popup-body';
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
      } else if (currentFloor >= 49.99999999999999 && currentFloor < 50) {
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
      showFiftyPopup();
    } else {
      alert("残念！ここは " + currentFloor + " 階です！");
    }
  }

  function showFiftyPopup() {
    const modal = document.getElementById('fifty-img-popup');
    if (!modal) return;
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    // 文字淡入动画
    setTimeout(() => {
      const text = document.getElementById('fifty-popup-text');
      if (text) text.style.opacity = '1';
    }, 100);
    // 关闭按钮
    const closeBtn = modal.querySelector('.popup-close');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        // 文字淡出
        const text = document.getElementById('fifty-popup-text');
        if (text) text.style.opacity = '0';
      };
    }
    // 点击遮罩关闭
    modal.onclick = function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        const text = document.getElementById('fifty-popup-text');
        if (text) text.style.opacity = '0';
      }
    };
  }

  function gotoFifty() {
    currentFloor = 50;
    document.getElementById('floorNum').innerText = currentFloor;
  }

  // 保证关闭popup时图片也消失
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

// 满员提示弹窗功能
function showFullCapacityAlert() {
  const alertContainer = document.getElementById('alertContainer');
  
  // 创建弹窗元素
  const alertBox = document.createElement('div');
  alertBox.className = 'alert-box';
  alertBox.innerHTML = `
    <div class="emoji">🏆</div>
    <div class="text">
      <div class="title">「 満員御礼 」</div>
      <div class="desc">もう誰も座れない…！？</div>
    </div>
  `;
  
  // 添加到容器
  alertContainer.appendChild(alertBox);
  
  // 4.5秒后开始淡出
  setTimeout(() => {
    alertBox.classList.add('alert-fadeout');
    
    // 4秒后从页面移除
    setTimeout(() => {
      if (alertBox.parentNode) {
        alertBox.parentNode.removeChild(alertBox);
      }
    }, 1000); // 淡出动画1秒后移除
  }, 4000);
}



// 定义每个区域对应的hito图片
const yasumiAreaHitos = {
  '1': ['img/hito/chong02.png', 'img/hito/masuda04-3.png','img/hito/so04-3.png'],
  '2': ['img/hito04.png', 'img/hito05.png'], // 区域2对应hito4,5
  '3': ['img/hito/chong01.png', 'img/hito/so01.png'], 
  '4': ['img/hito/takei01.png', 'img/hito/masuda03.png'], // 区域4对应hito7,8
  '5': ['img/hito09.png', 'img/hito10.png'], // 区域5对应hito9,10
  '6': ['img/hito/takei02-3.png',  'img/hito/so02-3.png'], 
  '7': [ 'img/hito/takei02-2.png', 'img/hito/chong03-2.png', 'img/hito/so02-2.png'],
  '8': ['img/hito/masuda06-2.png', 'img/hito/masuda04.png', 'img/hito/takei03-2.png'],
  '9': ['img/hito/so03.png', 'img/hito/masuda05.png', 'img/hito/masuda04-2.png',],
  '10': ['img/hito/chong03.png', 'img/hito/masuda02.png', 'img/hito/takei04.png'],
  '11': ['img/hito/masuda01.png'],
  '12': ['img/hito/chong03.png'],
  '13': ['img/hito/mimi01.png'],
};

// 为休憩スペース点击区域添加事件监听器
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('yasumi-click-area')) {
    // 隐藏提示文字
    const hint = document.getElementById('yasumiHint');
    if (hint) {
      hint.style.display = 'none';
    }
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
    
    // 检查是否达到满员状态（10人）
    if (yasumiPeopleCount === 10) {
      showFullCapacityAlert();
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
    
   
  }
});

// 50楼到达页渐显动画
function handleFiftyFadeBlocks() {
  const popup = document.getElementById('fifty-img-popup');
  if (!popup) return;
  const popupBody = popup.querySelector('.popup-body');
  if (!popupBody) return;
  const blocks = popupBody.querySelectorAll('.fifty-fade-block');
  const bodyRect = popupBody.getBoundingClientRect();
  const bodyTop = bodyRect.top;
  const bodyHeight = bodyRect.height;
  const bodyCenter = bodyTop + bodyHeight / 2;
  blocks.forEach(block => {
    if (block.classList.contains('faded')) return; // 只执行一次渐显
    const rect = block.getBoundingClientRect();
    const blockCenter = rect.top + rect.height / 2;
    // 判断块的中心是否接近内容区中心
    if (Math.abs(blockCenter - bodyCenter) < rect.height / 3) {
      block.classList.add('faded'); // 添加faded类，渐显
    }
  });
}
// 监听50楼popup内容区滚动
function setupFiftyFadeBlocksScroll() {
  const popup = document.getElementById('fifty-img-popup');
  if (!popup) return;
  const popupBody = popup.querySelector('.popup-body');
  if (!popupBody) return;
  popupBody.addEventListener('scroll', handleFiftyFadeBlocks, { passive: true });
  // 初次弹窗显示时也触发一次
  handleFiftyFadeBlocks();
}
// 在showFiftyPopup中弹窗显示后调用setupFiftyFadeBlocksScroll
const oldShowFiftyPopup = window.showFiftyPopup;
window.showFiftyPopup = function() {
  if (oldShowFiftyPopup) oldShowFiftyPopup();
  setupFiftyFadeBlocksScroll();
};

// Quiz 游戏数据
const quizData = [
  {
    question: 'コクーンタワーの自動販売機って、どれですか？',
    options: [
      { 
        img: 'img/koko01-1.png', 
        correct: true, 
        title: 'コクーンタワーの自動販売機',
        desc: 'こちらがコクーンタワー内の正しい自動販売機です。学生や教職員が利用できる便利な設備で、飲み物を購入できます。'
      },
      { 
        img: 'img/koko01-2.png', 
        correct: false, 
        title: '地下鉄の自動販売機',
        desc: 'こちらはコクーンタワーとは地下鉄にある自動販売機です。外観が似ていますが、設置場所が異なります。'
      }
    ]
  },
  {
    question: 'コクーンタワーのエレベーターは、どれですか？',
    options: [
      { 
        img: 'img/koko02-1.png', 
        correct: false, 
        title: '他のビルのエレベーター',
        desc: 'コクーンタワー以外の建物にある一般的なエレベーターです。壁のデザインやボタン配置が異なります。'
      },
      { 
        img: 'img/koko02-2.png', 
        correct: true, 
        title: 'コクーンタワーのエレベーター',
        desc: 'こちらがコクーンタワー内の正しいエレベーターです。銀色のドット模様の内装が特徴、50階建てのビルを効率的に移動できる重要な設備です。'
      }
    ]
  },
  {
    question: 'コクーンタワーの階段は、どれですか？',
    options: [
      { 
        img: 'img/koko03-1.png', 
        correct: true, 
        title: 'コクーンタワーの階段',
        desc: 'こちらがコクーンタワー内の正しい階段です。緊急時や運動不足解消に利用できる重要な避難経路です。'
      },
      { 
        img: 'img/koko03-2.png', 
        correct: false, 
        title: '他の建物の階段',
        desc: 'こちらはコクーンタワーとは別の建物にある階段です。構造が似ていますが、設置場所が異なります。'
      }
    ]
  },
  {
    question: 'コクーンタワーの椅子は、どれですか？',
    options: [
      { 
        img: 'img/koko04-1.png', 
        correct: false, 
        title: 'サイゼリヤの椅子',
        desc: '飲食チェーン「サイゼリヤ」で使用されているデザイン性のある椅子です。コクーンタワーとは関係ありません。'
      },
      { 
        img: 'img/koko04-2.png', 
        correct: true, 
        title: 'コクーンタワーの椅子',
        desc: 'コクーンタワー校内の共有スペースに置かれている椅子です。近未来的なデザインが特徴です。'
      }
    ]
  },
  {
    question: 'コクーンタワーの掃除用具置き場は、どれですか？',
    options: [
      { 
        img: 'img/koko05-1.png', 
        correct: false, 
        title: '地下鉄の掃除用具置き場',
        desc: '地下鉄の駅構内で見られる清掃用具です。大型の機械などが雑多に置かれています。'
      },
      { 
        img: 'img/koko05-2.png', 
        correct: true, 
        title: 'コクーンタワーの掃除用具置き場',
        desc: '整理整頓された掃除用具置き場です。清潔感があり、場所もわかりやすく設計されています。'
      }
    ]
  },
  {
    question: 'コクーンタワーの消火器は、どれですか？',
    options: [
      { 
        img: 'img/koko06-1.png', 
        correct: true, 
        title: 'コクーンタワーの消火器',
        desc: 'コクーンタワーの廊下に設置された消火器です。壁にしっかりと収納されており、安全対策が施されています。'
      },
      { 
        img: 'img/koko06-2.png', 
        correct: false, 
        title: '道ばたの猫',
        desc: 'どこにでもいそうな猫です。コクーンタワーとは関係ありませんが、可愛いので掲載してみました。'
      }
    ]
  },
];

// Quiz 游戏状态
let currentQuestionIndex = 0;
let userAnswers = [];
let quizInitialized = false;

// 初始化Quiz游戏
function initQuizGame() {
  if (quizInitialized) return;
  
  currentQuestionIndex = 0;
  userAnswers = [];
  quizInitialized = true;
  
  showQuestion(currentQuestionIndex);
  
  // 添加点击事件
  const choices = document.querySelectorAll('.choice');
  choices.forEach(choice => {
    choice.addEventListener('click', handleChoiceClick);
  });
}

// 显示问题
function showQuestion(index) {
  if (index >= quizData.length) {
    showResults();
    return;
  }
  
  const question = quizData[index];
  const quizQuestion = document.getElementById('quizQuestion');
  const choices = document.querySelectorAll('.choice');
  
  quizQuestion.textContent = question.question;
  
  choices.forEach((choice, i) => {
    choice.src = question.options[i].img;
    choice.dataset.answer = question.options[i].correct;
  });
  
  // 重置样式
  document.querySelectorAll('.choice-wrapper').forEach(wrapper => {
    wrapper.classList.remove('correct', 'wrong');
  });
  
  document.querySelectorAll('.choice-result').forEach(result => {
    result.textContent = '';
  });
}

// 处理选择点击
function handleChoiceClick(e) {
  const choice = e.target;
  const wrapper = choice.closest('.choice-wrapper');
  const result = wrapper.querySelector('.choice-result');
  const isCorrect = choice.dataset.answer === 'true';
  
  // 记录用户答案
  userAnswers.push({
    questionIndex: currentQuestionIndex,
    selectedAnswer: choice.dataset.answer === 'true' ? 0 : 1,
    isCorrect: isCorrect
  });
  
  // 显示结果
  if (isCorrect) {
    wrapper.classList.add('correct');
    result.textContent = '正解！';
  } else {
    wrapper.classList.add('wrong');
    result.textContent = '残念！';
  }
  
  // 禁用点击
  document.querySelectorAll('.choice').forEach(c => {
    c.style.pointerEvents = 'none';
  });
  
  // 0.6秒后下一题
  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
    
    // 重新启用点击
    document.querySelectorAll('.choice').forEach(c => {
      c.style.pointerEvents = 'auto';
    });
  }, 600);
}

// 显示结果页面
function showResults() {
  const quizContent = document.getElementById('quizContent');
  const quizResult = document.getElementById('quizResult');
  
  quizContent.style.display = 'none';
  quizResult.style.display = 'block';
  
  // 生成结果内容
  let resultHTML = '<h2 style="text-align: center; margin-bottom: 30px; color: #333;"></h2>';
  
  userAnswers.forEach((answer, index) => {
    const question = quizData[index];
    const selectedOption = question.options[answer.selectedAnswer];
    const correctOption = question.options.find(opt => opt.correct);
    
    const isCorrect = answer.isCorrect;
    const displayOption = isCorrect ? correctOption : selectedOption;
    
    resultHTML += `
      <div class="result-item">
        <img src="${displayOption.img}" alt="${displayOption.title}">
        <div class="result-text">
          <div class="${isCorrect ? 'correct-badge' : 'wrong-badge'}">
            ${isCorrect ? '正解' : '不正解'}
          </div>
          <h3>${displayOption.title}</h3>
          <p>${displayOption.desc}</p>
        </div>
      </div>
    `;
  });
  
  quizResult.innerHTML = resultHTML;
}

// 重置Quiz状态
function resetQuiz() {
  quizInitialized = false;
  currentQuestionIndex = 0;
  userAnswers = [];
  
  const quizContent = document.getElementById('quizContent');
  const quizResult = document.getElementById('quizResult');
  
  if (quizContent) quizContent.style.display = 'block';
  if (quizResult) quizResult.style.display = 'none';
}

// 弹窗关闭时重置Quiz
const oldCloseBtn = document.querySelector('.popup-close');
if (oldCloseBtn) {
  const originalClickHandler = oldCloseBtn.onclick;
  oldCloseBtn.addEventListener('click', () => {
    resetQuiz();
    if (originalClickHandler) originalClickHandler();
  });
}

const oldPopup = document.getElementById('popup');
if (oldPopup) {
  const originalClickHandler = oldPopup.onclick;
  oldPopup.addEventListener('click', function(e) {
    if (e.target === this) {
      resetQuiz();
    }
    if (originalClickHandler) originalClickHandler.call(this, e);
  });
}

