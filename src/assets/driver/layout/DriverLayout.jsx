import HeadDriver from "../headdriver/HeadDriver";

const DriverLayout = ({children, isLoggedIn, handleLogout}) => {
    return (
        <div className="page-container">
            <HeadDriver isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div className="content">{children}</div>
        </div>
    );
};

export default DriverLayout;