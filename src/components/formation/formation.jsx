import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaRocket, FaBook, FaVideo, FaTimes } from "react-icons/fa";
import './formation.scss';

// ========== CONSTANTS ==========
const STATS = [
  { number: "1000+", label: "طالب نشط", color: "warning" },
  { number: "50+", label: "دورة متخصصة", color: "info" },
  { number: "95%", label: "نسبة الرضا", color: "success" }
];

const WARNINGS = [
  "يمنع تسجيل دورات الاستثمار أو عرضها أو تدريسها لأي سبب كان.",
  "هذه الدورة مخصصة فقط للشركاء وهي من حقك أنت وليست للعموم.",
  "كل من يشارك دورات الاستثمار مع غير الشركاء يتم إغلاق حسابه.",
  "كل من يقوم ببيع أو تدريس هذه الدورات يتم تتبعه عدلياً من الشركة."
];






const COURSE_SECTIONS = [
  {
    title: "البرمجة",
    icon: "💻",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    items: [
      { name: "اساسيات البرمجة", url: "https://mega.nz/folder/SGBjyQTa", icon: "🚀" },
      { name: "HTML لغة", url: "https://mega.nz/folder/yHpQBZjb#y6YH9ufqTy8ZKF5vL9pSYQ", icon: "🌐" },
      { name: "Css لغة", url: "https://mega.nz/folder/6bJRSZwJ", icon: "🎨" },
      { name: "JAVASCRIPT لغة", url: "https://mega.nz/folder/DXQwwYTK", icon: "⚡" },
      { name: "PYTHON لغة", url: "https://mega.nz/folder/CHh2Taqa", icon: "🐍" },
      {
        name: "REACT تعلم",
        url: "https://mega.nz/folder/XXJ2ib7J#0uO4qOZ4TW7jhAFqBX8baQ",
        videoUrl: "https://www.youtube.com",
        icon: "⚛️"
      },
      { name: "C++ لغة", url: "https://mega.nz/folder/qWIQSDxK", icon: "🔧" },
      { name: "ALGORITHME تعلم", url: "https://mega.nz/folder/EyEm2YgS#XcEDItPNcyb4PHOojdwFJA", icon: "🧠" },
      { name: "لغة PHP", url: "https://drive.google.com/file/d/1Zdw16mSEez7IXVVIzdu1fWJZw9I4pC_m/view?usp=drivesdk", icon: "🔗" },
      { name: "قواعد البيانات", url: "https://mega.nz/folder/PS5hSYLJ", icon: "🗄️" },
      { name: "قواعد البيانات MongoDB-EN", url: "https://drive.google.com/file/d/1aIOwpcBC4zxiHIvOPOrxBZMhi74vTWo1/view?usp=drivesdk", icon: "🍃" },
      { name: "قواعد البيانات MongoDB-AR", url: "https://drive.google.com/file/d/1a7vYWI6dArX150oBTBh0WbdtUq5PBDcV/view?usp=drivesdk", icon: "🍃" },
    ],
  },
  {
    title: "الذكاء الاصطناعي",
    icon: "🤖",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    items: [
      { name: "عالم الذكاء الاصطناعي", url: "https://mega.nz/folder/qKYRGZxK#LItzcrVeH1xnDJDNhe5cFg", icon: "🧠" },
    ],
  },
  {
    title: "عالم الابداع",
    icon: "🎬",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    items: [
      { name: "دورة التصميم", url: "https://mega.nz/folder/hn81VZDI#sdl0uR6bo_HutgxATs_AbA", icon: "🎭" },
      { name: "التصميم مع دفنشي", url: "https://docs.google.com/document/d/157wCwe6vk2QWsqvg6YJO4HVVr6jcNXzgeDVNZg-di0A/edit?usp=drivesdk", icon: "💻🧾" },

      { name: "التجارة الالكترونية الدليل", url: "https://mega.nz/folder/uUsQSCRQ#yB5rS3g5QKokqjjGCMhHyw", icon: "💵💵" },
      { name: "التجارة الألكترونية 1", url: "https://docs.google.com/document/d/1PEW0tO122PCnUrVyJzX41Q75LzrMNWlo9Z0gZ4PDS98/edit?usp=drivesdk", icon: "💵💵" },
      { name: "التجارة الألكترونية 2", url: "https://docs.google.com/document/d/1LXhk4UMnpBBLpkn0Mq4YpMTgEyf1r6-Pg1zQYvbg3-M/edit?usp=drivesdk", icon: "💵💵" },
    ],
  },
  {
    title: "اللغة الانجليزية",
    icon: "🇺🇸",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    items: [
      { name: "الكتاب المعلم", url: "https://mega.nz/folder/UitQiSCJ#8Tc3K_auREcs0mRTxflkRg", icon: "📚" },
      { name: "المستوى الاول", url: "https://mega.nz/folder/BQERBIxb#VaF2-vmx04BKNvc0bLTnZQ/folder/MBsC3LJT", icon: "⭐" },
      { name: "المستوى الثاني", url: "https://mega.nz/folder/UNlFFSjJ#VpCjvNYEW6XBjD2sqkJu7g", icon: "⭐⭐" },
      { name: " المستوى الثالث", url: "https://mega.nz/folder/UVFQRTrb", icon: "💬" },
      { name: " المستوى المتقدم", url: "https://mega.nz/folder/RRF33IbL#8wcg5Nj_tEUqrVEXOdr0Kw", icon: "📝" },
      { name: "Grammar", url: "https://drive.google.com/file/d/1Y0Wooo6SEu_72RyRsAy85DnqNGQfhTll/view?usp=drivesdk", icon: "📖" },
      { name: "Grammar+ مستوى متقدم", url: "https://drive.google.com/file/d/1TUM74iomrLK9PMD5dFiDcO-3fPt7rC_C/view?usp=drivesdk", icon: "🎯" },
      { name: "B1+ مستوى متقدم", url: "https://drive.google.com/file/d/1ShFVS0_gGIvmIYBaHng-9HYmaOQiMdCL/view?usp=drivesdk", icon: "🏆" },
    ],
  },
  {
    title: "البرمجة اللغوية العصبية",
    icon: "🧩",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    items: [
      { name: "اكتشف قدراتك", url: "https://docs.google.com/document/d/1Rtmwd0kThzvPZN6BnzoA_3RHbxrg_Ws0Ulz9PE3raW8/edit?usp=drivesdk", icon: "🔍" },
      { name: "دليلك", url: "https://docs.google.com/document/d/1QOTWsEYRqFeLUJPiO4iWD6CNuU8tOqvoR-hBjOwUilQ/edit?usp=drivesdk", icon: "🧭" },
    ],
  },
  {
    title: "دليل للتسويق",
    icon: "📈",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    items: [
      { name: "التسويق بالعمولة", url: "https://docs.google.com/document/d/1gJJ3noOPbKyrW-dA4zAYL11YGhP99n64EI3gMFzdW4Q/edit?usp=drivesdk", icon: "💰" },
      { name: "التسويق بالمحتوى", url: "https://drive.google.com/file/d/1b8mVuYLeu44uHqUTFwCd6eoyCv_sj_SB/view?usp=drivesdk", icon: "📱" },
    ],
  },
  {
    title: "كماليات الاستثمار",
    icon: "💎",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    items: [
      { name: "تعلم كيف تتعلم", url: "https://docs.google.com/document/d/1gJJ3noOPbKyrW-dA4zAYL11YGhP99n64EI3gMFzdW4Q/edit?usp=drivesdk", icon: "💡" },
      { name: "منطقة الراحة", url: "https://drive.google.com/file/d/1b8mVuYLeu44uHqUTFwCd6eoyCv_sj_SB/view?usp=drivesdk", icon: "🌟" },
      { name: "طور من نفسك", url: "https://drive.google.com/file/d/1XXl3nBD_86v3dBnJU7XLBLqgGH-IDQuo/view?usp=drivesdk", icon: "📈" },
      { name: "ادارة التسويق", url: "https://drive.google.com/file/d/17LefoD7WJW8f6Fjnz-5sjdk-wvlCQiae/view?fbclid=IwdGRjcAMr-RFjbGNrAyv5DWV4dG4DYWVtAjExAAEewZuBlUAtQhaZR5LH_V38jHOnBCM7x7oOTEdxb408tjj1_LkLcHa4XYh4dp4_aem_7rlQyImvmrLhBb8y6kjyDw", icon: "🔊" },
      { name: "مقتطفات", url: "https://drive.google.com/drive/mobile/folders/1PcGe9g-Yc92tXoi2Ced8hRKlESnFMx79?fbclid=IwdGRjcAMr959jbGNrAyv3gGV4dG4DYWVtAjExAAEe2HnR7mBzEZZxFtgO_qd4QG-78jDhS2tNWZraB44vtvj2dEKUhZv2H375ZNc_aem_snsy9CmRRjSY_EIgySfE4w", icon: "🧾" },
      { name: "ادارة الازمات", url: "https://drive.google.com/file/d/1yIn2waxs2OihqzVPebU8gltpdh4YEw3C/view?fbclid=IwdGRjcAMr-BRjbGNrAyv35mV4dG4DYWVtAjExAAEdNvca31U6nFPIPK8fQtZwOoFNYmtlL00jHWQsRuuGXPf1X0maWCAh7D2Y_aem_AccB0GEstsjFzgTR1IPlAttqHBnYqcPehO1gx0LVZjrqanydH9GdVXNVmXxeNwC5Xwr532j-KRCj2n94euGBwOrG", icon: "🕕" },
    ],
  },
  {
    title: "اللغة الفرنسية",
    icon: "🇫🇷",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    items: [
      { name: "مستوى الاول", url: "https://mega.nz/folder/0R0iEbzL#cLvcHXp5v5k_kmpU0TvBPw", icon: "⭐" },
      { name: "مستوى الثاني", url: "https://mega.nz/folder/YAtn1TzJ", icon: "⭐⭐" },
      { name: "مستوى الثالث", url: "https://mega.nz/folder/pVtT2ChT#LWHAKIP83YYkN-ntWCO7ug", icon: "⭐⭐⭐" },
      { name: "مستوى متقدم", url: "https://mega.nz/folder/dIdlkYjZ", icon: "⭐⭐⭐⭐" },
    ],
  },
  {
    title: "اللغة الالمانية",
    icon: "🇩🇪",
    gradient: "linear-gradient(135deg, #a8edea 0%, #a8a2a4ff 100%)",
    items: [
      { name: "مستوى الاول", url: "https://mega.nz/folder/5HNz2AZS#j_3-z82aNvjSrQrPQx3MuQ", icon: "⭐" },
      { name: "مستوى الثاني", url: "https://mega.nz/folder/Yf0XzBKA#ODuHzZ9gKpkqHxs-CUZABA", icon: "⭐⭐" },
      {
        name: "مستوى الثالث", url: "https://mega.nz/folder/MH0m1bDZ#th9UR7BczMqfnkbijyjnKQ", icon: "⭐⭐⭐"
      },
      { name: "مستوى متقدم", url: "https://mega.nz/folder/EX0FkAAb#0jsLjqCsEgsr9HaHP1K8YA", icon: "⭐⭐⭐⭐" },
    ],
  },
  {
    title: "اللغة الايطالية",
    icon: "🇮🇹",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    items: [
      { name: "مستوى الاول", url: "https://mega.nz/folder/ZXF3VTiC#R8JKcAo4_HOblfZawX01YQ", icon: "⭐" },
      { name: "مستوى الثاني", url: "https://mega.nz/folder/0f0CDTjJ", icon: "⭐⭐" },
      { name: "مستوى الثالث", url: "https://mega.nz/folder/QO1wTZYL#Mxx13Gnfk377ePqq4n4eSw", icon: "⭐⭐⭐" },
      { name: "مستوى متقدم", url: "https://mega.nz/folder/waVnAAiA#bTgAls937tQEzrWOMSlNlg", icon: "⭐⭐⭐⭐" },
    ],
  },
  {
    title: " الاكسال",
    icon: "📝",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    items: [
      { name: "  تعلم الاكسال", url: "https://docs.google.com/document/d/1qC1YrK6IpfVXMa-Euld0P9_zPR-pbF6In5_2aLB19wk/edit?usp=drivesdk", icon: "📖" },
    ],
  },
];


