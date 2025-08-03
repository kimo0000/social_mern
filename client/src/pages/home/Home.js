import "./Home.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/Sidebar";
import ContentApp from "../../components/contentApp/ContentApp";
import RightBar from "../../components/rightBar/RightBar";

function Home() {
  return (
    <section className="home">
      <Header />
      <SideBar />
      <ContentApp />
      <RightBar profile={true} />
    </section>
  )
}

export default Home;