import { useState, useEffect } from "react";
import { FaRocket } from "react-icons/fa";
import './formation.scss'
const Formation = () => {

  const [isVisible, setIsVisible] = useState({});



  const links = [
    {
      title: "البرمجة",
      icon: "💻",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { name: "اساسيات البرمجة", url: "https://docs.google.com/document/d/1Z8mw0m4v0xg6ezAHnjJQ-lxP-a8TWeAk/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true", icon: "🚀" },
        { name: "HTML لغة", url: "https://docs.google.com/document/d/11JJ4Ymdsi3WMdqQ-cuiOi5YVozOQ7ToBYknJH8ZoL7E/edit?usp=drivesdk", icon: "🌐" },
        { name: "Css لغة", url: "https://docs.google.com/document/d/18fDZ7XiMaRZRn6t3ulvsefMg27xLg5Wg/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true", icon: "🎨" },
        { name: "JAVASCRIPT لغة", url: "https://docs.google.com/document/d/1LaJPbkEUhpc4C0T-IwtfEYWd4zDPpKmv/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true", icon: "⚡" },
        { name: "PYTHON لغة", url: "https://docs.google.com/document/d/14qRE1zXaqNufk64NnPI_Z2aiYMcsAIW-gffDPNWbFYg/edit?usp=drivesdk", icon: "🐍" },
        { name: "REACT تعلم", url: "https://docs.google.com/document/d/1tGvP3KYe4G-XjrweAgF_jErUaJx_6sDY/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true", icon: "⚛️" },
        { name: "C++ لغة", url: "https://docs.google.com/document/d/1kkjnlkGqlriQVvnsLjOXOWuTd1IstBoR/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true", icon: "🔧" },
        { name: "ALGORITHME تعلم", url: "https://docs.google.com/document/d/1ZNSdqG9o2xuwUZGI6XI6LK06FYJiP0n3/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true", icon: "🧠" },
        { name: "لغة PHP", url: "https://drive.google.com/file/d/1Zdw16mSEez7IXVVIzdu1fWJZw9I4pC_m/view?usp=drivesdk", icon: "🔗" },
        { name: "قواعد البيانات", url: "https://docs.google.com/document/d/1SnIpKYg6oFB6ceyZlC-1ChW70r5s3f9b/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true", icon: "🗄️" },
        { name: "قواعد البيانات MongoDB-EN", url: "https://drive.google.com/file/d/1aIOwpcBC4zxiHIvOPOrxBZMhi74vTWo1/view?usp=drivesdk", icon: "🍃" },
        { name: "قواعد البيانات MongoDB-AR", url: "https://drive.google.com/file/d/1a7vYWI6dArX150oBTBh0WbdtUq5PBDcV/view?usp=drivesdk", icon: "🍃" },
      ],
    },
    {
      title: "الذكاء الاصطناعي",
      icon: "🤖",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      items: [
        { name: "عالم الذكاء الاصطناعي", url: "https://docs.google.com/document/d/1qC1YrK6IpfVXMa-Euld0P9_zPR-pbF6In5_2aLB19wk/edit?usp=drivesdk", icon: "🧠" },
      ],
    },
    {
      title: "عالم الابداع",
      icon: "🎬",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      items: [
        { name: "دورة التصميم", url: "https://docs.google.com/document/d/1iC5l-2k0lrygZu077rNK1A4mIcjOTCx-JDUzp3zYN0g/edit?usp=drivesdk", icon: "🎭" },
        { name: "التصميم مع دفنشي", url: "https://docs.google.com/document/d/157wCwe6vk2QWsqvg6YJO4HVVr6jcNXzgeDVNZg-di0A/edit?usp=drivesdk", icon: "💻🧾" },

        { name: "التحارة الالكترونية الدليل", url: "https://docs.google.com/document/d/1GyxGqwU8B5bYUPkbRX6y1nwaTNuf5QvA5s7itFF4jAo/edit?usp=drivesdk", icon: "💵💵" },
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
        { name: "المستوى الاول", url: "https://docs.google.com/document/d/13gzuRtVRcB5PiQteDot94SCYXoT31B9Z/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true", icon: "⭐" },
        { name: "المستوى الثاني", url: "https://docs.google.com/document/d/1uYiLlH-2YiQ-YdEIvi_4GKmVpFZwqaV07F2x7rbYJVQ/edit?usp=drivesdk", icon: "⭐⭐" },
        { name: " المستوى الثالث", url: "https://docs.google.com/document/d/1HEs9h_hEj37dIOGJh6pze0RIC6AGA1Yf-VydN9JzTqw/edit?usp=drivesdk", icon: "💬" },
        { name: " المستوى المتقدم", url: "https://docs.google.com/document/d/1nJ3UNlPIzLWnTLKcg1rPnVnvdiGYWkgPiPeLFBfC8r8/edit?usp=drivesdk", icon: "📝" },
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
        { name: "مستوى الاول", url: "https://docs.google.com/document/d/1tUOcRi_zBgaeXZOW5KrgPV77BjLoaolQci0ZYJkG50g/edit?usp=drivesdk", icon: "⭐" },
        { name: "مستوى الثاني", url: "https://docs.google.com/document/d/1Jmaso_6HMQ-b9l9fDSBcddFxS--d_2gbBNuS4eh6uoc/edit?usp=drivesdk", icon: "⭐⭐" },
        { name: "مستوى الثالث", url: "https://docs.google.com/document/d/1haCsOKQHSQdUfQR1Lzv3rO5QjmBovTBhfAqITVe8EX0/edit?usp=drivesdk", icon: "⭐⭐⭐" },
        { name: "مستوى متقدم", url: "https://docs.google.com/document/d/1B7hNzadGVabmqCeNcP8HN8WKsBKWVJEAXyVBN1VDiKc/edit?usp=drivesdk", icon: "⭐⭐⭐⭐" },
      ],
    },
    {
      title: "اللغة الالمانية",
      icon: "🇩🇪",
      gradient: "linear-gradient(135deg, #a8edea 0%, #a8a2a4ff 100%)",
      items: [
        { name: "مستوى الاول", url: "https://docs.google.com/document/d/1d-o27GYGrHvUqxduo_2a1G1oQBfOI2ij27n73His1cU/edit?usp=drivesdk", icon: "⭐" },
        { name: "مستوى الثاني", url: "https://docs.google.com/document/d/1g1BIToVVoAff2Hs6r4LAeGahTl5-lUiNQNZB3dnOCdY/edit?usp=drivesdk", icon: "⭐⭐" },
        { name: "مستوى الثالث", url: "https://docs.google.com/document/d/1__tOSiN-txO-Y4dLDL6OFMVcGR_eITQ1TwrvvmyQGXM/edit?usp=drivesdk", icon: "⭐⭐⭐" },
        { name: "مستوى متقدم", url: "https://docs.google.com/document/d/1p9oZ0K-dqTXZfSwWNkptCXFXDOqN2OyIdFV8ySUlEKA/edit?usp=drivesdk", icon: "⭐⭐⭐⭐" },
      ],
    },
    {
      title: "اللغة الايطالية",
      icon: "🇮🇹",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      items: [
        { name: "مستوى الاول", url: "https://docs.google.com/document/d/1qEQOTuCGgdAWk8mZcfkKdUiiHCPLttsy7QZfEeAF8vs/edit?usp=drivesdk", icon: "⭐" },
        { name: "مستوى الثاني", url: "https://docs.google.com/document/d/1-9TBerL35gmsFIqpO_IbPPh6TSiFkVAJYDNpT7S0mCw/edit?usp=drivesdk", icon: "⭐⭐" },
        { name: "مستوى الثالث", url: "https://docs.google.com/document/d/1Pj89IoFkk804Jl_xq3sGT7bPejyvUBX4qZrvD2ClYcw/edit?usp=drivesdk", icon: "⭐⭐⭐" },
        { name: "مستوى متقدم", url: "https://docs.google.com/document/d/1AZJ8fW2X_9uwFCnCDS-jzR_5p3hkz3oMM_YhZkzVD7g/edit?usp=drivesdk", icon: "⭐⭐⭐⭐" },
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


  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #365285ff 0%, #2a5298 50%, #1e3c72 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    },
    backgroundDecor: {
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    },
    floatingElement1: {
      position: 'absolute',
      top: '-160px',
      right: '-160px',
      width: '320px',
      height: '320px',
      background: 'rgba(168, 85, 247, 0.2)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 4s ease-in-out infinite'
    },
    floatingElement2: {
      position: 'absolute',
      bottom: '-160px',
      left: '-160px',
      width: '320px',
      height: '320px',
      background: 'rgba(59, 130, 246, 0.2)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 4s ease-in-out infinite 2s'
    },
    heroSection: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 1
    },
    heroContent: {
      textAlign: 'center',
      zIndex: 10
    },
    mainTitle: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #fbbf24, #ef4444, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem',
      animation: 'glow 2s ease-in-out infinite alternate'
    },
    subtitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      color: '#d1d5db',
      fontWeight: '300',
      marginBottom: '4rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginTop: '4rem',
      maxWidth: '800px'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.5s ease',
      cursor: 'pointer'
    },
    statCardHover: {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.05) rotate(1deg)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #fbbf24, #f97316)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    slideshowSection: {
      padding: '5rem 20px',
      position: 'relative',
      zIndex: 1
    },
    slideshowContainer: {
      maxWidth: '1000px',
      margin: '0 auto',
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(16px)',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    slideImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      transition: 'all 1s ease'
    },
    slideNavButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '20px',
      zIndex: 10
    },
    slideNavButtonHover: {
      background: 'rgba(0, 0, 0, 0.8)',
      transform: 'translateY(-50%) scale(1.1)'
    },
    slideIndicators: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '10px'
    },
    indicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    sectionsContainer: {
      padding: '5rem 20px',
      position: 'relative',
      zIndex: 1
    },
    sectionCard: {
      maxWidth: '1200px',
      margin: '0 auto 3rem auto',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.5s ease',
      opacity: 0,
      transform: 'translateY(50px)'
    },
    sectionCardVisible: {
      opacity: 1,
      transform: 'translateY(0px)'
    },
    sectionCardHover: {
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    sectionHeader: {
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    },
    sectionHeaderOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.2)'
    },
    sectionHeaderContent: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      flexDirection: 'row-reverse'
    },
    sectionTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: 'bold',
      color: 'white'
    },
    sectionIcon: {
      fontSize: '3rem',
      transition: 'transform 0.5s ease'
    },
    sectionIconHover: {
      transform: 'scale(1.25) rotate(12deg)'
    },
    itemsGrid: {
      padding: '2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem'
    },
    courseLink: {
      display: 'block',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      textDecoration: 'none',
      color: '#d1d5db',
      transition: 'all 0.3s ease',
      textAlign: 'right'
    },
    courseLinkHover: {
      background: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-3px) scale(1.02)',
      color: 'white'
    },
    courseLinkContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '0.75rem'
    },
    courseLinkIcon: {
      fontSize: '1.5rem',
      transition: 'transform 0.3s ease'
    },
    courseLinkIconHover: {
      transform: 'scale(1.25) rotate(12deg)'
    },
    introSection: {
      padding: '5rem 20px',
      position: 'relative',
      zIndex: 1
    },
    introCard: {
      maxWidth: '1000px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(16px)',
      borderRadius: '24px',
      padding: '3rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.5s ease'
    },
    introTitle: {
      fontSize: 'clamp(1.8rem, 4vw, 3rem)',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #fbbf24, #f97316)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textAlign: 'center',
      marginBottom: '2rem'
    },
    introParagraph: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: '#d1d5db',
      textAlign: 'right',
      marginBottom: '1.5rem',
      transition: 'color 0.3s ease'
    },
    warningSection: {
      padding: '5rem 20px',
      position: 'relative',
      zIndex: 1
    },
    warningCard: {
      maxWidth: '1000px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.1))',
      backdropFilter: 'blur(16px)',
      borderRadius: '24px',
      padding: '3rem',
      border: '2px solid rgba(239, 68, 68, 0.3)'
    },
    warningTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#fca5a5'
    },
    warningGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      textAlign: 'right'
    },
    warningItem: {
      background: 'rgba(239, 68, 68, 0.1)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      transition: 'all 0.3s ease'
    },
    warningItemHover: {
      background: 'rgba(239, 68, 68, 0.2)',
      transform: 'translateY(-2px)'
    },
    aiWidget: {
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      zIndex: 50
    },
    aiWidgetLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '50px',
      textDecoration: 'none',
      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
      transition: 'all 0.3s ease',
      fontWeight: 'bold'
    },
    aiWidgetLinkHover: {
      transform: 'scale(1.1) rotate(3deg)',
      boxShadow: '0 15px 40px rgba(16, 185, 129, 0.5)'
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.backgroundDecor}>
        <div style={styles.floatingElement1}></div>
        <div style={styles.floatingElement2}></div>
      </div>


      {/* Hero Section */}
      <div className="hero-section   d-flex flex-col justify-content-center align-items-center ">

        <div className="hero-content card  bg-transparent rounded-5 w-100" >
          <div className=" badgeee  text-white border-danger px-4 py-2 rounded-pill mb-4 fs-6" style={{ background: 'linear-gradient(45deg #5D5CDE, #ff6347) !important' }}>
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
            {[
              { number: "1000+", label: "طالب نشط", color: "warning" },
              { number: "50+", label: "دورة متخصصة", color: "info" },
              { number: "95%", label: "نسبة الرضا", color: "success" }
            ].map((stat, index) => (
              <div key={index} className=" col-12 col-md-4 d-flex justify-content-center ">
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







      {/* Course Sections */}
      <section style={styles.sectionsContainer}>
        {links.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            id={`section-${sectionIndex}`}
            className="animate-on-scroll"
            style={{
              ...styles.sectionCard,
              ...(isVisible[`section-${sectionIndex}`] ? styles.sectionCardVisible : {}),
              transitionDelay: `${sectionIndex * 100}ms`
            }}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.sectionCardHover);
              const icon = e.currentTarget.querySelector('.section-icon');
              if (icon) Object.assign(icon.style, styles.sectionIconHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, {
                ...styles.sectionCard,
                ...(isVisible[`section-${sectionIndex}`] ? styles.sectionCardVisible : {})
              });
              const icon = e.currentTarget.querySelector('.section-icon');
              if (icon) Object.assign(icon.style, styles.sectionIcon);
            }}
          >
            {/* Section Header */}
            <div style={{ ...styles.sectionHeader, background: section.gradient }}>
              <div style={styles.sectionHeaderOverlay}></div>
              <div style={styles.sectionHeaderContent}>
                <h2 style={styles.sectionTitle}>{section.title}</h2>
                <div className="section-icon " style={styles.sectionIcon}>
                  {section.icon}
                </div>
              </div>
              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '80px',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                width: '60px',
                height: '60px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }}></div>
            </div>

            {/* Course Links */}
            <div style={styles.itemsGrid}>
              {section.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.courseLink}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.courseLinkHover);
                    const icon = e.currentTarget.querySelector('.course-icon');
                    if (icon) Object.assign(icon.style, styles.courseLinkIconHover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, styles.courseLink);
                    const icon = e.currentTarget.querySelector('.course-icon');
                    if (icon) Object.assign(icon.style, styles.courseLinkIcon);
                  }}
                >
                  <div className="d-flex flex-row-reverse " style={styles.courseLinkContent}>
                    <span>{item.name}</span>
                    <div className="course-icon" style={styles.courseLinkIcon}>
                      {item.icon}
                    </div>
                  </div>
                  <div style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    marginTop: '0.5rem',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.5s ease',
                    transformOrigin: 'right'
                  }} className="course-underline"></div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Introduction Section */}
      <section className="mt-md-5 mt-0 py-0 " style={styles.introSection}>
        <div className="p-3" style={styles.introCard}>
          <h3 style={styles.introTitle}>
            ⭐ تعرف على أهمية عالم البزنس مودل ⭐
          </h3>

          <p style={styles.introParagraph}>
            اكتشف معنا كل ما تحتاجه لتعلم البرمجة بشكل شامل وممتع! من أساسيات البرمجة إلى تعلم لغات البرمجة المتنوعة وقواعد البيانات، نقدم لك كل ذلك خطوة بخطوة. بالإضافة إلى ذلك، ستتعلم كيفية تسريع تجربتك البرمجية من خلال إتقان اللغة الإنجليزية التي توسع آفاق معرفتك وتفتح لك أبوابًا جديدة للتواصل مع ثقافات مختلفة وأيضا تعلم اللغة الفرنسية كل هذا بطريقة تفاعلية ومثرية.
          </p>
          <p style={styles.introParagraph}>
            كما نقدم لك دليلًا مبتكرًا لتعلم الذكاء الاصطناعي من الصفر، مع استعراض أهم التقنيات البرمجية التي سيحتاجها كل مبتدئ. دوراتنا ليست مجرد نصوص مكتوبة، بل تشمل فيديوهات تعليمية تفاعلية لضمان تجربة تعلم مثرية. وأيضًا، نقدم لك دليلًا متكاملًا لتعلم التسويق بالمحتوى، بالإضافة إلى استراتيجيات التسويق بالعمولة التي تضمن لك نجاحًا في عالم الأعمال.
          </p>
        </div>
      </section>

      {/* Warning Section */}
      <section style={styles.warningSection}>
        <div style={styles.warningCard}>
          <h2 style={styles.warningTitle}>
            ⚠️ تنبيه هام ⚠️
          </h2>

          <div style={styles.warningGrid}>
            {[
              "يمنع تسجيل دورات الاستثمار أو عرضها أو تدريسها لأي سبب كان.",
              "هذه الدورة مخصصة فقط للشركاء وهي من حقك أنت وليست للعموم.",
              "كل من يشارك دورات الاستثمار مع غير الشركاء يتم إغلاق حسابه.",
              "كل من يقوم ببيع أو تدريس هذه الدورات يتم تتبعه عدلياً من الشركة."
            ].map((warning, index) => (
              <div
                key={index}
                style={styles.warningItem}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.warningItemHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.warningItem)}
              >
                <p style={{ fontWeight: '600', color: '#fca5a5', margin: 0 }}>
                  {warning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>




    </div>
  );
};

export default Formation;