// const COURSE_SECTIONS = [
//   {
//     title: "البرمجة",
//     icon: "💻",
//     gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     items: [
//       { name: "اساسيات البرمجة", url: "https://docs.google.com/document/d/1Z8mw0m4v0xg6ezAHnjJQ-lxP-a8TWeAk/edit", icon: "🚀" },
//       { name: "HTML لغة", url: "https://docs.google.com/document/d/11JJ4Ymdsi3WMdqQ-cuiOi5YVozOQ7ToBYknJH8ZoL7E/edit", icon: "🌐" },
//       { name: "Css لغة", url: "https://docs.google.com/document/d/18fDZ7XiMaRZRn6t3ulvsefMg27xLg5Wg/edit", icon: "🎨" },
//       { name: "JAVASCRIPT لغة", url: "https://docs.google.com/document/d/1LaJPbkEUhpc4C0T-IwtfEYWd4zDPpKmv/edit", icon: "⚡" },
//       { name: "PYTHON لغة", url: "https://docs.google.com/document/d/14qRE1zXaqNufk64NnPI_Z2aiYMcsAIW-gffDPNWbFYg/edit", icon: "🐍" },
//       {
//         name: "REACT تعلم",
//         url: "https://docs.google.com/document/d/1tGvP3KYe4G-XjrweAgF_jErUaJx_6sDY/edit",
//         videoUrl: "https://www.youtube.com/watch?v=v4yY6QM8N80",
//         icon: "⚛️"
//       },
//       { name: "C++ لغة", url: "https://docs.google.com/document/d/1kkjnlkGqlriQVvnsLjOXOWuTd1IstBoR/edit", icon: "🔧" },
//       { name: "ALGORITHME تعلم", url: "https://docs.google.com/document/d/1ZNSdqG9o2xuwUZGI6XI6LK06FYJiP0n3/edit", icon: "🧠" },
//       { name: "لغة PHP", url: "https://drive.google.com/file/d/1Zdw16mSEez7IXVVIzdu1fWJZw9I4pC_m/view", icon: "🔗" },
//       { name: "قواعد البيانات", url: "https://docs.google.com/document/d/1SnIpKYg6oFB6ceyZlC-1ChW70r5s3f9b/edit", icon: "🗄️" },
//       { name: "قواعد البيانات MongoDB-EN", url: "https://drive.google.com/file/d/1aIOwpcBC4zxiHIvOPOrxBZMhi74vTWo1/view", icon: "🍃" },
//       { name: "قواعد البيانات MongoDB-AR", url: "https://drive.google.com/file/d/1a7vYWI6dArX150oBTBh0WbdtUq5PBDcV/view", icon: "🍃" },
//     ],
//   },
//   {
//     title: "الذكاء الاصطناعي",
//     icon: "🤖",
//     gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//     items: [
//       { name: "عالم الذكاء الاصطناعي", url: "https://docs.google.com/document/d/1qC1YrK6IpfVXMa-Euld0P9_zPR-pbF6In5_2aLB19wk/edit", icon: "🧠" },
//     ],
//   },
//   {
//     title: "مونشن جرافيك",
//     icon: "🎬",
//     gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
//     items: [
//       { name: "دورة التصميم", url: "https://t.me/+JSyiLmvr6mlkZjk0", icon: "🎭" },
//     ],
//   },
//   {
//     title: "اللغة الانجليزية",
//     icon: "🇺🇸",
//     gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
//     items: [
//       { name: "الكتاب المعلم", url: "https://mega.nz/folder/UitQiSCJ#8Tc3K_auREcs0mRTxflkRg", icon: "📚" },
//       { name: "A1 مستوى", url: "https://docs.google.com/document/d/13gzuRtVRcB5PiQteDot94SCYXoT31B9Z/edit", icon: "⭐" },

