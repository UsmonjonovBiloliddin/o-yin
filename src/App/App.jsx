import React, { useState, useEffect } from "react";

// Barcha savollar uchun bir xil ball
const UNIFORM_POINTS = 20;
// "Super Savol" uchun 1,5 baravar ko'proq ball
const POWER_POINTS = Math.round(UNIFORM_POINTS * 1.5);

// O'zbek tilidagi savollar va topshiriqlar
const allQuestions = [
  // HTML
  {
    id: 1,
    type: "quiz",
    question: "HTMLda matnga urg‘u berish uchun qaysi teg ishlatiladi?",
    options: ["<i>", "<b>", "<em>", "<u>"],
    answer: "<em>",
    points: UNIFORM_POINTS,
  },
  {
    id: 2,
    type: "quiz",
    question: "HTMLda inline element qaysi?",
    options: ["<div>", "<span>", "<section>", "<p>"],
    answer: "<span>",
    points: UNIFORM_POINTS,
  },
  {
    id: 3,
    type: "quiz",
    question: "HTML form elementida tugma yaratish uchun qaysi tag ishlatiladi?",
    options: ["<btn>", "<button>", "<input type='button'>", "<submit>"],
    answer: "<button>",
    points: UNIFORM_POINTS,
  },
  {
    id: 4,
    type: "quiz",
    question: "HTMLda matn ichida chiziq (gorizontal) chizish uchun qaysi teg ishlatiladi?",
    options: ["<line>", "<rule>", "<hr>", "<br>"],
    answer: "<hr>",
    points: UNIFORM_POINTS,
  },
  {
    id: 5,
    type: "quiz",
    question: "HTMLda semantik teg bo‘lmagan variant qaysi?",
    options: ["<header>", "<article>", "<div>", "<footer>"],
    answer: "<div>",
    points: UNIFORM_POINTS,
  },
  {
    id: 6,
    type: "quiz",
    question: "HTMLda matnni tepadan kichik yozish uchun qaysi teg ishlatiladi?",
    options: ["<sub>", "<sup>", "<small>", "<tiny>"],
    answer: "<sup>",
    points: UNIFORM_POINTS,
  },
  {
    id: 7,
    type: "quiz",
    question: "HTMLda ro‘yxat elementlari qaysi teg orqali belgilanadi?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: "<li>",
    points: UNIFORM_POINTS,
  },
  {
    id: 8,
    type: "quiz",
    question: "HTMLda alt atributi nima uchun ishlatiladi?",
    options: [
      "Rasm bo‘lmasa matn ko‘rsatish uchun",
      "Linkning manzilini ko‘rsatish uchun",
      "Sarlavhani belgilash uchun",
      "Brauzer fonini belgilash uchun"
    ],
    answer: "Rasm bo‘lmasa matn ko‘rsatish uchun",
    points: UNIFORM_POINTS,
  },

  // CSS
  {
    id: 9,
    type: "quiz",
    question: "CSSda element ichidagi matn va chegarasi orasidagi masofa nima deyiladi?",
    options: ["margin", "padding", "border", "spacing"],
    answer: "padding",
    points: UNIFORM_POINTS,
  },
  {
    id: 10,
    type: "quiz",
    question: "CSSda tashqi masofa (element va boshqa element orasidagi bo‘shliq) nima orqali belgilanadi?",
    options: ["margin", "padding", "border-spacing", "gap"],
    answer: "margin",
    points: UNIFORM_POINTS,
  },
  {
    id: 11,
    type: "quiz",
    question: "CSSda block-level element qaysi?",
    options: ["<span>", "<a>", "<div>", "<strong>"],
    answer: "<div>",
    points: UNIFORM_POINTS,
  },
  {
    id: 12,
    type: "quiz",
    question: "CSSda overflow: hidden nima qiladi?",
    options: [
      "Elementdan tashqaridagi kontentni yashiradi",
      "Kontentni yangi qatorda chiqaradi",
      "Kontentni boshqa rangga o‘zgartiradi",
      "Elementni markazga joylashtiradi"
    ],
    answer: "Elementdan tashqaridagi kontentni yashiradi",
    points: UNIFORM_POINTS,
  },
  {
    id: 13,
    type: "quiz",
    question: "CSSda absolute joylashuv nimaga asoslanadi?",
    options: [
      "O‘zining eng yaqin position: relative bo‘lgan ota-elementiga",
      "Har doim body elementiga",
      "Ekran o‘lchamiga",
      "HTML tegi bo‘yicha"
    ],
    answer: "O‘zining eng yaqin position: relative bo‘lgan ota-elementiga",
    points: UNIFORM_POINTS,
  },
  {
    id: 14,
    type: "quiz",
    question: "CSSda inline elementni blockka aylantirish uchun nima yoziladi?",
    options: ["display: block;", "position: block;", "type: block;", "layout: block;"],
    answer: "display: block;",
    points: UNIFORM_POINTS,
  },
  {
    id: 15,
    type: "quiz",
    question: "CSSda matnni vertikal markazlashtirish uchun qaysi usul ishlaydi?",
    options: [
      "line-height",
      "text-align: center;",
      "margin: auto;",
      "vertical-align: center;"
    ],
    answer: "line-height",
    points: UNIFORM_POINTS,
  },
  {
    id: 16,
    type: "quiz",
    question: "CSSda elementni ekranning yuqori qismiga yopishtirib qo‘yish uchun qaysi property ishlatiladi?",
    options: ["position: fixed;", "position: sticky;", "position: absolute;", "float: top;"],
    answer: "position: fixed;",
    points: UNIFORM_POINTS,
  },
  {
    id: 17,
    type: "quiz",
    question: "CSSda inline va block elementning farqi nimada?",
    options: [
      "Block to‘liq kenglikni oladi, inline faqat kontent hajmini oladi",
      "Inline doim qizil bo‘ladi, block qora",
      "Block faqat matn, inline faqat rasmlar uchun",
      "Block elementni faqat headerda ishlatish mumkin"
    ],
    answer: "Block to‘liq kenglikni oladi, inline faqat kontent hajmini oladi",
    points: UNIFORM_POINTS,
  },
  {
    id: 18,
    type: "quiz",
    question: "CSSda flex-direction: column; yozilganda elementlar qanday joylashadi?",
    options: ["Yonma-yon", "Pastga qarab", "Chapga qarab", "Diagonal bo‘yicha"],
    answer: "Pastga qarab",
    points: UNIFORM_POINTS,
  },
  {
    id: 19,
    type: "quiz",
    question: "CSSda background-size: cover; nima qiladi?",
    options: [
      "Fon rasmni butun maydonni to‘ldirib joylashtiradi",
      "Fon rasmni asl o‘lchamida qo‘yadi",
      "Fon rasmni kesib tashlaydi",
      "Fon rangini o‘zgartiradi"
    ],
    answer: "Fon rasmni butun maydonni to‘ldirib joylashtiradi",
    points: UNIFORM_POINTS,
  },
  {
    id: 20,
    type: "quiz",
    question: "CSSda border-collapse: collapse; nima uchun ishlatiladi?",
    options: [
      "Jadval chegaralarini birlashtirish uchun",
      "Matnni tekislash uchun",
      "Fon rasmini yopishtirish uchun",
      "Chegarani yumaloqlash uchun"
    ],
    answer: "Jadval chegaralarini birlashtirish uchun",
    points: UNIFORM_POINTS,
  },
  {
    id: 21,
    type: "quiz",
    question: "CSSda transition nima vazifani bajaradi?",
    options: [
      "O‘tish animatsiyasini qo‘shadi",
      "Elementni yashiradi",
      "Elementni joylashtiradi",
      "Elementni bloklaydi"
    ],
    answer: "O‘tish animatsiyasini qo‘shadi",
    points: UNIFORM_POINTS,
  },
  {
    id: 22,
    type: "quiz",
    question: "CSSda transform: scale(2); nima qiladi?",
    options: [
      "Elementni kattalashtiradi",
      "Elementni kichraytiradi",
      "Elementni buradi",
      "Elementni markazlashtiradi"
    ],
    answer: "Elementni kattalashtiradi",
    points: UNIFORM_POINTS,
  },

  // Challenge
  {
    id: 23,
    type: "challenge",
    challenge: "30 soniyada HTMLda 5 ta semantik teg sanab bering!",
    points: UNIFORM_POINTS,
  },
  {
    id: 24,
    type: "challenge",
    challenge: "30 soniyada CSSda 7 ta positioning va layout xususiyatlarini sanang!",
    points: UNIFORM_POINTS,
  },

  // Power savol
  {
    id: 25,
    type: "power",
    question: "CSSda position: sticky; bilan position: fixed; o‘rtasidagi asosiy farq nima?",
    options: [
      "Sticky element skroll paytida ma’lum joyda yopishib qoladi, fixed esa har doim ekranga yopishib qoladi",
      "Sticky faqat headerda ishlaydi, fixed esa bodyda",
      "Fixed faqat inline elementlarda ishlaydi",
      "Sticky elementni absolyut joylashtiradi"
    ],
    answer: "Sticky element skroll paytida ma’lum joyda yopishib qoladi, fixed esa har doim ekranga yopishib qoladi",
    points: POWER_POINTS,
  }
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