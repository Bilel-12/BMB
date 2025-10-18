import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
            <h1 className="fw-bold text-5xl mb-4">404</h1>
            <p className="text-lg mb-4">الصفحة التي تبحث عنها غير موجودة.</p>
            <Link to="/" className="btn btn-primary">العودة للرئيسية</Link>
        </div>
    );
}

export default NotFound;