//       { name: "A2 مستوى", url: "https://docs.google.com/document/d/1dKUReIhq0pf1PC1gBaBtY49jAU8GcKI84xtyg8Msn1c/edit", icon: "⭐⭐" },
//       { name: "تعلم الحوار", url: "https://docs.google.com/document/d/1vOE3X9wS9uMGL0BSshNNRm8edjLN5UZ-/edit", icon: "💬" },
//       { name: "تعلم الكلمات", url: "https://docs.google.com/document/d/1zll84PUCAzrrxYd2bYkgbXw4Cq5OljdytnMkfKyosRw/edit", icon: "📝" },
//       { name: "Grammar", url: "https://drive.google.com/file/d/1Y0Wooo6SEu_72RyRsAy85DnqNGQfhTll/view", icon: "📖" },
//       { name: "Grammar+ مستوى متقدم", url: "https://drive.google.com/file/d/1TUM74iomrLK9PMD5dFiDcO-3fPt7rC_C/view", icon: "🎯" },
//       { name: "B1+ مستوى متقدم", url: "https://drive.google.com/file/d/1ShFVS0_gGIvmIYBaHng-9HYmaOQiMdCL/view", icon: "🏆" },
//     ],
//   },
//   {
//     title: "البرمجة اللغوية العصبية",
//     icon: "🧩",
//     gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     items: [
//       { name: "اكتشف قدراتك", url: "https://docs.google.com/document/d/1QOTWsEYRqFeLUJPiO4iWD6CNuU8tOqvoR-hBjOwUilQ/edit", icon: "🔍" },
//       { name: "دليلك", url: "https://drive.google.com/file/d/1UnQ3eD0HAXTA0kQ0ydcs_WsK4hEe4cDH/view", icon: "🧭" },
//     ],
//   },
//   {
//     title: "دليل للتسويق",
//     icon: "📈",
//     gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
//     items: [
//       { name: "التسويق بالعمولة", url: "https://docs.google.com/document/d/1gJJ3noOPbKyrW-dA4zAYL11YGhP99n64EI3gMFzdW4Q/edit", icon: "💰" },
//       { name: "التسويق بالمحتوى", url: "https://drive.google.com/file/d/1b8mVuYLeu44uHqUTFwCd6eoyCv_sj_SB/view", icon: "📱" },
//     ],
//   },
//   {
//     title: "كماليات الاستثمار",
//     icon: "💎",
//     gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
//     items: [
//       { name: "تعلم كيف تتعلم", url: "https://docs.google.com/document/d/1gJJ3noOPbKyrW-dA4zAYL11YGhP99n64EI3gMFzdW4Q/edit", icon: "💡" },
//       { name: "منطقة الراحة", url: "https://drive.google.com/file/d/1b8mVuYLeu44uHqUTFwCd6eoyCv_sj_SB/view", icon: "🌟" },
//       { name: "طور من نفسك", url: "https://drive.google.com/file/d/1XXl3nBD_86v3dBnJU7XLBLqgGH-IDQuo/view", icon: "📈" },
//     ],
//   },
//   {
//     title: "اللغة الفرنسية",
//     icon: "🇫🇷",
//     gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
//     items: [
//       { name: "FR1", url: "https://drive.google.com/file/d/1XZ5XQZfT1dwNik51KEUjz4Zjjd1ycDOF/view", icon: "1️⃣" },
//       { name: "FR2", url: "https://drive.google.com/file/d/1Xd24fvalk2v_r1M5Jhfnng0jsp6nRlbE/view", icon: "2️⃣" },
//       { name: "FR3", url: "https://drive.google.com/file/d/1XOrlUu-SwPCjdnQ-MsM_Ov4Nxwk9Zbfi/view", icon: "3️⃣" },
//       { name: "FR4", url: "https://drive.google.com/file/d/1Xn0UYoqNZTwnDrL1vR8eSuj4Rn5s3Fhm/view", icon: "4️⃣" },
//       { name: "FR5", url: "https://drive.google.com/file/d/1XlXrER8b13zy_PB4B6LFjaBG9r1kc0DS/view", icon: "5️⃣" },
//     ],
//   },
//   {
//     title: "اللغة الالمانية",
//     icon: "🇩🇪",
//     gradient: "linear-gradient(135deg, #a8edea 0%, #a8a2a4ff 100%)",
//     items: [
//       { name: "مستوى الاول", url: "https://mega.nz/folder/5HNz2AZS#j_3-z82aNvjSrQrPQx3MuQ", icon: "⭐" },
//       { name: "مستوى الثاني", url: "https://mega.nz/folder/Yf0XzBKA#ODuHzZ9gKpkqHxs-CUZABA", icon: "⭐⭐" },
//       { name: "مستوى الثالث", url: "https://mega.nz/folder/MH0m1bDZ#th9UR7BczMqfnkbijyjnKQ", icon: "⭐⭐⭐" },
//       { name: "مستوى متقدم", url: "https://mega.nz/folder/EX0FkAAb#0jsLjqCsEgsr9HaHP1K8YA", icon: "⭐⭐⭐⭐" },
//     ],
//   },
//   {
//     title: "اللغة الايطالية",
//     icon: "🇮🇹",
//     gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
//     items: [
//       { name: " احترف اللغة", url: "https://mega.nz/folder/cSc2UIpS#0-sQFBhkN0p-I5UXay5bRw", icon: "📚" },
//     ],
//   },
//   {
//     title: " الاكسال",
//     icon: "📝",
//     gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//     items: [
//       { name: "  تعلم الاكسال", url: "https://docs.google.com/document/d/1qC1YrK6IpfVXMa-Euld0P9_zPR-pbF6In5_2aLB19wk/edit", icon: "📖" },
//     ],
//   }
// ];

