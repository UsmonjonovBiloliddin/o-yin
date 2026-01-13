import React, { useState, useEffect, useRef } from "react";

const UNIFORM_POINTS = 20;
const POWER_POINTS = Math.round(UNIFORM_POINTS * 3); 
const ChallengePoints = Math.round(UNIFORM_POINTS * 2);

// Html Css Js umumiy
const allQuestions = [
  // ---------- HTML & CSS (10 ta) ----------
  {
    id: 1,
    type: "html",
    points: UNIFORM_POINTS,
    question: "Inline elementning asosiy xususiyati qaysi?",
    options: [
      "Butun qatordan joy egallaydi",
      "Faqat vertical margin ishlaydi",
      "Kenglik va balandlik berib bo'lmaydi",
      "Har doim yangi qatordan boshlanadi",
    ],
    correctAnswer: "Kenglik va balandlik berib bo'lmaydi",
  },
  {
    id: 2,
    type: "css",
    points: UNIFORM_POINTS,
    question: "inline-block element inline'dan nimasi bilan farq qiladi?",
    options: [
      "Yangi qatordan boshlanadi",
      "width va height berish mumkin",
      "Faqat flex ichida ishlaydi",
      "Faqat margin-bottom ishlaydi",
    ],
    correctAnswer: "width va height berish mumkin",
  },
  {
    id: 3,
    type: "css",
    points: UNIFORM_POINTS,
    question: "CSS box model tarkibiga nimalar kiradi?",
    options: [
      "padding, margin, gap, border",
      "content, border, outline, gap",
      "content, padding, border, margin",
      "width, height, overflow, display",
    ],
    correctAnswer: "content, padding, border, margin",
  },
  {
    id: 4,
    type: "html",
    points: UNIFORM_POINTS,
    question: "HTML va CSS ni nechta usulda bog'lash mumkin?",
    options: ["4 ta", "3 ta", "2 ta", "5 ta"],
    correctAnswer: "3 ta",
  },
 {
  id: 5,
  type: "css",
  points: UNIFORM_POINTS,
  question: "Flex container ichidagi elementlarni gorizontal yo‘nalishda tekislash uchun qaysi CSS property ishlatiladi?",
  options: [
    "align-items",
    "justify-content",
    "flex-direction",
    "align-content",
  ],
  correctAnswer: "justify-content",
},
{
  id: 6,
  type: "css",
  points: UNIFORM_POINTS,
  question: "CSS-da text-ni markazga tekislash uchun qaysi property ishlatiladi?",
  options: [
    "align-items",
    "justify-content",
    "text-align",
    "center",
  ],
  correctAnswer: "text-align",
},
  {
    id: 7,
    type: "css",
    points: UNIFORM_POINTS,
    question: ":hover pseudo-class qachon ishlaydi?",
    options: [
      "Element fokus olganda",
      "Sichqoncha bilan surganda",
      "Element bosilganda",
      "Sichqoncha ustiga borganda",
    ],
    correctAnswer: "Sichqoncha ustiga borganda",
  },
  {
    id: 8,
    type: "css",
    points: UNIFORM_POINTS,
    question: "position: absolute qaysi elementga nisbatan joylashadi?",
    options: [
      "HTML elementiga",
      "Parent elementiga",
      "Body elementiga",
      "Eng yaqin position berilgan ota elementga",
    ],
    correctAnswer: "Eng yaqin position berilgan ota elementga",
  },
  {
    id: 9,
    type: "css",
    points: UNIFORM_POINTS,
    question: "transform: translateX(50px) nima qiladi?",
    options: [
      "Elementni aylantiradi",
      "Elementni vertikal siljitadi",
      "Elementni gorizontal siljitadi",
      "Element o'lchamini oshiradi",
    ],
    correctAnswer: "Elementni gorizontal siljitadi",
  },
  {
    id: 10,
    type: "css",
    points: UNIFORM_POINTS,
    question: "CSS animation ishlashi uchun qaysi biri majburiy?",
    options: ["@animation", "from to", "@keyframes", "animation-name"],
    correctAnswer: "@keyframes",
  },

  // ---------- SASS (3 ta) ----------
  {
    id: 11,
    type: "scss",
    points: UNIFORM_POINTS,
    question: "SASS'da mixin nima uchun ishlatiladi?",
    options: [
      "Selectorlarni birlashtirish uchun",
      "Qayta ishlatiladigan kod yozish uchun",
      "O'zgaruvchi e'lon qilish uchun",
      "Media query yaratish uchun",
    ],
    correctAnswer: "Qayta ishlatiladigan kod yozish uchun",
  },
  {
    id: 12,
    type: "scss",
    points: UNIFORM_POINTS,
    question: "@extend nima vazifa bajaradi?",
    options: [
      "Mixin ichida ishlaydi",
      "Code yozishni kamaytiradi",
      "Boshqa klass xususiyatlarini oladi",
      "Yangi class yaratadi",
    ],
    correctAnswer: "Boshqa klass xususiyatlarini oladi",
  },
  {
    id: 13,
    type: "scss",
    points: UNIFORM_POINTS,
    question: "SASS partial fayllari qanday nomlanadi?",
    options: ["style.scss", "main.scss", "_style.scss", "index.scss"],
    correctAnswer: "_style.scss",
  },

  // ---------- JavaScript (12 ta) ----------
  {
    id: 14,
    type: "js",
    points: UNIFORM_POINTS,
    question: "Array oxiriga element qo'shish uchun qaysi method ishlatiladi?",
    options: ["unshift()", "splice()", "push()", "concat()"],
    correctAnswer: "push()",
  },
  {
    id: 15,
    type: "js",
    points: UNIFORM_POINTS,
    question: "Array boshidan element o'chirish qaysi method?",
    options: ["pop()", "splice()", "shift()", "slice()"],
    correctAnswer: "shift()",
  },
  {
    id: 16,
    type: "js",
    points: UNIFORM_POINTS,
    question: "Qaysi method yangi array qaytaradi?",
    options: ["forEach()", "map()", "push()", "sort()"],
    correctAnswer: "map()",
  },
  {
    id: 17,
    type: "js",
    points: UNIFORM_POINTS,
    question: "filter() methodining natijasi nima bo'ladi?",
    options: [
      "Bitta mos element",
      "Boolean qiymat",
      "Shartga mos elementlar arrayi",
      "Index raqami",
    ],
    correctAnswer: "Shartga mos elementlar arrayi",
  },
  {
    id: 18,
    type: "js",
    points: UNIFORM_POINTS,
    question: "Stringni barcha harflarini katta qilish qaysi method?",
    options: ["toLowerCase()", "charAt()", "replace()", "toUpperCase()"],
    correctAnswer: "toUpperCase()",
  },
  {
    id: 19,
    type: "js",
    points: UNIFORM_POINTS,
    question: "Function ichida let bilan e'lon qilingan o'zgaruvchi qaysi scope?",
    options: ["Block scope", "Function scope", "Global scope", "Window scope"],
    correctAnswer: "Function scope",
  },
  {
    id: 20,
    type: "js",
    points: UNIFORM_POINTS,
    question: "setTimeout va setInterval o'rtasidagi asosiy farq nima?",
    options: [
      "Timeout tezroq ishlaydi",
      "Interval faqat callback bilan ishlaydi",
      "Interval qayta-qayta, timeout bir marta ishlaydi",
      "Ikkalasi bir xil ishlaydi",
    ],
    correctAnswer: "Interval qayta-qayta, timeout bir marta ishlaydi",
  },
  {
    id: 21,
    type: "js",
    points: UNIFORM_POINTS,
    question: "Math.random() qanday qiymat qaytaradi?",
    options: [
      "1 dan katta son",
      "Butun son",
      "0 va 1 oralig'idagi son",
      "Manfiy son",
    ],
    correctAnswer: "0 va 1 oralig'idagi son",
  },
  {
    id: 22,
    type: "js",
    points: UNIFORM_POINTS,
    question: "API'dan ma'lumot olish uchun qaysi HTTP method ishlatiladi?",
    options: ["POST", "PUT", "GET", "DELETE"],
    correctAnswer: "GET",
  },
  {
    id: 23,
    type: "js",
    points: UNIFORM_POINTS,
    question: "fetch funksiyasi qanday ishlaydi?",
    options: [
      "Sinxron ishlaydi",
      "Callback asosida",
      "Asinxron ishlaydi",
      "Faqat promise qaytarmaydi",
    ],
    correctAnswer: "Asinxron ishlaydi",
  },

  // ---------- CHALLENGE (4 ta) ----------
  {
    id: 24,
    type: "challenge",
    points: ChallengePoints,
    question: "30 soniyada 15 teg sanab bering",
    correctAnswer: "",
  },
  {
    id: 25,
    type: "challenge",
    points: ChallengePoints,
    question: "Raqib jamoa bilan oxirgi harifiga Teg aytish o'ynang ",
    correctAnswer: "",
  },
  {
    id: 26,
    type: "challenge",
    points: ChallengePoints,
    question: "30 soniyada 13 ta Array method sanab bering ",
    correctAnswer: "",
  },
  {
    id: 27,
    type: "challenge",
    points: ChallengePoints,
    question: "Api dan Get malumot olishni doskaga yozib bering !",
    correctAnswer: "",
  },

  // ---------- SUPER POWER (ENG QIYIN) ----------
  {
    id: 28,
    type: "power",
    points: POWER_POINTS,
    question:
      "Javascriptga Htmldan malumot o'tkazishni 3 ta usulini yozing Teg nomi bilan olish , Id bilan olish , Class bilan olish malumot yozib orada bo'shliq qoldiring quarSelectorAll quarSelector",
    correctAnswer:
      "getElementsByTagName getElementById getElementsByClassName",
  },
];

