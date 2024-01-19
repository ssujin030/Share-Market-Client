import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import AuctionListContainer from "../containers/posts/AuctionListContainer";

const AuctionPage = () => {
    return (
        <>
            <HeaderContainer />
            <div style={welcomeDivStyle}>옥션에 오신걸 환영합니다~!!</div>
            <AuctionListContainer />
        </>
    );
};

const welcomeDivStyle = {
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    padding: "1.2rem",
};

export default AuctionPage;
