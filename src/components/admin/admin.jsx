import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { FaCrown, FaGraduationCap, FaMedal, FaUserPlus } from "react-icons/fa";
import sealImage from "../images/tmp.jpeg";
import jsPDF from "jspdf";
import "../../fonts/Amiri-Italic-italic.js";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersapiSlice";
import { logout } from "../../slices/authSlice";

import {
  useRegisterMutation,
  useUpdateUserMutation,
  useUpdateTotalIncomeMutation,
  useTransferPointsMutation,
} from "../../slices/usersapiSlice";

import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

import "./admin.scss";
import axios from "axios";
import { BsTrophy } from "react-icons/bs";
import { BiBell, BiEdit, BiLogOut, BiWallet } from "react-icons/bi";
import { Typewriter } from "react-simple-typewriter";
import { FiFileText } from "react-icons/fi";
import { Modal } from "antd";

const Admin = () => {
  // State for form fields
  const [nom, setNom] = useState("");

  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [cin, setCin] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [createdBy, setCreator] = useState("");
  const [points, setPoints] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  // Redux state
  const { userInfo } = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [updateTotalIncome] = useUpdateTotalIncomeMutation();
  const [transferPoints, { isLoading: isTransferring }] =
    useTransferPointsMutation();

  // State for popups visibility
  const [isFormPopupVisible, setFormPopupVisible] = useState(false);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [isUpdatePopupVisible, setUpdatePopupVisible] = useState(false);
  const [isBalancePopupVisible, setBalancePopupVisible] = useState(false);
  const [isupshopPopupVisible, setupshopPopupVisible] = useState(false);
  const [isContractPopupOpen, setContractPopupOpen] = useState(false);
  const toggleContractPopup = () => setContractPopupOpen(!isContractPopupOpen);
  const [pointsToSends, setPointsToSend] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [passwords, setPasswords] = useState("");


  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.addFont("Amiri-Italic-italic.ttf", "Amiri", "normal"); // Ensure the font name matches your converted file
    doc.setFont("Amiri"); // Use the custom font
    doc.setFontSize(14);

    // Add image at the top (centered or aligned as needed)
    const imgWidth = 50; // Adjust the width of the image
    const imgHeight = 20; // Adjust the height of the image
    const pageWidth = doc.internal.pageSize.width; // Get page width for centering
    const xPos = (pageWidth - imgWidth) / 2; // Center the image horizontally
    doc.addImage(tmp, "JPEG", xPos, 10, imgWidth, imgHeight);

    doc.text("BIG MONEY BUSINESS", 10, 10);
    doc.text("العقد الإلكتروني", 10, 20);

    doc.setFontSize(12);
    doc.text(`التاريخ: ${userInfo.createdAt}`, 10, 30);
    doc.text(`الاسم الكامل للعميل: ${userInfo.nom} ${userInfo.prenom}`, 10, 40);
    doc.text(`رقم الهاتف المحمول: ${userInfo.tel}`, 10, 50);
    doc.text(`معلومات الحساب: ${userInfo._id}`, 10, 60);
    doc.text(` رقم ألهوية: ${userInfo.cin}`, 10, 70);

    doc.text(`اسم الحساب: ${userInfo.pseudo}`, 10, 80);
    doc.text(`المبلغ المدفوع: 43$+الرسوم`, 10, 90);
    doc.text("المنتج: حساب متجر إلكتروني", 10, 100);

    doc.setFontSize(11);
    doc.text(
      "لقد قمت بتأكيد عملية الشراء المذكورة أعلاه. وتؤكد اشتراكك في خطة التسويق الخاصة بنا،",
      10,
      110
    );
    doc.text(
      "والتي تمنحك عمولات وفقًا للجدول الخاص بك. الجميع استثمارات فريقك وسيكون الدفع وفقًا لشريحتك",
      10,
      120
    );
    doc.text(
      "كما أوضحنا في شروط الخدمة الخاصة بنا ولهذا نوفر لك حسابا لإدارة عملك ومعرفة عدد فريقك وفقًا للخطة التي انضممت إليها.",
      10,
      130
    );

    doc.setFontSize(12);
    doc.text("يرجى الملاحظة:", 10, 140);
    doc.setFontSize(11);
    doc.text(
      "1. نحن لا نعدك بأي دخل ولكن نعدك بإطلاق دفعتك دائما كما شرحنا في الخطة التي اشتركت فيها.",
      10,
      150
    );
    doc.text(
      "2. سيتم القاء جميع المحاضرات المذكورة في دورات التدريب عبر تطبيق زوم أو تكون حضورياً.",
      10,
      160
    );
    doc.text(
      "3. المبلغ المذكور أعلاه لا يدخل ضمن الرسوم الجمركية ويتم تعديله وفقاً لأحكام كل بلد.",
      10,
      170
    );
    doc.text(
      "4. إذا لم تجد روابط الدورات أو لم تتمكن من الحضور الدورات التدريب أو دورات الاستثمار اتصل بالشركة مباشرة.",
      10,
      180
    );

    doc.setFontSize(12);
    doc.text(
      "نحن سعداء باختيارك لـ BIG MONEY BUSINESS وفريقنا جاهز دائماً لخدمتك.",
      10,
      190
    );
    doc.setFontSize(12);
    doc.text("توقيع العميل:", 10, 200);
    doc.setFontSize(12);
    doc.text(
      "(هذه الوثيقة تم انشاؤها تلقائيا ولاتطلب توقيعاً من BMB)",
      10,
      230
    );
    // Save the PDF
    doc.save("contract_preview.pdf");
  };
  const markNotificationsAsRead = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/users/mark-notifications-read",
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        setUnreadCount(0);
        // Optionally fetch notifications again to update the state
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  // Call this function when opening the notifications popup
  useEffect(() => {
    if (isNotificationVisible) {
      markNotificationsAsRead();
    }
  }, [isNotificationVisible]);
  const [position, setPosition] = useState("");
  const [modee, setModee] = useState("normale");

  // Toggle functions for popups
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/notifications",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data.notifications);

        // Count unread notifications
        const unread = data.notifications.filter(
          (notif) => !notif.isRead
        ).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);


  const toggleFormPopup = () => {
    // Reset the form to empty when opening the registration form
    if (!isFormPopupVisible) {
      setNom("");
      setPrenom("");
      setPseudo("");
      setCin("");
      setEmail("");
      setTel("");
      setPoints("");

      setCreator("");
      setPassword("");
      setConfirmPassword("");
    }
    setFormPopupVisible(!isFormPopupVisible);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalContratOpen, setIsModalContratOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [generations, setGenerations] = useState([]);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        if (!userInfo?._id) return;

        const response = await axios.get(
          `http://localhost:3000/api/users/${userInfo._id}/tree-stats`,
          { withCredentials: true }
        );

        if (response.data?.generations) {
          setGenerations(response.data.generations);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des générations :", err);
      }
    };

    fetchGenerations();
  }, [userInfo?._id]);



  const toggleNotification = () =>
    setNotificationVisible(!isNotificationVisible);
  const toggleupshopPopup = () => setupshopPopupVisible(!isupshopPopupVisible);
  const toggleUpdatePopup = () => {
    // Pre-fill the form only when opening the update form
    if (!isModalUUpdateOpen && userInfo) {
      setNom(userInfo.nom || "");
      setPrenom(userInfo.prenom || "");
      setPseudo(userInfo.pseudo || "");
      setEmail(userInfo.email || "");
      setTel(userInfo.tel || "");
      setPassword(""); // Leave password blank
      setConfirmPassword(""); // Leave confirm password blank
    }
    setUpdatePopupVisible(!isUpdatePopupVisible);
    setIsModalUpdateOpen(!isModalUUpdateOpen);
  };

  const toggleBalancePopup = () =>
    setBalancePopupVisible(!isBalancePopupVisible);

  // Submission handlers
  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          nom,
          prenom,
          pseudo,
          email,
          tel,
          password,
        }).unwrap({ credentials: "include" });

        // Dispatch updated credentials
        dispatch(
          setCredentials({
            ...userInfo,
            ...res,
          })
        );
        setIsModalUpdateOpen(false);
        toast.success("تم التحديث");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      window.localStorage.removeItem("userInfo");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  // const submitRegistrationHandler = async (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     toast.error("كلمات المرور غير متطابقة");
  //     return;
  //   }

  //   try {
  //     const res = await register({
  //       nom,
  //       prenom,
  //       pseudo,
  //       cin,
  //       email,
  //       tel,
  //       createdBy: userInfo.pseudo,  // juste info
  //       points,
  //       password,
  //       parentId: userInfo._id,      // 👈 important : l’ID du parrain (connecté)
  //       position: position           // 👈 "left" ou "right"
  //     }).unwrap();

  //     toast.success("تم تسجيل الحساب بنجاح");
  //     toggleFormPopup();
  //     setIsModalRegisterOpen(false)
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  const [reload, setReload] = useState(false);
  // 1. Fonction de transfert de points modifiée
  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipientId =
      userInfo.role === "admin" ? partnerId : "67544116d2f85f101f7eef43";

    const data = {
      senderPseudo: userInfo.pseudo,
      recipientId,
      pointsToTransfer: Number(pointsToSends),
      pointsToSending: Number(pointsToSends),
      password: passwords,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/users/transfer-points",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }



      // Réinitialiser le formulaire
      setPointsToSend("");
      setPartnerId("");
      setPasswords("");

      toggleBalancePopup();
      toast.success("تم ارسال الرصيد");
      setIsModalOpen(false);
      setReload(prev => !prev);

    } catch (error) {
      toast.error("خطا في ادخال البيانات");
    }
  };

  // 2. Fonction d'enregistrement modifiée
  const submitRegistrationHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }

    try {
      // 1️⃣ Enregistrer le nouvel utilisateur
      const res = await register({
        nom,
        prenom,
        pseudo,
        cin,
        email,
        tel,
        createdBy: userInfo.pseudo,
        points,
        password,
        parentId: userInfo._id,
        position,
        modee,
      }).unwrap();


      // 3️⃣ Refetch les générations depuis le backend pour être à jour
      const response = await axios.get(
        `http://localhost:3000/api/users/${userInfo._id}/tree-stats`,
        { withCredentials: true }
      );

      if (response.data?.generations) {
        setGenerations(response.data.generations); // <-- table mise à jour directement
      }

      toast.success("تم تسجيل الحساب بنجاح");

      // 4️⃣ Fermer le modal
      toggleFormPopup();
      setIsModalRegisterOpen(false);


    } catch (err) {

      if (err?.data?.message == "لا يمكنك إضافة مستخدم جديد، الحد الأقصى للجيل هو 5.") {
        Swal.fire({
          icon: "error",

          text: `${err?.data?.message}`

        });
        setIsModalRegisterOpen(false);

      }
      else {
        toast.error(err?.data?.message || err.error || "حدث خطأ أثناء التسجيل");

      }


    }
  };



  const [pointInfo, setPointInfo] = useState(null);
  const [rank, setRank] = useState(null);
  const [pointsToSendsInfo, setPointsToSendsInfo] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  // ajouter  var solde
  const [solde, setSolde] = useState(null);
  // set solde par la fonction get  par api  getsolde utilsier
  // const hasFetched = useRef(false);

  useEffect(() => {
    // if (hasFetched.current) return;
    // hasFetched.current = true;

    const fetchSolde = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/getsolde`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Erreur lors du chargement du solde");
        }

        const data = await res.json();

        setSolde(data.solde);

      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchSolde();
  }, [userInfo, reload]);




  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/getuserpoints/${userInfo._id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Erreur lors du chargement du profil");
        }

        const data = await res.json();



        setPointInfo(data.points);
        setPointsToSendsInfo(data.pointstosend);
        setRank(data.rank);

      } catch (err) {
        toast.error(err.message);
      }
    };


    fetchProfile();

  }, [userInfo, reload]);

  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);

  const [isCheckedMode, setIsCheckedMode] = useState(true);
  const [isModalUUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const adminId = "68c280753814846bdf1bd67b";
  const generationColors = [
    'var(--primary-gradient)',    // الجيل الأول
    'var(--success-gradient)',    // الجيل الثاني  
    'var(--warning-gradient)',    // الجيل الثالث
    'var(--secondary-gradient)',  // الجيل الرابع
    'var(--danger-gradient)',     // الجيل الخامس

  ];

  // 2. Fonction pour obtenir la couleur selon l'index
  const getGenerationColor = (index) => {
    return generationColors[index] || 'var(--primary-gradient)';
  };

  return (
    <div className="encrypted-neon-pattern">
      {/* filtre SVG */}
      <svg className="texture-filter">
        <filter id="neon-texture">
          <feTurbulence
            result="noise"
            numOctaves="2"
            baseFrequency="0.6"
            type="fractalNoise"
          />
          <feSpecularLighting
            result="specular"
            lightingColor="#00f0ff"
            specularExponent="25"
            specularConstant="0.9"
            surfaceScale="2"
            in="noise"
          >
            <fePointLight x="100" y="100" z="90" />
          </feSpecularLighting>
          <feComposite
            result="litNoise"
            operator="over"
            in2="SourceGraphic"
            in="specular"
          />
          <feBlend mode="screen" in2="litNoise" in="SourceGraphic" />
        </filter>
      </svg>
      <div className="container-fluid mx-0 px-0">




        <div className="particles" id="particles">
          <header className="header-elegant">
            <div className="container p-2 ">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="d-flex align-items-center">
                    <div className="logo-container me-4">
                      <BsTrophy className="text-white" size={22} />
                    </div>
                    <div>
                      <h1 className="brand-text mb-1 me-5">B.M.B </h1>
                      <p className="mb-0 text-white-100 fs-6">أهلاً بك في عالم الاستثمار المتطور</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-start">
                  <button className="btn btn-light btn-sm  position-relative pulse-loader" id="notificationBtn" onClick={toggleNotification}>
                    <BiBell size={20} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge" id="notificationBadge">
                      {unreadCount > 0 && `(${unreadCount})`}
                    </span>
                  </button>
                  <button className="btn btn-outline-light btn-sm me-2" id="logoutBtn" onClick={logoutHandler}>
                    <BiLogOut className="text-white" size={20} />
                    خروج
                  </button>
                  <h3 className="text-white fs-6 mt-2"> مرحبا {userInfo.nom} {userInfo.prenom}  </h3>

                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container  mt-5 mb-5">

            <div className="card-elegant d-flex flex-column flex-md-row justify-content-between align-items-center  p-md-5 mb-4 text-center">
              <div className="py-3">
                <h2 className="fw-bold mb-3 fs-4 fs-md-2"
                  style={{ background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  B.M.B ترحب بك
                </h2>
                <div className="responsive-text">
                  <Typewriter
                    words={['انضم إلى عائلة متكاملة من الناجحين وحقق أحلامك في عالم البزنس مودل!']}
                    loop
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </div>
              </div>

              <div className="mt-3 mt-md-0 text-center">
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 58 58" className="image_welcome">
                  <g fillRule="evenodd" fill="none" id="Page-1">
                    <g fillRule="nonzero" id="059---Money-Bag">
                      <path fill="#f29c1f" d="m23 16.98v-9.98c0-1.66-2.91-3-6.5-3s-6.5 1.34-6.5 3v11.01c-3.36.12-6 1.41-6 2.99v26.23c-2.35.45-4 1.52-4 2.77v5c0 1.66 2.91 3 6.5 3s6.5-1.34 6.5-3v-2c0 1.66 2.91 3 6.5 3s6.5-1.34 6.5-3l.5-13z" id="Shape" /><path fill="#f3d55b" d="m54.527 13.355c-.072-.108-1.461-2.092-5.5-3 1.0331933-.84954961 1.6441867-2.10769199 1.673-3.445 0-2.358-2.006-4.417-4.769-4.895-.5372791-.08053169-1.0405693.28263221-1.1334952.81790692s.2585108 1.04682267.7914952 1.15209308c1.798.315 3.111 1.542 3.111 2.925 0 1.638-1.775 2.984-4 3-.8755119.01021562-1.7370699-.21978683-2.491-.665-.4719273-.28691192-1.0870881-.13692731-1.374.33300001-.2869119.47192729-.1369273 1.08708809.335 1.37399999 1.0594655.6270481 2.2688888.9556657 3.5.951.01 0 .017.005.026.005 6.213 0 8.124 2.5 8.176 2.567.200426.2958159.5434432.4622351.8998403.436569.356397-.025666.6720289-.239518.828-.561.155971-.3214819.1285857-.7017531-.0718403-.997569z" id="Shape" /><path fill="#a56a43" d="m45.19 52h-19.19v-12c0-1.66-2.91-3-6.5-3-.8387701-.0034358-1.6759363.0735835-2.5.23v-10.89c1.4565382-3.4367258 3.4852949-6.6015863 6-9.36v-.01c2.0874104-2.3329398 4.5726948-4.2764728 7.34-5.74v-.01c.8551132.5204315 1.8390235.7906603 2.84.78h5.6c1.0050057.0070139 1.9920265-.2665813 2.85-.79 2.18 1.08 12.01 6.72 15.56 21.79 4 17-8 19-12 19z" id="Shape" /><path fill="#fdd7ad" d="m45.19 49c-.5522847 0-1-.4477153-1-1s.4477153-1 1-1c.723 0 4.425-.125 6.376-2.589.9225786-1.3035875 1.4145252-2.8629918 1.407-4.46.0332885-.5485091.4978261-.970453 1.047-.951.2649656.0126906.5140321.1301392.6923876.326499.1783554.1963597.2713838.4555393.2586124.720501-.0084762 2.0150456-.6508108 3.9763353-1.836 5.606-2.524 3.186-7.061 3.347-7.945 3.347z" id="Shape" /><path fill="#805333" d="m46 1.17c.01 2.2-.43 7-3.95 9.75-.1318612.1079533-.2723293.2049432-.42.29-.8579735.5234187-1.8449943.7970139-2.85.79h-5.6c-1.0009765.0106603-1.9848868-.2595685-2.84-.78-.1495192-.0908277-.2931396-.191028-.43-.3-3.52-2.75-3.95-7.55-3.95-9.75.0016568-.33258473.1685567-.6425818.4452874-.8270689.2767306-.18448711.6270741-.21931899.9347126-.0929311 1.28.54 1.71 1.75 3.65 1.75 2.49 0 2.49-2 4.98-2s2.5 2 5 2c1.94 0 2.37-1.22 3.65-1.75.3076385-.12638789.657982-.09155601.9347126.0929311.2767307.1844871.4436306.49448417.4452874.8270689z" id="Shape" /><path fill="#603e26" d="m36.45 11.982c1.164119-1.6359812 2.0400633-3.45889226 2.59-5.39.1491169-.53295478.7020452-.84411688 1.235-.695s.8441169.70204522.695 1.235c-.545409 1.83131833-1.3359015 3.5804932-2.35 5.2l3.34 3.12c.4031679.3783151.423315 1.0118321.045 1.415-.3783151.4031678-1.0118321.423315-1.415.045l-3.59-3.35v3.3c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-3.3l-3.58 3.35c-.1844231.1726652-.4273651.2691275-.68.27-.2800466-.0009897-.5474685-.1166316-.74-.32-.3709419-.4048785-.3486888-1.0324134.05-1.41l3.35-3.12c-1.0179074-1.618792-1.8117948-3.36803545-2.36-5.2-.0704836-.2559398-.0363072-.52940237.0949974-.76012341.1313047-.23072105.3489609-.3997642.6050026-.46987659.2546559-.07392838.5283328-.04249768.7595988.08723693.231266.1297346.4007475.34690489.4704012.60276307.5569409 1.93085241 1.4433119 3.7509576 2.62 5.38z" id="Shape" /><path fill="#f0c419" d="m17 21c0 1.66-2.91 3-6.5 3s-6.5-1.34-6.5-3c0-1.58 2.64-2.87 6-2.99.17-.01.33-.01.5-.01 3.59 0 6.5 1.34 6.5 3z" id="Shape" /><path fill="#e57e25" d="m23 7v9.98c-2.5147051 2.7584137-4.5434618 5.9232742-6 9.36v-5.34c0-1.66-2.91-3-6.5-3-.17 0-.33 0-.5.01v-11.01c0 1.66 2.91 3 6.5 3s6.5-1.34 6.5-3z" id="Shape" /><path fill="#f9eab0" d="m13 50c0 1.66-2.91 3-6.5 3s-6.5-1.34-6.5-3c0-1.25 1.65-2.32 4-2.77.82406367-.1564165 1.66122992-.2334358 2.5-.23 3.59 0 6.5 1.34 6.5 3z" id="Shape" /><path fill="#f3d55b" d="m13 50v5c0 1.66-2.91 3-6.5 3s-6.5-1.34-6.5-3v-5c0 1.66 2.91 3 6.5 3s6.5-1.34 6.5-3z" id="Shape" /><path fill="#f3d55b" d="m26 40c0 1.66-2.91 3-6.5 3s-6.5-1.34-6.5-3c0-1.25 1.65-2.32 4-2.77.8240637-.1564165 1.6612299-.2334358 2.5-.23 3.59 0 6.5 1.34 6.5 3z" id="Shape" /><path fill="#f0c419" d="m26 40v13c0 1.66-2.91 3-6.5 3s-6.5-1.34-6.5-3v-13c0 1.66 2.91 3 6.5 3s6.5-1.34 6.5-3z" id="Shape" /><path fill="#fdd7ad" d="m39 27c0 .5522847.4477153 1 1 1s1-.4477153 1-1c0-2.209139-1.790861-4-4-4v-1c0-.5522847-.4477153-1-1-1s-1 .4477153-1 1v1c-2.209139 0-4 1.790861-4 4s1.790861 4 4 4v4c-1.1045695 0-2-.8954305-2-2 0-.5522847-.4477153-1-1-1s-1 .4477153-1 1c0 2.209139 1.790861 4 4 4v1c0 .5522847.4477153 1 1 1s1-.4477153 1-1v-1c2.209139 0 4-1.790861 4-4s-1.790861-4-4-4v-4c1.1045695 0 2 .8954305 2 2zm0 6c0 1.1045695-.8954305 2-2 2v-4c1.1045695 0 2 .8954305 2 2zm-4-4c-1.1045695 0-2-.8954305-2-2s.8954305-2 2-2z" id="Shape" /></g></g></svg>

                {/* <p className="number-h1">{solde >= 90 ? solde : 0}  دينار</p> */}


                {/* <p className="number-h1">{solde}  دينار</p> */}


              </div>
            </div>

            {/* Action Cards */}
            <div className="row  mb-5  mt-5 ">
              <div className="col-lg-3  mb-md-2 mb-0 col-md-6">
                <div className="action-card p-4   fade-in fade-in-2" onClick={() => setIsModalRegisterOpen(true)}>
                  <div className="icon-wrapper icon-wrapper-primary">
                    <i className="fas fa-user-plus" />
                    <FaUserPlus className="text-white" size={32} />
                  </div>
                  <h5 className="fw-bold mb-2 text-white">تسجيل شريك جديد</h5>
                  <p className="text-secondary-50 mb-0">إضافة شريك جديد للفريق المتميز</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6  mb-md-2 mb-0">
                <div className="action-card fade-in p-4  fade-in-3" onClick={() => setIsModalUpdateOpen(true)}>
                  <div className="icon-wrapper icon-wrapper-success">
                    <BiEdit className="text-white" size={32} />
                  </div>
                  <h5 className="fw-bold mb-2 text-white">تحديث البيانات</h5>
                  <p className="text-secondary-50 mb-0">تطوير وتحديث معلومات الحساب</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6  mb-md-2 mb-0">
                <div className="action-card fade-in fade-in-4 p-4  " onClick={showModal}>
                  <div className="icon-wrapper icon-wrapper-warning">
                    <BiWallet className="text-white" size={32} />
                  </div>
                  <h5 className="fw-bold mb-2 text-white" > الرصيد</h5>
                  <p className="text-secondary-50 mb-0">تحكم كامل في رصيدك المالي</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6  mb-md-2 mb-0">
                <div className="action-card fade-in fade-in-1 p-4" onClick={() => setIsModalContratOpen(true)}>
                  <div className="icon-wrapper icon-wrapper-info">
                    <FiFileText className="text-white" size={32} />
                  </div>
                  <h5 className="fw-bold mb-2 text-white ">العقد الإلكتروني</h5>
                  <p className="text-secondary-50 mb-0">وثائقك الرسمية والمعتمدة</p>
                </div>
              </div>
            </div>

            {/* Generations Table */}



            <div className="table-elegant fade-in fade-in-2 mb-5">
              <div className="d-flex  border rounded-full  flex-column  flex-md-row justify-content-between align-items-center p-4" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)' }}>
                <h4 className="mb-0  fs-5 fs-md-2 fw-bold text-black">
                  شبكة الأجيال والشركاء
                </h4>
                <span className="badge fs-6 mt-3 mt-md-0" style={{ background: 'var(--success-gradient)' }}>{generations.length} أجيال نشطة</span>
              </div>
              <div className="table-responsive ">
                <table className="table mb-0   table-bordered ">
                  <thead>
                    <tr>
                      <th rowSpan={2} className="fw-bold text-black fs-6 px-3 py-3 text-center align-top">
                        <i className="fas fa-layer-group me-2" />
                        الأجيال
                      </th>

                      {userInfo?.modee === "premium" ? (
                        <>
                          <th colSpan={2} className="fw-bold text-black fs-6 px-3 py-3 text-center">
                            <i className="fas fa-arrow-right me-2" />
                            الشركاء يمينا
                          </th>
                          <th colSpan={2} className="fw-bold text-black fs-6 px-3 py-3 text-center">
                            <i className="fas fa-arrow-left me-2" />
                            الشركاء يسارا
                          </th>
                        </>
                      ) : (
                        <>
                          <th className="fw-bold text-black fs-6 px-3 py-3 text-center">
                            <i className="fas fa-arrow-right me-2" />
                            الشركاء يمينا
                          </th>
                          <th className="fw-bold text-black fs-6 px-3 py-3 text-center">
                            <i className="fas fa-arrow-left me-2" />
                            الشركاء يسارا
                          </th>
                        </>
                      )}
                    </tr>

                    {userInfo?.modee === "premium" && (
                      <tr>
                        <th className="text-center">
                          <span className="bg-info py-2 px-3 rounded-2">يمين</span>
                        </th>
                        <th className="text-center">
                          <span className="bg-info py-2 px-3 rounded-2">يسار</span>
                        </th>
                        <th className="text-center">
                          <span className="bg-info py-2 px-3 rounded-2">يمين</span>
                        </th>
                        <th className="text-center">
                          <span className="bg-info py-2 px-3 rounded-2">يسار</span>
                        </th>
                      </tr>
                    )}
                  </thead>


                  <tbody>
                    {generations.map((gen, index) => (
                      <tr key={index}>
                        <td className="fw-semibold text-center">
                          <span
                            className="badge p-2 fs-6"
                            style={{
                              background: getGenerationColor(index),
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            الجيل {gen.generation}
                          </span>
                        </td>

                        {userInfo?.modee !== "premium" ? (
                          <>
                            <td className="text-center fw-bold fs-5 text-success">
                              {gen.rightPartners}
                            </td>
                            <td className="text-center fw-bold fs-5 text-info">
                              {gen.leftPartners}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="text-center fw-bold text-success">
                              {gen.rightRight}
                            </td>
                            <td className="text-center fw-bold text-warning">
                              {gen.leftRight}
                            </td>

                            <td className="text-center fw-bold text-info">
                              {gen.rightLeft}
                            </td>
                            <td className="text-center fw-bold text-danger">
                              {gen.leftLeft}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
            {/* Additional Features */}
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card-elegant p-4 h-100 fade-in fade-in-3">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper icon-wrapper-primary me-3" style={{ width: 60, height: 60 }}>
                      <FaGraduationCap className="text-white" size={28} />

                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">أكاديمية الاستثمار</h5>
                      <p className="text-muted mb-0">دورات تدريبية متخصصة</p>
                    </div>
                  </div>
                  <p className="text-muted mb-3">اكتسب المهارات اللازمة لتحقيق النجاح في عالم الاستثمار من خلال دوراتنا المتقدمة</p>
                  <Link
                    to="/formation"
                    className="btn btn-elegant text-white d-inline-flex align-items-center"
                  >
                    <i className="fas fa-play me-2" /> ابدأ التعلم الآن
                  </Link>


                </div>
              </div>
              <div className="col-md-6">
                <div className="card-elegant bg-white p-4 h-100 fade-in fade-in-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper icon-wrapper-warning me-3" style={{ width: 60, height: 60 }}>
                      <FaCrown className="text-white" size={28} />

                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">رتبتك الحالية</h5>
                      <p className="text-muted mb-0">{rank}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h3 className="fw-bold mb-1" style={{ background: 'var(--warning-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        ELITE PARTNER
                      </h3>
                      <p className="text-muted mb-0">شريك متميز ونشط</p>
                    </div>
                    <div className="icon-wrapper icon-wrapper-warning floating-element">
                      <FaMedal className="text-white" size={28} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>



          <footer className="header-elegant mt-5 p-md-5 p-3 ">
            <div className="container">

              <div className="row  mb-5">

                <div className="col-lg-4 ">

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-primary  mb-2 fw-semibold">تاريخ الانضمام</p>
                      <h4 className="fw-bold text-white mb-1">{userInfo.createdAt}</h4>
                      <span className="badge" style={{ background: 'var(--success-gradient)' }}>عضو مميز</span>
                    </div>

                  </div>
                </div>

                <div className="col-lg-4 ">

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-primary  mb-2 fw-semibold">آخر نشاط</p>
                      <h4 className="fw-bold text-white mb-1"> {userInfo.previousLastLogin || "لا يوجد تسجيل دخول سابق"}</h4>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </footer>




          {/* Balance Popup */}

          <Modal footer={null}
            title="التحقق من الرصيد"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className=" p-2 p-md-4">
              <div className="text-center mb-2 mb-md-4">
                <div className="icon-wrapper icon-wrapper-warning rounded-circle">
                  <BiWallet className="text-white" size={32} />
                </div>
                <h2 className="fw-bold mb-2 ">{solde}   د.ت</h2>
                {/* <h2 className="fw-bold mb-2 ">{pointInfo}   د.ت</h2> */}


              </div>
              <form onSubmit={handleSubmit}>

                <div className="mb-0 mb-md-3">
                  <input type="number" placeholder="المبلغ المراد إرساله" min={0} className="form-control"
                    value={pointsToSends} onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 0) {
                        setPointsToSend(value);
                      }
                    }}

                    onWheel={(e) => e.target.blur()}
                    required />
                </div>



                {userInfo.role === "admin" ? (
                  <div className="mb-0 mb-md-3">
                    <input type="text" placeholder="معرف المستلم" className="form-control" value={partnerId} onChange={(e) =>
                      setPartnerId(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className=" mb-0 mb-md-3 p-0">
                    <input type="hidden" value={adminId} // Automatically set adminId for regular users onChange={()=>

                    /></div>
                )}

                <div className="mb-3">
                  <input type="password" placeholder="كلمة المرور للتأكيد" value={passwords} onChange={(e) =>
                    setPasswords(e.target.value)}
                    className="form-control" required />
                </div>
                <button type="submit" className="btn btn-warning w-100 fw-semibold">إرسال الرصيد</button>
              </form>
            </div>

          </Modal>


          {/* Notification Popup */}
          {isNotificationVisible && (

            <Modal footer={null}
              title="الإشعارات"
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isNotificationVisible}
              onOk={toggleNotification}
              onCancel={toggleNotification}
            >
              <div className="notification-popup">
                <div className="notification-content">

                  {notifications.length === 0 ? (
                    <p>لا توجد إشعارات جديدة</p>
                  ) : (
                    <div style={{ maxHeight: '24rem', overflowY: 'auto' }}>
                      {notifications.map((notif, index) => (
                        <div key={index} className="alert alert-primary d-flex align-items-start p-2">
                          <div className="icon-circle d-flex justify-content-center align-items-center rounded-5 bg-primary text-white me-3" style={{ width: 32, height: 32 }} >
                            💰

                          </div>
                          <div className="flex-grow-1">
                            <p className="fw-medium mb-1"> {notif.message}</p>
                            <small className="text-muted"> {new Date(notif.date).toLocaleDateString()} </small>
                          </div>
                        </div>

                      ))}

                      <button className="btn btn-secondary w-100 my-3  justify-content-center d-flex ">تحديد الكل كمقروء</button>
                    </div>
                  )}

                </div>
              </div>
            </Modal>
          )}

          {/* Contract Popup */}
          {isModalContratOpen &&

            <Modal footer={null}
              title=" "
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isModalContratOpen}
              onOk={handleOk}
              onCancel={() => setIsModalContratOpen(false)}
            >

              <div className="text-center border-bottom pb-4 mb-4 position-relative ">
                <h2 className="text-primary fw-bold">BIG MONEY BUSINESS</h2>
                <p className="h5 text-muted">العقد الإلكتروني</p>



              </div>


              <div className="row g-0 g-md-3 mb-4 p-0">
                <div className="col-md-6 p-0">
                  <p className="text-muted mb-1 ">التاريخ:</p>
                  <p className="fw-semibold">{userInfo.createdAt}</p>
                </div>
                <div className="col-md-6 p-0">
                  <p className="text-muted mb-1">الاسم الكامل:</p>
                  <p className="fw-semibold">{userInfo.nom} {userInfo.prenom}</p>
                </div>
                <div className="col-md-6 p-0">
                  <p className="text-muted mb-1">رقم الهوية:</p>
                  <p className="fw-semibold">{userInfo.cin}</p>
                </div>
                <div className="col-md-6 p-0">
                  <p className="text-muted mb-1">معرف الحساب:</p>
                  <p className="fw-semibold">{userInfo.id}</p>
                </div>
                <div className="col-md-6 p-0">
                  <p className="text-muted mb-1">المبلغ المدفوع:</p>
                  <p className="fw-semibold">43$+الرسوم</p>
                </div>

              </div>

              <div className="alert alert-secondary">
                <p className="mb-0 lh-lg">
                  لقد قمت بتأكيد عملية الشراء المذكورة أعلاه. وتؤكد اشتراكك في خطة التسويق الخاصة بنا،
                  والتي تمنحك عمولات وفقًا للجدول الخاص بك. جميع استثمارات فريقك وسيكون الدفع وفقًا لشريحتك
                  كما أوضحنا في شروط الخدمة الخاصة بنا.
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-semibold mb-3">يرجى الملاحظة:</h6>
                <ol className="list-group list-group-numbered">
                  <li className="list-group-item border-0 pe-0">نحن لا نعدك بأي دخل ولكن نعدك بإطلاق دفعتك دائما كما شرحنا في الخطة.</li>
                  <li className="list-group-item border-0 pe-0">سيتم إلقاء جميع المحاضرات عبر تطبيق زوم أو حضوريًا.</li>
                  <li className="list-group-item border-0 pe-0">المبلغ المذكور لا يدخل ضمن الرسوم الجمركية.</li>
                  <li className="list-group-item border-0 pe-0">إذا لم تجد روابط الدورات اتصل بالشركة مباشرة.</li>
                </ol>
              </div>

              <div className="text-center border-top pt-4 mb-4 position-relative">
                <p className="mb-3">نحن سعداء باختيارك لـ BIG MONEY BUSINESS وفريقنا جاهز دائماً لخدمتك.</p>
                <p className="text-muted small">(هذه الوثيقة تم إنشاؤها تلقائياً ولا تطلب توقيعاً من BMB)</p>


              </div>

              <div className="mb-3"

                style={{


                  opacity: 0.6,
                  zIndex: 999,
                  float: "left",


                }}
              >
                <img
                  src={sealImage}
                  alt="Cachet officiel"
                  style={{
                    width: "80px",
                    height: "80px",
                    filter: "grayscale(30%)",
                    borderRadius: "50%",
                    rotate: "-40deg",


                    transform: "translate(-10%, 0)"
                  }}
                />
              </div>
              <button className="btn btn-info w-100 fw-semibold">
                <i className="fas fa-download me-2" />تحميل العقد PDF
              </button>

            </Modal>

          }


          {/* upshop Popup */}
          {isupshopPopupVisible && (
            <div className="notification-popup">
              <div className="notification-content">
                <input type="text" placeholder="الرصيد" />
                <button type="submit">تحديث</button>
                <button className="close-notification-btn" onClick={toggleupshopPopup}>
                  غلق
                </button>
              </div>
            </div>
          )}
          {/* Registration Popup */}
          {isModalRegisterOpen && (
            <Modal footer={null}
              title=" استمارة التسجيل  "
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isModalRegisterOpen}
              onOk={handleOk}
              onCancel={() => setIsModalRegisterOpen(false)}




            >
              <div className="popup-form p-1 p-md-3">
                <div className="popup-content">
                  <span className="btn btn-secondary text-white d-inline-flex align-items-center mb-2 mb-md-3"    >



                    لديك   :        {pointsToSendsInfo}     نقطة

                  </span>
                  <form onSubmit={submitRegistrationHandler}>
                    <div className=" mb-2 p-0 mb-md-3">
                      <input className="form-control" type="text" id="nom" name="nom" placeholder="الإسم" value={nom} onChange={(e) =>
                        setNom(e.target.value)}
                      />
                    </div>
                    <div className="mb-2 p-0 mb-md-3">
                      <input className="form-control" type="text" id="prenom" name="prenom" placeholder="اللقب" value={prenom} onChange={(e) =>
                        setPrenom(e.target.value)}
                      />
                    </div>
                    <div className="mb-2  p-0 mb-md-3">
                      <input className="form-control" type="text" id="pseudo" name="pseudo" placeholder="إسم الحساب" value={pseudo} onChange={(e) =>
                        setPseudo(e.target.value)}
                      />
                    </div>
                    <div className="mb-2  p-0 mb-md-3">
                      <input className="form-control" type="text" id="cin" name="cin" placeholder="رقم الهوية" value={cin} onChange={(e) =>
                        setCin(e.target.value)}
                      />
                    </div>
                    <div className="mb-2   p-0 mb-md-3">
                      <input className="form-control" type="text" id="email" name="email" placeholder="الإميل" value={email} onChange={(e) =>
                        setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-2  p-0 mb-md-3">
                      <input className="form-control" type="text" id="tel" name="tel" placeholder="الهاتف" value={tel} onChange={(e) =>
                        setTel(e.target.value)}
                      />
                    </div>
                    <div className="mb-2  p-0 mb-md-3">
                      <input className="form-control" type="text" id="points" name="points" placeholder="150" value={points} onChange={(e) =>
                        setPoints(e.target.value)}
                        disabled
                      />
                    </div>


                    <div className="mb-3 d-flex gap-4">
                      {userInfo.modee === "normale" &&
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="modee"
                            value="normale"
                            checked={modee === "normale"}
                            onChange={(e) => {
                              setModee(e.target.value);
                              setPosition("");
                            }}
                          />
                          <label className="form-check-label">عادي</label>
                        </div>
                      }
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="modee"
                          value="premium"
                          checked={modee === "premium"}
                          onChange={(e) => {
                            setModee(e.target.value);
                            setPosition("");
                          }}
                        />
                        <label className="form-check-label">محترف</label>
                      </div>
                    </div>


                    {userInfo.modee === "normale" ? (

                      <div className="mb-3 d-flex gap-4">
                        <div className="form-check">
                          <input
                            className="form-check-input border-dark"
                            type="radio"
                            name="position"
                            value="right"
                            checked={position === "right"}
                            onChange={(e) => setPosition(e.target.value)}
                          />
                          <label className="form-check-label">يمين</label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input border-dark"
                            type="radio"
                            name="position"
                            value="left"
                            checked={position === "left"}
                            onChange={(e) => setPosition(e.target.value)}
                          />
                          <label className="form-check-label">يسار</label>
                        </div>
                      </div>
                    ) : (

                      <div className="mb-3 d-flex gap-5">

                        <div>
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input border-dark"
                              type="radio"
                              name="position"
                              value="rightRight"
                              checked={position === "rightRight"}
                              onChange={(e) => setPosition(e.target.value)}
                            />
                            <label className="form-check-label">يمين اليمين</label>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input border-dark"
                              type="radio"
                              name="position"
                              value="leftRight"
                              checked={position === "leftRight"}
                              onChange={(e) => setPosition(e.target.value)}
                            />
                            <label className="form-check-label">يسار اليمين</label>
                          </div>
                        </div>

                        <div>
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input border-dark"
                              type="radio"
                              name="position"
                              value="rightLeft"
                              checked={position === "rightLeft"}
                              onChange={(e) => setPosition(e.target.value)}
                            />
                            <label className="form-check-label">يمين اليسار</label>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input border-dark"
                              type="radio"
                              name="position"
                              value="leftLeft"
                              checked={position === "leftLeft"}
                              onChange={(e) => setPosition(e.target.value)}
                            />
                            <label className="form-check-label">يسار اليسار</label>
                          </div>
                        </div>

                      </div>
                    )}




                    {/* Hidden field for creator, auto-filled */}
                    <div className="mb-0  p-0 mb-md-3">
                      <input type="text" id="creator" name="creator" placeholder="إسم الحساب" value={createdBy}
                        onChange={(e) => setCreator(e.target.value)}
                        hidden
                      />
                    </div>
                    <div className="mb-2  p-0 mb-md-3">
                      <input type="password" className="form-control " id="password" name="password" placeholder="كلمة السر" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-2  p-0 mb-md-3">
                      <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="تأكيد كلمة السر"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-semibold">تسجيل</button>
                  </form>

                </div>
              </div>
            </Modal>
          )}

          {/* Update Popup */}
          {isModalUUpdateOpen && (
            <Modal footer={null}
              title={` تحديث : ${userInfo._id}`}
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isModalUUpdateOpen}
              onOk={toggleUpdatePopup}
              onCancel={() => setIsModalUpdateOpen(false)}

            >
              <div className="update-popup  p-3">
                <div className="update-popup-content">

                  <form onSubmit={submitUpdateHandler}>

                    <div className="mb-3 p-1">
                      <input type="text" className="form-control" id="pseudo" name="pseudo" placeholder="إسم الحساب" value={pseudo} onChange={(e) =>
                        setPseudo(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 p-1">
                      <input type="text" className="form-control" id="email" name="email" placeholder="الإميل" value={email} onChange={(e) =>
                        setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 p-1">
                      <input type="text" className="form-control" id="tel" name="tel" placeholder="الهاتف" value={tel} onChange={(e) =>
                        setTel(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 p-1">
                      <input type="password" className="form-control" id="password" name="password" placeholder="كلمة السر" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 p-1">
                      <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="تأكيد كلمة السر"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-success mx-auto d-block">تحديث</button>
                  </form>

                </div>
              </div>
            </Modal>
          )}


        </div>

      </div>
    </div>

  );
};

export default Admin;