function App() {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [activeTeam, setActiveTeam] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    isCorrect: false,
  });
  const [powerModal, setPowerModal] = useState(false);
  const [gridState, setGridState] = useState([]);
  const [powerAnswer, setPowerAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
    const initialGrid = shuffledQuestions.map((q, i) => ({
      id: i + 1,
      question: q,
      isUsed: false,
    }));
    setGridState(initialGrid);
  }, []);

  useEffect(() => {
    if (currentQuestion?.type === "power" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion]);

  const handleBoxClick = (boxId) => {
    const box = gridState.find((b) => b.id === boxId);
    if (!box || box.isUsed) return;
    setCurrentQuestion(box.question);
    setPowerAnswer("");
    setIsAnswerCorrect(null);
  };

  const updateGridState = () => {
    const newGridState = gridState.map((box) =>
      box.question.id === currentQuestion.id ? { ...box, isUsed: true } : box
    );
    setGridState(newGridState);
    if (newGridState.every((box) => box.isUsed)) {
      setIsGameOver(true);
    }
  };

  const switchTeam = () => {
    setActiveTeam((prev) => (prev === 1 ? 2 : 1));
  };

  const handleAnswer = (isCorrect) => {
    if (!currentQuestion) return;

    const points =
      currentQuestion.type === "power"
        ? POWER_POINTS
        : currentQuestion.type === "challenge"
        ? ChallengePoints
        : UNIFORM_POINTS;

    if (currentQuestion.type === "challenge") {
      if (isCorrect) {
        activeTeam === 1
          ? setTeam1Score((s) => s + points)
          : setTeam2Score((s) => s + points);
        setFeedback({
          show: true,
          message: `✅ Bajarildi! ${points} ball qo'shildi.`,
          isCorrect: true,
        });
      } else {
        setFeedback({
          show: true,
          message: `❌ Bajarilmadi! ${points} ball qo'shilmaydi.`,
          isCorrect: false,
        });
      }

      setTimeout(() => {
        setFeedback({ show: false, message: "", isCorrect: false });
        updateGridState();
        setCurrentQuestion(null);
        switchTeam();
      }, 1500);
      return;
    }

    if (isCorrect) {
      activeTeam === 1
        ? setTeam1Score((s) => s + points)
        : setTeam2Score((s) => s + points);
      setFeedback({
        show: true,
        message: `✅ Javob to'g'ri! ${points} ball qo'shildi.`,
        isCorrect: true,
      });
    } else {
      setFeedback({
        show: true,
        message: "❌ Javob xato! Ball qo'shilmaydi.",
        isCorrect: false,
      });
    }

    setTimeout(() => {
      setFeedback({ show: false, message: "", isCorrect: false });
      updateGridState();
      setCurrentQuestion(null);
      switchTeam();
    }, 1500);
  };

  const checkPowerAnswer = () => {
    if (!powerAnswer.trim()) return;

    const userAnswer = powerAnswer.toLowerCase().trim();
    const correctAnswer = currentQuestion.correctAnswer.toLowerCase().trim();

    // Tekshirishni soddalashtiramiz
    const keywords = ["getelementsbytagname", "getelementbyid", "getelementsbyclassname"];
    
    // User javobida kalit so'zlarni qidirish
    const hasKeywords = keywords.some(keyword => 
      userAnswer.includes(keyword)
    );

    if (hasKeywords) {
      setIsAnswerCorrect(true);
      setTimeout(() => {
        setPowerModal(true);
      }, 1500);
    } else {
      setIsAnswerCorrect(false);
      setFeedback({
        show: true,
        message: "❌ Javob xato! Power savoldan ball olmaydi.",
        isCorrect: false,
      });
      
      setTimeout(() => {
        setFeedback({ show: false, message: "", isCorrect: false });
        updateGridState();
        setCurrentQuestion(null);
        setPowerAnswer("");
        setIsAnswerCorrect(null);
        switchTeam();
      }, 2000);
    }
  };

  const handlePowerChoice = (choice) => {
    const pointsToAward = POWER_POINTS;
    if (choice === "add") {
      activeTeam === 1
        ? setTeam1Score((s) => s + pointsToAward)
        : setTeam2Score((s) => s + pointsToAward);
    } else {
      activeTeam === 1
        ? setTeam2Score((s) => Math.max(0, s - pointsToAward))
        : setTeam1Score((s) => Math.max(0, s - pointsToAward));
    }
    setPowerModal(false);
    updateGridState();
    setCurrentQuestion(null);
    setPowerAnswer("");
    setIsAnswerCorrect(null);
    switchTeam();
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    if (team1Name.trim() && team2Name.trim()) {
      setIsGameStarted(true);
    }
  };

  const getWinnerName = () => {
    if (team1Score > team2Score) return team1Name;
    if (team2Score > team1Score) return team2Name;
    return "Durang";
  };

  if (!isGameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex items-center justify-center p-4">
        <div className="bg-gray-900 p-10 rounded-3xl max-w-md w-full text-center border-2 border-gray-700 shadow-2xl">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Jamoa Nomlarini Kiriting
          </h1>
          <form onSubmit={handleStartGame} className="flex flex-col space-y-6">
            <input
              type="text"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              placeholder="1-Jamoa nomi"
              className="p-4 rounded-xl bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              placeholder="2-Jamoa nomi"
              className="p-4 rounded-xl bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
              O'yinni Boshlash
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex items-center justify-center p-4 text-center">
        <div className="bg-gray-900 p-12 rounded-3xl max-w-lg w-full border-2 border-gray-700 shadow-2xl">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            O'yin Tugadi!
          </h1>
          <h2 className="text-3xl mb-8 font-bold">
            {getWinnerName() === "Durang"
              ? "🎯 O'yin durang bilan tugadi!"
              : `🏆 Yutgan jamoa: ${getWinnerName()}!`}
          </h2>
          <div className="flex justify-center space-x-8 mb-10">
            <div className="text-center">
              <div className="text-2xl font-semibold text-blue-300">{team1Name}</div>
              <div className="text-4xl font-black text-blue-400 mt-2">{team1Score}</div>
            </div>
            <div className="text-2xl font-bold text-gray-500">VS</div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-purple-300">{team2Name}</div>
              <div className="text-4xl font-black text-purple-400 mt-2">{team2Score}</div>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 px-10 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Yana o'ynash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex flex-col items-center p-4">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Savollar O'yini
        </h1>
        <p className="text-xl text-gray-300">Jamoalar uchun interaktiv savollar o'yini</p>
      </div>

      <div className="flex flex-col md:flex-row justify-around w-full max-w-6xl mb-10 space-y-6 md:space-y-0 md:space-x-6">
        {[
          { name: team1Name, score: team1Score },
          { name: team2Name, score: team2Score },
        ].map((team, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-2xl shadow-2xl w-full transition-all duration-300 ${
              activeTeam === idx + 1
                ? "scale-105 border-4 border-blue-500 bg-gray-900/80"
                : "border-2 border-gray-700 bg-gray-900/60"
            }`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${activeTeam === idx + 1 ? 'text-blue-300' : 'text-purple-300'}`}>
              {team.name}
            </h2>
            <p className={`text-7xl font-black text-center ${activeTeam === idx + 1 ? 'text-blue-400' : 'text-purple-400'}`}>
              {team.score}
            </p>
            <div className="text-center mt-4">
              <span className={`px-4 py-2 rounded-lg ${activeTeam === idx + 1 ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>
                {activeTeam === idx + 1 ? '🎯 Joriy jamoa' : 'Kutish'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-6xl mb-10">
        {gridState.map((box) => (
          <button
            key={box.id}
            onClick={() => handleBoxClick(box.id)}
            disabled={box.isUsed || currentQuestion}
            className={`flex items-center justify-center p-5 rounded-xl text-3xl font-extrabold transition-all duration-300 transform ${
              box.isUsed
                ? "bg-gray-800 cursor-not-allowed text-gray-500 border-2 border-gray-700"
                : "bg-gradient-to-br from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 hover:scale-110 border-2 border-gray-600"
            }`}
          >
            {box.id}
          </button>
        ))}
      </div>

      {feedback.show && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className={`p-10 rounded-3xl max-w-lg w-full text-center ${feedback.isCorrect ? 'bg-gradient-to-br from-green-900 to-emerald-900 border-4 border-green-500' : 'bg-gradient-to-br from-red-900 to-rose-900 border-4 border-red-500'} shadow-2xl`}>
            <h2 className="text-2xl font-bold text-white mb-4">
              {feedback.message}
            </h2>
            <div className="text-4xl mt-6">
              {feedback.isCorrect ? '🎉' : '❌'}
            </div>
          </div>
        </div>
      )}

      {currentQuestion && currentQuestion.type !== "power" && !powerModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-40">
          <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center border-4 border-gray-700">
            <h3 className="text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text">
              {currentQuestion.type === "quiz"
                ? "📝 Savol"
                : currentQuestion.type === "challenge"
                ? "⚡ Topshiriq"
                : "❓ Savol"}
            </h3>
            <p className="text-2xl text-yellow-400 mb-4">
              {currentQuestion.type === "challenge"
                ? `🏆 ${ChallengePoints} ball`
                : `⭐ ${UNIFORM_POINTS} ball`}
            </p>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed">
              {currentQuestion.question}
            </p>

            {currentQuestion.type !== "challenge" && (
              <div className="flex flex-col space-y-4">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(option === currentQuestion.correctAnswer)
                    }
                    className="bg-gray-800 text-white rounded-xl py-4 px-6 text-lg font-semibold hover:bg-gray-700 transition-all duration-300 border-2 border-gray-700"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "challenge" && (
              <div className="flex justify-center mt-8 space-x-6">
                <button
                  onClick={() => handleAnswer(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl py-4 px-10 text-lg font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-lg"
                >
                  ✅ Bajarildi
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-xl py-4 px-10 text-lg font-semibold hover:from-red-700 hover:to-rose-800 transition-all duration-300 shadow-lg"
                >
                  ❌ Bajarilmadi
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {currentQuestion && currentQuestion.type === "power" && !powerModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-40">
          <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center border-4 border-yellow-600">
            <div className="flex justify-center mb-6">
              <span className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full text-lg font-bold">
                ⚡ SUPER SAVOL ⚡
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
              {POWER_POINTS} ball
            </h3>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {currentQuestion.question}
            </p>

            <div className="mb-8">
              <textarea
                ref={inputRef}
                value={powerAnswer}
                onChange={(e) => setPowerAnswer(e.target.value)}
                placeholder="Javobingizni bu yerga yozing..."
                className="w-full p-5 rounded-xl bg-gray-800 border-2 border-yellow-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent min-h-[150px] resize-none text-lg"
                rows={5}
              />
              {isAnswerCorrect !== null && (
                <div
                  className={`mt-4 p-4 rounded-xl ${
                    isAnswerCorrect
                      ? "bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-500 text-green-300"
                      : "bg-gradient-to-r from-red-900/50 to-rose-900/50 border-2 border-red-500 text-red-300"
                  }`}
                >
                  <p className="font-semibold text-[14px]">
                    {isAnswerCorrect
                      ? "✅ Javobingiz qabul qilindi! Ballarni tanlash uchun tayyorlanmoqda..."
                      : "❌ Javob xato! Power savoldan ball olmaydi."}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={checkPowerAnswer}
              disabled={!powerAnswer.trim()}
              className={`py-4 px-12 rounded-xl text-lg font-bold transition-all duration-300 ${
                powerAnswer.trim()
                  ? "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-lg"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              🔍 Tekshirish
            </button>
          </div>
        </div>
      )}

      {powerModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-12 rounded-3xl shadow-2xl max-w-xl w-full text-center border-4 border-yellow-600">
            <h3 className="text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
              🎉 Tabriklaymiz!
            </h3>
            <p className="text-2xl text-yellow-400 mb-4">
              Super Savolga to'g'ri javob berdingiz!
            </p>
            <p className="text-xl text-gray-300 mb-10">
              {POWER_POINTS} ballni qanday taqsimlamiz?
            </p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button
                onClick={() => handlePowerChoice("add")}
                className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl py-5 px-8 text-lg font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-lg"
              >
                ➕ O'zingizga qo'shish
              </button>
              <button
                onClick={() => handlePowerChoice("deduct")}
                className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-xl py-5 px-8 text-lg font-bold hover:from-red-700 hover:to-rose-800 transition-all duration-300 shadow-lg"
              >
                ➖ Raqibdan ayirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;