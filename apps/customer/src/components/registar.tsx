import { useNavigate } from "react-router-dom"
export const Register = () => {
    const navigate = useNavigate()
    return (
        <>
            <button onClick={() => navigate('/login')}>
                Go to Login
            </button>
        </>
    )
}