// ========== CUSTOM HOOKS ==========
const useIntersectionObserver = () => {
  const [visibleElements, setVisibleElements] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

// ========== COMPONENTS ==========
const Modal = ({ isOpen, onClose, item }) => {
  const [viewMode, setViewMode] = useState(null); // null, 'doc', 'video'

  if (!isOpen) return null;

  const handleViewDoc = () => {
    setViewMode('doc');
  };

  const handleViewVideo = () => {
    setViewMode('video');
  };

  const handleBack = () => {
    setViewMode(null);
  };

  const handleCloseModal = () => {
    setViewMode(null);
    onClose();
  };

  // Convertir les liens Google Docs en mode embed
  const getEmbedUrl = (url) => {
    if (url.includes('docs.google.com/document')) {
      return url.replace('/edit', '/preview');
    }
    if (url.includes('drive.google.com/file')) {
      const fileId = url.match(/\/d\/(.+?)\//)?.[1] || url.match(/\/d\/(.+?)$/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    if (url.includes('mega.nz')) {
      // Pour MEGA, on ouvre dans un nouvel onglet car l'embed n'est pas supporté
      return url;
    }
    return url;
  };

  const getYoutubeEmbedUrl = (url) => {
    if (url.includes('youtube.com/playlist')) {
      const playlistId = url.match(/list=(.+?)(&|$)/)?.[1];
      if (playlistId) {
        return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
      }
    }
    if (url.includes('youtube.com/watch')) {
      const videoId = url.match(/v=(.+?)(&|$)/)?.[1];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return url;
  };

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className={`modal-content ${viewMode ? 'modal-content-expanded' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleCloseModal}>
          <FaTimes />
        </button>

        {viewMode && (
          <button className="modal-back" onClick={handleBack}>
            ← رجوع
          </button>
        )}

        {!viewMode ? (
          <>
            <div className="modal-header">
              <h2 className="modal-title">{item.name}</h2>
              <span className="modal-icon">{item.icon}</span>
            </div>

            <div className="modal-body">
              <p className="modal-description">اختر طريقة التعلم المفضلة لديك</p>

              <div className="modal-options">
                <div
                  className="modal-option"
                  onClick={handleViewDoc}
                >
                  <FaBook className="option-icon" />
                  <h3>المستندات</h3>
                  <p>اقرأ الدورة كاملة في ملف واحد</p>
                </div>

                {item.videoUrl && (
                  <div
                    className="modal-option"
                    onClick={handleViewVideo}
                  >
                    <FaVideo className="option-icon" />
                    <h3>الفيديوهات</h3>
                    <p>شاهد الدورة بالفيديو خطوة بخطوة</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : viewMode === 'doc' ? (
          <div className="modal-viewer">
            <h3 className="viewer-title">{item.name} - المستندات</h3>
            {item.url.includes('mega.nz') ? (
              <div className="mega-notice">
                <p>لا يمكن عرض ملفات MEGA مباشرة. سيتم فتحها في نافذة جديدة.</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mega-link"
                >
                  افتح في MEGA
                </a>
              </div>
            ) : (
              <iframe
                src={getEmbedUrl(item.url)}
                className="modal-iframe"
                title={item.name}
                frameBorder="0"
                allowFullScreen
              />
            )}
          </div>
        ) : (
          <div className="modal-viewer">
            <h3 className="viewer-title">{item.name} - الفيديوهات</h3>
            <iframe
              src={getYoutubeEmbedUrl(item.videoUrl)}
              className="modal-iframe"
              title={`${item.name} - Videos`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    videoUrl: PropTypes.string,
    icon: PropTypes.string.isRequired
  }).isRequired
};

const HeroSection = () => (
  <div className="hero-section d-flex flex-col justify-content-center align-items-center">
    <div className="hero-content card bg-transparent rounded-5 w-100">
      <div className="badgeee text-white border-danger px-4 py-2 rounded-pill mb-4 fs-6">
        <FaRocket size={22} className="ms-2" />
        منصة التعلم الأولى في المنطقة
      </div>

      <h1 className="main-title display-2 fw-bold mb-4">
        <span className="text-white">BMB</span>
      </h1>

      <p className="lead text-white-50 mb-4 fs-4">
        عالم البزنس مودل بين يديك
      </p>

      <p className="text-white-50 mb-5 fs-4">
        اكتشف أسرار النجاح في عالم الأعمال والتكنولوجيا مع منصتنا المتطورة
      </p>

      <div className="row mt-md-5 mt-3 g-4">
        {STATS.map((stat, index) => (
          <div key={index} className="col-12 col-md-4 d-flex justify-content-center">
            <div className="card stat-card text-center p-0 p-md-4 h-100">
              <div className={`h3 text-${stat.color} mb-2 fw-bold`}>
                {stat.number}
              </div>
              <h5 className={`text-${stat.color}-50`}>{stat.label}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CourseLink = ({ item, onOpenModal }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onOpenModal(item);
  };

  return (
    <div
      className="course-link"
      onClick={handleClick}
    >
      <div className="d-flex flex-row-reverse course-link-content">
        <span>{item.name}</span>
        <div className="course-icon">{item.icon}</div>
      </div>
      <div className="course-underline" />
    </div>
  );
};

CourseLink.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    videoUrl: PropTypes.string,
    icon: PropTypes.string.isRequired
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired
};

const SectionHeader = ({ section }) => (
  <div className="section-header" style={{ background: section.gradient }}>
    <div className="section-header-overlay" />
    <div className="section-header-content">
      <h2 className="section-title">{section.title}</h2>
      <div className="section-icon">{section.icon}</div>
    </div>
    <div className="decorative-circle decorative-circle-top" />
    <div className="decorative-circle decorative-circle-bottom" />
  </div>
);

SectionHeader.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    gradient: PropTypes.string.isRequired
  }).isRequired
};

const CourseSection = ({ section, index, isVisible, onOpenModal }) => (
  <div
    id={`section-${index}`}
    className={`animate-on-scroll section-card ${isVisible ? 'visible' : ''}`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <SectionHeader section={section} />
    <div className="items-grid">
      {section.items.map((item, itemIndex) => (
        <CourseLink key={itemIndex} item={item} onOpenModal={onOpenModal} />
      ))}
    </div>
  </div>
);

CourseSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    gradient: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      videoUrl: PropTypes.string,
      icon: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  isVisible: PropTypes.bool,
  onOpenModal: PropTypes.func.isRequired
};

const IntroSection = () => (
  <section className="intro-section mt-md-5 mt-0 py-0">
    <div className="intro-card p-3">
      <h3 className="intro-title">
        ⭐ تعرف على أهمية عالم البزنس مودل ⭐
      </h3>

      <p className="intro-paragraph">
        اكتشف معنا كل ما تحتاجه لتعلم البرمجة بشكل شامل وممتع! من أساسيات البرمجة إلى تعلم لغات البرمجة المتنوعة وقواعد البيانات، نقدم لك كل ذلك خطوة بخطوة. بالإضافة إلى ذلك، ستتعلم كيفية تسريع تجربتك البرمجية من خلال إتقان اللغة الإنجليزية التي توسع آفاق معرفتك وتفتح لك أبوابًا جديدة للتواصل مع ثقافات مختلفة وأيضا تعلم اللغة الفرنسية كل هذا بطريقة تفاعلية ومثرية.
      </p>

      <p className="intro-paragraph">
        كما نقدم لك دليلًا مبتكرًا لتعلم الذكاء الاصطناعي من الصفر، مع استعراض أهم التقنيات البرمجية التي سيحتاجها كل مبتدئ. دوراتنا ليست مجرد نصوص مكتوبة، بل تشمل فيديوهات تعليمية تفاعلية لضمان تجربة تعلم مثرية. وأيضًا، نقدم لك دليلًا متكاملًا لتعلم التسويق بالمحتوى، بالإضافة إلى استراتيجيات التسويق بالعمولة التي تضمن لك نجاحًا في عالم الأعمال.
      </p>
    </div>
  </section>
);

const WarningSection = () => (
  <section className="warning-section">
    <div className="warning-card">
      <h2 className="warning-title">⚠️ تنبيه هام ⚠️</h2>
      <div className="warning-grid">
        {WARNINGS.map((warning, index) => (
          <div key={index} className="warning-item">
            <p>{warning}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ========== MAIN COMPONENT ==========
const Formation = () => {
  const visibleElements = useIntersectionObserver();
  const [modalState, setModalState] = useState({ isOpen: false, item: null });

  const openModal = (item) => {
    setModalState({ isOpen: true, item });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, item: null });
  };

  return (
    <div className="formation-container">
      <div className="background-decor">
        <div className="floating-element floating-element-1" />
        <div className="floating-element floating-element-2" />
      </div>
      <button className="modal-back" onClick={() => window.history.back()}>
        ← رجوع
      </button>
      <HeroSection />

      <section className="sections-container">
        {COURSE_SECTIONS.map((section, index) => (
          <CourseSection
            key={index}
            section={section}
            index={index}
            isVisible={visibleElements[`section-${index}`]}
            onOpenModal={openModal}
          />
        ))}
      </section>

      <IntroSection />
      <WarningSection />

      {modalState.isOpen && modalState.item && (
        <Modal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          item={modalState.item}
        />
      )}
    </div>
  );
};

export default Formation;