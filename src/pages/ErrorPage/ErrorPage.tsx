import { Container } from "./ErrorPage.styles";
import img from "../../assets/errorImg.png";
import { ButtonFill } from "../../styles/styles";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="error__img">
        <img src={img} alt="pageNotFound" />
      </div>
      <div className="error__text">
        <h1>404</h1>
        <div>에러가 발견되었습니다.</div>
        <ButtonFill onClick={() => navigate("/JMemo")}>
          <span>메인 페이지로 돌아가기</span>
        </ButtonFill>
      </div>
    </Container>
  );
};

export default ErrorPage;
