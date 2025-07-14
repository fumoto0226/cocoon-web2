// 题目数据（请根据实际图片和内容补充完善）
const questions = [
  {
    titleImg: "img/zb01-t.png",
    answer: "right",
    leftImg: "img/zb01-l.png",
    rightImg: "img/zb01-r.png",
    place: "新宿西口バスセンター",
    time: "徒歩1分",
    description: "新宿駅西口からすぐの場所にあるバスターミナルです。高速バスや空港行きのリムジンバスが多く発着し、旅行や出張に便利です。案内もわかりやすく、初めての人でも安心して利用できます。",
  },
  {
    titleImg: "img/zb02-t.png",
    answer: "right",
    leftImg: "img/zb02-l.png",
    rightImg: "img/zb02-r.png",
    place: "Alpen Tokyo",
    time: "徒歩11分",
    description: "新宿駅東口近くにあるスポーツ用品の大型専門店です。スキー、キャンプ、ランニング、フィットネスなど幅広いジャンルの商品が揃っています。",
  },
  {
    titleImg: "img/zb03-t.png",
    answer: "left",
    leftImg: "img/zb03-l.png",
    rightImg: "img/zb03-r.png",
    place: "IKEA新宿",
    time: "徒歩15分",
    description: "新宿駅西口から徒歩約5分の場所にある都市型イケア店舗です。コンパクトながらも人気の家具、収納、インテリア雑貨などが豊富に揃い、気軽に立ち寄れる便利な店舗です。",
  },
  {
    titleImg: "img/zb04-t.png",
    answer: "right",
    leftImg: "img/zb04-l.png",
    rightImg: "img/zb04-r.png",
    place: "ヨドバシカメラ 新宿西口本店",
    time: "徒歩2分",
    description: "新宿駅西口すぐそばに位置する、日本最大級の家電量販店です。カメラ、パソコン、家電、ゲーム、美容家電など何でも揃い、観光客にも人気。複数の専門館が周辺に点在し、1日中楽しめるスポットです。",
  },
  {
    titleImg: "img/zb05-t.png",
    answer: "left",
    leftImg: "img/zb05-l.png",
    rightImg: "img/zb05-r.png",
    place: "新宿駅東口広場",
    time: "徒歩8分",
    description: "新宿駅東口を出るとすぐに広がる広場で、待ち合わせや休憩に人気のスポットです。大型ビジョンや広告が目を引き、夜にはネオンが輝き、まさに「眠らない街・新宿」の象徴的な場所です。観光やショッピングのスタート地点としても便利です。",
  },
  {
    titleImg: "img/zb06-t.png",
    answer: "left",
    leftImg: "img/zb06-l.png",
    rightImg: "img/zb06-r.png",
    place: "西武新宿駅",
    time: "徒歩11分",
    description: "西武新宿駅は西武新宿線の始発駅で、新宿の繁華街に近く便利なロケーションです。新宿プリンスホテルや西武新宿PePeと直結しており、観光やショッピングにも最適です。",
  },
  {
    titleImg: "img/zb07-t.png",
    answer: "left",
    leftImg: "img/zb07-l.png",
    rightImg: "img/zb07-r.png",
    place: "ルミネ2（新宿南口）",
    time: "徒歩9分",
    description: "新宿駅南口に直結するショッピング施設「ルミネ2」は、ファッション、雑貨、コスメ、カフェなど約70店舗が揃っています。若者から大人まで楽しめるおしゃれな空間で、駅直結なので雨の日でも安心です。上階には人気のレストランやカフェもあり、待ち合わせや休憩にもぴったりなスポットです。",
  },
  {
    titleImg: "img/zb08-t.png",
    answer: "left",
    leftImg: "img/zb08-l.png",
    rightImg: "img/zb08-r.png",
    place: "SOMPO美術館",
    time: "徒歩5分",
    description: "SOMPO美術館は「ひまわり」で有名なゴッホの絵画を所蔵することで知られています。近代から現代までの国内外の名作を展示し、静かな空間でアートを楽しめるスポットです。建物は白く丸みのあるデザインが特徴的です。",
  },
  {
    titleImg: "img/zb09-t.png",
    answer: "right",
    leftImg: "img/zb09-l.png",
    rightImg: "img/zb09-r.png",
    place: "かに道楽 新宿駅前店",
    time: "徒歩10分",
    description: "巨大な動くカニ看板が目印の「かに道楽 新宿駅前店」は、新鮮なカニ料理を堪能できる人気の専門店です。お店は新宿駅東口からすぐの賑やかな「新宿サブナード」周辺に位置し、観光客にも大人気のスポットです。",
  },
  {
    titleImg: "img/zb010-t.png",
    answer: "left",
    leftImg: "img/zb010-l.png",
    rightImg: "img/zb010-r.png",
    place: "新宿西口の飲食街",
    time: "徒歩1分",
    description: "この通りは新宿西口すぐ近くにある飲食店が立ち並ぶエリアです。ラーメン、餃子、焼き鳥、居酒屋など、リーズナブルで美味しいランチを楽しめる店が豊富に揃っています。学生やビジネスマンに人気の「油そば」や「松屋」、昭和レトロな雰囲気の「焼肉ライク」など、さまざまなジャンルの料理が楽しめる、昼食に最適なスポットです。",
  },
  // 共10题
];

