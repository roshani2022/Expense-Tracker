import Header from "../MainNavigation/Navbar";

const Root = (props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};
export default Root;
