import React, { useState, useEffect } from "react";

// Barcha savollar uchun bir xil ball
const UNIFORM_POINTS = 20;
// "Super Savol" uchun 1,5 baravar ko'proq ball
const POWER_POINTS = Math.round(UNIFORM_POINTS * 2);

// O'zbek tilidagi savollar va topshiriqlar

const allQuestions = [
  // ========== HTML (1–12) ==========
  {
    id: 1,
    type: "quiz",
    question: "HTMLda <title> tegi noto‘g‘ri ishlatilgan ta’rif qaysi?",
    options: [
      "Brauzer yorlig‘ida nom ko‘rsatadi",
      "SEO uchun muhim hisoblanadi",
      "Sahifa ichida asosiy sarlavha sifatida chiqadi",
      "Bookmark qo‘shilganda nom sifatida ko‘rinadi",
    ],
    answer: "Sahifa ichida asosiy sarlavha sifatida chiqadi",
    points: UNIFORM_POINTS,
  },
  {
    id: 2,
    type: "quiz",
    question: "HTMLda <section> va <div> o‘rtasidagi asosiy farq nima?",
    options: [
      "Hech qanday farq yo‘q",
      "<section> semantik, <div> oddiy konteyner",
      "<div> faqat flex uchun ishlaydi",
      "<section> faqat <head> ichida yoziladi",
    ],
    answer: "<section> semantik, <div> oddiy konteyner",
    points: UNIFORM_POINTS,
  },
  {
    id: 3,
    type: "quiz",
    question: "HTMLda title atributi nima uchun ishlatiladi?",
    options: [
      "Faqat <title> tegida",
      "Faqat <a> tegida",
      "Deyarli barcha tegda qo‘shimcha tooltip ko‘rsatadi",
      "Faqat <head> bo‘limida",
    ],
    answer: "Deyarli barcha tegda qo‘shimcha tooltip ko‘rsatadi",
    points: UNIFORM_POINTS,
  },
  {
    id: 4,
    type: "quiz",
    question: "HTMLda video autoplay atributi cheklovi qaysi?",
    options: [
      "Har doim avtomatik o‘ynaydi",
      "Faqat .mp4 formatida ishlaydi",
      "Ovoz bo‘lsa autoplay bloklanadi",
      "Faqat Safari’da ishlamaydi",
    ],
    answer: "Ovoz bo‘lsa autoplay bloklanadi",
    points: UNIFORM_POINTS,
  },
  {
    id: 5,
    type: "quiz",
    question: "HTMLda <meta viewport> nima vazifa bajaradi?",
    options: [
      "Mobil qurilmaga moslashtirish",
      "Fayl hajmini kamaytirish",
      "CSS kodini ulash",
      "Brauzer rang sxemasini o‘zgartirish",
    ],
    answer: "Mobil qurilmaga moslashtirish",
    points: UNIFORM_POINTS,
  },
  {
    id: 6,
    type: "quiz",
    question: "HTMLda placeholder atributi noto‘g‘ri ishlatilgan misolni toping:",
    options: [
      "<input placeholder='Ism kiriting'>",
      "<textarea placeholder='Izoh yozing'></textarea>",
      "<title placeholder='Test'>",
      "<input type='email' placeholder='Email'>",
    ],
    answer: "<title placeholder='Test'>",
    points: UNIFORM_POINTS,
  },
  {
    id: 7,
    type: "quiz",
    question: "HTMLda accessibility uchun qaysi atribut muhim?",
    options: ["alt", "src", "href", "rel"],
    answer: "alt",
    points: UNIFORM_POINTS,
  },
  {
    id: 8,
    type: "quiz",
    question: "HTMLda <iframe> qanday vazifa bajaradi?",
    options: [
      "Sahifa ichiga boshqa sahifani qo‘yadi",
      "Fonni o‘zgartiradi",
      "Scriptni yuklaydi",
      "Faqat video uchun ishlatiladi",
    ],
    answer: "Sahifa ichiga boshqa sahifani qo‘yadi",
    points: UNIFORM_POINTS,
  },
  {
    id: 9,
    type: "quiz",
    question: "HTMLda <noscript> nima uchun kerak?",
    options: [
      "CSS ishlamasa matn ko‘rsatadi",
      "JavaScript o‘chirilganda alternativ matn ko‘rsatadi",
      "Har doim SEO uchun qo‘shiladi",
      "Audio qo‘shish uchun",
    ],
    answer: "JavaScript o‘chirilganda alternativ matn ko‘rsatadi",
    points: UNIFORM_POINTS,
  },
  {
    id: 10,
    type: "quiz",
    question: "HTMLda qaysi teg blok elementi hisoblanadi?",
    options: ["<span>", "<strong>", "<p>", "<img>"],
    answer: "<p>",
    points: UNIFORM_POINTS,
  },
  {
    id: 11,
    type: "quiz",
    question: "HTMLda inline elementga misol qaysi?",
    options: ["<div>", "<h1>", "<span>", "<section>"],
    answer: "<span>",
    points: UNIFORM_POINTS,
  },
  {
    id: 12,
    type: "quiz",
    question: "HTMLda global atributlardan biri noto‘g‘ri berilgan:",
    options: ["class", "id", "style", "margin"],
    answer: "margin",
    points: UNIFORM_POINTS,
  },

  // ========== CSS (13–25) ==========
  {
    id: 13,
    type: "quiz",
    question: "Flexboxda justify-content: space-between; nima qiladi?",
    options: [
      "Elementlarni chapga yig‘adi",
      "Elementlarni markazlashtiradi",
      "Elementlarni ikki chetga joylashtiradi",
      "Elementlarni vertical qiladi",
    ],
    answer: "Elementlarni ikki chetga joylashtiradi",
    points: UNIFORM_POINTS,
  },
  {
    id: 14,
    type: "quiz",
    question: "CSS transform: rotate(90deg); nima qiladi?",
    options: [
      "Elementni 90px buradi",
      "Elementni 90 daraja aylantiradi",
      "Elementni chapga 90px suradi",
      "Elementni vertikal cho‘zadi",
    ],
    answer: "Elementni 90 daraja aylantiradi",
    points: UNIFORM_POINTS,
  },
  {
    id: 15,
    type: "quiz",
    question: "CSSda @keyframes sintaksisi to‘g‘ri berilgan javob qaysi?",
    options: [
      "@keyframes move {0%{left:0;} 100%{left:100px;}}",
      "keyframes move {0%{left:0;} 100%{left:100px;}}",
      "@animation move {…}",
      "animation: keyframes {…}",
    ],
    answer: "@keyframes move {0%{left:0;} 100%{left:100px;}}",
    points: UNIFORM_POINTS,
  },
  {
    id: 16,
    type: "quiz",
    question: "CSS transform: scale(2); nima qiladi?",
    options: [
      "Elementni 2px kattalashtiradi",
      "Elementni 2 baravar kattalashtiradi",
      "Elementni 200% opacity qiladi",
      "Elementni vertikal siljitadi",
    ],
    answer: "Elementni 2 baravar kattalashtiradi",
    points: UNIFORM_POINTS,
  },
  {
    id: 17,
    type: "quiz",
    question: "Flexboxda align-items: stretch; nima qiladi?",
    options: [
      "Elementlarni yonma-yon qiladi",
      "Elementlarni konteyner balandligiga cho‘zadi",
      "Elementlarni gorizontal markazlashtiradi",
      "Elementlarni yuqoriga joylashtiradi",
    ],
    answer: "Elementlarni konteyner balandligiga cho‘zadi",
    points: UNIFORM_POINTS,
  },
  {
    id: 18,
    type: "quiz",
    question: "Margin collapse hodisasi qachon yuz beradi?",
    options: [
      "Horizontal marginlar urishsa",
      "Ikkita vertical margin to‘qnashsa",
      "Padding margin bilan kesishsa",
      "Flex konteyner ichida",
    ],
    answer: "Ikkita vertical margin to‘qnashsa",
    points: UNIFORM_POINTS,
  },
  {
    id: 19,
    type: "quiz",
    question: "CSSda transform va transition farqi nima?",
    options: [
      "Transform o‘zgarishni qiladi, transition o‘zgarish jarayonini boshqaradi",
      "Transform faqat rang uchun, transition faqat fon uchun",
      "Ikkalasi ham bir xil",
      "Transition faqat HTMLda ishlaydi",
    ],
    answer: "Transform o‘zgarishni qiladi, transition o‘zgarish jarayonini boshqaradi",
    points: UNIFORM_POINTS,
  },
  {
    id: 20,
    type: "quiz",
    question: "CSSda translateX(50%) nima qiladi?",
    options: [
      "Elementni chapga 50px siljitadi",
      "Elementni konteynerning 50% ga siljitadi",
      "Elementni vertikal ko‘chiradi",
      "Elementni 50% kichraytiradi",
    ],
    answer: "Elementni konteynerning 50% ga siljitadi",
    points: UNIFORM_POINTS,
  },

  // === CHALLENGE (21–24) ===
  {
    id: 21,
    type: "challenge",
    question: "30 soniyada 15 ta kino sanab bering ",
    points: UNIFORM_POINTS * 2,
  },
  {
    id: 22,
    type: "challenge",
    question: "30 soniyada 15 ta qo'shiqchi sanab bering",
    points: UNIFORM_POINTS * 2,
  },
  {
    id: 23,
    type: "challenge",
    question: "Raqib jamoadan  istalgan inson bilan oxirgi harfga teg aytish o'yinini o'ynang",
    points: UNIFORM_POINTS * 2,
  },
  {
    id: 24,
    type: "challenge",
    question: "Sizga raqib jamoadan shart beriladi ",
    points: UNIFORM_POINTS * 2,
  },

  // === POWER (25) ===
  {
    id: 25,
    type: "power",
    question: "CSS transform, transition va animation o‘rtasidagi eng aniq ta’rifni toping:",
     options: [
      "Transform elementni o‘zgartiradi; transition o‘zgarishni asta-sekin bajaradi; animation esa murakkab ketma-ket harakatni boshqaradi",
      "Transform faqat rang o‘zgartiradi; transition esa faqat fon rangini",
      "Animation transitiondan farqsiz",
      "Transition faqat flex konteynerda ishlaydi",
    ],
    answer: "Transform elementni o‘zgartiradi; transition o‘zgarishni asta-sekin bajaradi; animation esa murakkab ketma-ket harakatni boshqaradi",
    points: UNIFORM_POINTS * 3,
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

  useEffect(() => {
    // Savollar massivini aralashtirish
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

    // Panjarani savollar bilan to'ldirish
    const initialGrid = Array.from(
      { length: shuffledQuestions.length },
      (_, i) => ({
        id: i + 1,
        question: shuffledQuestions[i],
        isUsed: false,
      })
    );
    setGridState(initialGrid);
  }, []);

  const handleBoxClick = (boxId) => {
    const box = gridState.find((b) => b.id === boxId);
    if (box.isUsed) return;

    setCurrentQuestion(box.question);
  };

  const updateGridState = () => {
    const newGridState = gridState.map((box) =>
      box.question &&
      box.question.id === currentQuestion.id &&
      box.question.type === currentQuestion.type
        ? { ...box, isUsed: true }
        : box
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

    // "Shart" savoli uchun mantiq
    if (currentQuestion.type === "challenge") {
      if (isCorrect) {
        const points = currentQuestion.points;
        activeTeam === 1
          ? setTeam1Score((s) => s + points)
          : setTeam2Score((s) => s + points);
      }
      updateGridState();
      setCurrentQuestion(null);
      switchTeam();
      return;
    }

    // "Super Savol" va "Quiz"lar uchun mantiq
    if (isCorrect) {
      if (currentQuestion.type === "power") {
        setPowerModal(true);
      } else {
        const points = currentQuestion.points;
        activeTeam === 1
          ? setTeam1Score((s) => s + points)
          : setTeam2Score((s) => s + points);
        setFeedback({
          show: true,
          message: `Javob to'g'ri! Sizga ${points} ball qo'shildi.`,
          isCorrect: true,
        });
        setTimeout(() => {
          setFeedback({ show: false, message: "", isCorrect: false });
          updateGridState();
          setCurrentQuestion(null);
          switchTeam();
        }, 1500);
      }
    } else {
      // Agar javob xato bo'lsa
      setFeedback({
        show: true,
        message: `Afsus, javob xato, lekin o'yin davom etadi.`,
        isCorrect: false,
      });
      setTimeout(() => {
        setFeedback({ show: false, message: "", isCorrect: false });
        updateGridState();
        setCurrentQuestion(null);
        switchTeam();
      }, 1500);
    }
  };

  const handlePowerChoice = (choice) => {
    const pointsToAward = currentQuestion.points;
    if (choice === "add") {
      activeTeam === 1
        ? setTeam1Score((s) => s + pointsToAward)
        : setTeam2Score((s) => s + pointsToAward);
    } else {
      activeTeam === 2
        ? setTeam2Score((s) => Math.max(0, s - pointsToAward))
        : setTeam1Score((s) => Math.max(0, s - pointsToAward));
    }
    setPowerModal(false);
    updateGridState();
    setCurrentQuestion(null);
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
      <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-teal-400">
            Jamoa Nomlarini Kiriting
          </h1>
          <form onSubmit={handleStartGame} className="flex flex-col space-y-4">
            <input
              type="text"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              placeholder="1-Jamoa nomi"
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              placeholder="2-Jamoa nomi"
              className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              O'yinni Boshlash
            </button>
            {(!team1Name || !team2Name) && (
              <p className="text-red-400 mt-4">
                Iltimos, ikkala jamoa uchun ham nom kiriting.
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }

  if (isGameOver) {
    const winner = getWinnerName();
    return (
      <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center p-4 text-center">
        <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl max-w-lg w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-4">
            O'yin Tugadi!
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {winner === "Durang" ? (
              "O'yin durang bilan tugadi!"
            ) : (
              <p className="text-green-500">Yutgan jamoa: {winner}!</p>
            )}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300">
            Qani, olqishlaymiz! 👏
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Yana o'ynash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold from-teal-400 to-blue-500 rounded-lg p-2 shadow-lg mb-4">
          Savollar O'yini
        </h1>
        <p className="text-xl md:text-2xl text-gray-300">
          Jamoalar uchun savollar o'yini
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-around w-full max-w-5xl mb-8 space-y-4 md:space-y-0 md:space-x-8">
        {/* Jamoa 1 ballari */}
        <div
          className={`p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 transform ${
            activeTeam === 1
              ? "scale-105 border-4 border-green-400"
              : "scale-100 border-2 border-2 border-white"
          }   from-gray-700 to-gray-900 w-full`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {team1Name}
            </h2>
          </div>
          <p className="text-5xl md:text-6xl font-extrabold text-center text-orange-600">
            {team1Score}
          </p>
        </div>

        {/* Jamoa 2 ballari */}
        <div
          className={`p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 transform ${
            activeTeam === 2
              ? "scale-105 border-4 border-green-400"
              : "scale-100 border-2 border-2 border-white"
          }  from-gray-700 to-gray-900 w-full`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {team2Name}
            </h2>
          </div>
          <p className="text-5xl md:text-6xl font-extrabold text-center text-orange-600">
            {team2Score}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-full w-[90%]">
        {gridState.map((box) => (
          <button
            key={box.id}
            onClick={() => handleBoxClick(box.id)}
            disabled={box.isUsed || currentQuestion}
            className={`
              flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl shadow-lg cursor-pointer
              text-center transition-all duration-300 transform text-2xl md:text-4xl font-bold
              ${
                box.isUsed
                  ? "bg-gray-700 cursor-not-allowed text-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
              }
            `}
          >
            {box.id}
          </button>
        ))}
      </div>

      {/* Javob berish uchun modal */}
      {feedback.show && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div
            className={`p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center
            ${feedback.isCorrect ? "bg-green-600" : "bg-red-600"}`}
          >
            <h2 className="text-white text-3xl font-bold">
              {feedback.message}
            </h2>
          </div>
        </div>
      )}

      {/* Savol modali */}
      {currentQuestion && !powerModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center p-4 z-40">
          <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl max-w-xl w-full">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-teal-300">
              {currentQuestion.type === "quiz"
                ? "Savol"
                : currentQuestion.type === "challenge"
                ? "Topshiriq"
                : "Super Savol"}
              <span className="block text-xl md:text-2xl text-yellow-400 mt-2">
                ({currentQuestion.points} ball)
              </span>
            </h3>
            <p className="text-lg md:text-xl text-gray-200 mb-8 text-center">
              {currentQuestion.question || currentQuestion.challenge}
            </p>

            {currentQuestion.type !== "challenge" && (
              <div className="flex flex-col space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(option === currentQuestion.answer)
                    }
                    className="bg-gray-700 text-white rounded-xl py-3 px-6 text-lg font-semibold hover:bg-gray-600 transition-colors duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Shart savoli uchun tugmalar */}
            {currentQuestion.type === "challenge" && (
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className="bg-green-500 text-white rounded-xl py-3 px-8 text-lg font-semibold hover:bg-green-600 transition-colors duration-200"
                >
                  Bajarildi
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="bg-red-500 text-white rounded-xl py-3 px-8 text-lg font-semibold hover:bg-red-600 transition-colors duration-200"
                >
                  Bajarilmadi
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* "Kuch" savoli uchun tanlov modali */}
      {powerModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">
              Tanlov qilish
            </h3>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              "Super Savol"ga to'g'ri javob berdingiz!
              {currentQuestion?.points || POWER_POINTS} ballni o'zingizga
              qo'shasizmi yoki raqibdan ayirasizmi?
            </p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={() => handlePowerChoice("add")}
                className="bg-blue-600 text-white rounded-xl py-3 px-6 text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                O'zingizga qo'shish
              </button>
              <button
                onClick={() => handlePowerChoice("deduct")}
                className="bg-red-600 text-white rounded-xl py-3 px-6 text-lg font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                Raqibdan ayirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;