let currentIndex = 0;
let score = 0;
let isAnswering = false;

function renderSlashGame() {
  currentIndex = 0;
  score = 0;
  isAnswering = false;
  renderQuestion();
}
window.renderSlashGame = renderSlashGame;

function renderQuestion() {
  const zbPopup = document.getElementById('zb-popup');
  if (!zbPopup) return;
  zbPopup.className = 'zb-popup';
  const q = questions[currentIndex];
  zbPopup.innerHTML = `
    <div class="zb-score">総得点：${score}</div>
    <div class="zb-question">Cocoon Towerはどの方向にあるかな？</div>
    <div class="zb-row">
      <div class="zb-buttons">
        <button class="zb-button left" id="zb-btn-left"><img src="img/zbButton-l.svg" alt="左"></button>
      </div>
      <div class="zb-main-img"><img src="${q.titleImg}" alt="問題画像"></div>
      <div class="zb-buttons">
        <button class="zb-button right" id="zb-btn-right"><img src="img/zbButton-r.svg" alt="右"></button>
      </div>
    </div>
  `;
  document.getElementById('zb-btn-left').onclick = () => handleAnswer('left');
  document.getElementById('zb-btn-right').onclick = () => handleAnswer('right');
}

function handleAnswer(choice) {
  if (isAnswering) return;
  isAnswering = true;
  const q = questions[currentIndex];
  const isCorrect = choice === q.answer;
  if (isCorrect) score++;
  renderAnswer(isCorrect, choice);
  setTimeout(() => {
    isAnswering = false;
  }, 300);
}

function renderAnswer(isCorrect, choice) {
  const zbPopup = document.getElementById('zb-popup');
  if (!zbPopup) return;
  zbPopup.className = 'zb-popup';
  const q = questions[currentIndex];
  const answerImg = choice === 'left' ? q.leftImg : q.rightImg;
  if (isCorrect) {
    zbPopup.innerHTML = `
      <div class="zb-score">総得点：${score}</div>
      <div class="zb-result-row">
        <div class="zb-result-img"><img src="${answerImg}" alt="解答画像"></div>
        <div class="zb-result-group zb-result correct">
          <h1>正解！</h1>
          <div class="info">🏙️ ${q.place} ｜🚶 ${q.time}</div>
          <div class="desc">${q.description}</div>
        </div>
      </div>
      <button class="next-btn" id="zb-next">次へ</button>
    `;
  } else {
    zbPopup.innerHTML = `
      <div class="zb-score">総得点：${score}</div>
      <div class="zb-result-row">
        <div class="zb-result-img"><img src="${answerImg}" alt="解答画像"></div>
        <div class="zb-result-group zb-result wrong">
          <h1>不正解！</h1>
          <div class="desc">😢 この方向からはcocoon towerが見えません</div>
        </div>
      </div>
      <button class="next-btn" id="zb-next">次へ</button>
    `;
  }
  document.getElementById('zb-next').onclick = () => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      renderResult();
    }
  };
}

function renderResult() {
  const zbPopup = document.getElementById('zb-popup');
  if (!zbPopup) return;
  zbPopup.className = 'zb-popup zb-final-score';
  let title = '', comment = '';
  if (score === 10) {
    title = '新宿マスター';
    comment = 'あなたは新宿で生まれ育ったのですか！？';
  } else if (score >= 7) {
    title = '新宿エキスパート';
    comment = '新宿にとても詳しいですね！すごい！';
  } else if (score >= 4) {
    title = '新宿ビギナー';
    comment = 'もっと新宿を探検してみましょう！';
  } else {
    title = '迷子初心者';
    comment = '新宿をたくさん歩けば、きっと上達しますよ！';
  }
  zbPopup.innerHTML = `
    <h1>得点：${score}</h1>
    <h2>『${title}』</h2>
    <p>${comment}</p>
    <button class="next-btn" id="zb-restart">もう一度挑戦</button>
  `;
  document.getElementById('zb-restart').onclick = () => {
    renderSlashGame();
  };
} 